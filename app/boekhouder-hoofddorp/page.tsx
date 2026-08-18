import { Footer } from "@/components/footer";
import { FinalCTA } from "@/components/final-cta";
import { Stats } from "@/components/stats";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HoofddorpFAQ, HoofddorpIntro, HoofddorpMap } from "./components/hoofddorp";
import { hoofddorpFaqs } from "./faq-data";

export const metadata: Metadata = createMetadata({
  title: "Boekhouder in Hoofddorp voor ZZP en MKB",
  description:
    "Boekhouder in Hoofddorp nodig? AMD Bureau helpt ZZP'ers en MKB in de Haarlemmermeer. Vaste prijs, vast aanspreekpunt en klare taal. Plan een gratis kennismaking.",
  path: "/boekhouder-hoofddorp",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AccountingService",
      "@id": `${siteConfig.url}/boekhouder-hoofddorp#kantoor`,
      name: siteConfig.name,
      description:
        "Boekhoudkantoor in Hoofddorp voor ZZP'ers en MKB. Vaste prijs, eigen contactpersoon, klare taal.",
      url: `${siteConfig.url}/boekhouder-hoofddorp`,
      telephone: siteConfig.contact.phone.tel,
      email: siteConfig.contact.email,
      priceRange: "€€",
      openingHours: "Mo-Fr 09:00-17:30",
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${siteConfig.name}, ${siteConfig.street}, ${siteConfig.zipCode} ${siteConfig.city}`,
      )}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.street,
        addressLocality: siteConfig.city,
        postalCode: siteConfig.zipCode,
        addressCountry: "NL",
      },
      areaServed: [
        "Hoofddorp",
        "Nieuw-Vennep",
        "Badhoevedorp",
        "Zwanenburg",
        "Vijfhuizen",
        "Cruquius",
        "Lisserbroek",
        "Rijsenhout",
        "Schiphol-Rijk",
        "Haarlemmermeer",
      ].map((name) => ({ "@type": "Place", name })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/boekhouder-hoofddorp#faq`,
      mainEntity: hoofddorpFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/boekhouder-hoofddorp#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Boekhouder in Hoofddorp",
          item: `${siteConfig.url}/boekhouder-hoofddorp`,
        },
      ],
    },
  ],
};

export default function BoekhouderHoofddorpPage(): ReactNode {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="flex-1">
        <HoofddorpIntro />
        <Stats />
        <HoofddorpMap />
        <HoofddorpFAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
