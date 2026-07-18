import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export function initSmoother() {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	ScrollSmoother.create({
		wrapper: '#smooth-wrapper',
		content: '#smooth-content',
		smooth: 1.2,
		effects: false,
		smoothTouch: false,
	});
}
