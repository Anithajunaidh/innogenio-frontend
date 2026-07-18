/**
 * i18n registry — the routing config lives in astro.config.mjs (en at "/",
 * every other locale at "/<locale>/"); this module maps a locale to its
 * copy files under src/constants/pagedata/<locale>/.
 *
 * Adding a locale:
 *  1. add it to `locales` here and in astro.config.mjs
 *  2. copy src/constants/pagedata/en/ to a new <locale>/ folder and
 *     translate the copy (keep non-copy fields — icons, image keys,
 *     variants, avatars — identical)
 *  3. add src/pages/<locale>/index.astro rendering
 *     <LandingPage locale="<locale>" />
 */
import enLanding from '../constants/pagedata/en/landing-page.json';
import enTestimonials from '../constants/pagedata/en/testimonials.json';
import enSite from '../constants/pagedata/en/site.json';
import deLanding from '../constants/pagedata/de/landing-page.json';
import deTestimonials from '../constants/pagedata/de/testimonials.json';
import deSite from '../constants/pagedata/de/site.json';
import enAiGuide from '../constants/pagedata/en/ai-guide.json';
import deAiGuide from '../constants/pagedata/de/ai-guide.json';

export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** switcher labels */
export const localeNames: Record<Locale, string> = { en: 'EN', de: 'DE' };

/** home path of a locale (default locale is unprefixed) */
export const localeHome = (locale: Locale) =>
	locale === defaultLocale ? '/' : `/${locale}/`;

/** og:locale value per locale */
export const ogLocales: Record<Locale, string> = { en: 'en_US', de: 'de_DE' };

/** the same route in another locale — strips any locale prefix from the
 * pathname, then re-prefixes for non-default locales (used for hreflang
 * alternates and the language switcher) */
export const pathForLocale = (pathname: string, locale: Locale) => {
	const clean = pathname.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '') || '/';
	return locale === defaultLocale ? clean : `/${locale}${clean}`;
};

const landing = { en: enLanding, de: deLanding };
const testimonials = { en: enTestimonials, de: deTestimonials };
const site = { en: enSite, de: deSite };
const aiGuide = { en: enAiGuide, de: deAiGuide };

/** landing-page copy: typed by the en files, so a locale file with a
 * missing or misshapen section fails the build instead of rendering holes */
export const getLanding = (locale: Locale): typeof enLanding => landing[locale];
export const getTestimonials = (locale: Locale): typeof enTestimonials => testimonials[locale];
export const getSite = (locale: Locale): typeof enSite => site[locale];
export const getAiGuide = (locale: Locale): typeof enAiGuide => aiGuide[locale];
