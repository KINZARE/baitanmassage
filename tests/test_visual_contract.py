from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "styles.css").read_text(encoding="utf-8")
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
        self.assertIn('Behandelingen', TEMPLATE)
        self.assertIn('Prijzen', TEMPLATE)
        self.assertIn('Contact', TEMPLATE)
        self.assertIn('{{BOOKING_HREF}}', TEMPLATE)
        self.assertIn('.no-js-nav', CSS)

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
        self.assertRegex(CSS, r"@media \(max-width: 699px\)[\s\S]*?\.hero-photo\s*\{[^}]*height:\s*clamp\(")

    def test_mobile_treatments_stack_without_forced_viewport_width(self):
        self.assertRegex(CSS, r"@media \(max-width: 699px\)[\s\S]*?\.visual-treatments\s*\{[^}]*grid-template-columns:\s*1fr")
        self.assertNotRegex(CSS, r"width:\s*100vw")


if __name__ == "__main__":
    unittest.main()
