/**
 * Short WhatsApp link for leads: 99pirsum.com/yoni-whatsapp opens a chat with a
 * pre-filled message saying who referred them. Done as a route (not a
 * next.config redirect) because config redirects decode the Hebrew text into
 * the Location header, which Node rejects.
 */
const message = "הגעתי דרך רחלי ואני מעוניין לקבל עוד פרטים על האתר";
const target = `https://wa.me/972543971020?text=${encodeURIComponent(message)}`;

export function GET() {
  return new Response(null, { status: 302, headers: { Location: target } });
}
