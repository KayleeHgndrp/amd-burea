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
    question: "How do I open a Finaro account?",
    answer:
      "Opening an account takes just a few minutes. Download our app or sign up on our website, verify your identity with a valid ID, and you're ready to go. No minimum deposit required.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees, ever. We're transparent about our pricing—free personal accounts, no monthly maintenance fees, and real exchange rates for international transfers. You'll always see the exact cost before confirming any transaction.",
  },
  {
    question: "How fast are international transfers?",
    answer:
      "Most international transfers arrive instantly or within minutes. In some cases, depending on the destination country and local banking hours, it may take up to 24 hours. You can track your transfer in real-time through the app.",
  },
  {
    question: "Is my money safe with Finaro?",
    answer:
      "Absolutely. Your deposits are protected up to €100,000 under the European Deposit Insurance Scheme. We use bank-grade encryption, biometric authentication, and 24/7 fraud monitoring to keep your account secure.",
  },
  {
    question: "Can I use Finaro for my business?",
    answer:
      "Yes! We offer dedicated business accounts with features like multi-user access, expense management, corporate cards, invoicing, and integrations with popular accounting software. Business accounts have no monthly fees for startups.",
  },
];

export function FAQ(): ReactNode {
  const items = faqs.map((f) => ({ title: f.question, content: f.answer }));

  return (
    <section className="relative w-full bg-background py-24 sm:py-32 overflow-hidden">
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
              Frequently asked questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-4 text-foreground/60"
            >
              Everything you need to know about Finaro.
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
            <p className="text-foreground/60">Still have questions?</p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:opacity-70 transition-opacity"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}