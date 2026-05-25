"use client";

import { BlogCard } from "@/components/blog-card";
import type { BlogArticle } from "@/lib/cms/types";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type BlogShowcaseProps = {
  articles: BlogArticle[];
};

export function BlogShowcase({ articles }: BlogShowcaseProps): ReactNode {
  if (articles.length === 0) return null;

  return (
    <section className="relative w-full bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground">
              Laatste van onze blogs
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Tips en nieuws om slimmer te ondernemen.
            </p>
          </motion.div>
          <motion.a
            href="/blogs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors shrink-0"
          >
            Alle artikelen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article) => (
            <motion.div
              key={article.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <BlogCard article={article} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
