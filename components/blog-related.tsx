import { BlogCard } from "@/components/blog-card";
import type { BlogArticle } from "@/lib/cms/types";
import type { ReactNode } from "react";

type BlogRelatedProps = {
  articles: BlogArticle[];
};

export function BlogRelated({ articles }: BlogRelatedProps): ReactNode {
  if (articles.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-foreground/10">
      <h2 className="text-2xl sm:text-3xl font-medium font-serif text-foreground mb-8">
        Gerelateerde artikelen
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {articles.map((article) => (
          <BlogCard key={article.href} article={article} />
        ))}
      </div>
    </section>
  );
}
