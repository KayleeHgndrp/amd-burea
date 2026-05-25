"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const DUTCH_MONTHS_SHORT = [
  "jan", "feb", "mrt", "apr", "mei", "jun",
  "jul", "aug", "sep", "okt", "nov", "dec",
] as const;

type BtwDeadline = {
  quarter: 1 | 2 | 3 | 4;
  date: Date;
  label: string;
};

/**
 * Next Dutch BTW kwartaalaangifte deadline (Belastingdienst):
 *   Q1 (jan-mrt) → 30 apr
 *   Q2 (apr-jun) → 31 jul
 *   Q3 (jul-sep) → 31 okt
 *   Q4 (okt-dec) → 31 jan (volgend jaar)
 *
 * Year-agnostic — blijft kloppen in 2027, 2028, etc. Op de deadline-dag zelf
 * laat 'ie 'm nog steeds zien (je hebt tot eind van die dag). Dag erna rolt
 * 'ie door naar het volgende kwartaal.
 */
function getNextBtwDeadline(today: Date = new Date()): BtwDeadline {
  const year = today.getFullYear();
  const todayMidnight = new Date(year, today.getMonth(), today.getDate());

  const candidates: { quarter: 1 | 2 | 3 | 4; date: Date }[] = [
    { quarter: 4, date: new Date(year, 0, 31) },       // jan 31 — Q4 van vorig jaar
    { quarter: 1, date: new Date(year, 3, 30) },       // apr 30
    { quarter: 2, date: new Date(year, 6, 31) },       // jul 31
    { quarter: 3, date: new Date(year, 9, 31) },       // okt 31
    { quarter: 4, date: new Date(year + 1, 0, 31) },   // jan 31 — Q4 van huidig jaar
  ];

  const next =
    candidates.find((c) => c.date >= todayMidnight) ??
    candidates[candidates.length - 1] as BtwDeadline;

  return {
    quarter: next.quarter,
    date: next.date,
    label: `${next.date.getDate()} ${DUTCH_MONTHS_SHORT[next.date.getMonth()]}`,
  };
}

type DeadlineCardProps = {
  className?: string;
};

export function DeadlineCard({ className = "" }: DeadlineCardProps): ReactNode {
  const [deadline, setDeadline] = useState<BtwDeadline>(() =>
    getNextBtwDeadline()
  );

  // Recompute op client-mount: SSR (server timezone, meestal UTC) en client
  // (browser timezone, NL) kunnen rond middernacht een dag schelen.
  useEffect(() => {
    setDeadline(getNextBtwDeadline());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16, y: -8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease }}
      className={`bg-brand-900/95 backdrop-blur-md text-white rounded-2xl px-4 py-3 shadow-xl border border-white/10 ${className}`}
    >
      <div className="text-xs font-display font-medium  text-white/55 font-medium">
        Volgende deadline
      </div>
      <div className="font-serif text-lg mt-0.5" suppressHydrationWarning>
        BTW Q{deadline.quarter} · {deadline.label}
      </div>
    </motion.div>
  );
}