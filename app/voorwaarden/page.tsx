import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";

/**
 * Algemene voorwaarden — AMD Bureau
 *
 * Standaard AV voor een boekhouder die ZZP/MKB bedient. Importeert bedrijfsnaam,
 * KvK, contactgegevens en URL uit siteConfig. Andere juridische placeholders
 * (vestigingsplaats, uurtarief, opzegtermijn, rechtbank, klachttermijn) staan
 * als consts bovenaan deze file, omdat ze juridisch-specifiek zijn en niet
 * in algemene siteConfig horen.

 */

const LAST_UPDATED = "1 mei 2026";

// Juridisch-specifieke placeholders — laat Nick controleren
const VESTIGINGSPLAATS = "Haarlem";
const UURTARIEF_MEERWERK = "€95";
const OPZEGTERMIJN = "één maand";
const BETALINGSTERMIJN_DAGEN = 14;
const OFFERTE_GELDIG_DAGEN = 30;
const KLACHT_TERMIJN_DAGEN = 14;
const AANSPRAKELIJKHEIDSPLAFOND = "€ 10.000";
const BEVOEGDE_RECHTBANK = "Noord-Holland, locatie Haarlem";

export const metadata: Metadata = {
  title: `Algemene voorwaarden — ${siteConfig.name}`,
  description: `De algemene voorwaarden van ${siteConfig.name}.`,
  robots: { index: true, follow: true },
};

export default function AlgemeneVoorwaardenPage(): ReactNode {
  return (
    <main className="bg-warm-50 text-brand-900 min-h-screen">
      <article className="mx-auto max-w-2xl px-6 sm:px-8 py-24 sm:py-32">
        {/* Header */}
        <header>
          <p className="text-xs uppercase tracking-[0.15em] text-brand-900/55 font-medium">
            Juridisch
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
            Algemene voorwaarden
          </h1>
          <p className="mt-5 text-sm text-brand-900/60">
            Laatst bijgewerkt: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <div className="mt-10 text-base leading-relaxed text-brand-900/80">
          <p>
            Deze algemene voorwaarden zijn van toepassing op alle diensten van{" "}
            {siteConfig.name}, gevestigd te {VESTIGINGSPLAATS}, ingeschreven bij
            de Kamer van Koophandel onder nummer {siteConfig.contact.kvk}.
          </p>
        </div>

        <Section nr={1} title="Definities">
          <p>In deze algemene voorwaarden wordt verstaan onder:</p>
          <Definition term="Opdrachtnemer">
            {siteConfig.name}, hierna ook &quot;wij&quot; of &quot;ons&quot;.
          </Definition>
          <Definition term="Opdrachtgever">
            De natuurlijke of rechtspersoon die ons opdracht geeft tot het
            verrichten van werkzaamheden, hierna ook &quot;u&quot; of
            &quot;uw&quot;.
          </Definition>
          <Definition term="Overeenkomst">
            Iedere afspraak tussen Opdrachtnemer en Opdrachtgever waarop deze
            algemene voorwaarden van toepassing zijn.
          </Definition>
          <Definition term="Werkzaamheden">
            Alle door of namens Opdrachtnemer voor Opdrachtgever te verrichten
            activiteiten, waaronder begrepen boekhouding, fiscale aangiften,
            jaarrekeningen en advies.
          </Definition>
          <Definition term="Schriftelijk">Per brief of per e-mail.</Definition>
        </Section>

        <Section nr={2} title="Toepasselijkheid">
          <Clause nr="2.1">
            Deze algemene voorwaarden zijn van toepassing op alle offertes,
            aanbiedingen en overeenkomsten van Opdrachtnemer.
          </Clause>
          <Clause nr="2.2">
            Algemene voorwaarden van Opdrachtgever worden uitdrukkelijk van de
            hand gewezen, tenzij schriftelijk anders is overeengekomen.
          </Clause>
          <Clause nr="2.3">
            Op de overeenkomst is steeds de meest recente versie van deze
            algemene voorwaarden van toepassing. De actuele versie is te
            raadplegen op {siteConfig.url}/algemene-voorwaarden.
          </Clause>
        </Section>

        <Section nr={3} title="Offertes en aanbiedingen">
          <Clause nr="3.1">
            Alle offertes en aanbiedingen zijn vrijblijvend en{" "}
            {OFFERTE_GELDIG_DAGEN} dagen geldig, tenzij anders vermeld.
          </Clause>
          <Clause nr="3.2">
            Opdrachtnemer is niet gebonden aan een offerte of aanbieding indien
            Opdrachtgever redelijkerwijs kan begrijpen dat deze een kennelijke
            vergissing of verschrijving bevat.
          </Clause>
        </Section>

        <Section nr={4} title="Totstandkoming van de overeenkomst">
          <Clause nr="4.1">
            De overeenkomst komt tot stand op het moment dat Opdrachtgever de
            offerte of aanbieding schriftelijk aanvaardt, dan wel op het moment
            dat Opdrachtnemer met de uitvoering van de werkzaamheden begint.
          </Clause>
          <Clause nr="4.2">
            Indien de aanvaarding afwijkt van de offerte komt de overeenkomst
            slechts tot stand op basis van de gewijzigde aanvaarding na
            schriftelijke instemming van Opdrachtnemer.
          </Clause>
        </Section>

        <Section nr={5} title="Uitvoering van de overeenkomst">
          <Clause nr="5.1">
            Opdrachtnemer voert de overeenkomst naar beste inzicht en vermogen
            uit, op basis van een inspanningsverplichting. Een bepaald resultaat
            wordt niet gegarandeerd.
          </Clause>
          <Clause nr="5.2">
            Opdrachtnemer is gerechtigd derden in te schakelen bij de uitvoering
            van de overeenkomst.
          </Clause>
          <Clause nr="5.3">
            Door Opdrachtnemer opgegeven termijnen zijn indicatief en gelden
            niet als fatale termijnen, tenzij uitdrukkelijk schriftelijk anders
            is overeengekomen.
          </Clause>
        </Section>

        <Section nr={6} title="Informatieplicht opdrachtgever">
          <Clause nr="6.1">
            Opdrachtgever is gehouden alle gegevens en bescheiden die
            Opdrachtnemer nodig heeft voor het correct uitvoeren van de
            werkzaamheden tijdig, volledig en in de gewenste vorm aan te
            leveren.
          </Clause>
          <Clause nr="6.2">
            Opdrachtgever staat in voor de juistheid, volledigheid en
            betrouwbaarheid van de aangeleverde gegevens, ook indien deze van
            derden afkomstig zijn.
          </Clause>
          <Clause nr="6.3">
            Indien Opdrachtgever niet aan zijn informatieplicht voldoet, is
            Opdrachtnemer niet aansprakelijk voor de daaruit voortvloeiende
            schade, waaronder begrepen boetes of aanslagen van de
            Belastingdienst.
          </Clause>
        </Section>

        <Section nr={7} title="Tarieven en betaling">
          <Clause nr="7.1">
            De tarieven zijn opgenomen in de overeenkomst en luiden in euro&apos;s,
            exclusief btw en eventuele andere heffingen.
          </Clause>
          <Clause nr="7.2">
            Werkzaamheden binnen een vast maandbedrag worden maandelijks
            achteraf gefactureerd. Overige werkzaamheden worden gefactureerd op
            basis van het overeengekomen uurtarief.
          </Clause>
          <Clause nr="7.3">
            Betaling dient te geschieden binnen {BETALINGSTERMIJN_DAGEN} dagen
            na factuurdatum, zonder korting of verrekening.
          </Clause>
          <Clause nr="7.4">
            Bij niet-tijdige betaling is Opdrachtgever van rechtswege in verzuim
            en is hij de wettelijke (handels)rente verschuldigd, alsmede de
            redelijke (buitengerechtelijke) kosten van invordering.
          </Clause>
          <Clause nr="7.5">
            Opdrachtnemer is gerechtigd de tarieven jaarlijks per 1 januari te
            indexeren conform de CBS-prijsindex voor zakelijke dienstverlening.
          </Clause>
        </Section>

        <Section nr={8} title="Duur en beëindiging">
          <Clause nr="8.1">
            De overeenkomst wordt aangegaan voor de in de overeenkomst vermelde
            duur. Bij gebreke van een vermelde duur geldt de overeenkomst voor
            onbepaalde tijd.
          </Clause>
          <Clause nr="8.2">
            Een overeenkomst voor onbepaalde tijd kan door beide partijen
            schriftelijk worden opgezegd met inachtneming van een opzegtermijn
            van {OPZEGTERMIJN}, tegen het einde van de kalendermaand.
          </Clause>
          <Clause nr="8.3">
            Opdrachtnemer is gerechtigd de overeenkomst met onmiddellijke ingang
            te beëindigen indien Opdrachtgever ondanks ingebrekestelling
            tekortschiet in de nakoming van zijn verplichtingen, in staat van
            faillissement wordt verklaard of surseance van betaling aanvraagt.
          </Clause>
          <Clause nr="8.4">
            Bij beëindiging blijven verplichtingen die naar hun aard doorwerken,
            waaronder geheimhouding en aansprakelijkheid, onverkort van kracht.
          </Clause>
        </Section>

        <Section nr={9} title="Meerwerk">
          <Clause nr="9.1">
            Werkzaamheden buiten de overeengekomen scope worden als meerwerk
            aangemerkt en separaat in rekening gebracht tegen het uurtarief van{" "}
            {UURTARIEF_MEERWERK} per uur, exclusief btw.
          </Clause>
          <Clause nr="9.2">
            Opdrachtnemer informeert Opdrachtgever vooraf indien meerwerk
            noodzakelijk is, tenzij dit redelijkerwijs niet mogelijk is.
          </Clause>
        </Section>

        <Section nr={10} title="Aansprakelijkheid">
          <Clause nr="10.1">
            De aansprakelijkheid van Opdrachtnemer is beperkt tot het bedrag dat
            in het desbetreffende geval door de
            beroepsaansprakelijkheidsverzekering wordt uitgekeerd, vermeerderd
            met het eigen risico.
          </Clause>
          <Clause nr="10.2">
            Indien om welke reden dan ook geen uitkering krachtens genoemde
            verzekering plaatsvindt, is de aansprakelijkheid beperkt tot het
            door Opdrachtgever aan Opdrachtnemer in de twaalf maanden
            voorafgaand aan de schadeveroorzakende gebeurtenis betaalde bedrag,
            met een maximum van {AANSPRAKELIJKHEIDSPLAFOND}.
          </Clause>
          <Clause nr="10.3">
            Opdrachtnemer is niet aansprakelijk voor indirecte schade, waaronder
            begrepen gevolgschade, gederfde winst, gemiste besparingen en schade
            door bedrijfsstagnatie.
          </Clause>
          <Clause nr="10.4">
            Opdrachtnemer is niet aansprakelijk voor schade die het gevolg is
            van door Opdrachtgever onjuist, onvolledig of niet-tijdig
            aangeleverde gegevens.
          </Clause>
          <Clause nr="10.5">
            Iedere vordering tot schadevergoeding vervalt indien deze niet
            binnen één jaar na ontdekking van de schade schriftelijk bij
            Opdrachtnemer is gemeld.
          </Clause>
        </Section>

        <Section nr={11} title="Overmacht">
          <Clause nr="11.1">
            Onder overmacht wordt verstaan iedere tekortkoming die niet aan
            Opdrachtnemer kan worden toegerekend, omdat zij niet te wijten is
            aan haar schuld, noch krachtens wet, rechtshandeling of in het
            verkeer geldende opvattingen voor haar rekening komt.
          </Clause>
          <Clause nr="11.2">
            Tijdens overmacht worden de verplichtingen van Opdrachtnemer
            opgeschort. Duurt de overmacht langer dan twee maanden, dan zijn
            beide partijen bevoegd de overeenkomst te ontbinden zonder
            verplichting tot vergoeding van schade.
          </Clause>
        </Section>

        <Section nr={12} title="Geheimhouding">
          <Clause nr="12.1">
            Beide partijen zijn verplicht tot geheimhouding van alle
            vertrouwelijke informatie die zij in het kader van de overeenkomst
            van elkaar of uit andere bron hebben verkregen.
          </Clause>
          <Clause nr="12.2">
            De geheimhoudingsplicht geldt niet voor informatie die op grond van
            de wet of een rechterlijke uitspraak openbaar dient te worden
            gemaakt.
          </Clause>
        </Section>

        <Section nr={13} title="Privacy en verwerking persoonsgegevens">
          <Clause nr="13.1">
            Opdrachtnemer verwerkt persoonsgegevens in overeenstemming met de
            Algemene Verordening Gegevensbescherming (AVG). De wijze waarop
            persoonsgegevens worden verwerkt is beschreven in de
            privacyverklaring, te raadplegen op {siteConfig.url}/privacy.
          </Clause>
          <Clause nr="13.2">
            Voor zover Opdrachtnemer in het kader van de overeenkomst optreedt
            als verwerker in de zin van de AVG, worden de afspraken hierover
            vastgelegd in een verwerkersovereenkomst.
          </Clause>
        </Section>

        <Section nr={14} title="Bewaartermijn">
          <Clause nr="14.1">
            Opdrachtnemer bewaart de administratie en bijbehorende bescheiden
            van Opdrachtgever gedurende de wettelijke fiscale bewaartermijn van
            zeven jaar.
          </Clause>
          <Clause nr="14.2">
            Na afloop van deze termijn is Opdrachtnemer gerechtigd, doch niet
            verplicht, de bescheiden te vernietigen.
          </Clause>
        </Section>

        <Section nr={15} title="Klachten">
          <Clause nr="15.1">
            Klachten over de verrichte werkzaamheden of de hoogte van de factuur
            dienen schriftelijk en gemotiveerd binnen {KLACHT_TERMIJN_DAGEN}{" "}
            dagen na ontdekking, doch uiterlijk binnen dertig dagen na
            voltooiing van de betreffende werkzaamheden, bij Opdrachtnemer te
            worden ingediend.
          </Clause>
          <Clause nr="15.2">
            Een klacht schort de betalingsverplichting van Opdrachtgever niet
            op.
          </Clause>
          <Clause nr="15.3">
            Indien een klacht gegrond is, zal Opdrachtnemer de werkzaamheden
            alsnog verrichten zoals overeengekomen, tenzij dit voor
            Opdrachtgever aantoonbaar zinloos is geworden.
          </Clause>
        </Section>

        <Section nr={16} title="Toepasselijk recht en geschillen">
          <Clause nr="16.1">
            Op de overeenkomst en deze algemene voorwaarden is uitsluitend
            Nederlands recht van toepassing.
          </Clause>
          <Clause nr="16.2">
            Geschillen die voortvloeien uit of verband houden met de
            overeenkomst worden bij uitsluiting voorgelegd aan de bevoegde
            rechter van de rechtbank {BEVOEGDE_RECHTBANK}, tenzij de wet
            dwingend anders voorschrijft.
          </Clause>
        </Section>

        <Section nr={17} title="Slotbepalingen">
          <Clause nr="17.1">
            Indien een of meer bepalingen van deze algemene voorwaarden nietig
            zijn of vernietigd worden, blijven de overige bepalingen onverkort
            van kracht. Partijen treden alsdan in overleg om een vervangende
            regeling te treffen die zoveel mogelijk aansluit bij de strekking
            van de oorspronkelijke bepaling.
          </Clause>
          <Clause nr="17.2">
            Opdrachtnemer is gerechtigd deze algemene voorwaarden te wijzigen.
            Gewijzigde voorwaarden gelden ook ten aanzien van reeds bestaande
            overeenkomsten, met inachtneming van een termijn van dertig dagen na
            bekendmaking. Indien Opdrachtgever niet akkoord gaat met de
            wijziging, kan hij de overeenkomst opzeggen tegen de datum waarop de
            gewijzigde voorwaarden van kracht worden.
          </Clause>
        </Section>

        {/* Closing block */}
        <div className="mt-20 pt-10 border-t border-brand-900/10">
          <h2 className="font-serif text-2xl tracking-tight">Vragen?</h2>
          <p className="mt-3 text-base leading-relaxed text-brand-900/80">
            Voor vragen over deze algemene voorwaarden kunt u contact opnemen
            via{" "}
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