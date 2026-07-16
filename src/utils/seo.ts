/**
 * JSON-LD builders for the <script type="application/ld+json"> blocks the
 * Layout injects. These anchor the "Innogenio" entity for search engines
 * and AI answer engines alike — keep the values consistent with what the
 * company publishes elsewhere (LinkedIn, GitHub, directories).
 */

/** real social/profile URLs — kept in sync with footer Community links */
const SAME_AS: string[] = [
	'https://linkedin.com/company/innogenio',
	'https://x.com/innogenio',
	'https://github.com/innogenio',
	'https://instagram.com/innogenio',
];

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

/**
 * AboutPage schema — combines an AboutPage document node with the
 * Organization publisher so search engines understand the /about route.
 * locale follows BCP 47 (e.g. "en", "de").
 */
export function aboutPageLd(
	site: string,
	pageUrl: string,
	title: string,
	description: string,
	locale: string,
) {
	return [
		{
			'@context': 'https://schema.org',
			'@type': 'AboutPage',
			'@id': pageUrl,
			name: title,
			description,
			url: pageUrl,
			inLanguage: locale,
			publisher: {
				'@type': 'Organization',
				name: 'Innogenio',
				url: site,
				logo: new URL('/favicon.svg', site).href,
				sameAs: SAME_AS,
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Innogenio',
			url: site,
			logo: new URL('/favicon.svg', site).href,
			description,
			sameAs: SAME_AS,
		},
	];
}
