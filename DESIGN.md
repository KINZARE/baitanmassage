# Baitan × Remedy — White Editorial Wellness

Approved direction: use Remedy Place as a benchmark for premium wellness rhythm, image-first discovery and interaction mechanics while keeping Baitan's own brand, business truth, treatments, booking and photography authoritative.

## Core rule

**Remedy mechanics, Baitan soul.** Borrow interaction patterns and editorial pacing, not Remedy Place branding, copy, photography or proprietary assets.

The permanent page canvas is always fully opaque `#FFFFFF`. Visual hierarchy comes from scale, spacing, photography, Espresso typography, Clay actions and thin warm rules — never beige/dark section backgrounds, gradients or glow.

## Tokens

| Semantic token | Value | Purpose |
| --- | --- | --- |
| color-bg-primary | #FFFFFF | Permanent page background |
| color-surface-secondary | #FFFFFF | Secondary persistent surfaces |
| color-surface-muted | #FFFFFF | Former muted section surfaces |
| color-text-primary | #2B211C | Espresso headings/body/footer |
| color-brand-accent | #B56F4C | Clay primary actions |
| color-text-secondary | #6C5143 | Warm Brown supporting text |
| color-border | #C4AE95 | Warm structural separators |
| color-accent-hover | #C17E59 | Clay hover state |
| color-focus | #805039 | Visible focus on white |
| color-error | #8A332A | Error state |
| color-success | #42573D | Confirmation state |

Clay buttons use deep Espresso text `#190F0A`. Warm tones are accents and control states, not persistent section backgrounds.

## Typography and composition

- Newsreader: display/headings; intentionally oversized and editorial.
- Manrope: body, navigation, prices, forms and practical information.
- Baitan logo remains the existing mark/wordmark; it is not replaced by a Remedy-like identity.
- Desktop content may expand to roughly 1440px with fluid gutters; phone gutters remain about 20px.
- Photos keep square/near-square edges. Avoid generic rounded-card design.
- Large sections use generous vertical rhythm (roughly 88–156px desktop) and thin rules for separation.
- Primary buttons may use pill geometry; content cards do not become pill/card-heavy UI.

## Header and menu

The sticky header stays white at every scroll position. It carries the Baitan brand, direct navigation, booking action and a compact menu trigger.

The menu trigger opens a full-height white editorial overlay grouped into **Ontdek**, **Plan** and **Baitan**. Links use large Newsreader typography with restrained positional stagger. Escape closes the overlay, focus stays inside while open and returns to the trigger after close.

## Hero

The hero is the strongest visual moment:
- approximately 82–92% viewport impact on desktop;
- oversized Newsreader headline;
- minimal supporting copy;
- one dominant booking action;
- one treatment-discovery link;
- small location context;
- large existing Baitan treatment image.

Motion is limited to a small load settle, pointer scale and about 10px of scroll-linked image travel. Mobile always shows copy first and image second.

## Treatment experience

Treatment cards are the signature interaction.

Resting state shows the real image, treatment name and starting price. On pointer hover, keyboard focus or touch reveal, the existing description, duration/prices and detail/booking actions expand in place. No business data is duplicated in JavaScript.

Touch rule: first tap on the treatment image reveals the card; a later action tap may open the existing treatment dialog/page or booking destination. The reveal intercepts the first touch before the legacy modal handler.

Motion limits:
- card lift: max 4px;
- button lift: max 2px;
- image scale: 1.01–1.025;
- arrow travel: about 4px;
- content positional reveal: generally 10–18px.

## Remaining homepage rhythm

- Brand statement: oversized, sparse typography on white.
- About/Baitan experience: large image + statement + truthful facts only.
- Massage choice: preserve existing algorithm; style as a calm guided decision surface.
- Prices: large editorial horizontal rows; stack cleanly on mobile.
- Gallery: asymmetric image rhythm, no carousel.
- Reviews: typographic/aggregate-first; never invent quotes.
- Gift card: image + concise copy + existing destination.
- FAQ: large accessible rows, existing accordion behavior.
- Contact/map: practical editorial layout; Google Maps remains consent-gated.
- Closing booking section: oversized white CTA moment.
- Footer: fully white and minimal.

## Progressive enhancement

`assets/styles-base.css` and `assets/app-base.js` remain the proven baseline. Top-level `styles.css` and `app.js` supply the Remedy-inspired layer.

Essential treatment content is rendered in HTML and remains available without the new interaction layer. JavaScript adds menu focus management, touch treatment reveal, in-view motion, header state and restrained hero motion.

## Accessibility and reduced motion

- visible focus states remain mandatory;
- menu, treatment interactions, FAQ and dialogs remain keyboard-operable;
- touch has an equivalent for every hover-only discovery pattern;
- `prefers-reduced-motion: reduce` removes non-essential animation/transform behavior without removing functionality;
- no scroll-jacking, wheel interception or required autoplay video;
- interaction targets should remain approximately 44px or larger where practical.

## Business/content constraints

Do not alter or invent:
- treatment names, descriptions, durations or prices;
- address, contact details, opening hours or business identifiers;
- Salonized booking destination/integration;
- review content beyond existing verified aggregate/source data;
- salon/staff/interior claims not supported by current assets/data;
- canonical routes or SEO business facts.

Every route — homepage, treatment pages, prices, contact and legal pages — inherits the same white editorial system.
