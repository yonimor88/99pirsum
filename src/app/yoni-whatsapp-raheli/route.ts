/**
 * Short WhatsApp link for leads: 99pirsum.com/yoni-whatsapp-raheli opens a chat with a
 * pre-filled message saying who referred them. Done as a route (not a
 * next.config redirect) because config redirects decode the Hebrew text into
 * the Location header, which Node rejects.
 *
 * Link-preview bots (WhatsApp, Facebook, Telegram...) get a small HTML page with
 * our own Open Graph tags instead of the redirect, so the shared link shows our
 * preview rather than WhatsApp's generic one. People are redirected straight away.
 */
const message = "הגעתי דרך רחלי ואני מעוניין לקבל עוד פרטים על האתר";
const target = `https://wa.me/972543971020?text=${encodeURIComponent(message)}`;

const preview = {
  title: "יוני מורדכיוב · 99 פרסום ומדיה",
  description: "בניית אתרים ודפי נחיתה לעסקים. לחצו כאן לשיחה איתי בוואטסאפ",
  image: "https://99pirsum.com/opengraph-image.png",
  url: "https://99pirsum.com/yoni-whatsapp-raheli",
};

const previewBots =
  /whatsapp|facebookexternalhit|facebot|telegrambot|twitterbot|slackbot|discordbot|linkedinbot|skypeuripreview|googlebot|bingbot|applebot|pinterest|vkshare|embedly/i;

export function GET(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (!previewBots.test(userAgent)) {
    return new Response(null, {
      status: 302,
      headers: { Location: target, "Cache-Control": "no-store" },
    });
  }

  const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<title>${preview.title}</title>
<meta name="description" content="${preview.description}">
<meta name="robots" content="noindex">
<meta property="og:type" content="website">
<meta property="og:locale" content="he_IL">
<meta property="og:site_name" content="99 פרסום ומדיה">
<meta property="og:title" content="${preview.title}">
<meta property="og:description" content="${preview.description}">
<meta property="og:url" content="${preview.url}">
<meta property="og:image" content="${preview.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
</head>
<body><a href="${target}">${preview.description}</a></body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
