"use client";

import { type ReactNode } from "react";
import {
  Sparkles,
  Landmark,
  CreditCard,
  BarChart3,
  ArrowRight,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type PrincipleCard = {
  icon: ReactNode;
  label: string;
};

const principles: PrincipleCard[] = [
  {
    icon: <Landmark className="w-12 h-12" strokeWidth={1} />,
    label: "Vaste prijs, geen verrassingen",
  },
  {
    icon: <Shield className="w-12 h-12" strokeWidth={1} />,
    label: "Persoonlijk, je bent geen nummer",
  },
  {
    icon: <CreditCard className="w-12 h-12" strokeWidth={1} />,
    label: "Op werkdagen binnen 24 uur antwoord",
  },
  {
    icon: <BarChart3 className="w-12 h-12" strokeWidth={1} />,
    label: "We nemen je problemen uit handen",
  },
];

export function Principles(): ReactNode {
  return (
    <section className="relative w-full bg-muted text-foreground py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Waarom AMD Bureau?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight"
            >
              Boekhouding zoals{" "}
              <span className="italic">het hoort.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-6 text-foreground/70 leading-relaxed max-w-lg"
            >
              We zijn opgericht door en voor ondernemers. Geen ingewikkeld jargon, geen anonieme tickets, gewoon vakwerk met een menselijk gezicht.
            </motion.p>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium w-fit hover:bg-foreground/90 transition-colors"
            >
              Plan een afspraak
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-2 max-w-md lg:ml-auto">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease }}
                className="aspect-square flex flex-col items-center justify-center bg-foreground/5 rounded-sm"
              >
                <div className="mb-4 text-foreground/80">{principle.icon}</div>
                <p className="text-sm text-center text-foreground/80 px-4">
                  {principle.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
