import { useState } from 'react';
import type { FormEvent } from 'react';

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [botcheck, setBotcheck] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Rückruf-Anfrage von ${name}`,
          from_name: 'reder-webdesign.de',
          name,
          telefon: phone,
          wann_passt_es: time,
          botcheck: botcheck,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError('Etwas ist schiefgelaufen. Bitte versuch es nochmal oder ruf mich direkt an.');
      }
    } catch {
      setError('Verbindungsfehler. Bitte versuch es nochmal oder ruf mich direkt an.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Danke, {name}!</h3>
        <p className="text-slate-600">Ich melde mich so schnell wie möglich bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="botcheck"
        value={botcheck}
        onChange={(e) => setBotcheck(e.target.value)}
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Dein Name"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-cta outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          Telefonnummer
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Deine Telefonnummer"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-cta outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-1">
          Wann passt es dir?
        </label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-cta outline-none transition-colors bg-white"
        >
          <option value="">Bitte wählen</option>
          <option value="Vormittags (9–12 Uhr)">Vormittags (9–12 Uhr)</option>
          <option value="Mittags (12–14 Uhr)">Mittags (12–14 Uhr)</option>
          <option value="Nachmittags (14–17 Uhr)">Nachmittags (14–17 Uhr)</option>
          <option value="Abends (17–19 Uhr)">Abends (17–19 Uhr)</option>
          <option value="Egal, jederzeit">Egal, jederzeit</option>
        </select>
      </div>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      <p className="text-xs text-slate-500">
        Mit dem Absenden stimmst du der Verarbeitung deiner Daten gemäß unserer{' '}
        <a href="/datenschutz" className="text-cta hover:text-cta-hover underline">Datenschutzerklärung</a> zu.
      </p>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cta hover:bg-cta-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Wird gesendet...' : 'Rückruf anfordern'}
      </button>
    </form>
  );
}
