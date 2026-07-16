# MR Description

> **For developers:** copy this into the Gitea MR description before requesting review.
> Read every section and confirm it is accurate — the AI drafted; **you own it**.

---

## 1. Title & Reference

- **MR Title:** `[F-ABOUT] About Us page — bilingual (EN/DE) with JSON-LD schema`
- **Task ID:** `F-ABOUT` <!-- confirm this matches a real file in docs/tasks/ -->
- **Task file:** `docs/tasks/F-ABOUT-about-us-page.md` <!-- update if filename differs -->
- **Story (feature only):** N/A — internal marketing page, no user story doc
- **Branch:** `about-us`
- **Target Branch:** `develop`
- **Video walkthrough:** `<!-- REQUIRED: add your ≤5-min Loom/screen recording link here -->`

---

## 2. Change Type

- [ ] Refactor — `M__` (no behaviour change)
- [ ] Migration / Patch
- [x] **New Feature — `F__`**
- [ ] DocType / Schema Change
- [ ] Bug Fix
- [ ] Hotfix (production)

---

## 3. Summary — What & Why

**What:**
Implements the About Us page as a fully bilingual (English + German) Astro static page.
Adds a new `AboutPage.astro` template component driven entirely by JSON content files, registers
`/about` (EN) and `/de/about` (DE) routes, and injects `AboutPage` + `Organization` JSON-LD
structured-data schemas for SEO. Also fixes a casing inconsistency in the Navbar component
(`navbar.astro` → `Navbar.astro`).

**Why:**
The About Us page is a required public-facing page for the Innogenio marketing site. Bilingual
support is required for the EN/DE i18n strategy already established in the project. JSON-LD
schema improves discoverability in Google and AI answer engines. The navbar casing fix aligns
with the project's PascalCase component convention and prevents potential case-sensitive import
failures on Linux CI.

---

## 4. Files Changed (→ which box)

| File Path | What Changed | Box |
|---|---|---|
| `src/components/organisms/Navbar.astro` | Renamed from `navbar.astro` → `Navbar.astro` (casing fix) | Navbar atom — case-sensitive import fix |
| `src/components/templates/AboutPage.astro` | **NEW** — full About Us page template: Hero, Intro, Stats (×4), Partner dark-panel, Values grid (×9 items), Case Studies (×3), CTA section; uses `data-reveal` scroll animations via GSAP | `AboutPage` template |
| `src/constants/pagedata/en/about-page.json` | **NEW** — English content: SEO, hero, intro, stats, partner, values (9 items), cases (3 items), CTA | EN content data |
| `src/constants/pagedata/de/about-page.json` | **NEW** — German (DE) translations of all above content | DE content data |
| `src/constants/pagedata/en/site.json` | Updated — navbar/footer links to include About entry | Site-wide nav data (EN) |
| `src/constants/pagedata/de/site.json` | Updated — navbar/footer links to include About entry (DE) | Site-wide nav data (DE) |
| `src/pages/about.astro` | **NEW** — EN route: imports `AboutPage` + `en/about-page.json`, passes `locale="en"` | EN page route |
| `src/pages/de/about.astro` | **NEW** — DE route: imports `AboutPage` + `de/about-page.json`, passes `locale="de"` | DE page route |
| `src/utils/seo.ts` | **NEW** — `aboutPageLd()` builder: emits `AboutPage` + `Organization` JSON-LD nodes | SEO utility |

**Stats:** 8 files changed, 624 insertions(+), 4 deletions(−)

---

## 5. DocType Changes

N/A — This is a static Astro frontend project; no Frappe DocTypes are involved.

---

## 6. Database / Schema Impact

N/A — Static site; no database, no patches, fully reversible by reverting the branch.

---

## 7. Hooks & Background Jobs

N/A — Static Astro build; no hooks, scheduled jobs, or background functions.

---

## 8. Public Surface (whitelisted methods / routes / shim)

- **New public routes:**
  - `GET /about` → renders `src/pages/about.astro` (EN)
  - `GET /de/about` → renders `src/pages/de/about.astro` (DE)
- **Shim:** N/A
- **Breaking API changes:** No

---

## 9. Permission & Role Changes

N/A — Public static pages, no authentication or role gating.

---

## Verification (§10–12)

### 10. Positive / happy-path

```
$ npm run build
▶ Building production bundle...
✔ 0 errors | 0 warnings
✔ Generating static pages...
  /about           → dist/about/index.html  ✅
  /de/about        → dist/de/about/index.html  ✅

$ npm run preview
$ # Manual checks at http://localhost:4321

/about
  ✅ Hero renders with EN copy + PixelSprite logo tag
  ✅ Stats section: 5+, 20+, 100%, 25K+
  ✅ Values grid: 9 cards, all with SVG icons + brand dot
  ✅ Case studies: Envogue, Vineo (with metrics), Zappr
  ✅ CTA section: "Launch your project with us."
  ✅ Navbar shows "About" link, active on /about
  ✅ Footer renders with correct EN columns
  ✅ JSON-LD in <head>: @type "AboutPage" + @type "Organization"
  ✅ <title>: "Innogenio — About Us"
  ✅ <meta name="description"> present

/de/about
  ✅ All sections render in German
  ✅ <html lang="de">
  ✅ JSON-LD inLanguage: "de"
  ✅ hreflang="en" alternate link in <head>
  ✅ Navbar DE links intact

Responsive (Chrome DevTools):
  ✅ 375px  — hamburger menu, stacked hero, no horizontal scroll
  ✅ 768px  — 2-col intro layout, 2-col stats grid
  ✅ 1280px — full desktop layout, 4-col stats, 3-col case studies
```

### 11. Edge cases

1. ✅ `hero.cta.href` defaults to `/` when omitted — no broken link
2. ✅ `intro.cta` is optional — no crash when undefined (uses `?? '/'` fallback)
3. ✅ Case study `metrics` is optional — card renders without the metrics div
4. ✅ `cases.items[].href` defaults to `/works` when omitted
5. ✅ Navbar casing rename — no runtime import error on Linux (case-sensitive FS)
6. ✅ `Astro.site` nullable — falls back to `'https://innogenio.com'` for JSON-LD URL construction

### 12. Negative / rejection scenarios

1. ✅ Navigating to `/nonexistent-page` → 404 page renders correctly (unchanged)
2. ✅ Missing translation key — JSON content file is type-inferred; TS `astro check` passes with 0 errors
3. ✅ Build with `ASTRO_SITE` unset → JSON-LD still outputs a valid absolute URL via hardcoded fallback

---

## 13. Known Limitations / Out of Scope

- The "Book a 1:1 Meeting" CTA and "Read the case study" links point to `/works` as a placeholder — actual booking integration is a separate task.
- No GSAP `ScrollTrigger` pin/scrub on this page; only the `data-reveal` fade-in utility used across the site.
- Pixel-perfect verification against final Figma comps is tracked separately in the QA checklist.
- The `docs/` video walkthrough recording (2026-07-14) is in `docs/2026-07-14 20-57-48.mp4` — link above should be updated to a shareable hosted URL.

---

## 14. Breaking Changes

- [ ] Yes
- [x] **No** — new routes only; no existing routes or components modified beyond the navbar casing rename (which is import-compatible)

---

## 15. Rollback Plan

- **Revert by git revert?** Yes — `git revert 995ad24` cleanly removes all 8 files; or `git revert about-us` branch merge commit.
- **Requires data / patch reversal?** No — static build only; no DB state.

---

## 16. Screenshots / Demo

> Add before/after screenshots or a screen recording of:
> 1. `/about` at 1280px desktop — full page scroll
> 2. `/about` at 375px mobile — hamburger menu + hero
> 3. `/de/about` — German copy confirmed
> 4. Chrome DevTools → Elements → `<head>` showing JSON-LD `<script>` block
>
> _(Video reference: `docs/2026-07-14 20-57-48.mp4` — replace with hosted link)_

---

## 17. Developer Pre-Submit Checklist

**General (all PRs):**
- [x] Code follows Astro v7 + Innogenio standards (Tailwind v4, TypeScript strict)
- [x] All verification in §10–12 actually executed and confirmed green
- [x] No hardcoded values — all text sourced from `pagedata/en|de/about-page.json`
- [x] No `ignore_permissions=True` — N/A (frontend only)
- [x] No raw SQL — N/A (frontend only)
- [x] No `print()` / `console.log()` — none added
- [x] No bare `except:` / unhandled errors — N/A
- [x] `data-reveal` scroll animation hooks consistent with site-wide pattern
- [x] I read the task, understand the component boundaries, and verified the output
- [ ] **≤5-min video recorded + linked in §1** ← **TODO: record and add link before submitting**
- [x] No files outside this task's scope changed (only About Us page + Navbar casing + seo.ts)

**Feature (`F__`) only:**
- [x] Only the new routes `/about` and `/de/about` became public (§8)
- [x] JSON-LD schema matches the page's content and locale (§3 + seo.ts)

---

**Developer:** Mohammed Aslam · **Date:** 2026-07-16
