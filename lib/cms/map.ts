import { siteConfig } from "@/lib/config";
import type { BlogArticle, BlogArticleDetail, CmsEntry, TeamMember } from "@/lib/cms/types";

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function parseRelatedIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function asStringOrFirstInArray(value: unknown): string | undefined {
  const direct = asString(value);
  if (direct) return direct;
  if (!Array.isArray(value) || value.length === 0) return undefined;
  return asString(value[0]);
}

function formatDate(value: unknown): string {
  const raw = asString(value);
  if (!raw) return "";

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;

  return date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function mapBlogEntry(entry: CmsEntry): BlogArticle | null {
  const title =
    asString(entry.title) ??
    asString(entry.titel) ??
    asString(entry.meta_title) ??
    asString(entry.name) ??
    asString(entry.naam);

  const image =
    asString(entry.featured_image) ??
    asString(entry.foto) ??
    asString(entry.afbeelding) ??
    asString(entry.image_url) ??
    asString(entry.image) ??
    asString(entry.thumbnail);

  if (!title || !image) return null;

  const slug = asString(entry.slug) ?? asString(entry.id);

  return {
    title,
    excerpt:
      asString(entry.excerpt) ??
      asString(entry.samenvatting) ??
      asString(entry.summary) ??
      asString(entry.description) ??
      "",
    category: asString(entry.category) ?? asString(entry.categorie) ?? asString(entry.tag) ?? "Blog",
    date: formatDate(entry.published_at ?? entry.date ?? entry.created_at),
    readTime: asString(entry.read_time) ?? asString(entry.leestijd) ?? asString(entry.readTime) ?? "",
    image,
    href: asString(entry.href) ?? asString(entry.url) ?? (slug ? `/blogs/${slug}` : "#"),
  };
}

export function mapBlogDetail(entry: CmsEntry): BlogArticleDetail | null {
  const article = mapBlogEntry(entry);
  if (!article) return null;

  const slug = asString(entry.slug) ?? asString(entry.id);
  if (!slug) return null;

  const content =
    asString(entry.content) ??
    asString(entry.inhoud) ??
    asString(entry.body) ??
    asString(entry.tekst) ??
    asString(entry.html) ??
    "";

  const authorId =
    asStringOrFirstInArray(entry.author) ?? asStringOrFirstInArray(entry.auteur);
  const relatedIds = parseRelatedIds(entry.related);

  return {
    ...article,
    slug,
    content,
    href: `/blogs/${slug}`,
    relatedIds,
    ...(authorId ? { authorId } : {}),
  };
}

export function mapTeamEntry(entry: CmsEntry): TeamMember | null {
  const name = asString(entry.naam) ?? asString(entry.name) ?? asString(entry.title);

  const image =
    asString(entry.foto) ??
    asString(entry.featured_image) ??
    asString(entry.image_url) ??
    asString(entry.image) ??
    asString(entry.avatar) ??
    asString(entry.photo);

  const id = asString(entry.id);
  if (!id || !name || !image) return null;

  const linkedIn =
    asString(entry.linkedin) ?? asString(entry.linkedin_url) ?? asString(entry.linked_in);

  return {
    id,
    name,
    role: asString(entry.functie) ?? asString(entry.role) ?? asString(entry.job_title) ?? "",
    company: asString(entry.company) ?? asString(entry.bedrijf) ?? siteConfig.name,
    image,
    ...(linkedIn ? { linkedIn } : {}),
  };
}
