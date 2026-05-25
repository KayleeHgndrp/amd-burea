"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { contactLinks, siteConfig } from "@/lib/config";

const ease = [0.16, 1, 0.3, 1] as const;

type Audience = "zzp" | "mkb" | "niet-zeker";

type FormData = {
  name: string;
  email: string;
  phone: string;
  audience: Audience;
  message: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  audience: "zzp",
  message: "",
};

function AudienceToggle({
  value,
  onChange,
}: {
  value: Audience;
  onChange: (v: Audience) => void;
}): ReactNode {
  const options: { value: Audience; label: string }[] = [
    { value: "zzp", label: "ZZP" },
    { value: "mkb", label: "MKB" },
    { value: "niet-zeker", label: "Nog niet zeker" },
  ];
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-full border border-border">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 h-9 text-sm font-medium rounded-full transition-colors ${
            value === opt.value
              ? "bg-[#0E1B33] text-white"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}): ReactNode {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-foreground/40 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full h-12 px-4 text-sm bg-transparent border border-foreground/15 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#0E1B33] focus:ring-2 focus:ring-[#0E1B33]/15 transition-all";

const steps = [
  {
    title: "We nemen contact op",
    body: "Binnen 24 uur sturen we een mail of bellen we om een moment in te plannen.",
  },
  {
    title: "45 minuten kennismaking",
    body: "Op kantoor, bij jou langs, of online. Wat jij prettig vindt. Vrijblijvend.",
  },
  {
    title: "Beslis op je gemak",
    body: "Past het? We sturen een passende offerte. Past het niet? Ook prima.",
  },
];

export function Contact(): ReactNode {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // TODO: wire this to your backend (Next.js server action, /api route, or external form service like Resend/Formspree)
    // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 600));

    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <main className="relative w-full bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mb-12 lg:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-serif leading-[1.05] tracking-tight text-foreground">
            Plan je gratis <span className="italic">kennismaking.</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
            In een gesprek van 45 minuten kijken we naar je situatie en wat je nodig hebt. Geen verkoop, wel een eerlijke check of we bij elkaar passen.
          </p>
        </motion.div>

        {/* Form + aside grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            {submitted ? (
              <div className="rounded-2xl bg-warm-50 p-8 lg:p-10 border border-border">
                <h2 className="text-2xl font-medium font-serif text-foreground">
                  Bedankt{form.name ? `, ${form.name}` : ""}!
                </h2>
                <p className="mt-3 text-foreground/70 leading-relaxed">
                  We hebben je bericht ontvangen en nemen binnen 24 uur contact op om een kennismakingsgesprek in te plannen. Check ondertussen je inbox voor een bevestiging.
                </p>
                <a
                  href="/pakketten"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-foreground hover:opacity-70 transition-opacity group"
                >
                  Bekijk de pakketten in de tussentijd
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Field label="Naam" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Voor- en achternaam"
                    className={inputClass}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="E-mail" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="naam@voorbeeld.nl"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Telefoon">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="06 12 34 56 78"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Welk type ondernemer ben je?">
                  <AudienceToggle
                    value={form.audience}
                    onChange={(v) => setForm({ ...form, audience: v })}
                  />
                </Field>

                <Field label="Bericht" required>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Wat speelt er en waar kunnen we mee helpen?"
                    className={`${inputClass} h-auto py-3 resize-y min-h-32`}
                  />
                </Field>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-medium bg-[#0E1B33] text-white rounded-full hover:opacity-90 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 whitespace-nowrap"
                  >
                    {submitting ? "Versturen..." : "Verstuur bericht"}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <p className="text-xs text-foreground/55">
                    Antwoord binnen 24 uur. Geen verkoopgesprek.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* Aside column */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="flex flex-col gap-10"
          >
            {/* Direct contact */}
            <div>
              <h2 className="text-sm font-medium font-display text-accent mb-5">
                Liever direct contact?
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href={contactLinks.tel}
                  className="flex items-start gap-3 group"
                >
                  <Phone className="w-5 h-5 text-foreground/60 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:text-[#0E1B33] transition-colors">
                      {siteConfig.contact.phone.display}
                    </div>
                    <div className="text-xs text-foreground/55 mt-0.5">
                      {siteConfig.contact.hours}
                    </div>
                  </div>
                </a>
                <a
                  href={contactLinks.mailto}
                  className="flex items-start gap-3 group"
                >
                  <Mail className="w-5 h-5 text-foreground/60 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:text-[#0E1B33] transition-colors">
                      {siteConfig.contact.email}
                    </div>
                    <div className="text-xs text-foreground/55 mt-0.5">
                      Antwoord binnen 24 uur
                    </div>
                  </div>
                </a>
         
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-border" />

            {/* What happens next */}
            <div>
              <h2 className="text-sm font-medium font-display text-accent mb-5">
                Wat gebeurt er nu?
              </h2>
              <ol className="flex flex-col gap-5">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-[#0E1B33] text-white text-xs font-medium flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="pt-0.5">
                      <div className="text-sm font-medium text-foreground">
                        {step.title}
                      </div>
                      <div className="text-sm text-foreground/60 leading-relaxed mt-1">
                        {step.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.aside>

        </div>
      </div>
    </main>
  );
}