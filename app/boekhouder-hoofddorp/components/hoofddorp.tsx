"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeEuro,
  Clock,
  Coffee,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Accordion } from "@/components/accordion";
import { Aurora } from "@/components/aurora";
import { contactLinks, siteConfig } from "@/lib/config";
import { hoofddorpFaqs } from "../faq-data";

const ease = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────

function Star({
  size = 13,
  color = "#F59E0B",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <polygon points="12 2 15 9 22 9.3 16.5 14 18 21 12 17.3 6 21 7.5 14 2 9.3 9 9 12 2" />
    </svg>
  );
}

function SocialProof(): ReactNode {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex -space-x-2">
        {[11, 13, 25, 32].map((id) => (
          <div
            key={id}
            className="w-9 h-9 rounded-full border-2 border-brand-900 bg-warm-200 bg-cover bg-center ring-1 ring-white/5"
            style={{ backgroundImage: `url(https://i.pravatar.cc/72?img=${id})` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="text-left">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={12} color="#FCD34D" />
          ))}
          <span className="ml-1.5 text-sm text-white font-medium">9.4 / 10</span>
        </div>
        <div className="text-xs text-white/60 mt-0.5">
          50+ ondernemers gingen je voor
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────

function HoofddorpHero(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden bg-brand-900 pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28">
      <Aurora className="absolute inset-0" />

      {/* Paper grain — zelfde als Hero */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay z-0"
      >
        <filter id="hoofddorp-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hoofddorp-grain)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="inline-flex items-center gap-2 text-sm text-white/70 mb-6"
        >
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span>
            {siteConfig.street}, {siteConfig.city}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight text-white"
        >
          Jouw boekhouder in Hoofddorp
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mt-6 text-lg lg:text-xl text-white/75 max-w-xl mx-auto leading-relaxed"
        >
          AMD Bureau is het boekhoudkantoor voor ZZP&apos;ers en MKB in
          Hoofddorp en de Haarlemmermeer. Vaste prijs per maand, een vast
          aanspreekpunt en altijd antwoord in klare taal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium bg-white text-brand-900 rounded-full hover:bg-warm-50 active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
          >
            Plan gratis kennismaking
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={contactLinks.tel}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium border border-white/25 text-white rounded-full hover:bg-white/10 active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
          >
            Bel direct op {siteConfig.contact.phone.display}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease }}
          className="mt-10"
        >
          <SocialProof />
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Waarom lokaal
// ─────────────────────────────────────────────────────────────────────

type LocalCard = {
  icon: ReactNode;
  label: string;
};

const localCards: LocalCard[] = [
  {
    icon: <MapPin className="w-12 h-12" strokeWidth={1} />,
    label: `Kantoor aan de ${siteConfig.street}`,
  },
  {
    icon: <Coffee className="w-12 h-12" strokeWidth={1} />,
    label: "Loop binnen voor een kop koffie",
  },
  {
    icon: <Clock className="w-12 h-12" strokeWidth={1} />,
    label: "Op werkdagen binnen 24 uur antwoord",
  },
  {
    icon: <BadgeEuro className="w-12 h-12" strokeWidth={1} />,
    label: "Vaste prijs, geen verrassingen",
  },
];

function WhyLocal(): ReactNode {
  return (
    <section className="relative w-full bg-background text-foreground py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Waarom een boekhouder dichtbij?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight"
            >
              Een vast gezicht,{" "}
              <span className="italic">gewoon hier in Hoofddorp.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-6 space-y-4 text-foreground/70 leading-relaxed max-w-lg"
            >
              <p>
                Online boekhouden kan tegenwoordig overal. Maar als het ergens
                over gaat, een tegenvallend kwartaal, een grote investering of
                een brief van de Belastingdienst, wil je iemand aan tafel die
                je kent. Ons kantoor staat in Hoofddorp, op een paar minuten van
                het centrum.
              </p>
              <p>
                We werken dagelijks voor ondernemers uit de regio: van
                ZZP&apos;ers in Hoofddorp en Nieuw-Vennep tot MKB-bedrijven
                rond Schiphol. Daardoor kennen we het lokale ondernemersklimaat
                en de vraagstukken die daarbij horen.
              </p>
            </motion.div>

            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium w-fit hover:bg-foreground/90 transition-colors"
            >
              Plan kennismaking
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-2 max-w-md lg:ml-auto">
            {localCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease }}
                className="aspect-square flex flex-col items-center justify-center bg-foreground/5 rounded-sm"
              >
                <div className="mb-4 text-foreground/80">{card.icon}</div>
                <p className="text-sm text-center text-foreground/80 px-4">
                  {card.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Diensten
// ─────────────────────────────────────────────────────────────────────

type LocalService = {
  name: string;
  description: string;
};

const localServices: LocalService[] = [
  {
    name: "Complete boekhouding",
    description:
      "Facturen, bonnen en banktransacties verwerken wij op de achtergrond. Jij levert digitaal aan, wij houden je administratie actueel en op orde.",
  },
  {
    name: "BTW-aangifte",
    description:
      "Elk kwartaal voorbereid en op tijd ingediend. Wij bewaken de deadlines van de Belastingdienst, jij krijgt een seintje als er iets van je nodig is.",
  },
  {
    name: "Inkomstenbelasting en jaarrekening",
    description:
      "Je IB-aangifte en jaarrekening volledig verzorgd, inclusief alle aftrekposten waar je recht op hebt. En we leggen uit wat je cijfers betekenen.",
  },
  {
    name: "Advies aan tafel",
    description:
      "Sparren over een investering, je tarieven of een BV-omzetting? Kom langs op ons kantoor in Hoofddorp, of we plannen een (video)gesprek wanneer het jou uitkomt.",
  },
  {
    name: "Starten met ondernemen",
    description:
      "Begin je een bedrijf in de Haarlemmermeer? We helpen met je rechtsvorm, de opzet van je administratie en alles wat er bij de start komt kijken.",
  },
  {
    name: "Overstappen van je huidige boekhouder",
    description:
      "Wij nemen contact op met je huidige boekhouder, halen je dossier op en zetten alles over. Jij hoeft niets te doen, meestal binnen twee weken rond.",
  },
];

const serviceArea = [
  "Hoofddorp",
  "Nieuw-Vennep",
  "Badhoevedorp",
  "Zwanenburg",
  "Vijfhuizen",
  "Cruquius",
  "Lisserbroek",
  "Rijsenhout",
  "Schiphol-Rijk",
];

function LocalServices(): ReactNode {
  const items = localServices.map((s) => ({
    title: s.name,
    content: s.description,
  }));

  return (
    <section
      id="diensten-hoofddorp"
      className="relative w-full bg-muted py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT — heading + intro + CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground"
            >
              Dit regelen we voor ondernemers in Hoofddorp.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-6 space-y-4 text-foreground/70 leading-relaxed max-w-md"
            >
              <p>
                Van je dagelijkse administratie tot je jaarrekening en alles
                daartussenin. Eén vast aanspreekpunt dat jouw dossier kent, voor
                een vaste prijs per maand.
              </p>
              <p>
                En heb je een vraag? Dan bel of mail je gewoon. Op werkdagen
                krijg je binnen 24 uur antwoord.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/#pakketten"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium bg-[#0E1B33] text-white rounded-full hover:opacity-90 active:scale-[0.97] transition-all duration-150 whitespace-nowrap group"
              >
                Bekijk pakketten
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium border border-border text-foreground rounded-full hover:bg-background active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
              >
                Plan kennismaking
              </a>
            </motion.div>
          </div>

          {/* RIGHT — accordion list */}
          <div className="lg:pt-2">
            <Accordion baseId="hoofddorp-diensten" items={items} />
          </div>
        </div>

        {/* Werkgebied */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-16 pt-10 border-t border-foreground/10"
        >
          <p className="text-sm font-medium text-foreground mb-4">
            Ook actief in de rest van de Haarlemmermeer
          </p>
          <ul className="flex flex-wrap gap-2">
            {serviceArea.map((place) => (
              <li
                key={place}
                className="px-4 py-1.5 text-sm text-foreground/70 bg-background border border-border rounded-full"
              >
                {place}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Kantoor + kaart
// ─────────────────────────────────────────────────────────────────────

const fullAddress = `${siteConfig.street}, ${siteConfig.zipCode} ${siteConfig.city}`;
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${siteConfig.name}, ${fullAddress}`)}&output=embed`;
const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

function LocationMap(): ReactNode {
  return (
    <section className="relative w-full bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground"
            >
              Kom langs op ons kantoor{" "}
              <span className="italic">in Hoofddorp.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-6 text-foreground/70 leading-relaxed max-w-md"
            >
              Sommige dingen bespreek je liever aan tafel dan via een scherm.
              Plan een afspraak en kom langs, de koffie staat klaar.
            </motion.p>

            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-8 space-y-4 text-sm"
            >
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-foreground/50">Adres</dt>
                <dd className="text-foreground">{fullAddress}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-foreground/50">Open</dt>
                <dd className="text-foreground">{siteConfig.contact.hours}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-foreground/50">Telefoon</dt>
                <dd>
                  <a
                    href={contactLinks.tel}
                    className="text-foreground hover:opacity-70 transition-opacity"
                  >
                    {siteConfig.contact.phone.display}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-foreground/50">E-mail</dt>
                <dd>
                  <a
                    href={contactLinks.mailto}
                    className="text-foreground hover:opacity-70 transition-opacity"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
            </motion.dl>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors whitespace-nowrap"
              >
                Plan een afspraak
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={mapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium border border-border text-foreground rounded-full hover:bg-muted active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Route plannen
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[480px]"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
              <iframe
                src={mapsEmbedUrl}
                title={`Kaart met de locatie van ${siteConfig.name} in Hoofddorp`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────

function LocalFAQ(): ReactNode {
  const items = hoofddorpFaqs.map((f) => ({
    title: f.question,
    content: f.answer,
  }));

  return (
    <section className="relative w-full bg-background py-24 sm:py-32 overflow-x-hidden">
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
              Wat ondernemers uit Hoofddorp ons het vaakst vragen.
            </motion.p>
          </div>

          <Accordion baseId="hoofddorp-faq" items={items} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <p className="text-foreground/60">Staat je vraag er niet bij?</p>
            <a
              href="/contact"
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

// ─────────────────────────────────────────────────────────────────────
// Pagina-secties
// ─────────────────────────────────────────────────────────────────────

/** Hero + waarom lokaal + diensten. Stats (bg-muted, geen top-padding) sluit hierop aan. */
export function HoofddorpIntro(): ReactNode {
  return (
    <>
      <HoofddorpHero />
      <WhyLocal />
      <LocalServices />
    </>
  );
}

export function HoofddorpMap(): ReactNode {
  return <LocationMap />;
}

export function HoofddorpFAQ(): ReactNode {
  return <LocalFAQ />;
}
