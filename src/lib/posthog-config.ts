/**
 * PostHog project settings, shared by the browser setup (src/instrumentation-client.ts)
 * and the /ingest proxy (next.config.ts). The project key is public by design (it can only
 * send events, not read them), so it lives in the code rather than in an env var.
 * Events go through our own domain so ad blockers and content filters that block
 * posthog.com don't drop them.
 */
export const posthogConfig = {
  key: "phc_yk9wXf4GzoWUkGG7A5BijS6jaQhAeCYApfvSGQfy7J4x",
  /** "eu" or "us": must match the region the PostHog project was created in */
  region: "eu" as "eu" | "us",
  apiPath: "/ingest",
};

export const posthogHosts = {
  api: `https://${posthogConfig.region}.i.posthog.com`,
  assets: `https://${posthogConfig.region}-assets.i.posthog.com`,
  ui: `https://${posthogConfig.region}.posthog.com`,
};
