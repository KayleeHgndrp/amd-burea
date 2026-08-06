import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/config";

const AUDIENCE_LABELS: Record<string, string> = {
  zzp: "ZZP",
  mkb: "MKB",
  "niet-zeker": "Nog niet zeker",
};

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  audience?: string;
  message?: string;
  /** Honeypot: echte bezoekers laten dit veld leeg */
  company?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const audience = AUDIENCE_LABELS[payload.audience ?? ""] ?? "Onbekend";

  // Honeypot gevuld: door een bot ingevuld, doe alsof het gelukt is
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Vul naam, e-mail en bericht in" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Vul een geldig e-mailadres in" },
      { status: 400 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contactformulier: SMTP-omgevingsvariabelen ontbreken");
    return NextResponse.json(
      { error: "Versturen is tijdelijk niet mogelijk" },
      { status: 500 },
    );
  }

  const from = SMTP_FROM || SMTP_USER;
  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const lines = [
    `Naam: ${name}`,
    `E-mail: ${email}`,
    `Telefoon: ${phone || "-"}`,
    `Type ondernemer: ${audience}`,
    "",
    "Bericht:",
    message,
  ];

  try {
    await transporter.sendMail({
      from: `"${siteConfig.name} website" <${from}>`,
      to: siteConfig.contact.email,
      replyTo: `"${name}" <${email}>`,
      subject: `Nieuwe aanvraag via de website — ${name}`,
      text: lines.join("\n"),
      html: lines.map((l) => escapeHtml(l) || "<br>").join("<br>"),
    });

    await transporter.sendMail({
      from: `"${siteConfig.name}" <${from}>`,
      to: email,
      subject: `We hebben je bericht ontvangen — ${siteConfig.name}`,
      text: [
        `Beste ${name},`,
        "",
        "Bedankt voor je bericht. We nemen binnen 24 uur contact met je op om een kennismakingsgesprek in te plannen.",
        "",
        "Met vriendelijke groet,",
        siteConfig.name,
        siteConfig.contact.phone.display,
        siteConfig.contact.email,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Contactformulier: versturen mislukt", err);
    return NextResponse.json(
      { error: "Versturen is niet gelukt, probeer het later opnieuw" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
