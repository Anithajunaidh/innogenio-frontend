# Code Review Checklist

**Stack:** Astro · Tailwind CSS · Decap CMS · Atomic Design  
**Organization:** Innogenio Solutions Private Limited

---

## About this checklist

Use this document to review every pull request before merging. Work through each section top to bottom. Tick the checkbox when the criterion is met; leave it empty if it requires a fix.

### Layer hierarchy

Strict dependency direction:

```text
Atoms → Molecules → Organisms → Templates → Pages
```

Lower layers must never import from higher layers. Decap CMS data enters the component tree at the **Organism** level or above.

---

## Atoms

Smallest, most primitive UI pieces — no state, no side effects. Atoms accept only props and render markup.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | Component filename is PascalCase (`Button.astro`, `InputField.astro`) | `naming` |
| ☐ | Component has no internal state — accepts only props, emits no side effects | `purity` |
| ☐ | Props are typed with a TypeScript interface or `Props` type in frontmatter | `types` |
| ☐ | All Tailwind classes are on the element directly — no dynamic `className` concatenation without `cn()` helper | `tailwind` |
| ☐ | No layout concerns (margin, position) inside the atom — that belongs to the parent | `layout` |
| ☐ | Semantic HTML used (`button` not `div`, `label` paired with `input`, etc.) | `a11y` |
| ☐ | Slot or default content works correctly when no prop is passed | `slots` |
| ☐ | Color, size, variant props use string literal union types, not magic strings | `types` |

---

## Molecules

Groups of atoms bonded together with a single interaction purpose. Molecules do not touch CMS data.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | Composed only of atoms — no raw HTML elements beyond wrappers | `composition` |
| ☐ | Molecule handles a single, clear interaction pattern (e.g. SearchField = Input + Button) | `srp` |
| ☐ | Internal atoms receive props from the molecule — no hardcoded strings inside child atoms | `data-flow` |
| ☐ | No Decap/CMS data fetching inside a molecule — data comes down via props | `cms` |
| ☐ | Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) applied at this level, not inside atoms | `tailwind` |
| ☐ | No page-level layout (`max-w`, `container`, `px-*`) inside the molecule | `layout` |
| ☐ | Component name reflects its function, not its look (`CardPreview` not `WhiteBoxWithShadow`) | `naming` |

---

## Organisms

Self-contained UI sections composed of molecules and atoms. This is the first layer that may receive CMS data.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | Combines molecules and/or atoms into a distinct, self-contained UI section | `composition` |
| ☐ | Fetches or receives CMS collection data only at this level or higher | `cms` |
| ☐ | `Astro.props` are destructured cleanly with defaults for optional fields | `types` |
| ☐ | Content slot defined for rich inner content from parent layouts | `slots` |
| ☐ | Organism does not contain routing logic — links use `href`, not JS navigation | `routing` |
| ☐ | Conditional rendering uses ternary or `&&` in JSX expression, not class toggling for structural changes | `logic` |
| ☐ | No inline styles — all visual decisions expressed via Tailwind classes | `tailwind` |

---

## Templates

Layout `.astro` files that accept `<slot />` for page content. Templates define structure; they never hardcode CMS data.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | Template is a layout `.astro` file, not a page — it takes a `<slot />` for page content | `structure` |
| ☐ | Decap config (`public/admin/config.yml`) collections map 1:1 to the content slots in this template | `cms` |
| ☐ | Template does not hardcode any CMS data — receives everything via `Astro.props` or `getStaticPaths()` | `cms` |
| ☐ | `BaseHead`, `Header`, `Footer` organisms are composed here, not duplicated per page | `composition` |
| ☐ | SEO meta (`title`, `description`, `og:*`) passed as props and rendered in `BaseHead` atom | `seo` |
| ☐ | Tailwind `container` and `max-width` classes defined exactly once at the template level | `layout` |

---

## Pages

Thin files in `src/pages/` responsible only for data fetching and wiring. No markup beyond template usage.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | Pages live in `src/pages/` and are thin — data fetching only, no markup beyond template usage | `structure` |
| ☐ | `getStaticPaths()` used for dynamic routes (`[slug].astro`) with correct Decap collection slugs | `routing` |
| ☐ | Content collections typed with `defineCollection()` and Zod schema in `src/content/config.ts` | `cms` |
| ☐ | `Astro.props` fully typed — no implicit `any` from `getStaticPaths()` return value | `types` |
| ☐ | No raw `fetch()` calls in pages — use Astro content collection API or a server endpoint | `data` |
| ☐ | Page file exports nothing except the Astro component — no utility functions leak into page scope | `structure` |

---

## Decap CMS

Configuration alignment between `config.yml`, content collections, and Zod schemas.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | `config.yml` collection slug matches `src/content/<collection>/` directory name exactly | `config` |
| ☐ | All CMS fields used in components are declared in `config.yml` — no undeclared fields consumed | `schema` |
| ☐ | Required vs optional fields aligned between `config.yml` and Zod schema in `content/config.ts` | `schema` |
| ☐ | Media folder and `public_folder` paths resolve correctly relative to project root | `config` |
| ☐ | Date fields use `datetime` widget; image fields reference the correct media path | `fields` |
| ☐ | Preview templates registered in `admin/index.html` for all content types | `preview` |
| ☐ | Git backend branch matches deployment branch (`main`/`master`) — not hardcoded to wrong branch | `config` |
| ☐ | `netlify-identity-widget` or auth provider script present in `admin/index.html` | `auth` |

---

## Astro & Tailwind

Framework-specific rules for Astro islands, hydration directives, and Tailwind configuration.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | `client:*` directives used sparingly — only interactive components hydrate on client | `perf` |
| ☐ | `client:load` reserved for above-the-fold critical UI; `client:visible` or `client:idle` for the rest | `perf` |
| ☐ | No `<style>` blocks inside `.astro` files — all styling via Tailwind utility classes | `tailwind` |
| ☐ | `tailwind.config` `content` array covers `src/**/*.{astro,ts,tsx,js,jsx,mdx}` | `config` |
| ☐ | Custom design tokens defined in `tailwind.config` `theme.extend`, not as arbitrary values | `tailwind` |
| ☐ | `Image` component from `astro:assets` used for all images — not bare `<img>` tags | `perf` |
| ☐ | Transitions use `<ViewTransitions />` at the template level if used at all — not scattered | `perf` |
| ☐ | No unused Astro integrations in `astro.config.mjs` | `config` |

---

## Design Tokens

All visual decisions — color, spacing, typography, sizing, shadows, border-radius — must come from the design token system. No hardcoded values anywhere in the codebase.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | No hardcoded hex, `rgb()`, or `hsl()` values in any component — all colors reference a token (e.g. `text-primary`, `bg-surface-1`) | `color` |
| ☐ | Brand/accent colors use the designated token (e.g. `brand-primary`, `color-accent`) — never a raw hex from a Figma eyedropper | `color` |
| ☐ | Text color tokens are used semantically: `text-primary` for body, `text-secondary` for supporting copy, `text-muted` for hints | `color` |
| ☐ | Surface tokens used for backgrounds: `surface-0` (page), `surface-1` (card), `surface-2` (panel) — never `bg-white` or `bg-gray-100` directly | `color` |
| ☐ | Status colors (`success`, `warning`, `danger`, `info`) come from role tokens — not from arbitrary green/yellow/red Tailwind classes | `color` |
| ☐ | Dark mode colors rely on token flipping — no manual `dark:` overrides with hardcoded values | `color` |
| ☐ | All padding and margin values use spacing tokens (`spacing-sm`, `spacing-md`, `spacing-lg`) or the token scale — no arbitrary px values like `p-[13px]` | `spacing` |
| ☐ | Gap between layout elements uses the gap token scale — not mix of `gap-3`, `gap-4` chosen arbitrarily per component | `spacing` |
| ☐ | Section-level vertical rhythm uses a consistent spacing token — not ad hoc `py-10` / `py-14` scattered across templates | `spacing` |
| ☐ | Icon-to-text spacing uses a token (e.g. `gap-xs`) — not a literal margin value | `spacing` |
| ☐ | Font family references `font-sans`, `font-mono`, `font-voice` tokens — no `font-family` CSS string literals or Google Font names inline | `typography` |
| ☐ | Font size uses the type scale tokens (`text-sm`, `text-base`, `text-lg`, `text-xl`) — no arbitrary `text-[15px]` values | `typography` |
| ☐ | Font weight limited to the two token weights (400 regular, 500 medium) — no `font-semibold` (600) or `font-bold` (700) unless token-approved | `typography` |
| ☐ | Line height uses token values (`leading-snug`, `leading-normal`, `leading-relaxed`) — not custom `leading-[1.35]` | `typography` |
| ☐ | Letter spacing, if used, comes from a tracking token — not `tracking-[0.02em]` | `typography` |
| ☐ | Border radius uses the radius token (`rounded`, `rounded-md`, `rounded-lg`, `rounded-full`) — no `rounded-[10px]` arbitrary values | `sizing` |
| ☐ | Component min/max widths reference a size token or the container scale — not magic pixel values | `sizing` |
| ☐ | Icon sizes use a defined icon scale (16px / 20px / 24px) mapped to tokens — no arbitrary `w-[18px] h-[18px]` | `sizing` |
| ☐ | Button height / control height uses a control-height token (`h-control`, `h-9`, `h-10`) consistently across all atoms | `sizing` |
| ☐ | Border color uses border token (`border-default`, `border-strong`, `border-stronger`) — not `border-gray-200` or `border-[#E5E7EB]` | `border` |
| ☐ | Border width is 0.5px (hairline) by default unless a token explicitly specifies 1px or 2px for emphasis | `border` |
| ☐ | Box shadows reference shadow tokens (`shadow-sm`, `shadow-md`, `shadow-lg`) — no custom `box-shadow` CSS strings | `shadow` |
| ☐ | Focus ring uses the designated focus token (`ring-2 ring-offset-2 ring-accent`) — not a custom outline or box-shadow hack | `shadow` |
| ☐ | All tokens defined in `tailwind.config.ts` under `theme.extend` — no tokens scattered across component-level CSS variables | `config` |
| ☐ | Token names follow a consistent naming convention: `category-variant-state` (e.g. `color-text-primary`, `spacing-md`, `shadow-card`) | `config` |
| ☐ | Tokens that map to Decap CMS theme fields (brand color, font choice) are wired through CSS custom properties so the CMS can override them | `config` |

---

## General

Cross-cutting concerns: folder structure, dependency direction, accessibility, and security.

| Status | Criterion | Tag |
|:------:|-----------|-----|
| ☐ | Component folder structure is `src/components/atoms/`, `molecules/`, `organisms/` | `structure` |
| ☐ | No cross-layer imports — atoms never import molecules or organisms | `deps` |
| ☐ | `index.ts` barrel files per layer for clean import paths | `imports` |
| ☐ | All images have `alt` text; decorative images use `alt=""` | `a11y` |
| ☐ | Focus styles visible (`focus-visible:ring-2` or equivalent) on all interactive elements | `a11y` |
| ☐ | Color contrast meets WCAG AA for all text on background combinations | `a11y` |
| ☐ | No `console.log` or `TODO` comments in production code | `quality` |
| ☐ | Environment variables prefixed `PUBLIC_` for client-side use in Astro | `security` |
