import { mapBlogDetail, mapBlogEntry, mapTeamEntry } from "@/lib/cms/map";
import {
  parseCollectionResponse,
  parseSingleCollectionEntry,
} from "@/lib/cms/parse";
import type {
  BlogArticle,
  BlogArticleDetail,
  BlogPostPageData,
  CmsEntry,
  HomeCollections,
  TeamMember,
} from "@/lib/cms/types";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

// ---------------------------------------------------------------------------
// Config & types
// ---------------------------------------------------------------------------

const COLLECTIONS = {
  blogs: { slug: "blogs", defaultLimit: 4 },
  team: { slug: "team", defaultLimit: 20 },
} as const;

type CollectionKey = keyof typeof COLLECTIONS;

const ITERATION_PAGE_SIZE = 50;

export const BLOG_PAGE_SIZE = 9;

export type CollectionEntriesOptions = {
  limit?: number;
  offset?: number;
};

export type PaginatedBlogArticles = {
  articles: BlogArticle[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// ---------------------------------------------------------------------------
// Low-level fetching
// ---------------------------------------------------------------------------

async function fetchCollectionEntries(
  collection: CollectionKey,
  options: CollectionEntriesOptions = {},
): Promise<{ entries: CmsEntry[]; count: number | null }> {
  const { slug, defaultLimit } = COLLECTIONS[collection];
  const cms = await createClient();

  const { data, error } = await cms.rpc("get_collection_entries", {
    p_tenant_slug: siteConfig.tenantSlug,
    p_collection_slug: slug,
    p_limit: options.limit ?? defaultLimit,
    p_offset: options.offset ?? 0,
  });

  if (error) {
    console.error(`[cms] get_collection_entries (${slug}):`, error.message);
    return { entries: [], count: null };
  }

  return parseCollectionResponse(data);
}

async function fetchEntryBySlug(
  collection: CollectionKey,
  entrySlug: string,
): Promise<CmsEntry | null> {
  const { slug: collectionSlug } = COLLECTIONS[collection];
  const cms = await createClient();

  const { data, error } = await cms.rpc("get_entry_by_slug", {
    p_tenant_slug: siteConfig.tenantSlug,
    p_collection_slug: collectionSlug,
    p_entry_slug: entrySlug,
  });

  if (error) {
    console.error(
      `[cms] get_entry_by_slug (${collectionSlug}/${entrySlug}):`,
      error.message,
    );
    return findEntryBySlugInCollection(collection, entrySlug);
  }

  const entry = parseSingleCollectionEntry(data);
  if (entry) return entry;

  return findEntryBySlugInCollection(collection, entrySlug);
}

function entrySlugMatches(entry: CmsEntry, slug: string): boolean {
  const entrySlug =
    typeof entry.slug === "string" && entry.slug.length > 0
      ? entry.slug
      : typeof entry.id === "string" && entry.id.length > 0
        ? entry.id
        : null;
  return entrySlug === slug;
}

/** Fallback als get_entry_by_slug geen bruikbare entry teruggeeft. */
async function findEntryBySlugInCollection(
  collection: CollectionKey,
  entrySlug: string,
): Promise<CmsEntry | null> {
  for await (const entry of iterateCollection(collection)) {
    if (entrySlugMatches(entry, entrySlug)) return entry;
  }
  return null;
}

/** Doorloopt alle entries van een collection in batches. */
async function* iterateCollection(
  collection: CollectionKey,
  pageSize = ITERATION_PAGE_SIZE,
): AsyncGenerator<CmsEntry> {
  let offset = 0;

  for (;;) {
    const { entries } = await fetchCollectionEntries(collection, {
      limit: pageSize,
      offset,
    });

    for (const entry of entries) yield entry;

    if (entries.length < pageSize) return;
    offset += pageSize;
  }
}

// ---------------------------------------------------------------------------
// Entry helpers
// ---------------------------------------------------------------------------

function mapEntries<T>(
  entries: CmsEntry[],
  mapper: (entry: CmsEntry) => T | null,
): T[] {
  return entries.flatMap((entry) => {
    const mapped = mapper(entry);
    return mapped ? [mapped] : [];
  });
}

// ---------------------------------------------------------------------------
// Public: raw entries
// ---------------------------------------------------------------------------

/** Ruwe blog-entries uit het CMS (bijv. voor detailpagina's). */
export async function getBlogEntries(
  options?: CollectionEntriesOptions,
): Promise<CmsEntry[]> {
  const { entries } = await fetchCollectionEntries("blogs", options);
  return entries;
}

/** Ruwe team-entries uit het CMS. */
export async function getTeamEntries(
  options?: CollectionEntriesOptions,
): Promise<CmsEntry[]> {
  const { entries } = await fetchCollectionEntries("team", options);
  return entries;
}

// ---------------------------------------------------------------------------
// Public: mapped entries
// ---------------------------------------------------------------------------

/** Blog-artikelen, gemapt voor de UI. */
export async function getBlogArticles(
  options?: CollectionEntriesOptions,
): Promise<BlogArticle[]> {
  return mapEntries(await getBlogEntries(options), mapBlogEntry);
}

export type BlogSitemapEntry = {
  slug: string;
  lastModified?: Date;
};

/** Alle gepubliceerde blogposts voor sitemap.xml. */
export async function getBlogSitemapEntries(): Promise<BlogSitemapEntry[]> {
  const entries: BlogSitemapEntry[] = [];

  for await (const entry of iterateCollection("blogs")) {
    if (!mapBlogEntry(entry)) continue;

    const slug =
      typeof entry.slug === "string" && entry.slug.length > 0
        ? entry.slug
        : typeof entry.id === "string" && entry.id.length > 0
          ? entry.id
          : null;
    if (!slug) continue;

    const raw = entry.updated_at ?? entry.published_at ?? entry.created_at;
    const lastModified =
      typeof raw === "string" ? new Date(raw) : undefined;

    entries.push({
      slug,
      ...(lastModified && !Number.isNaN(lastModified.getTime())
        ? { lastModified }
        : {}),
    });
  }

  return entries;
}

/** Teamleden, gemapt voor de UI. */
export async function getTeamMembers(
  options?: CollectionEntriesOptions,
): Promise<TeamMember[]> {
  return mapEntries(await getTeamEntries(options), mapTeamEntry);
}

// ---------------------------------------------------------------------------
// Indexes (voor related-lookups)
// ---------------------------------------------------------------------------

async function buildBlogIndex(): Promise<Map<string, BlogArticle>> {
  const index = new Map<string, BlogArticle>();
  for await (const entry of iterateCollection("blogs")) {
    const article = mapBlogEntry(entry);
    if (article) index.set(article.title, article);
  }
  return index;
}

async function buildTeamIndex(): Promise<Map<string, TeamMember>> {
  const index = new Map<string, TeamMember>();
  for await (const entry of iterateCollection("team")) {
    const member = mapTeamEntry(entry);
    if (member) index.set(member.id, member);
  }
  return index;
}

function pickRelated(
  ids: string[],
  index: Map<string, BlogArticle>,
  current: BlogArticleDetail,
): BlogArticle[] {
  const seen = new Set<string>([current.href]);
  const related: BlogArticle[] = [];

  for (const id of ids) {
    const article = index.get(id);
    if (!article || seen.has(article.href)) continue;
    seen.add(article.href);
    related.push(article);
  }

  return related;
}

// ---------------------------------------------------------------------------
// Blog detail
// ---------------------------------------------------------------------------

/** Enkel blogartikel op slug (voor /blog/[slug]). */
export const getBlogArticleBySlug = cache(async function getBlogArticleBySlug(
  slug: string,
): Promise<BlogArticleDetail | null> {
  const entry = await fetchEntryBySlug("blogs", slug);
  return entry ? mapBlogDetail(entry) : null;
});

/** Blogdetail met auteur (team) en gerelateerde artikelen. */
export const getBlogPostPageData = cache(async function getBlogPostPageData(
  slug: string,
): Promise<BlogPostPageData | null> {
  const article = await getBlogArticleBySlug(slug);
  if (!article) return null;

  const [blogIndex, teamIndex] = await Promise.all([
    article.relatedIds.length > 0
      ? buildBlogIndex()
      : Promise.resolve(new Map<string, BlogArticle>()),
    article.authorId
      ? buildTeamIndex()
      : Promise.resolve(new Map<string, TeamMember>()),
  ]);

  const author = article.authorId
    ? (teamIndex.get(article.authorId) ?? null)
    : null;
  const related = pickRelated(article.relatedIds, blogIndex, article);

  return { article, author, related };
});

// ---------------------------------------------------------------------------
// Blog listing (paginated)
// ---------------------------------------------------------------------------

/** Gepagineerde bloglijst voor /blogs. */
export async function getBlogArticlesPage(
  page = 1,
  pageSize = BLOG_PAGE_SIZE,
): Promise<PaginatedBlogArticles> {
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * pageSize;

  // Eén extra ophalen zodat we ook zonder count weten of er nog een
  // volgende pagina is.
  const { entries, count } = await fetchCollectionEntries("blogs", {
    limit: pageSize + 1,
    offset,
  });

  const hasNextPage =
    count !== null ? offset + pageSize < count : entries.length > pageSize;

  const pageEntries = entries.slice(0, pageSize);
  const articles = mapEntries(pageEntries, mapBlogEntry);

  const base = {
    articles,
    page: safePage,
    pageSize,
    hasNextPage,
    hasPrevPage: safePage > 1,
  };

  if (count !== null) {
    return {
      ...base,
      total: count,
      totalPages: Math.max(1, Math.ceil(count / pageSize)),
    };
  }

  // Zonder count benaderen we het totaal o.b.v. wat we tot nu toe gezien hebben.
  return {
    ...base,
    total: offset + pageEntries.length + (hasNextPage ? 1 : 0),
    totalPages: hasNextPage ? safePage + 1 : safePage,
  };
}

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------

/** Homepage: blogs + team parallel ophalen. */
export async function getHomeCollections(): Promise<HomeCollections> {
  const [blogs, teams] = await Promise.all([
    getBlogArticles(),
    getTeamMembers(),
  ]);
  return { blogs, teams };
}