import { siteConfig } from "@/lib/config";
import type { BlogArticleDetail, TeamMember } from "@/lib/cms/types";

/**
 * Herbruikbare JSON-LD bouwstenen. Elke pagina rendert deze via een
 * <script type="application/ld+json"> tag.
 */

export const organizationId = `${siteConfig.url}/#organisatie`;

/** AccountingService (LocalBusiness) — het bedrijfsprofiel voor Google. */
export function accountingServiceJsonLd() {
  return {
    "@type": "AccountingService",
    "@id": organizationId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/og-image.png`,
    telephone: siteConfig.contact.phone.tel,
    email: siteConfig.contact.email,
    priceRange: "€€",
    openingHours: "Mo-Fr 09:00-17:30",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.street,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.zipCode,
      addressCountry: "NL",
    },
    areaServed: { "@type": "Place", name: "Nederland" },
  };
}

/** WebSite — koppelt de site aan de organisatie. */
export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "nl-NL",
    publisher: { "@id": organizationId },
  };
}

/** BreadcrumbList voor een pad van (naam, relatief pad)-paren. */
export function breadcrumbsJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** BlogPosting voor een artikeldetailpagina. */
export function blogPostingJsonLd(
  article: BlogArticleDetail,
  author: TeamMember | null,
) {
  const url = `${siteConfig.url}/blogs/${article.slug}`;

  return {
    "@type": "BlogPosting",
    "@id": `${url}#artikel`,
    headline: article.title,
    ...(article.excerpt ? { description: article.excerpt } : {}),
    image: article.image,
    url,
    mainEntityOfPage: url,
    inLanguage: "nl-NL",
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          ...(author.role ? { jobTitle: author.role } : {}),
          ...(author.linkedIn ? { url: author.linkedIn } : {}),
        }
      : { "@id": organizationId },
    publisher: { "@id": organizationId },
  };
}

/** Wrapper: zet bouwstenen samen in één @graph-document. */
export function jsonLdDocument(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
