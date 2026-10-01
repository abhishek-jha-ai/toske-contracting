# Toske Contracting — website concept

A mobile-first sales demo for Toske Contracting, a licensed GC serving PA & NJ.
It's built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and `motion`, which is used only for the modal, the wizard steps and the explorer transitions.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production build
```

## Where to change things

| What | Where |
| --- | --- |
| Phone, WhatsApp, email, WhatsApp message | `src/config/site.ts` → `contact` |
| "Website Concept" label (on/off) | `src/config/site.ts` → `showDemoLabel` |
| Social preview title / description / image | `src/config/site.ts` → `seo` (rendered in `src/app/layout.tsx`) |
| OG preview image (1200×630) | `public/og-toske.jpg` |
| Site URL used for canonical / OG URLs | `NEXT_PUBLIC_SITE_URL` env var. On Vercel it falls back to the production domain automatically. |
| Projects, photos, categories, before/after pairs | `src/data/projects.ts` (photos live in `src/assets/projects/`) |
| Structured data (GeneralContractor) | `src/app/layout.tsx` |
| Favicon / app icons | `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/icon-*.png` |

## Estimate form

The wizard posts to `src/lib/leads.ts` → `/api/estimate` (`src/app/api/estimate/route.ts`).

- **Webhook / CRM** (Zapier, GoHighLevel, HubSpot, Make…): set `ESTIMATE_WEBHOOK_URL`. Each validated lead is POSTed there as JSON.
- **Formspree** (or another form backend): set `NEXT_PUBLIC_FORM_ENDPOINT`, and the browser posts straight to it.
- If neither is set, the API logs the request and returns success, which is the demo mode.

## Analytics

Every component calls `trackEvent()` from `src/lib/analytics.ts`, which is the only place that talks to analytics. It forwards to whatever is loaded (`dataLayer`/GTM, `gtag`, Meta Pixel `fbq`, Plausible). To turn on a provider, add its script in `layout.tsx`.

Events: `estimate_started`, `service_selected`, `project_viewed`, `before_after_used`, `estimate_submitted`, `phone_clicked`, `whatsapp_clicked`, `email_clicked`.

## Notes

- The before/after slider pairs each finished photo with a line drawing generated from that photo ("Design / Built"). It's a stand-in until real before photos are available. Add real pairs in `projects.ts`.
- Project titles and descriptions only describe what is visible in the photos. There are no addresses, budgets or client details.
