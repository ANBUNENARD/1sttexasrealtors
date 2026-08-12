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

## Railway / Docker

Railway uses `railway.toml` and the multi-stage `Dockerfile`. The container builds with Bun 1.3.4 and runs with Node 20 using `node server.js`.

Health endpoint: `/api/health`

Submissions use `/api/submit` and optional `WEBHOOK_URL_*` environment variables. Sentry remains disabled until `SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN` is configured.

> Image URLs are used as visual placeholders in this recreation. Replace them with licensed project assets before publishing.
