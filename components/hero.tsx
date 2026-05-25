"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { Aurora } from "./aurora";
import { DeadlineCard } from "./deadline-card";

const ease = [0.16, 1, 0.3, 1] as const;

const PHOTO_SRC = "/images/hero-meeting.png";

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────

function Star({
  size = 13,
  color = "#F59E0B",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <polygon points="12 2 15 9 22 9.3 16.5 14 18 21 12 17.3 6 21 7.5 14 2 9.3 9 9 12 2" />
    </svg>
  );
}

function SocialProof(): ReactNode {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2">
        {[11, 13, 25, 32].map((id) => (
          <div
            key={id}
            className="w-9 h-9 rounded-full border-2 border-brand-900 bg-warm-200 bg-cover bg-center ring-1 ring-white/5"
            style={{ backgroundImage: `url(https://i.pravatar.cc/72?img=${id})` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={12} color="#FCD34D" />
          ))}
          <span className="ml-1.5 text-sm text-white font-medium">9.4 / 10</span>
        </div>
        <div className="text-xs text-white/60 mt-0.5">
          2.500+ ZZP&apos;ers gingen je voor
        </div>
      </div>
    </div>
  );
}

function CTAs(): ReactNode {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="/contact"
        className="h-12 px-7 text-sm font-medium bg-white text-brand-900 rounded-full hover:bg-warm-50 active:scale-[0.97] transition-all duration-150 inline-flex items-center justify-center whitespace-nowrap"
      >
        Plan kennismaking
      </a>
      <a
        href="#pakketten"
        className="h-12 px-7 text-sm font-medium border border-white/25 text-white rounded-full hover:bg-white/10 active:scale-[0.97] transition-all duration-150 inline-flex items-center justify-center whitespace-nowrap"
      >
        Bekijk pakketten
      </a>
    </div>
  );
}

function TestimonialCard({ className = "" }: { className?: string }): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay: 1.0, ease }}
      className={`max-w-[280px] bg-white rounded-2xl p-5 shadow-2xl ring-1 ring-black/5 ${className}`}
    >
      <div className="flex items-center gap-0.5 mb-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={13} color="#F59E0B" />
        ))}
      </div>
      <p className="font-serif italic text-brand-900 leading-snug text-[15px]">
        &ldquo;Eindelijk een boekhouder die meedenkt, zonder vakjargon.&rdquo;
      </p>
      <p className="mt-2 text-xs text-brand-900/60">
        Annita Luijdens — Freelance adviseur
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────

export function Hero(): ReactNode {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-brand-900">
      <Aurora interactive className="absolute inset-0" />

      {/* Paper grain voor subtiele warme texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease }}
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white"
            >
              Boekhouding zonder <em>gedoe.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="mt-6 lg:mt-7 text-lg lg:text-xl text-white/75 max-w-md leading-relaxed"
            >
              Voor ZZP&apos;ers die liever ondernemen dan administreren. Vaste
              prijs, eigen boekhouder, klare taal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              className="mt-8 lg:mt-9"
            >
              <CTAs />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease }}
              className="mt-9 lg:mt-10"
            >
              <SocialProof />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[560px] max-lg:max-w-md max-lg:mx-auto"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
              <img
                src={PHOTO_SRC}
                alt="Persoonlijke boekhouder voor ZZP'ers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/45 via-transparent to-transparent" />
            </div>

            <TestimonialCard className="absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-5 lg:-bottom-7 lg:-left-8" />
            <DeadlineCard className="absolute -top-4 -right-3 sm:-top-5 sm:-right-4 lg:-top-5 lg:-right-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}