/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 *
 * Centrale plek voor bedrijfs- en sitegegevens. Pas hier naam, contact en
 * URL aan; componenten en metadata lezen deze waarden.
 */

export const siteConfig = {
  name: "AMD Bureau",
  tagline: "Persoonlijke boekhouder voor ZZP'ers en MKB",
  description:
    "Persoonlijke boekhouder voor ZZP'ers en MKB. Vaste prijs, eigen contactpersoon, klare taal.",
  url: "https://amd-bureau.nl",
  twitter: "@amd-bureau",

  contact: {
    email: "info@amd-bureau.nl",
    kvk: "00000000",
    phone: {
      /** E.164-formaat voor tel:-links */
      tel: "+31201234567",
      /** Weergave op de site */
      display: "020 123 45 67",
    },
    hours: "Ma-Vr, 9:00 tot 17:30",
  },


} as const;

export const contactLinks = {
  tel: `tel:${siteConfig.contact.phone.tel}`,
  mailto: `mailto:${siteConfig.contact.email}`,
} as const;

/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
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
 */
export const themeConfig = {
  defaultTheme: "system" as "light" | "dark" | "system",
  enableSystemTheme: true,
} as const;
