"use client";

import { type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type Feature = {
  title: string;
  description: string;
  href: string;
  visual: "comparison" | "deadlines" | "advies";
};

const features: Feature[] = [
  {
    title: "Je boekhouding altijd op orde.",
    description:
      "Facturen, bonnen en banktransacties verwerken wij. Je administratie loopt op de achtergrond, zonder dat jij er omkijken naar hebt.",
    href: "#boekhouding",
    visual: "comparison",
  },
  {
    title: "Aangiften op tijd ingediend.",
    description:
      "BTW elk kwartaal, IB aan het eind van het jaar. Wij bewaken de deadlines en regelen het. Jij ondertekent met één klik.",
    href: "#aangiften",
    visual: "deadlines",
  },
  {
    title: "Een sparringspartner, geen verwerker.",
    description:
      "Vragen over tarieven, aftrekposten of bedrijfsvorm? Bel of mail je vaste contactpersoon. Reactie binnen 24 uur, altijd in begrijpelijke taal.",
    href: "#advies",
    visual: "advies",
  },
];

function ComparisonVisual(): ReactNode {
  const rows = [
    { name: "Met ons", time: "0u/mnd", risk: "0%", highlight: true },
    { name: "Boekhoudtool", time: "3u/mnd", risk: "Eigen risico", highlight: false },
    { name: "Zelf doen", time: "8u/mnd", risk: "Hoog", highlight: false },
  ];

  return (
    <div className="w-full h-full flex items-end justify-center p-6">
      <div className="w-full max-w-xs">
        <div className="grid grid-cols-3 text-xs text-muted-foreground pb-2 border-b border-border">
          <div />
          <div className="text-center">Tijd/mnd</div>
          <div className="text-center">Foutmarge</div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1, ease }}
            className={`grid grid-cols-3 py-3 text-sm ${
              i < rows.length - 1 ? "border-b border-border" : ""
            } ${row.highlight ? "" : "text-muted-foreground"}`}
          >
            <div className={row.highlight ? "flex items-center gap-2" : ""}>
              {row.highlight && <div className="w-4 h-4 rounded-full bg-foreground" />}
              <span className={row.highlight ? "text-foreground font-medium" : ""}>
                {row.name}
              </span>
            </div>
            <div className={`text-center ${row.highlight ? "text-accent" : ""}`}>
              {row.time}
            </div>
            <div className={`text-center ${row.highlight ? "text-accent" : ""}`}>
              {row.risk}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DeadlinesVisual(): ReactNode {
  const items = [
    { label: "BTW Q4 2025", date: "31 jan", status: "done" as const },
    { label: "IB 2025", date: "28 feb", status: "done" as const },
    { label: "BTW Q1 2026", date: "30 apr", status: "done" as const },
    { label: "BTW Q2 2026", date: "31 jul", status: "next" as const },
    { label: "BTW Q3 2026", date: "31 okt", status: "upcoming" as const },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <div className="text-xs text-muted-foreground mb-3">Belastingjaar 2026</div>
        <div className="flex flex-col gap-1.5">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08, ease }}
              className={`flex items-center justify-between text-sm py-1 ${
                item.status === "upcoming" ? "text-muted-foreground/60" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {item.status === "done" && (
                  <div className="shrink-0 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-background" strokeWidth={3} />
                  </div>
                )}
                {item.status === "next" && (
                  <div className="shrink-0 w-4 h-4 rounded-full bg-accent flex items-center justify-center ring-4 ring-accent/15">
                    <div className="w-1.5 h-1.5 rounded-full bg-background" />
                  </div>
                )}
                {item.status === "upcoming" && (
                  <div className="shrink-0 w-4 h-4 rounded-full border border-border" />
                )}
                <span
                  className={
                    item.status === "next"
                      ? "text-foreground font-medium truncate"
                      : "truncate"
                  }
                >
                  {item.label}
                </span>
              </div>
              <div
                className={`text-xs shrink-0 ml-2 ${
                  item.status === "next" ? "text-accent font-medium" : "text-muted-foreground"
                }`}
              >
                {item.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdviesVisual(): ReactNode {
  const messages = [
    { from: "you" as const, text: "Kan ik mijn iPad aftrekken?" },
    { from: "boekhouder" as const, text: "Ja, mits ≥10% zakelijk. Boek 'm op 'Gereedschap'." },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col gap-2">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.2, ease }}
            className={`flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm leading-snug ${
                msg.from === "you"
                  ? "bg-foreground text-background rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md border border-border"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6, ease }}
          className="flex items-center gap-2 mt-2 text-xs text-muted-foreground"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Reactie in 1u 12m · vanochtend
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ card, index }: { card: Feature; index: number }): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="group flex flex-col bg-muted/50 border border-border rounded-2xl overflow-hidden hover:border-foreground/20 hover:shadow-lg transition-[border-color,box-shadow]"
    >
      <div className="relative h-56 sm:h-64 bg-background">
        {card.visual === "comparison" && <ComparisonVisual />}
        {card.visual === "deadlines" && <DeadlinesVisual />}
        {card.visual === "advies" && <AdviesVisual />}
      </div>
      <div className="flex flex-col p-6">
        <h3 className="text-lg font-medium font-display text-foreground">
          {card.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {card.description}
        </p>
       
      </div>
    </motion.div>
  );
}

export function FeatureCards(): ReactNode {
  return (
    <section className="relative w-full bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-foreground max-w-2xl leading-[1.1]"
          >
            Eén kantoor voor
            <br />
            <span className="italic">al je administratie en advies</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((card, index) => (
            <FeatureCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}