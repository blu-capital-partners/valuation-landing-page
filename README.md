# BCP Valuation Landing Page

Valuation landing page described in Part 0 of the *Valuation Business Line – Technical Ops Briefing v3*. React 19, TypeScript and Vite, deployed on Vercel from GitHub.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
```

### Preview with VS Code Live Server

```bash
npm run build:preview   # static build; form submissions are answered in the browser
```

Then click **Go Live** in the VS Code status bar. `.vscode/settings.json` serves `dist/` at http://127.0.0.1:5500 (Live Server picks the next free port if the Dashboard preview already uses 5500). Rebuild after each change; Live Server reloads automatically. Do not deploy a preview build: it never calls Power Automate.

Without VS Code, `npm run live` builds the preview and serves it with the same `live-server` engine at http://127.0.0.1:5501, reloading on each rebuild.

The dev server also serves `/api/quote`, `/api/whitepaper` and `/api/newsletter` using the same handlers Vercel runs in production. If no Power Automate URL is configured, the functions log the payload and return success (`dryRun: true`), so you can click through the whole page offline.

## How the page maps to the briefing

| Briefing (Part 0) | Where |
| --- | --- |
| Hero, headline, subheadline, CTA 1 and CTA 2 | `src/components/Hero.tsx` |
| CTA 1: email for the white paper | `src/components/WhitepaperDialog.tsx` → `server/whitepaper.ts` |
| How it works (3 steps) | `src/components/HowItWorks.tsx`, copy in `src/content.ts` |
| Pricing explanation | `src/components/Pricing.tsx` |
| Trust section (logos, testimonials, credentials) | `src/components/Trust.tsx` |
| Form 1, quotation request (section 0.2) | `src/components/QuoteSection.tsx` → `server/quote.ts` |
| Pricing logic, computed server-side | `src/shared/pricing.ts` |
| FAQ | `src/components/Faq.tsx` |
| Footer (GDPR, legal, privacy) | `src/components/Footer.tsx` |
| GA4, Meta Pixel, LinkedIn Insight Tag (0.4) | `src/lib/analytics.ts`, loaded only after cookie consent |
| GDPR consent wording (0.5) | `src/shared/formOptions.ts` |

## Quote flow

1. The visitor submits Form 1 on the page.
2. `POST /api/quote` validates the input, computes the fee with `src/shared/pricing.ts` and posts the lead to the Power Automate HTTP trigger in `POWER_AUTOMATE_QUOTE_WEBHOOK_URL`.
3. The page shows the estimated fee immediately. Power Automate sends the quotation email (section 0.3) with the Form 2 link.

Payload sent to Power Automate:

```json
{
  "source": "valuation-landing-page",
  "form": "form1_quotation_request",
  "submittedAt": "2026-09-15T19:00:00.000Z",
  "contact": { "firstName": "Ana", "lastName": "Pop", "fullName": "Ana Pop", "email": "ana@example.ro", "phone": "+40 721 000 000" },
  "company": { "name": "Example SRL", "industry": "IT & software", "revenueEurM": 12 },
  "valuationPrice": 7000,
  "priceBreakdown": { "baseEur": 4000, "revenueAddOnEur": 3000, "employeeAddOnEur": 0, "totalEur": 7000 },
  "consent": { "given": true, "text": "I consent to the processing of my personal data for the purpose of receiving a valuation quotation.", "at": "2026-09-15T19:00:00.000Z" },
  "attribution": { "utm_source": "linkedin", "landingPage": "/", "referrer": "" }
}
```

Use this as the JSON schema of the "When an HTTP request is received" trigger. Because the price arrives in the payload, the flow does not need to repeat the pricing rules.

To embed the Microsoft Form instead of the native form, set `VITE_MS_FORM1_EMBED_URL`. The page then renders the form in an iframe, and pricing moves back into Power Automate.

## Deploy to Vercel from GitHub

The repository is ready to push; `git init` has been run and everything is committed locally.

```bash
# 1. create an empty repository on github.com (no README, no .gitignore)
# 2. then, from this folder:
git remote add origin git@github.com:<org>/<repo>.git
git push -u origin main
```

In Vercel: **Add New → Project → Import Git Repository**, pick the repo and deploy. `vercel.json` sets the framework (Vite), the build command (`npm run build`), the output directory (`dist`) and the security headers, so the defaults need no changes.

Before the first production deploy, add the environment variables from `.env.example` under **Settings → Environment Variables** (Production and Preview). Without them the functions run in dry-run mode: they log the payload and report success without calling Power Automate.

| Path | File | Purpose |
| --- | --- | --- |
| `/api/quote` | `api/quote.ts` → `server/quote.ts` | Form 1 |
| `/api/whitepaper` | `api/whitepaper.ts` → `server/whitepaper.ts` | White paper email |
| `/api/newsletter` | `api/newsletter.ts` → `server/newsletter.ts` | Footer newsletter |

Each file in `api/` is a Vercel Function; it wraps the Web-standard handler in `server/` through `server/vercel.ts`, so the same code runs locally under Vite and on Vercel. Functions run on Node 20 or newer (`engines` in `package.json`).

GDPR note: the briefing requires EU data residency. In Vercel, set the function region to an EU one (for example `fra1`, Frankfurt) under **Settings → Functions**.

## Configuration

Copy `.env.example` to `.env` locally, or set the same variables in the Vercel project (Settings → Environment Variables).

| Variable | Scope | Purpose |
| --- | --- | --- |
| `POWER_AUTOMATE_QUOTE_WEBHOOK_URL` | server | Form 1 trigger |
| `POWER_AUTOMATE_NEWSLETTER_WEBHOOK_URL` | server | Footer newsletter trigger |
| `POWER_AUTOMATE_WHITEPAPER_WEBHOOK_URL` | server | White paper trigger |
| `VITE_MS_FORM1_EMBED_URL` | browser | Optional Microsoft Form iframe |
| `VITE_GA4_ID`, `VITE_META_PIXEL_ID`, `VITE_LINKEDIN_PARTNER_ID`, `VITE_LINKEDIN_CONVERSION_ID` | browser | Tracking tags |

In production (`VERCEL_ENV=production`) a missing webhook URL returns an error instead of a dry run; elsewhere the payload is logged and the call reports `dryRun: true`.

## Open items

- Pricing tiers are provisional ("TBD further"). Edit `src/shared/pricing.ts`; the page and the function both read it.
- The form collects company, first name, last name, work email and annual revenue (required), plus phone and industry (optional). Fields from the briefing that are no longer asked: website, CUI, employee count and preferred email language — so the quotation email needs a default language.
- The terms URL (`https://blucp.com/terms-and-conditions/`) returns 404. Update `CONTACT.termsUrl` in `src/content.ts`.
- The DocSend white paper link lives in the Power Automate email, not in this code.
- Confirm whether fees are shown with or without VAT.
- Hosting must keep data in the EU or with a GDPR-compliant partner (section 0.5). Set the Vercel function region to `fra1` or another EU region.
- Client logos and testimonials are copied from blucp.com and valuation.blucp.com; confirm they may be reused on this page.
