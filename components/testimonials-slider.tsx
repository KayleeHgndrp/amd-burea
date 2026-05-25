"use client";

import { useState, useEffect, useCallback, useRef, useLayoutEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;
const AUTO_SCROLL_INTERVAL = 4000;
const TRANSITION_DURATION = 600;
const CLONE_COUNT = 3;
const GAP_PX = 24;

type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  linkedIn?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "CFO",
    company: "TechFlow Inc",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    linkedIn: "#",
  },
  {
    name: "Marcus Chen",
    role: "Head of Finance",
    company: "Nexus Ventures",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    linkedIn: "#",
  },
  {
    name: "Emily Rodriguez",
    role: "Treasury Director",
    company: "Global Dynamics",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    linkedIn: "#",
  },
  {
    name: "James Wright",
    role: "VP of Operations",
    company: "Summit Capital",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    linkedIn: "#",
  },
  {
    name: "Alexandra Kim",
    role: "Finance Manager",
    company: "Horizon Labs",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
    linkedIn: "#",
  },
];

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visibleCount;
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4 fill-foreground/60" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function TestimonialsSlider(): ReactNode {
  const visibleCount = useVisibleCount();
  const itemCount = testimonials.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const extendedTestimonials = [
    ...testimonials.slice(-CLONE_COUNT),
    ...testimonials,
    ...testimonials.slice(0, CLONE_COUNT),
  ];

  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [isPaused, setIsPaused] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const isResettingRef = useRef(false);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevVisibleCountRef = useRef(visibleCount);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useLayoutEffect(() => {
    if (prevVisibleCountRef.current !== visibleCount) {
      prevVisibleCountRef.current = visibleCount;
      queueMicrotask(() => {
        setEnableTransition(false);
        setCurrentIndex(CLONE_COUNT);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setEnableTransition(true));
        });
      });
    }
  }, [visibleCount]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimeoutRef.current) clearInterval(autoPlayTimeoutRef.current);
    if (!isPaused) {
      autoPlayTimeoutRef.current = setInterval(() => {
        if (!isResettingRef.current) {
          setEnableTransition(true);
          setCurrentIndex((prev) => prev + 1);
        }
      }, AUTO_SCROLL_INTERVAL);
    }
  }, [isPaused]);

  const goToNext = useCallback(() => {
    if (isResettingRef.current) return;
    setEnableTransition(true);
    setCurrentIndex((prev) => prev + 1);
    resetAutoPlay();
  }, [resetAutoPlay]);

  const goToPrev = useCallback(() => {
    if (isResettingRef.current) return;
    setEnableTransition(true);
    setCurrentIndex((prev) => prev - 1);
    resetAutoPlay();
  }, [resetAutoPlay]);

  useEffect(() => {
    const minIndex = CLONE_COUNT;
    const maxIndex = CLONE_COUNT + itemCount - 1;

    if (currentIndex > maxIndex || currentIndex < minIndex) {
      isResettingRef.current = true;
      setTimeout(() => {
        setEnableTransition(false);
        setCurrentIndex(currentIndex > maxIndex ? minIndex : maxIndex);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isResettingRef.current = false;
          });
        });
      }, TRANSITION_DURATION);
    }
  }, [currentIndex, itemCount]);

  useEffect(() => {
    if (isPaused) {
      if (autoPlayTimeoutRef.current) {
        clearInterval(autoPlayTimeoutRef.current);
        autoPlayTimeoutRef.current = null;
      }
      return;
    }

    autoPlayTimeoutRef.current = setInterval(() => {
      if (!isResettingRef.current) {
        setEnableTransition(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoPlayTimeoutRef.current) clearInterval(autoPlayTimeoutRef.current);
    };
  }, [isPaused]);

  const totalGapPx = GAP_PX * (visibleCount - 1);
  const cardWidthPx = containerWidth > 0 ? (containerWidth - totalGapPx) / visibleCount : 0;
  const cardWidth = cardWidthPx > 0 ? `${cardWidthPx}px` : `calc((100% - ${totalGapPx}px) / ${visibleCount})`;

  const offsetPx = containerWidth > 0
    ? (containerWidth / 2) - (cardWidthPx / 2) - (currentIndex * (cardWidthPx + GAP_PX))
    : 0;
  const transform = containerWidth > 0 ? `translateX(${offsetPx}px)` : "translateX(0)";

  const maskStyle = visibleCount === 1
    ? { maskImage: "none", WebkitMaskImage: "none" }
    : {
        maskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
      };

  return (
    <section
      className="relative w-full bg-background py-24 sm:py-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-270 px-6 sm:px-8">
        <div className="px-4 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground text-center mb-16"
          >
            Maak kennis met ons team
          </motion.h2>

          <div className="relative">
            <div ref={containerRef} className="overflow-hidden" style={maskStyle}>
              <div
                className="flex gap-6"
                style={{
                  transform,
                  transition: enableTransition ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
                  willChange: "transform",
                }}
              >
                {extendedTestimonials.map((testimonial, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={`${testimonial.name}-${index}`}
                      className="shrink-0 transition-all duration-500"
                      style={{
                        width: cardWidth,
                        filter: isActive ? "grayscale(0)" : "grayscale(1)",
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      <div className="group">
                        <div className="relative aspect-4/5 overflow-hidden bg-muted rounded-sm mb-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-foreground">{testimonial.name}</h3>
                            <p className="text-sm text-foreground/60 mt-1">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                          {testimonial.linkedIn && (
                            <a
                              href={testimonial.linkedIn}
                              className="shrink-0 p-2 border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors"
                              aria-label={`${testimonial.name}'s LinkedIn`}
                            >
                              <LinkedInIcon />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            <button
              type="button"
              onClick={goToPrev}
              className="w-12 h-12 flex items-center justify-center bg-foreground rounded-full hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-background" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="w-12 h-12 flex items-center justify-center bg-foreground rounded-full hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-background" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
