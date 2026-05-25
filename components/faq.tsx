"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Accordion } from "@/components/accordion";

const ease = [0.16, 1, 0.3, 1] as const;

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Hoe werkt een gratis kennismaking?",
    answer:
      "In een gesprek van ongeveer 45 minuten kijken we naar je huidige situatie, je vragen en wat je nodig hebt. Geen verkoopgesprek, wel een eerlijke check of we bij elkaar passen. Vrijblijvend en zonder verplichtingen.",
  },
  {
    question: "Wat kost het en zitten er verborgen kosten in?",
    answer:
      "Je betaalt een vast bedrag per maand, gebaseerd op het pakket dat past bij je situatie. Geen uurtje-factuurtje, geen verrassingen op je rekening. Bekijk de pakketten voor exacte prijzen, of vraag een offerte aan als je iets specifieks nodig hebt.",
  },
  {
    question: "Kan ik overstappen vanuit een andere boekhouder?",
    answer:
      "Ja, en wij regelen het. We nemen contact op met je huidige boekhouder, halen je dossier op en zetten je administratie over zonder dat jij iets hoeft te doen. Meestal binnen twee weken rond.",
  },
  {
    question: "Welk boekhoudprogramma gebruiken jullie?",
    answer:
      "We werken met de bekende programma's zoals Moneybird, e-Boekhouden en Tellow. Gebruik je al iets, dan sluiten we daarop aan. Voor nieuwe klanten adviseren we wat het beste past bij jouw situatie en sector.",
  },
  {
    question: "Hoe lang is het contract en kan ik opzeggen?",
    answer:
      "Growth heeft een minimum looptijd van 2 jaar, Pro en Premium 1 jaar. We werken met vaste contracten omdat we tijd investeren in het echt leren kennen van jouw dossier. Na de minimumperiode geldt een opzegtermijn van één maand.",
  },
  {
    question: "Wat als ik tussentijds een vraag heb?",
    answer:
      "Mail of bel je vaste contactpersoon. In Growth krijg je per e-mail antwoord binnen 24 uur. In Pro en Premium kun je ook bellen, en in Premium ben je ook buiten kantooruren welkom.",
  },
  {
    question: "Voor welke ondernemers zijn jullie er?",
    answer:
      "ZZP'ers, eenmanszaken, VOF's en BV's tot ongeveer 20 medewerkers. Of je net begint of al jaren onderneemt, in de kennismaking kijken we samen welk pakket past. Voor zeer specifieke sectoren of internationale constructies overleggen we eerst of het matcht.",
  },
];

export function FAQ(): ReactNode {
  const items = faqs.map((f) => ({ title: f.question, content: f.answer }));

  return (
    <section id="veelgestelde-vragen" className="relative w-full bg-background py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-0 xl:px-12">
        <div className="px-8 sm:px-12">
          <div className="max-w-2xl mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground"
            >
              Veelgestelde vragen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-4 text-foreground/60"
            >
              De vragen die we het vaakst krijgen voor en tijdens een samenwerking.
            </motion.p>
          </div>

          <Accordion baseId="faq" items={items} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <p className="text-foreground/60">Staat je vraag er niet bij?</p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:opacity-70 transition-opacity"
            >
              Neem contact op
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}