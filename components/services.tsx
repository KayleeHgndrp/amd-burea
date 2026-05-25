"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Accordion } from "@/components/accordion";

const ease = [0.16, 1, 0.3, 1] as const;

type Service = {
  name: string;
  description: string;
};

const services: Service[] = [
  {
    name: "BTW-aangifte",
    description:
      "Elk kwartaal verwerken en indienen. Wij bewaken de deadlines van de Belastingdienst, jij krijgt een seintje als er iets van je nodig is.",
  },
  {
    name: "Inkomstenbelasting",
    description:
      "Je jaarlijkse IB-aangifte volledig voorbereid en ingediend. Inclusief alle aftrekposten waar je recht op hebt, geen geld onnodig laten liggen.",
  },
  {
    name: "Jaarrekening",
    description:
      "Een jaarrekening volgens alle eisen, plus een gesprek waarin we uitleggen wat je cijfers betekenen. Geen lijst getallen, maar inzicht.",
  },
  {
    name: "Coaching en advies",
    description:
      "Persoonlijke gesprekken over je cijfers, plannen en twijfels. Van eens per jaar tot elk kwartaal, afhankelijk van je pakket.",
  },
  {
    name: "Strategisch meedenken",
    description:
      "Bij grote keuzes zoals een investering, BV-omzetting of samenwerking rekenen we met je mee. Wat betekent het fiscaal, wat is verstandig, wat zijn de risico's?",
  },
  {
    name: "Bankkoppeling en automatisering",
    description:
      "Transacties die automatisch in je boekhouding belanden. Wij regelen de koppeling met je bank en de software-opzet, jij hoeft niets meer over te tikken.",
  },
  {
    name: "Subsidies en regelingen",
    description:
      "Welke fiscale regelingen kun je toepassen? Welke subsidies passen bij je sector? We zoeken het uit, controleren of je in aanmerking komt, en helpen met de aanvraag.",
  },
  {
    name: "Bezwaar en bemiddeling",
    description:
      "Niet eens met een aanslag van de Belastingdienst? In conflict met een leverancier of opdrachtgever? Op opdrachtbasis vechten we het uit of bemiddelen we.",
  },
];

export function Services(): ReactNode {
  const items = services.map((s) => ({ title: s.name, content: s.description }));

  return (
    <section id="diensten" className="relative w-full bg-background py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT — heading + intro + CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground"
            >
              Onze diensten
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-6 space-y-4 text-foreground/70 leading-relaxed max-w-md"
            >
              <p>
                Bij ons ben je geen klantnummer. Je krijgt één vaste contactpersoon die jouw zaken kent, niet alleen je cijfers, maar ook je plannen en twijfels.
              </p>
              <p>
                Onze pakketten dekken de basis. Voor grote keuzes, regelingen of een geschil staan we er met je naast. Een overzicht van wat we leveren hieronder.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#pakketten"
                className="inline-flex items-center gap-2 h-12 px-7 text-sm font-medium bg-[#0E1B33] text-white rounded-full hover:opacity-90 active:scale-[0.97] transition-all duration-150 whitespace-nowrap group"
              >
                Bekijk pakketten
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium border border-border text-foreground rounded-full hover:bg-muted active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
              >
                Plan kennismaking
              </a>
            </motion.div>
          </div>

          {/* RIGHT — accordion list */}
          <div className="lg:pt-2">
            <Accordion baseId="services" items={items} />
          </div>

        </div>
      </div>
    </section>
  );
}