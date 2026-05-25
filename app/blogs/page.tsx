import { BlogCard } from "@/components/blog-card";
import { BlogsEmptyState } from "@/components/blogs-empty-state";
import { BlogsPagination } from "@/components/blogs-pagination";
import { Footer } from "@/components/footer";
import { getBlogArticlesPage } from "@/lib/cms/get-collections";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: `Tips en nieuws over boekhouding en ondernemen van ${siteConfig.name}.`,
  path: "/blogs",
});

type BlogsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

function parsePageParam(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

export default async function BlogsPage({
  searchParams,
}: BlogsPageProps): Promise<ReactNode> {
  const { page: pageParam } = await searchParams;
  const { articles, totalPages, hasNextPage, hasPrevPage, page } =
    await getBlogArticlesPage(parsePageParam(pageParam));

  return (
    <>
      <main id="main-content" className="flex-1">
        <section className="relative w-full bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="max-w-2xl mb-14">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground">
                Blogs
              </h1>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                Praktische tips over boekhouding, belasting en ondernemen als
                ZZP&apos;er of MKB.
              </p>
            </div>

            {articles.length === 0 ? (
              <BlogsEmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {articles.map((article) => (
                    <BlogCard key={article.href} article={article} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <BlogsPagination
                    page={page}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}