"use server";

import { site } from "@/content/site";

export type LeadState = {
  status: "idle" | "success" | "fallback" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "message", string>>;
  whatsappText?: string;
};

function field(formData: FormData, key: string, max = 500) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

/**
 * Sends a lead by email through Resend when RESEND_API_KEY is configured.
 * Without it (or if sending fails) the visitor is offered to send the same
 * details over WhatsApp, so no lead is lost.
 */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: real visitors never fill this field.
  if (field(formData, "company")) return { status: "success" };

  const name = field(formData, "name", 80);
  const phone = field(formData, "phone", 30);
  const service = field(formData, "service", 80);
  const city = field(formData, "city", 60);
  const message = field(formData, "message", 2000);

  const errors: LeadState["errors"] = {};
  if (name.length < 2) errors.name = "נשמח לדעת איך לפנות אליכם";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 12) errors.phone = "נראה שמספר הטלפון חסר או שגוי";
  if (Object.keys(errors).length) return { status: "error", errors };

  const lines = [
    `שם: ${name}`,
    `טלפון: ${phone}`,
    service && `שירות: ${service}`,
    city && `עיר: ${city}`,
    message && `פרטים: ${message}`,
  ].filter(Boolean) as string[];
  const text = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { status: "fallback", whatsappText: `שלום, הגעתי מהאתר:\n${text}` };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "99 פרסום — אתר <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        subject: `פנייה חדשה מהאתר — ${name}`,
        text: `${text}\n\nנשלח מהטופס באתר ${site.url}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { status: "success" };
  } catch (err) {
    console.error("[contact] failed to send lead", err);
    return { status: "fallback", whatsappText: `שלום, הגעתי מהאתר:\n${text}` };
  }
}
