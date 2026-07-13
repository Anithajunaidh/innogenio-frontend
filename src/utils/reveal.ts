/** Scroll-entrance observer: stamps .in-view on every [data-reveal]
 * element the first time it scrolls into the viewport, which releases its
 * staggered .rv-block children (see global.css). Import and call from any
 * section that opts in — the module is bundled once per page, and the
 * guard makes repeated calls from multiple sections a no-op. */
let initialized = false;

export function initReveal() {
	if (initialized) return;
	initialized = true;

	const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
	if (!targets.length) return;

	if (!('IntersectionObserver' in window)) {
		targets.forEach((t) => t.classList.add('in-view'));
		return;
	}

	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add('in-view');
					io.unobserve(e.target);
				}
			});
		},
		// low threshold so tall sections (whose max visible ratio is small)
		// still trigger comfortably on phone viewports
		{ threshold: 0.15 }
	);
	targets.forEach((t) => io.observe(t));
}
