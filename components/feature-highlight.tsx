"use client";

import { type ReactNode } from "react";
import { TrendingUp, MessageSquare, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "Eén vast aanspreekpunt",
  },
  {
    icon: <TrendingUp className="w-4 h-4" />,
    text: "Duidelijk advies in begrijpelijke taal",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    text: "Altijd inzicht in jouw cijfers",
  },
];

const badges = [
  "Altijd up-to-date wet- en regelgeving",
  "Gecertificeerd boekhouder",
  "20 jaar ervaring met ZZP, MKB en BV's",
];

function RightImage(): ReactNode {
  return (
    <div className="absolute inset-0 rounded-md border border-accent/10 overflow-hidden">
      <Image
        src="/images/test.png"
        alt="Persoonlijke boekhouder"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

export function FeatureHighlight(): ReactNode {
  return (
    <section className="relative w-full bg-background pb-24 sm:pb-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground"
            >
              Jouw <span className="italic">persoonlijke</span>
              <br />
              boekhouder
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-6 text-foreground/70 leading-relaxed max-w-lg"
            >
              Geen wachtrijen. Geen ingewikkeld vakjargon. Geen anoniem
              accountantskantoor. Bij AMD Bureau krijg je één vaste adviseur die
              jouw onderneming kent. Iemand die bereikbaar is, met je meedenkt en
              complexe financiële vraagstukken vertaalt naar duidelijke
              oplossingen.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-8 space-y-4"
            >
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-foreground/60">
                    {feature.icon}
                  </span>
                  <span className="text-foreground/80">{feature.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium w-fit hover:bg-foreground/90 transition-colors"
            >
              Plan een kennismaking
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs text-foreground/70"
                >
                  {badge}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative w-full h-full min-h-[360px] sm:min-h-[420px]"
          >
            <RightImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
