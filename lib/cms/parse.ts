import type { CmsEntry } from "@/lib/cms/types";

function asEntryArray(value: unknown): CmsEntry[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is CmsEntry => typeof item === "object" && item !== null);
}

/** Vlak CMS-entry: top-level velden + geneste `data` uit de collectie. */
export function flattenCmsEntry(raw: CmsEntry): CmsEntry {
  const nested = raw.data;
  if (typeof nested === "object" && nested !== null && !Array.isArray(nested)) {
    const { data: _data, ...rest } = raw;
    return { ...rest, ...(nested as CmsEntry) };
  }
  return raw;
}

/**
 * Haalt entries uit get_collection_entries.
 * Response: { success, data: Entry[] } of direct Entry[].
 */
export function parseCollectionEntries(payload: unknown): CmsEntry[] {
  if (!payload) return [];

  if (typeof payload === "object" && payload !== null && "data" in payload) {
    const envelope = payload as {
      success?: boolean;
      data?: unknown;
      error?: unknown;
    };

    if (envelope.success === false) return [];

    return parseCollectionEntries(envelope.data);
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => flattenCmsEntry(item as CmsEntry));
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    for (const key of ["items", "entries", "results"]) {
      const items = asEntryArray(record[key]);
      if (items.length > 0) {
        return items.map(flattenCmsEntry);
      }
    }
  }

  return [];
}

function asCount(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : null;
}

/** Parsed RPC-response inclusief totaal voor paginatie. */
export function parseCollectionResponse(payload: unknown): {
  entries: CmsEntry[];
  count: number | null;
} {
  if (typeof payload === "object" && payload !== null && "data" in payload) {
    const envelope = payload as {
      success?: boolean;
      data?: unknown;
      count?: unknown;
      error?: unknown;
    };

    if (envelope.success === false) {
      return { entries: [], count: null };
    }

    return {
      entries: parseCollectionEntries(envelope.data),
      count: asCount(envelope.count),
    };
  }

  return {
    entries: parseCollectionEntries(payload),
    count: null,
  };
}

/** CMS-entry met metadata op top-level en velden in geneste `data`. */
function isCmsEntryRecord(record: Record<string, unknown>): boolean {
  return (
    typeof record.slug === "string" ||
    typeof record.id === "string" ||
    typeof record.collection === "object" ||
    typeof record.published_at === "string"
  );
}

/** Eén entry uit get_entry_by_slug (of vergelijkbare RPC). */
export function parseSingleCollectionEntry(payload: unknown): CmsEntry | null {
  if (!payload) return null;

  if (typeof payload === "object" && payload !== null && "data" in payload) {
    const record = payload as Record<string, unknown> & {
      success?: boolean;
      data?: unknown;
    };

    if (record.success === false) return null;

    // get_entry_by_slug: { id, slug, published_at, data: { title, image, ... } }
    if (isCmsEntryRecord(record)) {
      return flattenCmsEntry(payload as CmsEntry);
    }

    // RPC-envelope: { success, data: entry | entry[] }
    const inner = record.data;
    if (Array.isArray(inner)) {
      const first = inner[0];
      return typeof first === "object" && first !== null
        ? flattenCmsEntry(first as CmsEntry)
        : null;
    }
    if (typeof inner === "object" && inner !== null) {
      return flattenCmsEntry(inner as CmsEntry);
    }
    return null;
  }

  if (Array.isArray(payload)) {
    const first = payload[0];
    return typeof first === "object" && first !== null
      ? flattenCmsEntry(first as CmsEntry)
      : null;
  }

  if (typeof payload === "object") {
    return flattenCmsEntry(payload as CmsEntry);
  }

  return null;
}
