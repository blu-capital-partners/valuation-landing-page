# To Be Changed

Write whatever you want changed below. Plain language is fine - no need for
technical wording, file names or code. Describe the result you want and I will
work out which files it touches.

Anything still listed under "Requested" is work I have not done yet; I move
items to "Done" as I ship them.

Useful to include when you have it:
- Which part of the page it affects (hero, pricing, FAQ, the quote form, footer).
- The exact wording, if the change is copy. Paste the final text you want.
- Why, if it is not obvious. Helps me make the right call on details you did not
  mention.

---

## Requested

<!-- Add your items below this line. One per bullet. -->

## Done

Shipped 2026-09-17 (sixth round):

- Removed the scroll assistant entirely

Shipped 2026-09-17 (fifth round):

- Section padding is one value everywhere: all eight bands are 112px top and
  bottom, where the hero was 72px and the footer 64/0
- Removed the chevron scroll control
- Translations no longer break the layout: the header keeps one row, the hero
  punctuation stays attached, and the counter is exempt from translation
- The stats counter animates when it scrolls into view
- "Our clients" now comes before the testimonials, which have their own heading
- The email in the FAQ is a mailto link
- The footer fills the screen like every other band
- The arrow on "Accurate" is drawn as a real arrow and is visible at rest

Shipped 2026-09-16 (fourth round):

- "Get my quote" no longer wraps to two lines on mobile; the button fits the
  header again
- The mobile language selector is now a wheel in the manner of an iOS picker:
  it scrolls under a fixed selection band, snaps to a row and applies once it
  settles. The desktop switcher is unchanged

Shipped 2026-09-16 (third round):

- "Valuations founders and CFOs rely on" and the counter now sit in their own
  section; the testimonials and "Our clients" moved to a section of their own
- The carousel hover highlight is contained inside the card, so nothing can
  reach a neighbour. See the note below about which site you were testing
- The copyright line is centred under the footer logo, gap closed from 14px to
  6px
- On mobile the three hero claims share one left edge, so "Accurate" is no
  longer pushed out of line

Shipped 2026-09-16 (second round):

- The supporting text, the buttons and the line below them are left-aligned
- Added the scroll-to-next-section control from blucp.com; every section fills
  the screen with its content centred
- Hovering a carousel logo no longer lets it overlap its neighbours
- Opening an FAQ question closes whichever one was already open
- Footer shortened to blucp.com's density: 788px against their 900px, down
  from 985px

Shipped 2026-09-16:

- Logo redirects to https://blucp.com
- "Representative of M&A Worldwide" redirects to https://m-a-worldwide.com/
- Removed the circle behind the three hero icons; icons and their text are
  larger, capped at the H4/H5 step of the type scale
- Centred the supporting text, the two buttons and the line beneath them, and
  levelled the block with the looping video
- "From EUR 4,000. Report in 10 business days..." is now italic and smaller
- Each section fills the screen, following the blucp.com pattern
- Defined a full heading hierarchy from H1 to H6
- Every logo in the carousel links to that client's own site
- Required fields in the quote form are marked with an asterisk
- The FAQ accordion opens and closes with a smooth animation
- Added the language switcher used on blucp.com (DE / ES / FR / EN)
