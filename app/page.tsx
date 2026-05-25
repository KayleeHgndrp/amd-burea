import { BlogShowcase } from "@/components/blog-showcase";
import { FAQ } from "@/components/faq";
import { FeatureCards } from "@/components/feature-cards";
import { FeatureHighlight } from "@/components/feature-highlight";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { Principles } from "@/components/principles";
import { Services } from "@/components/services";
import { Stats } from "@/components/stats";
import { TestimonialsSlider } from "@/components/testimonials-slider";
import { getHomeCollections } from "@/lib/cms/get-collections";
import { features, siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage(): Promise<ReactNode> {
  const { blogs, teams } = await getHomeCollections();

  return (
    <>
      <main id="main-content" className="flex-1">
        <Hero />
        <FeatureCards />
        <FeatureHighlight />
        <Principles />
        <Stats />
        <Services />
        {features.testimonialsSection && (
          <TestimonialsSlider members={teams} />
        )}
        <Pricing />
        <FAQ />
        {features.blogSection && <BlogShowcase articles={blogs} />}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
