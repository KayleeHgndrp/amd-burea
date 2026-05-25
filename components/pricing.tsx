"use client";

import { useState, type ReactNode } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type Audience = "zzp" | "mkb";

type PricingPlan = {
  name: string;
  description: string;
  price: { zzp: string; mkb: string };
  features: string[];
  contract: string;
  cta: string;
  featured?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: "Growth",
    description:
      "De basis goed geregeld — voor ondernemers die alles op orde willen zonder gedoe.",
    price: { zzp: "€125", mkb: "€300" },
    features: [
      "Gratis intake",
      "BTW-aangifte",
      "Inkomstenbelasting",
      "Jaarrekening",
      "1× per jaar coachgesprek",
      "E-mailondersteuning",
    ],
    contract: "Minimaal 2 jaar",
    cta: "Kies Growth",
  },
  {
    name: "Pro",
    description:
      "Voor ondernemers die meer hulp en aandacht willen — proactief, niet alleen reactief.",
    price: { zzp: "€175", mkb: "€500" },
    features: [
      "Alles van Growth",
      "2× per jaar coachgesprek",
      "Dossier bijhouden",
      "Wij vragen je bonnen achterna",
      "Extra uitleg waar nodig",
    ],
    contract: "Minimaal 1 jaar",
    cta: "Kies Pro",
    featured: true,
  },
  {
    name: "Premium",
    description:
      "Volledig ontzorgd inclusief strategisch advies — voor groeiende ondernemers en MKB.",
    price: { zzp: "€225", mkb: "vanaf €1.000" },
    features: [
      "Alles van Pro",
      "Kwartaal coachgesprekken",
      "Strategisch meedenken",
      "Bereikbaar buiten kantooruren",
      "Bemiddeling bij geschillen",
      "Analyses en vergelijkingen",
      "Bankkoppeling regelen",
      "Inzicht in dossier 24/7",
    ],
    contract: "Minimaal 1 jaar",
    cta: "Kies Premium",
  },
];

type AddOn = { name: string; price: string };

const addOns: AddOn[] = [
  { name: "Bankkoppeling software", price: "+€20 /maand" },
  { name: "Bereikbaar buiten kantooruren", price: "Op aanvraag" },
  { name: "Extra coach- en adviesgesprekken", price: "Op aanvraag" },
  { name: "Analyses en vergelijkingen", price: "Op aanvraag" },
  { name: "Oude belastingjaren afhandelen", price: "Op opdrachtbasis" },
  { name: "Bezwaarschriften en procederen", price: "Op opdrachtbasis" },
];

function AudienceToggle({
  value,
  onChange,
}: {
  value: Audience;
  onChange: (v: Audience) => void;
}): ReactNode {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-full border border-border">
      {(["zzp", "mkb"] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`px-5 h-9 text-sm font-medium rounded-full transition-colors ${
            value === v
              ? "bg-[#0E1B33] text-white"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          {v === "zzp" ? "ZZP" : "MKB"}
        </button>
      ))}
    </div>
  );
}

function PricingCard({
  plan,
  audience,
  index,
}: {
  plan: PricingPlan;
  audience: Audience;
  index: number;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index, ease }}
      className={`relative flex flex-col p-6 sm:p-8 rounded-2xl bg-background transition-shadow ${
        plan.featured
          ? "border-2 border-[#0E1B33] shadow-2xl ring-1 ring-[#0E1B33]/5"
          : "border border-border shadow-sm hover:shadow-lg"
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0E1B33] text-white text-xs font-medium rounded-full whitespace-nowrap">
          Meest gekozen
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-medium font-display text-foreground">{plan.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2 min-h-[3em]">
          {plan.description}
        </p>
      </div>

      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease }}
            className="flex items-baseline gap-1.5"
          >
            <span className="text-4xl sm:text-5xl font-medium text-foreground font-serif">
              {plan.price[audience]}
            </span>
            <span className="text-sm text-muted-foreground">/maand</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm text-foreground/80"
          >
            <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-[#0E1B33]/10 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-[#0E1B33]" strokeWidth={3} />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`group inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full text-sm font-medium transition-all duration-150 active:scale-[0.97] ${
          plan.featured
            ? "bg-[#0E1B33] text-white hover:opacity-90"
            : "bg-transparent border border-border text-foreground hover:bg-muted"
        }`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </a>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Contract: {plan.contract}
      </p>
    </motion.div>
  );
}

export function Pricing(): ReactNode {
  const [audience, setAudience] = useState<Audience>("zzp");

  return (
    <section className="relative w-full bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-[1.1] text-foreground max-w-2xl"
          >
            Een pakket dat <span className="italic">met je meegroeit</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="mt-4 text-foreground/60 max-w-lg"
          >
            Vaste prijs per maand, geen verrassingen. Kies wat past en schaal mee als je groeit.
          </motion.p>
        </div>

        {/* ZZP / MKB toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="flex justify-center mb-10 sm:mb-14"
        >
          <AudienceToggle value={audience} onChange={setAudience} />
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              audience={audience}
              index={index}
            />
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="border-t border-border pt-12 lg:pt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
            <div>
              <h3 className="text-xl sm:text-2xl font-medium font-serif text-foreground">
                Add-ons
              </h3>
              <p className="mt-3 text-sm text-foreground/60 leading-relaxed max-w-xs">
                Niet inbegrepen in een standaardpakket, maar wel mogelijk — vraag ernaar tijdens je kennismaking.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {addOns.map((addOn) => (
                <div
                  key={addOn.name}
                  className="flex items-center justify-between gap-4 py-3 border-b border-border"
                >
                  <span className="text-sm text-foreground">{addOn.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {addOn.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}