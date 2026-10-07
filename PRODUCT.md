# Baitan Thai Massage

Existing Dutch salon website in Capelle aan den IJssel. The primary visitor task is to choose a massage, see its real duration and price, and open the official Salonized calendar. Secondary tasks: call, WhatsApp, route, opening hours, gift cards and policy information.

## Source of truth

- Public repository: KINZARE/baitanmassage, main; hosting: existing Render static site baitanmassage.
- Static Python generator `build.py`, shared `styles.css`, progressively enhanced `app.js`.
- Business content: `data/site.json` and `data/treatments.json`, editable with the existing Pages CMS schema.
- Preserve every route, canonical, treatment price, business fact and working integration.
- Booking provider is Salonized; no local booking API is active in production.
- Maps loads only on request. No active analytics or marketing cookies are configured.

## Restyle brief

Modern Baitan: accessible premium, warm, personal, calm and clear. Warm Earth palette, Newsreader display, Manrope UI, existing logo and approved photography. No invented testimonials, treatment claims, staff portraits or interiors. Current assets are atmosphere imagery; authentic salon/interior photos are not available in this repository.

## Verification boundary

Test the static build, links/data invariants, responsive rendering, menu, choice helper, dialogs, FAQ, contact, gift and booking destinations. An actual appointment is never created during QA. Salonized currently returned HTTP 403 to the test environment in the previous release; a working site link is not proof that the external booking calendar can be completed.
