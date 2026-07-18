import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const observed = new WeakSet<HTMLElement>();

export function initReveal() {
	const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
	if (!targets.length) return;

	const run = () => {
		gsap.registerPlugin(ScrollTrigger);

		requestAnimationFrame(() => {
			targets.forEach((t) => {
				if (!observed.has(t)) {
					observed.add(t);

					ScrollTrigger.create({
						trigger: t,
						start: 'top 88%',
						once: true,
						onEnter: () => {
							t.classList.add('in-view');
						},
					});
				}
			});
		});
	};

	if (document.readyState === 'complete') {
		run();
	} else {
		window.addEventListener('load', run);
	}
}
