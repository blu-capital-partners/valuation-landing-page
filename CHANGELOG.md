# Changelog

All notable changes to the BCP Valuation Landing Page are recorded here.
Newest entries first. Dates are ISO format (YYYY-MM-DD).

This project follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## [Unreleased]

Nothing yet.

## [0.6.1] - 2026-09-17

### Removed

- The scroll assistant. The return-to-top button added in 0.6.0 is gone, along
  with its styles and the rule that hid it behind the cookie banner. Nothing now
  floats over the page except the cookie banner itself.

## [0.6.0] - 2026-09-17

Nine follow-up changes requested in `TO-BE-CHANGED.md`.

### Added

- A return-to-top button, which appears once the visitor is roughly a screen
  down and is skipped by keyboard focus while hidden.
- The credential figures count up when they scroll into view, easing into the
  final number. Figures are parsed out of their copy, so prefixes and suffixes
  such as "1m+" survive, and someone who asks for reduced motion sees the final
  value immediately.
- A heading over the testimonials, which previously followed the credentials
  with nothing introducing them.

### Changed

- Every band now carries the same 112px top and bottom padding. The hero was
  72px and the footer 64px over 0.
- The footer fills the viewport and centres its content, like the other bands.
- The clients carousel moves above the testimonials.
- The scroll control is a return-to-top rather than a scroll-to-next chevron.
- The arrow on the "Accurate" icon is redrawn as a real arrow - shaft, solid
  head landing in the bullseye, fletching at the tail - and is drawn at rest
  rather than appearing only on hover, where it previously also faded out again
  on a loop.

### Fixed

- Translations no longer break the layout. Three separate causes: header nav
  items and the call to action wrapped onto a second row once translated, so
  they are held on one line with a flexing gap; the comma and full stop in the
  hero headline sat outside their emphasised phrases, and Google Translate,
  which translates each text node separately and rejoins them with a space,
  stranded them as "Unternehmensbewertung , geprüft"; and the credential figures
  froze at zero because Translate replaces the text nodes it touches, leaving
  React writing to detached ones. The figures are now marked `translate="no"`
  and rendered as a single text node.
- The support address in the FAQ answer is a mailto link.

## [0.5.0] - 2026-09-16

Two follow-up changes requested in `TO-BE-CHANGED.md`.

### Added

- On screens narrower than 761px the language selector is a wheel in the manner
  of an iOS picker, following Apple's Pickers guidance: tapping the current
  language opens a list that scrolls under a fixed selection band, snaps to a
  row, and applies the language once the scrolling settles. Rows fade toward the
  edges so the band reads as the selection, a row can also be tapped directly,
  and Escape or a tap outside closes it. The header has no room for a wheel
  inline, so it opens as a popover beneath it. The desktop switcher, where the
  alternatives slide out on hover, is unchanged.

### Fixed

- "Get my quote" wrapped onto two lines on mobile, making the button 52px tall
  inside a 77px header. It is held on one line and the header row's gap is
  tightened, so the button is 121x40 and sits within the header.

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
