/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 *
 * Customize your landing page by editing the values below.
 * All text, links, and settings are centralized here for easy editing.
 */

export const siteConfig = {
  name: "Finaro",
  tagline: "Modern Banking for Modern Business",
  description:
    "The financial platform that grows with you. From personal accounts to enterprise solutions, manage your money with confidence.",
  url: "https://finaro.com",
  twitter: "@finaro",

  nav: {
    cta: {
      text: "Get Started",
      href: "#",
    },
    signIn: {
      text: "Sign in",
      href: "#",
    },
  },
} as const;








/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
 *
 * Toggle features on/off without touching component code.
 */
export const features = {
  smoothScroll: true,
  darkMode: false,
  statsSection: true,
  blogSection: true,
  testimonialsSection: true,
} as const;

/**
 * ============================================================================
 * THEME CONFIGURATION
 * ============================================================================
 *
 * Colors are defined in globals.css using CSS custom properties.
 * This config controls which theme features are enabled.
 */
export const themeConfig = {
  defaultTheme: "system" as "light" | "dark" | "system",
  enableSystemTheme: true,
} as const;
