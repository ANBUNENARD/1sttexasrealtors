# 1st Texas Realtors

A Next.js 15 / React 19 / TypeScript redesign with Tailwind CSS v4, GSAP-ready motion, Sentry-ready observability, local realtor imagery, Railway Docker deployment, and Vercel compatibility.

## Run locally

```bash
bun install
bun run dev
```

Build for production with `bun run build`; run production with `node server.js`.

## Deploy to Vercel

Import the GitHub repository into Vercel. Vercel detects Next.js automatically.

Recommended settings:

- Framework preset: Next.js
- Build command: `bun run build` or `npm run build`
- Install command: `bun install` or `npm install`

For Vercel, use the Next.js framework and set the output directory to `.next`. Do not use `dist` or a rewrite to `index.html`.

The production source of truth is the Next.js app under `src/app/`. The legacy Vite-style files (`index.html`, `src/main.js`, and `src/style.css`) are retained as historical reference only and are not used by Vercel.

Optional environment variables:

- `NEXT_PUBLIC_SITE_URL` — canonical public URL used by metadata, sitemap, and robots.
- `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` — configure Sentry when ready for production credentials.
- `WEBHOOK_URL` or typed variants such as `WEBHOOK_URL_CONTACT`, `WEBHOOK_URL_NEWSLETTER`, and `WEBHOOK_URL_SCHEDULE` — receive form submissions through `/api/submit`.

## Railway / Docker

Railway uses `railway.toml` and the multi-stage `Dockerfile`. The container builds with Bun 1.3.4 and runs with Node 20 using `node server.js`.

Health endpoint: `/api/health`

Submissions use `/api/submit` and optional `WEBHOOK_URL_*` environment variables. Sentry remains disabled until `SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN` is configured.

> Image URLs are used as visual placeholders in this recreation. Replace them with licensed project assets before publishing.
