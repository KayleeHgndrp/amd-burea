import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type BlogsPaginationProps = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

function pageHref(page: number): string {
  return page <= 1 ? "/blogs" : `/blogs?page=${page}`;
}

export function BlogsPagination({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: BlogsPaginationProps): ReactNode {
  const showNumberedPages = totalPages > 1;

  return (
    <nav
      className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
      aria-label="Blogpaginatie"
    >
      <Link
        href={pageHref(page - 1)}
        aria-disabled={!hasPrevPage}
        className={`inline-flex items-center gap-2 h-12 px-5 text-sm font-medium rounded-full border border-foreground/15 transition-colors ${
          hasPrevPage
            ? "text-foreground hover:bg-foreground/5"
            : "text-foreground/30 pointer-events-none"
        }`}
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        Vorige
      </Link>

      {showNumberedPages && (
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={pageHref(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={`min-w-10 h-10 flex items-center justify-center text-sm font-medium rounded-full transition-colors ${
                pageNumber === page
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:bg-foreground/5"
              }`}
            >
              {pageNumber}
            </Link>
          ))}
        </div>
      )}

      {!showNumberedPages && (
        <span className="text-sm text-foreground/60">Pagina {page}</span>
      )}

      <Link
        href={pageHref(page + 1)}
        aria-disabled={!hasNextPage}
        className={`inline-flex items-center gap-2 h-12 px-5 text-sm font-medium rounded-full border border-foreground/15 transition-colors ${
          hasNextPage
            ? "text-foreground hover:bg-foreground/5"
            : "text-foreground/30 pointer-events-none"
        }`}
      >
        Volgende
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}
