from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "styles.css").read_text(encoding="utf-8")
MENU_CSS = (ROOT / "assets" / "menu-progressive.css").read_text(encoding="utf-8")
MOBILE_CSS_PATH = ROOT / "assets" / "mobile-first.css"
MOBILE_CSS = MOBILE_CSS_PATH.read_text(encoding="utf-8") if MOBILE_CSS_PATH.exists() else ""
JS = (ROOT / "app.js").read_text(encoding="utf-8")
DESIGN = (ROOT / "DESIGN.md").read_text(encoding="utf-8")
TEMPLATE = (ROOT / "index.template.html").read_text(encoding="utf-8")
BUILD = (ROOT / "build.py").read_text(encoding="utf-8")


class VisualContractTests(unittest.TestCase):
    def test_primary_background_is_white(self):
        self.assertRegex(CSS, r"--color-bg-primary:\s*#fff(?:fff)?\s*;")
        self.assertIn("#FFFFFF", DESIGN.upper())

    def test_all_page_surfaces_are_white(self):
        self.assertRegex(CSS, r"--color-surface-secondary:\s*#fff(?:fff)?\s*;")
        self.assertRegex(CSS, r"--color-surface-muted:\s*#fff(?:fff)?\s*;")
        self.assertRegex(CSS, r"\.section-dark[\s\S]*?background(?:-color)?:\s*var\(--paper\)")
        self.assertRegex(CSS, r"\.booking-concise[\s\S]*?background(?:-color)?:\s*var\(--paper\)")
        self.assertRegex(CSS, r"\.footer[\s\S]*?background(?:-color)?:\s*var\(--paper\)")
        self.assertRegex(CSS, r"\.footer[\s\S]*?color:\s*var\(--ink\)")
        self.assertNotIn("rgba(255, 255, 255, 0.96)", CSS)
        self.assertRegex(CSS, r"\.header\s*\{[^}]*background:\s*var\(--paper\)")

    def test_remedy_navigation_overlay_contract(self):
        self.assertIn('data-menu-toggle', TEMPLATE)
        self.assertIn('aria-controls="site-menu"', TEMPLATE)
        self.assertIn('aria-expanded="false"', TEMPLATE)
        self.assertIn('id="site-menu"', TEMPLATE)
        self.assertIn('data-menu-overlay', TEMPLATE)
        self.assertIn('data-menu-close', TEMPLATE)
        self.assertIn('Ontdek', TEMPLATE)
        self.assertIn('Plan', TEMPLATE)
        self.assertIn('Baitan', TEMPLATE)

    def test_core_navigation_survives_without_javascript(self):
        self.assertIn('<noscript>', TEMPLATE)
        self.assertIn('class="no-js-nav"', TEMPLATE)
        self.assertIn('aria-label="Navigatie zonder JavaScript"', TEMPLATE)
        self.assertIn('Behandelingen', TEMPLATE)
        self.assertIn('Prijzen', TEMPLATE)
        self.assertIn('Contact', TEMPLATE)
        self.assertIn('{{BOOKING_HREF}}', TEMPLATE)

    def test_mobile_core_navigation_survives_javascript_failure(self):
        self.assertIn('/assets/menu-progressive.css', TEMPLATE)
        self.assertIn("classList.add('menu-enhanced')", JS)
        self.assertRegex(MENU_CSS, r"\.remedy-menu-toggle\s*\{[^}]*display:\s*none")
        self.assertRegex(MENU_CSS, r"\.menu-enhanced\s+\.remedy-menu-toggle\s*\{[^}]*display:\s*grid")
        self.assertRegex(MENU_CSS, r"@media \(max-width: 1050px\)[\s\S]*?\.nav-links\s*\{[^}]*display:\s*flex")
        self.assertRegex(MENU_CSS, r"@media \(max-width: 1050px\)[\s\S]*?\.menu-enhanced\s+\.nav-links\s*\{[^}]*display:\s*none")

    def test_mobile_first_stylesheet_is_loaded(self):
        self.assertTrue(MOBILE_CSS_PATH.exists(), "assets/mobile-first.css is missing")
        self.assertIn('/assets/mobile-first.css', TEMPLATE)

    def test_mobile_hero_plus_header_fill_exact_first_viewport(self):
        self.assertRegex(MOBILE_CSS, r"@media \(max-width: 699px\)[\s\S]*?\.hero\s*\{[^}]*height:\s*calc\(100svh - 72px\)")
        self.assertRegex(MOBILE_CSS, r"@media \(max-width: 699px\)[\s\S]*?\.hero\s*\{[^}]*min-height:\s*calc\(100svh - 72px\)")
        self.assertRegex(MOBILE_CSS, r"\.hero\s*\{[^}]*grid-template-rows:\s*minmax\(0,\s*0\.46fr\)\s+minmax\(0,\s*0\.54fr\)")

    def test_mobile_hero_is_scannable_and_single_action_focused(self):
        self.assertRegex(MOBILE_CSS, r"\.hero-copy\s*\{[^}]*padding:\s*clamp\(22px,\s*4svh,\s*34px\)\s+20px")
        self.assertRegex(MOBILE_CSS, r"\.hero-copy h1\s*\{[^}]*font-size:\s*clamp\(2\.65rem,\s*12vw,\s*3\.55rem\)")
        self.assertRegex(MOBILE_CSS, r"\.hero-actions \.text-link\s*\{[^}]*display:\s*none")
        self.assertRegex(MOBILE_CSS, r"\.hero-location\s*\{[^}]*display:\s*none")

    def test_mobile_sections_are_compact_and_cards_scan_quickly(self):
        self.assertRegex(MOBILE_CSS, r"\.section,\s*\.choice-section\s*\{[^}]*padding-block:\s*52px")
        self.assertRegex(MOBILE_CSS, r"\.visual-treatments\s*\{[^}]*gap:\s*40px")
        self.assertRegex(MOBILE_CSS, r"\.treatment-media[\s\S]*?aspect-ratio:\s*4\s*/\s*3")
        self.assertRegex(MOBILE_CSS, r"\.gallery-item[\s\S]*?aspect-ratio:\s*4\s*/\s*3")

    def test_treatment_reveal_is_progressively_enhanced(self):
        self.assertIn('treatment-visual', BUILD)
        self.assertIn('treatment-body', BUILD)
        self.assertIn('treatment-meta', BUILD)
        self.assertIn('initTreatmentReveals', JS)
        self.assertIn('data-treatment-reveal', JS)
        self.assertIn('aria-expanded', JS)
        self.assertIn('.treatment-visual.is-expanded', CSS)

    def test_touch_reveal_wins_before_legacy_treatment_modal(self):
        self.assertIn('stopImmediatePropagation', JS)
        self.assertRegex(JS, r"mediaLink\.addEventListener\('click',[\s\S]*?capture:\s*true")
        self.assertIn('navigator.maxTouchPoints', JS)
        self.assertIn("pointerType === 'touch'", JS)
        self.assertIn('touchPending', JS)

    def test_menu_interaction_is_keyboard_accessible(self):
        self.assertIn('initMenuOverlay', JS)
        self.assertIn('Escape', JS)
        self.assertIn('previouslyFocused', JS)
        self.assertIn('aria-expanded', JS)
        self.assertIn('focusableMenuItems', JS)

    def test_interactions_are_subtle_and_accessible(self):
        self.assertIn(".is-inview", CSS)
        self.assertIn("prefers-reduced-motion: reduce", CSS)
        self.assertIn("IntersectionObserver", JS)
        self.assertIn("data-reveal", JS)
        self.assertNotIn("wheel", JS.lower())

    def test_hover_motion_stays_restrained(self):
        self.assertRegex(CSS, r"scale\(1\.0(?:1[0-9]?|2[0-5]?)\)")
        self.assertNotIn("scroll-jacking", JS.lower())

    def test_hero_is_larger_but_remains_responsive(self):
        self.assertIn("--hero-min-height: clamp(720px, 82vh, 900px);", CSS)
        self.assertRegex(CSS, r"\.hero,\s*\.hero-photo\s*\{[^}]*min-height:\s*var\(--hero-min-height\)")

    def test_mobile_treatments_stack_without_forced_viewport_width(self):
        self.assertRegex(CSS, r"@media \(max-width: 699px\)[\s\S]*?\.visual-treatments\s*\{[^}]*grid-template-columns:\s*1fr")
        self.assertNotRegex(CSS, r"width:\s*100vw")


if __name__ == "__main__":
    unittest.main()
