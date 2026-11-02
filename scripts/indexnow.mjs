/**
 * Tells Bing, Yandex and the other IndexNow engines that pages changed, so they
 * recrawl within minutes instead of weeks. Run after a deploy has gone live:
 *
 *   npm run indexnow                      # every URL in the live sitemap
 *   npm run indexnow -- /blog/new-post    # only these paths
 *
 * The key is public by design: the engines verify it at https://99pirsum.com/<key>.txt
 */
const host = "99pirsum.com";
const key = "3f94b9a59286847816de3859069c03bc";

const paths = process.argv.slice(2);
const urls = paths.length
  ? paths.map((p) => new URL(p, `https://${host}`).toString())
  : [...(await (await fetch(`https://${host}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const keyFile = await fetch(`https://${host}/${key}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== key) {
  console.error(`The key file is not live at https://${host}/${key}.txt yet. Deploy first.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});

// 200 = accepted, 202 = accepted and the key is still being verified
console.log(`${res.status} ${res.statusText}: submitted ${urls.length} URL(s)`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
