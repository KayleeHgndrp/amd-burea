import { getBlogSitemapEntries } from "@/lib/cms/get-collections";
import { siteConfig } from "@/lib/metadata";
import type { MetadataRoute } from "next";

const staticPages: MetadataRoute.Sitemap = [
  {
    url: siteConfig.url,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${siteConfig.url}/blogs`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/contact`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${siteConfig.url}/voorwaarden`,
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntries = await getBlogSitemapEntries();

  const blogPages: MetadataRoute.Sitemap = blogEntries.map(
    ({ slug, lastModified }) => ({
      url: `${siteConfig.url}/blogs/${slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticPages, ...blogPages];
}
