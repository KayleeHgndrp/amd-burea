import type { BlogArticle } from "@/lib/cms/types";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type BlogCardProps = {
  article: BlogArticle;
};

export function BlogCard({ article }: BlogCardProps): ReactNode {
  const meta = [article.category, article.date, article.readTime].filter(Boolean);

  return (
    <Link href={article.href} className="group block h-full">
      <div className="relative aspect-4/5 overflow-hidden bg-muted rounded-sm mb-4">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        {meta.length > 0 && (
          <p className="text-sm text-foreground/60 mt-1">{meta.join(" · ")}</p>
        )}
        {article.excerpt && (
          <p className="text-sm text-foreground/55 mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
