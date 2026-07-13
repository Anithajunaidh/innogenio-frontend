/**
 * JSON-LD builders for the <script type="application/ld+json"> blocks the
 * Layout injects. These anchor the "Innogenio" entity for search engines
 * and AI answer engines alike — keep the values consistent with what the
 * company publishes elsewhere (LinkedIn, GitHub, directories).
 */

/** real social/profile URLs strengthen the entity — fill in as they exist */
const SAME_AS: string[] = [];

export function organizationLd(site: string, description: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Innogenio',
		url: site,
		logo: new URL('/favicon.svg', site).href,
		description,
		sameAs: SAME_AS,
	};
}

export function webSiteLd(site: string, name: string, locale: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Innogenio',
		alternateName: name,
		url: site,
		inLanguage: locale,
	};
}

/** one Service entry per offering, fed from the localized services data */
export function servicesLd(site: string, services: { title: string; body: string }[]) {
	return services.map((s) => ({
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: s.title.replace(/\.$/, ''),
		description: s.body,
		provider: { '@type': 'Organization', name: 'Innogenio', url: site },
	}));
}
