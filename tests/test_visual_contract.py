from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "styles.css").read_text(encoding="utf-8")
JS = (ROOT / "app.js").read_text(encoding="utf-8")
DESIGN = (ROOT / "DESIGN.md").read_text(encoding="utf-8")


class VisualContractTests(unittest.TestCase):
    def test_primary_background_is_white(self):
        self.assertRegex(CSS, r"--color-bg-primary:\s*#fff(?:fff)?\s*;")
        self.assertIn("#FFFFFF", DESIGN.upper())

    def test_interactions_are_subtle_and_accessible(self):
        self.assertIn(".is-inview", CSS)
        self.assertIn("prefers-reduced-motion: reduce", CSS)
        self.assertIn("IntersectionObserver", JS)
        self.assertIn("data-reveal", JS)

    def test_hover_motion_stays_restrained(self):
        self.assertRegex(CSS, r"scale\(1\.0[12]\)")
        self.assertNotIn("scroll-jacking", JS.lower())

    def test_hero_is_larger_but_remains_responsive(self):
        self.assertIn("--hero-min-height: clamp(720px, 82vh, 900px);", CSS)
        self.assertRegex(CSS, r"\.hero\s*\{[^}]*min-height:\s*var\(--hero-min-height\)")
        self.assertRegex(CSS, r"@media \(max-width: 600px\)[\s\S]*?\.hero-photo\s*\{[^}]*height:\s*340px")


if __name__ == "__main__":
    unittest.main()
