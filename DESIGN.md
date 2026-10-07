# Modern Baitan — White Editorial Calm

Approved direction: user's complete brand identity and website restyle prompt, refined 7 October 2026 with a true white base and restrained interaction. Existing business truth and logo remain authoritative.

## Tokens

| Semantic token | Value | Purpose |
| --- | --- | --- |
| color-bg-primary | #FFFFFF | Primary page background |
| color-text-primary | #2B211C | Espresso headings, body, footer |
| color-brand-accent | #B56F4C | Clay primary actions |
| color-surface-secondary | #D8C4AA | Soft Sand supporting tone |
| color-text-secondary | #6C5143 | Warm Brown secondary text |
| color-surface-muted | #EDE3D5 | Quiet contrast sections |
| color-border | #C4AE95 | Supporting separators |
| color-accent-hover | #C17E59 | Primary action hover |
| color-focus | #805039 | Visible light-surface focus |
| color-error | #8A332A | Error text and border |
| color-success | #42573D | Confirmation text and border |
| color-text-inverse | #FFFFFF | Text on Espresso |
| color-text-inverse-muted | #D8C4AA | Secondary text on Espresso |

Clay buttons use a deeper Espresso text token, #190F0A, because both the old Ivory and the primary Espresso small text on Clay fail AA. Interactive option/input boundaries use #8F725F. Clay remains a limited action accent. Functional input/option borders need contrast; decorative section separators do not represent controls.

## Typography and spacing

- Newsreader normal 400, optical size variable: display, headings only.
- Manrope variable 400–700: body, prices, navigation, forms and practical information.
- Self-hosted Latin WOFF2; `font-display:swap`, two preloads, OFL notices kept beside font files.
- Existing logo keeps its original Georgia lettering and mark rather than being redesigned.
- Display 44–76px, section headings 35–54px, compact mobile scale. Body 16px; secondary labels 12–14px.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96. Content max 1280px, desktop gutters 48px, phone gutters 20px.
- Buttons use a 6px radius. Base buttons have a 50px minimum height, with compact mobile variants at 44–48px; menu and dialog-close controls are 44px. Compact price booking links use 36px and footer links 32px minimum height. Photos have square edges; content sections have no shadows.

## Surface contract: public website

Mode: Persuade. First viewport: an open white text column beside a large unfiltered human treatment photograph. Newsreader headline, one Clay booking action, treatment link, local address. On phones the readable booking proposition precedes the image.

The recognisable mechanism is editorial rhythm, human close-up photography and Espresso/Clay contrast. Vary open treatment grids, photo/text compositions, restrained price rows and a dark booking close. White is the default canvas; muted sand sections are reserved for deliberate contrast. No carousels, scroll-jacking, gradients, decorative badges or invented reviews.

## Interaction and coverage

Interaction should make the site feel responsive without turning it into a motion showcase. Pointer image hover scales to at most 1.015–1.02; cards may lift up to 4px; primary buttons lift 2px and retain the existing 0.98 press state. Text-link arrows may travel 4px. The sticky header gains only a subtle border/shadow response after scroll.

In-view motion is positional only: content remains visible at all times and settles upward by 8–12px when entering the viewport. Small stagger delays are capped and never block reading. `prefers-reduced-motion: reduce` disables transforms and transitions. Anchor navigation remains immediate so it cannot race with the choice helper. Explicit focus, selected and disabled states remain authoritative. Price numerals use tabular figures. Native treatment dialogs and policy dialogs preserve existing behaviour and scroll on small screens.

Every route uses this shared system, including legal pages, prices, contacts and treatment details. The atmosphere labels identify existing imagery; photo provenance and business data must not be altered to imply real salon interiors.
