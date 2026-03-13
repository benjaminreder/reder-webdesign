import { useState } from 'react';

const navLinks = [
  { href: '#versprechen', label: 'Versprechen' },
  { href: '#ablauf', label: 'Ablauf' },
  { href: '#preise', label: 'Preise' },
  { href: '#referenzen', label: 'Referenzen' },
  { href: '#ueber-mich', label: 'Über mich' },
  { href: '#faq', label: 'FAQ' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-700 hover:text-slate-900"
        aria-label="Menü öffnen"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-slate-100 z-50">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-cta transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-100 mt-2 pt-4 px-6 flex flex-col gap-3">
              <a
                href="tel:+4915258578794"
                className="flex items-center gap-2 text-slate-700 hover:text-cta"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Anrufen
              </a>
              <a
                href="#kontakt"
                onClick={() => setIsOpen(false)}
                className="inline-block text-center bg-cta hover:bg-cta-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Gratis-Entwurf anfordern
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
