"use client";

import { SectionHeading } from "@/components/section-heading";
import { softEase, useReducedMotion } from "@/lib/motion";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

type QA = {
  question: string;
  answer: string;
};

const FAQS: QA[] = [
  {
    question: "What is Cortex?",
    answer:
      "Cortex is a mobile app that generates hyperrealistic photos and video from a written description. It runs the full loop on your phone: describe a shot, get a set of takes, and keep the frames that pass review.",
  },
  {
    question: "What does the review pass actually do?",
    answer:
      "Every generation is checked before it reaches your library — geometry, hands, eyes, text, and texture are inspected at full zoom. Frames that would fall apart under a close look are rejected and rerun. You see fewer results than other apps show you, and that is the point.",
  },
  {
    question: "Do I own what I generate?",
    answer:
      "Yes. Every frame and clip you keep is yours to use anywhere — personal, client, or commercial work. Cortex never resells or trains on your private generations.",
  },
  {
    question: "Can it generate real people?",
    answer:
      "Only with consent. You can build a likeness from your own face or from someone who has approved it inside the app. Prompts that target public figures or unconsented likenesses are declined at review.",
  },
  {
    question: "Which phones does it run on?",
    answer:
      "Cortex runs on iOS 17 or later and Android 13 or later. Generation happens in the cloud, so older devices work fine — you just need a connection.",
  },
  {
    question: "How long can the videos be?",
    answer:
      "Free plans render clips up to 10 seconds, Pro up to 30, and Studio up to 60. Every clip is reviewed frame by frame, the same as stills.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from the app in two taps. Your plan stays active until the end of the billing period, and everything you generated stays in your camera roll.",
  },
];

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: QA;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-border border-t last:border-b">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="focus-ring flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="text-foreground text-base font-medium tracking-tight sm:text-lg">
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.3, ease: softEase }
            }
            className="text-muted-foreground shrink-0"
          >
            <Plus className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.4, ease: softEase }
            }
            className="overflow-hidden"
          >
            <p className="text-muted-foreground max-w-2xl pb-7 text-sm leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          title="Fair questions, straight answers"
          description={
            <>
              Anything else, write to{" "}
              <a
                href="mailto:hello@example.com"
                className="focus-ring text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                hello@example.com
              </a>
              . A person reads every single message.
            </>
          }
        />

        <div>
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
