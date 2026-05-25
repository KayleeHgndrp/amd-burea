"use client";

import { type ReactNode } from "react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Personal", href: "#personal" },
      { label: "Business", href: "#business" },
      { label: "Cards", href: "#cards" },
      { label: "Transfers", href: "#transfers" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
      { label: "Security", href: "#security" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Developer API", href: "#api" },
      { label: "Blog", href: "#blog" },
      { label: "Community", href: "#community" },
    ],
  },
};

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
];

export function Footer(): ReactNode {
  return (
    <footer className="relative w-full bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 pointer-events-none">
        <div className="relative w-full max-w-270 h-full">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-foreground/10" />
          <div className="absolute left-0 top-full w-px bg-foreground/10 h-screen" />
          <div className="absolute right-0 top-full w-px bg-foreground/10 h-screen" />
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 sm:px-8 pt-16">
        <div className="relative w-full max-w-270">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/10" />
          <div className="absolute bottom-0 right-full h-px bg-foreground/10 w-screen" />
          <div className="absolute bottom-0 left-full h-px bg-foreground/10 w-screen" />
          <div className="absolute -left-0.75 -bottom-0.75 w-1.5 h-1.5 bg-foreground" />
          <div className="absolute -right-0.75 -bottom-0.75 w-1.5 h-1.5 bg-foreground" />
          <div className="relative w-full px-8 sm:px-12 py-12">
            <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
              <div className="lg:max-w-xs">
                <a href="#" className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-foreground" />
                  <span className="text-lg font-semibold text-foreground">
                    AMD Bureau
                  </span>
                </a>
                <p className="mt-4 text-sm text-foreground/50 max-w-xs">
                  © 2026 AMD Bureau.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
                {Object.values(footerLinks).map((section) => (
                  <div key={section.title}>
                    <h3 className="text-xs font-medium uppercase tracking-wider text-foreground/40 mb-5">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 sm:px-8 pb-12">
        <div className="relative w-full max-w-270">
          <div className="pt-8 px-8 sm:px-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <a
                href="#"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Contact us
              </a>
              <div className="flex flex-wrap gap-6">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
