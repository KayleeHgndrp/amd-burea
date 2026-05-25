import { BlogArticleContent } from "@/components/blog-article-content";
import { BlogAuthor } from "@/components/blog-author";
import { BlogRelated } from "@/components/blog-related";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { getBlogPostPageData } from "@/lib/cms/get-collections";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getBlogPostPageData(id);

  if (!data) {
    return createMetadata({
      title: "Artikel niet gevonden",
      path: `/blogs/${id}`,
      noIndex: true,
    });
  }

  const { article, author } = data;
  const byline = author ? ` door ${author.name}` : "";
  const description =
    article.excerpt || `${article.title}${byline} — ${siteConfig.name}`;

  return createMetadata({
    title: article.title,
    description,
    path: `/blogs/${article.slug}`,
    image: article.image,
    ...(author && {
      authors: [
        {
          name: author.name,
          ...(author.linkedIn && { url: author.linkedIn }),
        },
      ],
    }),
  });
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<ReactNode> {
  const { id } = await params;
  const data = await getBlogPostPageData(id);
  if (!data) notFound();

  const { article, author, related } = data;
  const meta = [article.category, article.date, article.readTime].filter(Boolean);

  return (
    <>
      <main id="main-content" className="flex-1">
        <article className="relative w-full bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Terug naar blog
            </Link>

            {meta.length > 0 && (
              <p className="text-sm text-foreground/60 mb-4">
                {meta.join(" · ")}
              </p>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground">
              {article.title}
            </h1>

            {author && (
              <div className="mt-8">
                <BlogAuthor author={author} />
              </div>
            )}

            {article.excerpt && (
              <p className="mt-8 text-lg text-foreground/70 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <div className="relative aspect-16/10 overflow-hidden bg-muted rounded-sm mt-10 mb-12">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <BlogArticleContent content={article.content} />

            {related.length > 0 && <BlogRelated articles={related} />}
          </div>
        </article>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}