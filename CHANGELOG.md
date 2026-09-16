# Changelog

All notable changes to the BCP Valuation Landing Page are recorded here.
Newest entries first. Dates are ISO format (YYYY-MM-DD).

This project follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## [Unreleased]

Nothing yet.

## [0.4.0] - 2026-09-16

Four follow-up changes requested in `TO-BE-CHANGED.md`.

### Changed

- The trust block is now two sections. "Valuations founders and CFOs rely on"
  keeps the introduction and the credentials counter, centred on its own screen;
  the testimonials and the "Our clients" carousel move to a new `#clients`
  section on the pale ground. The page is now seven full-screen sections.
- Hovering a logo in the client carousel no longer paints outside the card. The
  outward drop shadow is replaced by an inset ring, so the highlight is bounded
  by the card's own box whatever its neighbours do.
- The footer copyright is centred beneath the logo, and the gap between them
  drops from 14px to 6px.

### Fixed

- On screens narrower than 761px the three hero claims are stacked and share one
  left edge. They were each centred individually, so "Accurate" - the widest at
  325px against roughly 215px for the others - sat about 54px further left than
  the rest. All three icons now start at the same x.

## [0.3.0] - 2026-09-16

Five follow-up changes requested in `TO-BE-CHANGED.md`.

### Added

- A scroll-to-next-section control, following the one on blucp.com: a round
  chevron pinned to the bottom of the viewport with a slow bob. It advances from
  whichever section you are in rather than only off the hero, inverts to white
  over the navy quote section, and steps aside at the foot of the page and while
  the cookie banner is showing.

### Changed

- The hero's supporting text, its two buttons and the line below them are
  left-aligned again. The block still sits level with the looping video.
- The footer matches blucp.com's vertical density. Measured at 1440x900 it is
  now 788px against their 900px, down from 985px, through tighter list rows,
  newsletter spacing and legal band. No links were removed.

### Fixed

- Hovering a logo in the client carousel no longer lets it overlap its
  neighbours. The hover lift is gone; the card keeps its 20px gaps and changes
  only its border and ground, raised a layer so its shadow is not clipped.
- Opening an FAQ question now closes whichever one was already open, so only one
  answer is visible at a time.

## [0.2.0] - 2026-09-16

Eleven changes requested in `TO-BE-CHANGED.md`, covering navigation, hero
layout, typography, the client carousel, the quote form and translation.

### Added

- Language switcher in the header, offering German, Spanish, French and English.
  It mirrors blucp.com: the alternatives slide out on hover or focus, and the
  translation is driven by Google Translate through the `googtrans` cookie. The
  engine is loaded only when a non-English translation is active, so English
  visitors never run it.
- Every client logo in the carousel now links to that client's own website,
  opening in a new tab. Thirty-six of the thirty-seven logos are linked; Agro
  Farming has no published address, so it stays unlinked rather than guessed.
- A full heading scale from H1 to H6, each level a clear step below the one
  above it, replacing a scale that defined only H1 to H3.
- Required fields in the quotation form are marked with an asterisk, alongside a
  legend explaining the marker.

### Changed

- The logo links to blucp.com, and "Representative of M&A Worldwide" links to
  m-a-worldwide.com. They are now two separate links rather than one nested
  inside the other.
- The three hero claims lost the circular background behind their icons. The
  icons are larger, and their titles and supporting lines are larger too, capped
  at the H4/H5 step of the scale.
- The hero's supporting text, its two buttons and the line below them are
  centred, and the block now sits level with the looping video.
- The price line under the hero buttons is italic and smaller, so it reads as a
  footnote to the buttons rather than as body copy.
- Each section fills the viewport and centres its content, with proximity
  scroll-snapping, following the pattern defined on blucp.com. The hero
  subtracts the sticky header's height so its last line is not clipped. Both are
  disabled below 761px wide or 640px tall, where content is taller than the
  screen.
- "Our clients" now follows the H3 size rather than sitting between H2 and H3.

### Fixed

- The FAQ accordion opens and closes with an animation. `<details>` gives no
  transition of its own, so the panel height is animated directly and the
  element is held open for the length of the closing animation.

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
