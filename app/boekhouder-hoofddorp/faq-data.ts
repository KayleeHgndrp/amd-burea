/**
 * FAQ-items voor de locatiepagina Boekhouder in Hoofddorp.
 * Gedeeld tussen de pagina (FAQPage JSON-LD) en het accordion-component.
 */

export type HoofddorpFAQItem = {
  question: string;
  answer: string;
};

export const hoofddorpFaqs: HoofddorpFAQItem[] = [
  {
    question: "Wat kost een boekhouder in Hoofddorp?",
    answer:
      "Bij AMD Bureau betaal je een vaste prijs per maand: voor ZZP'ers vanaf €125, voor MKB vanaf €300. Geen uurtje-factuurtje, geen verrassingen achteraf. Tijdens een gratis kennismaking kijken we welk pakket bij jouw situatie past.",
  },
  {
    question: "Kan ik langskomen op jullie kantoor in Hoofddorp?",
    answer:
      "Graag zelfs. Ons kantoor zit aan de Laan van Norfolk 7 in Hoofddorp. Plan een afspraak en de koffie staat klaar. Liever bellen of videobellen? Dat kan natuurlijk ook.",
  },
  {
    question: "Werken jullie ook voor ondernemers buiten Hoofddorp?",
    answer:
      "Ja. Veel van onze klanten komen uit de Haarlemmermeer, denk aan Nieuw-Vennep, Badhoevedorp en Zwanenburg, maar omdat we volledig digitaal kunnen werken helpen we ondernemers in heel Nederland.",
  },
  {
    question: "Ik heb al een boekhouder. Hoe werkt overstappen?",
    answer:
      "Wij regelen het. We nemen contact op met je huidige boekhouder, halen je dossier op en zetten je administratie over zonder dat jij iets hoeft te doen. Meestal binnen twee weken rond.",
  },
  {
    question: "Voor welke ondernemers zijn jullie er?",
    answer:
      "ZZP'ers, eenmanszaken, VOF's en BV's tot ongeveer 20 medewerkers. Of je nu net start in de Haarlemmermeer of al jaren onderneemt: in de kennismaking kijken we samen wat je nodig hebt.",
  },
  {
    question: "Hoe snel kunnen we starten?",
    answer:
      "Na een gratis kennismakingsgesprek kunnen we meestal binnen één tot twee weken van start. Stap je over van een andere boekhouder, dan verzorgen wij de volledige overdracht.",
  },
];
