"use client";

import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;

export type AccordionItemData = {
  title: string;
  content: ReactNode;
};

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
  baseId,
}: {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  baseId: string;
}): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const contentId = `${baseId}-content-${index}`;
  const buttonId = `${baseId}-button-${index}`;

  return (
    <div className="border-b border-foreground/10">
      <button
        type="button"
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <span className="text-base sm:text-lg font-medium text-foreground pr-8">
          {item.title}
        </span>
        <div className="shrink-0 w-6 h-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.2, ease }
            }
          >
            <Plus
              className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        className={
          prefersReducedMotion
            ? isOpen
              ? "block"
              : "hidden"
            : "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        }
        style={
          prefersReducedMotion
            ? undefined
            : { gridTemplateRows: isOpen ? "1fr" : "0fr" }
        }
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-foreground/60 leading-relaxed max-w-2xl">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  baseId = "accordion",
  defaultOpenIndex = null,
}: {
  items: AccordionItemData[];
  baseId?: string;
  defaultOpenIndex?: number | null;
}): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="border-t border-foreground/10">
      {items.map((item, index) => (
        <AccordionItem
          key={`${baseId}-${index}-${item.title}`}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          index={index}
          baseId={baseId}
        />
      ))}
    </div>
  );
}
