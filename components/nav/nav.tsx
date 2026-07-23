"use client";

import { Logo } from "@/components/nav/logo";
import { Button } from "@/components/ui/button";
import { useIntroDone } from "@/lib/intro";
import { softEase, useReducedMotion } from "@/lib/motion";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const NAV_LINKS = [
  { label: "Over ons", href: "#over-ons" },
  { label: "Artiesten", href: "#artiesten" },
  { label: "Stijlen", href: "#stijlen" },
  { label: "Contact", href: "#contact" },
];

export function Nav(): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const introDone = useIntroDone();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = (): void => setMenuOpen(false);

  return (
    <motion.header
      initial={false}
      animate={
        introDone
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReducedMotion ? 0 : -16 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : introDone
            ? { duration: 0.6, ease: softEase, delay: 0.3 }
            : { duration: 0 }
      }
      style={{ pointerEvents: introDone ? "auto" : "none" }}
      className="border-border/60 bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring text-foreground/75 hover:text-foreground font-heading text-sm font-bold tracking-wide uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="none"
            render={<a href="#contact" />}
            className="hidden h-11 items-center px-6 text-sm hover:opacity-90 md:inline-flex"
          >
            Afspraak maken
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            className="focus-ring text-foreground inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.35, ease: softEase }
            }
            className="border-border/60 bg-background overflow-hidden border-t md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4 sm:px-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="focus-ring text-foreground/80 hover:text-foreground font-heading py-2 text-base font-bold tracking-wide uppercase transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="default"
                size="none"
                render={<a href="#contact" />}
                onClick={closeMenu}
                className="mt-3 inline-flex h-12 items-center justify-center px-6 text-sm"
              >
                Afspraak maken
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
