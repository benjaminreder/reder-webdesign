import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: 'Was kostet eine Website?',
    answer:
      'Meine Pakete starten ab 499 € für einen One-Pager. Business-Websites mit 3–5 Seiten gibt es ab 999 €, und Premium-Projekte mit SEO, Blog und unbegrenzten Seiten ab 1.499 €. Alle Preise sind Festpreise — keine versteckten Kosten.',
  },
  {
    question: 'Was ist im Gratis-Entwurf enthalten?',
    answer:
      'Du bekommst einen individuellen Designvorschlag für deine Website — komplett kostenlos und unverbindlich. So siehst du vorher, wie deine fertige Seite aussehen wird, bevor du dich entscheidest.',
  },
  {
    question: 'Wie lange dauert es?',
    answer:
      'In der Regel ist deine Website innerhalb von 5–7 Tagen nach Auftragserteilung fertig und online. Bei größeren Projekten besprechen wir den Zeitrahmen individuell.',
  },
  {
    question: 'Muss ich Texte und Fotos liefern?',
    answer:
      'Wenn du eigene Texte und Fotos hast, arbeite ich gerne damit. Falls nicht, helfe ich dir bei der Texterstellung und nutze hochwertige Stockfotos. Wir finden gemeinsam die beste Lösung.',
  },
  {
    question: 'Was passiert nach dem Go-Live?',
    answer:
      'Nach dem Launch stehe ich dir weiterhin für Fragen und kleine Änderungen zur Verfügung. Auf Wunsch übernehme ich auch die laufende Wartung und Pflege deiner Website.',
  },
  {
    question: 'Kann ich meine Website später erweitern?',
    answer:
      'Selbstverständlich. Deine Website wird so gebaut, dass sie jederzeit um neue Seiten, Funktionen oder einen Blog erweitert werden kann. Du bist flexibel.',
  },
  {
    question: 'Gehört mir die Website?',
    answer:
      'Ja, die Website gehört dir. Nach Projektabschluss erhältst du alle Zugangsdaten und den vollständigen Code. Du bist nicht an mich gebunden.',
  },
  {
    question: 'Bin ich vertraglich gebunden?',
    answer:
      'Nein. Es gibt keine laufenden Verträge oder Mindestlaufzeiten. Du bezahlst einmalig den Festpreis für die Erstellung. Wartungspakete sind optional und monatlich kündbar.',
  },
];

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-slate-200">
      {faqItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between py-5 text-left text-lg font-medium text-slate-900 hover:text-cta transition-colors cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <ChevronIcon isOpen={openIndex === index} />
          </button>
          {openIndex === index && (
            <div className="pb-5 pr-12 text-slate-600 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
