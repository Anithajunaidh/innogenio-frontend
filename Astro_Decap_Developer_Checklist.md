# Astro + Tailwind + Decap CMS

Developer Launch Checklist

Innogenio Solutions Private Limited

Pre-launch QA reference for content, functionality, performance, accessibility, SEO, and security



1. Functionality

Core Website

All pages load without errors.

No broken internal or external links.

404 page works correctly.

Forms submit successfully.

Navigation works on all screen sizes.

Search functionality works (if applicable).

Pagination works correctly.

Dynamic content loads correctly.

Images load properly.

Videos work correctly.

Downloads work.

2. Decap CMS

All collections load correctly.

New content appears on the frontend.

Editing existing content updates correctly.

Media uploads work.

Deleted content is handled properly.

Draft workflow functions correctly.

Rich text renders correctly.

Image paths are correct.

Validation rules work.

Preview templates render correctly.

Empty fields do not break layouts.

3. Internationalization (i18n)

Language

All supported languages work.

Language switcher works.

URLs follow the language strategy.

Default language redirects correctly.

Missing translations handled gracefully.

No untranslated strings.

RTL languages display correctly (if supported).

Date formatting is localized.

Number formatting is localized.

Currency formatting is localized.

Metadata changes with language.

hreflang tags generated correctly.

4. Responsive Design

Mobile



Tablet



Laptop



Desktop



Verify

No horizontal scrolling.

Proper spacing.

Typography scales correctly.

Images remain sharp.

Cards align correctly.

Buttons are clickable.

Navigation works.

Modals fit screen.

Tables scroll correctly.

Hero sections scale properly.

Backgrounds don't break.

Animations remain smooth.

5. Cross Browser Testing

Desktop

Chrome

Firefox

Safari

Edge

Mobile

Chrome Android

Safari iPhone

Samsung Internet

Verify

Layout

Animations

Forms

Fonts

Sticky elements

CSS Grid

Flexbox

Backdrop filters

Scroll behavior

6. Lighthouse

Desktop

Performance > 95

Accessibility > 95

Best Practices = 100

SEO = 100

Mobile

Performance > 90

Accessibility > 95

Best Practices = 100

SEO = 100

Review

Largest Contentful Paint

Interaction to Next Paint

Cumulative Layout Shift

First Contentful Paint

Total Blocking Time

7. Performance

Images optimized.

Images lazy loaded.

Responsive images used.

AVIF/WebP used.

Fonts optimized.

Only required font weights loaded.

CSS minimized.

JavaScript minimized.

Dead code removed.

Tree shaking works.

Critical CSS optimized.

No layout shifts.

No render blocking resources.

Astro islands hydrate correctly.

Long tasks minimized.

8. Cache Disabled Testing

Using DevTools → Disable Cache

First load works.

No missing assets.

Fonts load.

Images load.

CMS content loads.

No race conditions.

No hydration mismatch.

No flashing content.

Loading states work.

9. Accessibility

Keyboard navigation.

Focus indicators visible.

Skip to content.

Alt text on images.

Proper heading hierarchy.

ARIA labels where required.

Color contrast.

Screen reader friendly.

Form labels.

Error messages accessible.

Dialog focus trap.

Reduced motion support.

10. SEO

Unique page title.

Meta description.

Canonical URL.

Open Graph tags.

Twitter cards.

Structured data.

Sitemap generated.

robots.txt.

hreflang.

Image alt text.

Correct heading hierarchy.

No duplicate metadata.

11. Console

No console errors.

No warnings.

No failed network requests.

No source map errors.

No hydration warnings.

12. Network

No failed requests.

No 404 assets.

No CORS issues.

Compression enabled.

Cache headers correct.

Assets served over HTTPS.

13. Tailwind CSS

Unused classes purged.

Design tokens used consistently.

No inline styles unless necessary.

Consistent spacing scale.

Consistent typography scale.

Dark mode verified (if supported).

14. Astro Best Practices

Static pages prerender correctly.

Dynamic routes function correctly.

Image optimization enabled.

Assets correctly placed in public/.

Hydration directives (client:load, client:idle, client:visible) are appropriate.

No unnecessary client-side JavaScript.

Markdown renders correctly.

Content collections validated.

Build completes without warnings.

15. Code Quality

TypeScript has zero errors.

ESLint passes.

Prettier formatting applied.

No unused imports.

No unused variables.

No console.log() statements.

No debugger statements.

Components are reusable.

Dead code removed.

Environment variables documented.

16. Security

Secrets not committed.

.env ignored by Git.

CSP reviewed (if configured).

External links use rel="noopener noreferrer" when opening in a new tab.

Input validation implemented.

CMS admin access secured.

Dependency vulnerabilities reviewed.

17. Deployment

Production build succeeds.

Preview deployment verified.

Environment variables configured.

Domain configured.

HTTPS enabled.

Redirects verified.

Custom 404 page works.

Sitemap accessible.

robots.txt accessible.

Analytics configured (if applicable).

18. Final QA

All client feedback incorporated.

Design matches Figma (pixel-perfect).

No visual regressions.

All animations reviewed.

Loading and error states tested.

Empty states tested.

CMS content reviewed.

Lighthouse targets achieved.

Cross-browser testing completed.

Cross-device testing completed.

Production smoke test completed.



Additional Recommended Checks

The sections below extend the original checklist with items commonly missed on Astro/Decap CMS/Git-based marketing site projects: CI/CD and rollback safety, the content-editor workflow itself, spam/abuse prevention on public forms, monitoring and legal compliance, PWA/social metadata, and backup & disaster recovery.

19. Version Control & CI/CD

Repository has a clean, descriptive commit history for the release.

Branch protection rules enforced on main/production branch.

CI pipeline (lint, typecheck, build) passes on the release commit.

Preview/staging deployments triggered automatically on PRs.

Rollback procedure documented and tested.

Decap CMS git-gateway / OAuth backend configured and authenticated correctly.

CMS-triggered commits build and deploy successfully via webhook.

20. Content Editor Experience

Decap CMS config.yml fields match the content schema exactly.

Editorial roles/permissions configured correctly (if using Git Gateway/Netlify Identity).

Content editors have a short usage guide (how to add pages, upload media, publish).

Slug/URL generation from CMS entries behaves predictably.

Relation/list widgets resolve correctly to referenced content.

Media library folder structure is organized and documented.

21. Forms, Spam & Abuse Prevention

Honeypot field or CAPTCHA (e.g. Turnstile/reCAPTCHA) implemented on public forms.

Rate limiting on form submission endpoints.

Server-side validation matches client-side validation.

Success/error states and email notifications tested end-to-end.

Submitted data is sanitized before storage or forwarding.

22. Monitoring, Analytics & Legal/Compliance

Monitoring & Analytics

Uptime monitoring configured for production domain.

Error/exception monitoring (e.g. Sentry) configured.

Analytics events verified (pageviews, key conversions).

Consent mode / cookie banner functions correctly and blocks scripts pre-consent.

Legal & Compliance

Privacy policy and cookie policy pages present and linked.

GDPR/CCPA cookie consent implemented (if applicable to audience).

Accessibility statement present (if required).

23. PWA, Icons & Social Sharing

Favicon present across required sizes/devices (incl. Apple touch icon).

web app manifest present and valid (if PWA features are used).

Social share previews (OG image, Twitter card image) render correctly for each locale.

Print stylesheet reviewed for key content pages (if relevant).

24. Backup & Disaster Recovery

Git repository (source of truth for content) backed up / mirrored.

Media assets backed up separately from Git history if stored externally.

Documented recovery steps for a failed deployment or corrupted CMS entry.

SSL certificate auto-renewal confirmed (e.g. Let's Encrypt) and expiry monitored.