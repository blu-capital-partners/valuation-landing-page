# Changelog

All notable changes to the BCP Valuation Landing Page are recorded here.
Newest entries first. Dates are ISO format (YYYY-MM-DD).

This project follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## [Unreleased]

Nothing yet.

## [0.1.0] - 2026-09-16

Initial landing page, built to Part 0 of the *Valuation Business Line - Technical
Ops Briefing v3*.

### Added

- Landing page in React 19, TypeScript and Vite: hero, how-it-works, pricing,
  trust, FAQ and footer sections, with copy centralised in `src/content.ts`.
- Quotation request form with pricing computed server-side in
  `src/shared/pricing.ts`.
- White paper request dialog and newsletter signup.
- Three serverless endpoints deployed on Vercel - `/api/quote`,
  `/api/whitepaper` and `/api/newsletter` - sharing handlers with the dev server
  so the page behaves the same locally and in production.
- Power Automate integration, with a dry-run mode that logs the payload and
  returns success when no webhook URL is configured.
- GDPR cookie consent banner. GA4, Meta Pixel and LinkedIn Insight Tag load only
  after consent is given.
- Static preview build (`npm run build:preview`) that answers form submissions in
  the browser, for review without a backend.
