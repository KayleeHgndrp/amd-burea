import type { Metadata } from "next";
import { siteConfig as config } from "@/lib/config";

export const year = new Date().getFullYear();

export const copyright = `© ${year} ${config.name}.`;

export const siteName = config.name;
export const siteURL = config.url;

export const siteConfig = {
  name: config.name,
  description: config.description,
  url: config.url,
  ogImage: "/og-image.png",
  creator: config.twitter,
  authors: [
    {
      name: config.name,
      url: config.url,
    },
  ],
  keywords: [
    "boekhouder",
    "boekhouding",
    "ZZP",
    "MKB",
    "BTW-aangifte",
    "inkomstenbelasting",
    "salarisadministratie",
    "financieel advies",
    "AMD Bureau",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  authors,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  authors?: { name: string; url?: string }[];
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const authorList = authors?.map((author) => ({
    name: author.name,
    ...(author.url ? { url: author.url } : {}),
  }));

  return {
    title,
    description,
    ...(authorList && authorList.length > 0 ? { authors: authorList } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      ...(authorList && authorList.length > 0 ? { authors: authorList.map((a) => a.name) } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
