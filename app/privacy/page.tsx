import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";

/**
 * Privacyverklaring — AMD Bureau
 *
 * AVG-privacyverklaring voor een boekhoudkantoor dat ZZP/MKB bedient.
 * Bedrijfsgegevens komen uit siteConfig. Laat de inhoud juridisch controleren
 * voordat er materiële wijzigingen in de dienstverlening plaatsvinden.
 */

const LAST_UPDATED = "18 augustus 2026";

export const metadata: Metadata = {
  title: `Privacyverklaring — ${siteConfig.name}`,
  description: `Hoe ${siteConfig.name} omgaat met je persoonsgegevens: welke gegevens we verwerken, waarom, hoe lang we ze bewaren en welke rechten je hebt.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage(): ReactNode {
  return (
    <main className="bg-warm-50 text-brand-900 min-h-screen">
      <article className="mx-auto max-w-2xl px-6 sm:px-8 py-24 sm:py-32">
        {/* Header */}
        <header>
          <p className="text-xs uppercase tracking-[0.15em] text-brand-900/55 font-medium">
            Juridisch
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
            Privacyverklaring
          </h1>
          <p className="mt-5 text-sm text-brand-900/60">
            Laatst bijgewerkt: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <div className="mt-10 text-base leading-relaxed text-brand-900/80">
          <p>
            Als boekhoudkantoor werken we dagelijks met vertrouwelijke gegevens.
            Daar gaan we zorgvuldig mee om. In deze privacyverklaring lees je
            welke persoonsgegevens {siteConfig.name} verwerkt, waarom we dat
            doen, hoe lang we ze bewaren en welke rechten je hebt volgens de
            Algemene Verordening Gegevensbescherming (AVG).
          </p>
        </div>

        <Section nr={1} title="Wie zijn wij">
          <p>
            {siteConfig.name} is verantwoordelijk voor de verwerking van
            persoonsgegevens zoals beschreven in deze privacyverklaring.
          </p>
          <p>
            {siteConfig.name}
            <br />
            {siteConfig.street}, {siteConfig.zipCode} {siteConfig.city}
            <br />
            KvK: {siteConfig.contact.kvk}
            <br />
            E-mail: {siteConfig.contact.email}
            <br />
            Telefoon: {siteConfig.contact.phone.display}
          </p>
        </Section>

        <Section nr={2} title="Welke gegevens we verwerken">
          <p>
            Afhankelijk van je relatie met ons verwerken we de volgende
            gegevens:
          </p>
          <Definition term="Bezoekers van de website">
            Gegevens die je invult in het contactformulier: naam, e-mailadres,
            telefoonnummer, bedrijfsnaam en de inhoud van je bericht. Daarnaast
            analytische gegevens over je websitebezoek (zie artikel 7).
          </Definition>
          <Definition term="Klanten">
            Naam, contact- en bedrijfsgegevens, KvK- en btw-nummer,
            bankgegevens, facturen, bonnen en overige administratie die nodig
            is voor de boekhouding. Voor belastingaangiften verwerken we ook
            je burgerservicenummer (BSN), omdat de Belastingdienst dit
            wettelijk vereist.
          </Definition>
          <Definition term="Personeel van klanten">
            Voor salarisadministratie verwerken we naam, geboortedatum, BSN,
            adres, loongegevens en arbeidsvoorwaarden van medewerkers van onze
            klanten. Hiervoor sluiten we met de klant een
            verwerkersovereenkomst.
          </Definition>
        </Section>

        <Section nr={3} title="Waarom we je gegevens verwerken">
          <p>We verwerken persoonsgegevens uitsluitend op basis van een van de
            volgende grondslagen:</p>
          <Clause nr="3.1">
            <strong>Uitvoering van de overeenkomst:</strong> het voeren van je
            boekhouding, het opstellen van jaarrekeningen en het verzorgen van
            aangiften.
          </Clause>
          <Clause nr="3.2">
            <strong>Wettelijke verplichting:</strong> fiscale bewaarplicht,
            identificatieplicht en verplichtingen uit de Wet ter voorkoming van
            witwassen en financieren van terrorisme (Wwft).
          </Clause>
          <Clause nr="3.3">
            <strong>Gerechtvaardigd belang:</strong> het beantwoorden van je
            contactaanvraag en het verbeteren van onze website en
            dienstverlening.
          </Clause>
          <Clause nr="3.4">
            <strong>Toestemming:</strong> voor zover we gegevens verwerken die
            niet onder bovenstaande grondslagen vallen. Je kunt toestemming
            altijd intrekken.
          </Clause>
        </Section>

        <Section nr={4} title="Met wie we gegevens delen">
          <Clause nr="4.1">
            We verkopen je gegevens nooit aan derden. We delen gegevens alleen
            als dat nodig is voor onze dienstverlening of om te voldoen aan een
            wettelijke verplichting.
          </Clause>
          <Clause nr="4.2">
            Denk aan: de Belastingdienst (aangiften), boekhoudsoftware zoals
            Moneybird, e-Boekhouden of Tellow, onze hosting- en
            e-mailleveranciers, en — uitsluitend waar nodig — een notaris,
            advocaat of bank.
          </Clause>
          <Clause nr="4.3">
            Met partijen die in onze opdracht gegevens verwerken sluiten we een
            verwerkersovereenkomst, zodat je gegevens ook daar goed beschermd
            zijn.
          </Clause>
        </Section>

        <Section nr={5} title="Hoe lang we gegevens bewaren">
          <Clause nr="5.1">
            Administratie en gegevens die onder de fiscale bewaarplicht vallen
            bewaren we zeven jaar, zoals wettelijk verplicht.
          </Clause>
          <Clause nr="5.2">
            Gegevens uit het contactformulier bewaren we maximaal één jaar na
            het laatste contact, tenzij er een samenwerking uit voortkomt.
          </Clause>
          <Clause nr="5.3">
            Na afloop van de bewaartermijn verwijderen of anonimiseren we je
            gegevens.
          </Clause>
        </Section>

        <Section nr={6} title="Hoe we je gegevens beveiligen">
          <p>
            We nemen passende technische en organisatorische maatregelen om je
            gegevens te beschermen tegen verlies, misbruik en onbevoegde
            toegang. Denk aan versleutelde verbindingen (HTTPS),
            toegangsbeveiliging op onze systemen en het principe dat alleen
            medewerkers die het nodig hebben bij je dossier kunnen. Vermoed je
            toch een datalek? Meld het ons direct via{" "}
            {siteConfig.contact.email}.
          </p>
        </Section>

        <Section nr={7} title="Cookies en websitestatistieken">
          <Clause nr="7.1">
            Onze website gebruikt Google Tag Manager en analytische cookies om
            te begrijpen hoe bezoekers de site gebruiken. Deze gegevens
            gebruiken we alleen om de website te verbeteren.
          </Clause>
          <Clause nr="7.2">
            Je kunt cookies uitschakelen of verwijderen via de instellingen van
            je browser. De website blijft dan gewoon werken.
          </Clause>
        </Section>

        <Section nr={8} title="Jouw rechten">
          <p>Op grond van de AVG heb je het recht om:</p>
          <Clause nr="8.1">
            je gegevens in te zien, te laten corrigeren of te laten
            verwijderen;
          </Clause>
          <Clause nr="8.2">
            de verwerking te beperken of er bezwaar tegen te maken;
          </Clause>
          <Clause nr="8.3">
            je gegevens overgedragen te krijgen aan jezelf of een andere partij
            (dataportabiliteit);
          </Clause>
          <Clause nr="8.4">
            gegeven toestemming in te trekken.
          </Clause>
          <p>
            Stuur je verzoek naar {siteConfig.contact.email}. We reageren
            binnen vier weken. Let op: gegevens die onder de wettelijke
            bewaarplicht vallen mogen we niet eerder verwijderen. Ben je het
            niet eens met hoe wij met je gegevens omgaan? Dan kun je een klacht
            indienen bij de Autoriteit Persoonsgegevens via{" "}
            <a
              href="https://autoriteitpersoonsgegevens.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-brand-900/30 hover:decoration-brand-900 transition-colors"
            >
              autoriteitpersoonsgegevens.nl
            </a>
            .
          </p>
        </Section>

        <Section nr={9} title="Wijzigingen">
          <p>
            We kunnen deze privacyverklaring aanpassen, bijvoorbeeld bij
            wijzigingen in onze dienstverlening of wetgeving. De actuele versie
            staat altijd op {siteConfig.url}/privacy. Bij ingrijpende
            wijzigingen informeren we onze klanten actief.
          </p>
        </Section>

        {/* Closing block */}
        <div className="mt-20 pt-10 border-t border-brand-900/10">
          <h2 className="font-serif text-2xl tracking-tight">Vragen?</h2>
          <p className="mt-3 text-base leading-relaxed text-brand-900/80">
            Voor vragen over deze privacyverklaring of over je gegevens kun je
            contact opnemen via{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="underline underline-offset-4 decoration-brand-900/30 hover:decoration-brand-900 transition-colors"
            >
              {siteConfig.contact.email}
            </a>{" "}
            of bel{" "}
            <a
              href={`tel:${siteConfig.contact.phone.tel}`}
              className="underline underline-offset-4 decoration-brand-900/30 hover:decoration-brand-900 transition-colors"
            >
              {siteConfig.contact.phone.display}
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}

/* ----------------------------- helper components ----------------------------- */

function Section({
  nr,
  title,
  children,
}: {
  nr: number;
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <section id={`artikel-${nr}`} className="mt-14 scroll-mt-24">
      <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">
        Artikel {nr} — {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-900/80">
        {children}
      </div>
    </section>
  );
}

function Clause({
  nr,
  children,
}: {
  nr: string;
  children: ReactNode;
}): ReactNode {
  return (
    <p>
      <span className="font-medium tabular-nums text-brand-900 mr-1">{nr}</span>
      {children}
    </p>
  );
}

function Definition({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}): ReactNode {
  return (
    <p>
      <span className="font-medium text-brand-900">{term}:</span> {children}
    </p>
  );
}
