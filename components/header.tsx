"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { siteConfig } from "@/lib/config";

type NavItem = {
  label: string;
  href: string;
};

const navLinks: NavItem[] = [
  { label: "Diensten", href: "/#diensten" },
  { label: "Pakketten", href: "/#pakketten" },
  { label: "Veelgestelde vragen", href: "/#veelgestelde-vragen" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const ease = [0.23, 1, 0.32, 1] as const;

function HamburgerIcon({
  isOpen,
  color = "white",
}: {
  isOpen: boolean;
  color?: string;
}): ReactNode {
  return (
    <div className="w-6 h-4 relative flex flex-col justify-between cursor-pointer">
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full"
        style={{ backgroundColor: color }}
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease }}
      />
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full"
        style={{ backgroundColor: color }}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full"
        style={{ backgroundColor: color }}
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease }}
      />
    </div>
  );
}

export function Header(): ReactNode {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top blur gradient for legibility over the hero */}
      <div
        className="fixed top-0 left-0 w-full h-25 z-1001 pointer-events-none"
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          maskImage: "linear-gradient(black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(black 0%, black 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Desktop */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-1003 mix-blend-exclusion">
        <div className="mx-auto flex h-20 w-full items-center justify-between px-6 sm:px-8">
          <motion.a
            href="/"
            className="flex items-center gap-2"
            aria-label={`${siteConfig.name} home`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <div
              className="w-6 h-6 rounded-full bg-white"
              aria-hidden="true"
            />
            <span className="text-lg font-semibold text-white">{siteConfig.name}</span>
          </motion.a>

          <motion.nav
            className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold tracking-tight text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <a
              href="/contact"
              className="px-5 py-2.5 text-sm font-semibold tracking-tighter text-black bg-white rounded-full hover:bg-white/90 transition-colors"
            >
              Plan kennismaking
            </a>
          </motion.div>
        </div>
      </header>

      {/* Mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-1003 mix-blend-exclusion">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-6 sm:px-8">
          <motion.a
            href="/"
            className="flex items-center gap-2"
            aria-label={`${siteConfig.name} home`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <div
              className="w-6 h-6 rounded-full bg-white"
              aria-hidden="true"
            />
            <span className="text-lg font-semibold text-white">{siteConfig.name}</span>
          </motion.a>
          <motion.button
            className="p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Sluit menu" : "Open menu"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            <HamburgerIcon isOpen={false} color="white" />
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-0 left-0 right-0 z-1004 bg-background min-h-screen"
          >
            <div className="flex h-16 w-full items-center justify-between px-6 sm:px-8">
              <a
                href="/"
                className="flex items-center gap-2"
                aria-label={`${siteConfig.name} home`}
                onClick={closeMobileMenu}
              >
                <div
                  className="w-6 h-6 rounded-full bg-foreground"
                  aria-hidden="true"
                />
                <span className="text-lg font-semibold text-foreground">
                  {siteConfig.name}
                </span>
              </a>
              <button
                className="p-2 -mr-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Sluit menu"
              >
                <HamburgerIcon isOpen={true} color="currentColor" />
              </button>
            </div>

            <nav
              className="px-6 py-4 overflow-y-auto max-h-[calc(100vh-4rem)]"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-4 text-base font-medium text-foreground border-b border-border"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              ))}

              <div className="flex flex-col gap-3 pt-6">
                <a
                  href="/contact"
                  className="w-full py-3 text-center text-sm font-medium tracking-tight text-background bg-foreground rounded-full hover:bg-foreground/90 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Plan kennismaking
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}