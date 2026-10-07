# Baitan × Remedy Place — Redesign Specification

Date: 2026-10-07
Status: proposed design, approved direction pending written-spec review
Repository: `KINZARE/baitanmassage`
Target production service: existing Render static site `baitanmassage`

## 1. Intent

Redesign the existing Baitan Thai Massage website so it feels as polished, calm, editorial and interaction-rich as Remedy Place, while remaining unmistakably Baitan.

The redesign must borrow interaction patterns, visual rhythm and UX mechanics rather than copying Remedy Place's protected branding, copy, photography or unique assets. Baitan's own logo, content, treatment data, prices, booking provider, contact information, routes and photography remain authoritative.

Success means the site feels materially more premium and immersive, but is still faster to understand and easier to book than a generic luxury-wellness website.

## 2. Non-negotiable constraints

1. Keep the existing repository and static Python build architecture. Do not rewrite the project from scratch.
2. Preserve `data/site.json` and `data/treatments.json` as business-data sources of truth.
3. Preserve Salonized as the production booking destination. QA must never create a real appointment.
4. Preserve all existing canonical routes, SEO metadata, treatment facts, prices, contact details, gift-card behavior, legal pages, WhatsApp, map consent and working integrations.
5. Every persistent page surface remains fully opaque `#FFFFFF`.
6. Baitan colors remain restrained accents: Espresso/dark brown for typography, Clay `#B56F4C` for primary action emphasis, warm brown for secondary text and supporting borders.
7. No gradients, neon, glow-heavy effects, gaming/AI aesthetics, decorative badges, invented testimonials or fabricated business claims.
8. Motion must never hide content, block reading or hijack scrolling. `prefers-reduced-motion` must be fully respected.
9. The redesign must work with keyboard, touch and pointer input.
10. Existing real imagery must be reused unless new approved Baitan imagery is supplied later.

## 3. Design principle

### “Remedy mechanics, Baitan soul”

Use Remedy Place as a benchmark for:
- generous editorial spacing;
- oversized typographic hierarchy;
- image-first treatment discovery;
- hover/touch/keyboard reveal interactions;
- premium full-width section transitions;
- restrained sticky navigation behavior;
- strong booking proximity;
- calm but noticeable scroll choreography.

Do not reproduce Remedy Place's brand identity. The Baitan result should be recognizable as a Thai massage salon in Capelle aan den IJssel, not as a social wellness club.

## 4. Information architecture

The homepage remains a single persuasive journey with the following order:

1. Header / navigation
2. Hero
3. Brand statement
4. Treatment experience grid
5. Massage-choice helper
6. Baitan experience / about composition
7. Prices
8. Why Baitan / proof facts
9. Editorial gallery
10. Reviews
11. Gift card
12. FAQ
13. Contact / location
14. Closing booking CTA
15. Minimal white footer

Inner treatment, legal and utility pages keep their existing routes but adopt the same typography, spacing, motion and white-surface system.

## 5. Header and navigation

### Desktop

The sticky header is visually minimal and fully white. It contains:
- Baitan brand at left;
- primary navigation in the middle;
- a compact persistent booking action at right.

The header becomes slightly tighter after scroll through spacing/border/shadow changes only. It must stay fully opaque white.

### Navigation overlay

Selecting the main menu or treatment navigation opens a large editorial overlay rather than a small dropdown.

Recommended groups:

**Ontdek**
- treatments generated from real treatment data;
- massage choice helper.

**Plan**
- prijzen;
- openingstijden;
- contact/route;
- boeken.

**Baitan**
- over Baitan;
- cadeaubon;
- reviews;
- FAQ.

Overlay motion:
- background appears immediately;
- links stagger in by small positional offsets;
- no opacity-dependent content hiding for essential information;
- escape closes;
- focus is trapped appropriately while open;
- mobile uses the same information architecture in a full-height menu.

## 6. Hero

The hero should occupy approximately 82–92% of the first desktop viewport while remaining compact enough to show the next section cue.

Composition:
- oversized Newsreader headline;
- minimal supporting copy;
- one dominant booking CTA;
- one secondary treatment-discovery link;
- location/opening context in small UI text;
- large Baitan treatment image.

Motion:
- headline and support content settle into place on first load;
- hero image has very restrained pointer and scroll scale/parallax;
- no autoplay video requirement;
- no scroll-jacking;
- mobile shows copy first, image second, with no clipping.

## 7. Treatment experience grid

This is the signature interaction of the redesign.

Each treatment becomes an image-led editorial card generated from the current treatment dataset.

### Resting state
- large image;
- treatment name;
- starting price or concise real price summary;
- minimal visible metadata.

### Expanded state
Triggered by hover, keyboard focus or touch activation:
- image scales subtly;
- content panel reveals concise existing description;
- duration/price options become visible;
- “Bekijk behandeling” appears;
- direct booking action appears;
- directional arrow moves a few pixels;
- card may lift a maximum of 4px.

Touch behavior must be deterministic: first tap reveals, action links remain separately tappable, and no information is hover-only.

Keyboard behavior must expose the same information without requiring pointer hover.

## 8. Massage-choice helper

Keep the existing working choice-helper logic and business semantics.

Restyle it as a premium guided decision surface:
- large question typography;
- fewer visible controls at once;
- thin progress indicator;
- clear selected state;
- smooth height/position transitions;
- white background only;
- Clay used only for chosen/primary action emphasis.

No algorithmic behavior should change unless required by an identified bug.

## 9. About / Baitan experience

Replace generic “about card” treatment with an editorial image-and-copy composition.

Use:
- one large treatment image;
- one oversized statement;
- concise facts such as location, approach and booking practicality only when already supported by current data.

No invented staff biographies, interior claims or history.

## 10. Pricing

Pricing remains authoritative from current data.

Presentation becomes a refined list rather than a dense table:
- one treatment per horizontal row;
- name left;
- durations and prices right;
- subtle hover/focus emphasis;
- direct booking affordance;
- clean separators;
- mobile stacks without horizontal overflow.

No price may be hard-coded outside the existing business-data flow.

## 11. Gallery

The gallery becomes asymmetrical and editorial, with larger image spans and varied rhythm while keeping the persistent page background white.

Interactions:
- restrained image scale on pointer hover;
- small in-view positional reveal;
- optional subtle parallax only when it does not harm performance;
- no carousel requirement.

## 12. Reviews

Use only existing verified review content/data already present in the project.

Presentation should be typographic and spacious rather than card-heavy. If existing review data is only aggregate rather than full quotes, show the aggregate honestly and do not invent quotations.

## 13. Gift card

Keep existing gift-card behavior and destination.

Redesign as a strong image-plus-copy moment with:
- one short statement;
- one CTA;
- restrained supporting copy;
- no dark section background.

## 14. FAQ

Keep the existing accordion functionality.

Refine interaction:
- larger click/tap targets;
- smooth but fast expansion;
- icon rotation;
- strong keyboard and focus treatment;
- no unnecessary card borders or shaded backgrounds.

## 15. Contact and location

Keep current address, hours, phone, route, map-consent logic and WhatsApp behavior.

The contact section should feel editorial rather than form-like:
- structured business details;
- opening hours with clear rhythm;
- map remains consent-gated;
- all surfaces white.

## 16. Closing booking CTA and footer

### Closing CTA

Use a full-width but white section with oversized typography and one dominant booking action. Visual separation comes from scale, spacing and borders, not background color.

### Footer

The footer remains fully white and minimal:
- brand;
- contact;
- route/legal links;
- opening hours if already present;
- no dark footer background.

## 17. Interaction system

The interaction layer should be centralized in the existing top-level `app.js` and progressive enhancement must remain intact.

Required patterns:
- sticky-header scroll state;
- menu-overlay open/close/focus management;
- in-view positional reveals;
- treatment-card reveal state for hover/focus/touch;
- image scale/parallax with strict limits;
- animated arrows/underlines;
- FAQ transitions;
- button press/lift feedback;
- reduced-motion fallback;
- no scroll-jacking.

Motion limits:
- content travel generally 8–24px;
- card lift max 4px;
- button lift max 2px;
- image scale generally 1.01–1.025;
- stagger delays short and capped;
- essential content must remain readable without JavaScript.

## 18. Responsive behavior

### Desktop ≥ 1100px
- full editorial compositions;
- large treatment grid;
- large navigation overlay;
- subtle pointer motion.

### Tablet 700–1099px
- reduced spacing and type scale;
- two-column treatment layouts where practical;
- overlay/menu remains touch-first.

### Mobile ≤ 699px
- copy-first hero;
- single-column treatment experience;
- tap-to-reveal cards;
- full-height navigation overlay;
- sticky booking affordance may remain if it does not cover content;
- no horizontal scrolling;
- minimum practical interactive target approximately 44px.

## 19. Accessibility

Must preserve or improve:
- semantic headings;
- skip link;
- visible focus states;
- keyboard-operable menus/cards/FAQ/dialogs;
- appropriate ARIA for expanded states;
- focus return after overlays/dialogs close;
- reduced-motion support;
- color contrast suitable for normal and small text;
- touch equivalents for hover interactions.

## 20. Performance

The redesign must stay lightweight.

Rules:
- no large animation framework unless native CSS/JS cannot reasonably achieve the required effect;
- prefer CSS transforms and IntersectionObserver;
- preserve optimized WebP assets and existing preloading strategy;
- avoid layout-thrashing scroll handlers;
- no autoplay background video added by default;
- no new third-party runtime dependency solely for visual polish.

## 21. Files expected to change during implementation

Primary:
- `index.template.html`
- `build.py`
- `styles.css`
- `app.js`
- `DESIGN.md`
- `tests/test_visual_contract.py`

Possibly:
- shared base CSS/JS only if existing behavior cannot be safely overridden;
- data schemas only if required for already-existing treatment metadata presentation, never to invent business facts.

## 22. Architecture and data flow

1. `data/site.json` and `data/treatments.json` remain business-data sources.
2. `build.py` renders homepage and inner-page semantic markup from those sources.
3. `index.template.html` remains the shared page shell.
4. `assets/styles-base.css` and `assets/app-base.js` continue providing proven baseline behavior unless a specific interaction is intentionally replaced.
5. top-level `styles.css` becomes the Remedy-inspired Baitan presentation layer.
6. top-level `app.js` becomes the progressive enhancement/motion layer.
7. `build.py` emits `dist/` exactly as the current Render service expects.

No server-side application layer, database or new booking backend is introduced.

## 23. Testing strategy

### Automated contract tests

Add or extend tests that verify:
- persistent backgrounds remain white;
- hero remains responsive;
- treatment reveal markup/classes exist;
- menu overlay markup and accessibility attributes exist;
- reduced-motion path exists;
- no scroll-jacking behavior is introduced;
- existing booking links and critical routes remain present;
- generated assets/build output remain valid.

### Build checks

Must pass:
- visual contract unittest suite;
- `npm run build`;
- existing WebP validation;
- SEO output validation;
- generated-asset verification.

### Browser QA

At minimum:
- desktop around 1440px;
- tablet around 768–1024px;
- mobile around 390px;
- keyboard navigation;
- menu overlay open/close;
- treatment reveal via pointer, focus and touch-equivalent path;
- massage-choice helper;
- FAQ;
- dialogs;
- booking links without submitting an appointment;
- map consent;
- no horizontal overflow;
- no persistent non-white page surfaces.

## 24. Rollout

Implementation should occur on a dedicated feature branch.

Release sequence:
1. regression tests first;
2. implementation;
3. local/build verification;
4. PR against `main`;
5. GitHub CI + Build check green;
6. browser QA on preview/build artifact where available;
7. merge exact tested head SHA;
8. existing Render auto-deploy from `main`;
9. verify deployed commit and production smoke test.

Do not manually trigger production Render immediately after merge while auto-deploy is enabled.

## 25. Acceptance criteria

The redesign is complete only when:
- the site clearly evokes Remedy Place-level premium editorial polish without reproducing Remedy Place branding/content;
- Baitan remains visually recognizable through its own typography, palette, imagery and business content;
- all persistent backgrounds are #FFFFFF;
- treatment cards provide rich reveal interactions across pointer, keyboard and touch;
- navigation feels premium and intentional;
- hero is immersive but usable;
- booking remains obvious throughout the journey;
- current treatment data, prices, routes and integrations remain correct;
- mobile experience is first-class;
- automated checks are green;
- production Render deploy is verified against the tested merge commit.
