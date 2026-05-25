"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Aurora } from "./aurora";
import { contactLinks, siteConfig } from "@/lib/config";

const ease = [0.16, 1, 0.3, 1] as const;

export function FinalCTA(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden bg-brand-900 py-24 sm:py-32 lg:py-40">
      <Aurora className="absolute inset-0" />

      {/* Paper grain — zelfde als Hero */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay z-0"
      >
        <filter id="cta-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      <div className="relative z-10 mx-auto px-6 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight text-white"
        >
          Klaar om je boekhouding
          <br />
          <em>los te laten?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-6 text-lg lg:text-xl text-white/75 max-w-md mx-auto leading-relaxed"
        >
          We regelen de overstap, jij merkt er niks van. Plan een gratis
          kennismaking, dan kijken we wat past.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium bg-background text-foreground rounded-full hover:bg-background/90 transition-colors"
          >
            Plan kennismaking
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={contactLinks.tel}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium border border-white/25 text-white rounded-full hover:bg-white/10 active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
          >
            Bel direct op {siteConfig.contact.phone.display}
          </a>
        </motion.div>
      </div>
    </section>
  );
}