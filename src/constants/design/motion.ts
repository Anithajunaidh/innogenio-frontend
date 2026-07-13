export const motion = {
	easeOut: 'cubic-bezier(0.2, 0.7, 0.3, 1)', // arrows, lifts
	easeMove: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // tile/carousel travel
	fast: 150, // ms — hovers
	medium: 300, // ms — arrows, reveals
	slow: 600, // ms — entrances, carousel
	/* pixel effects: steps() only, never smooth; cell 10-16px;
	   bloom from center 360-460ms; recede edges-first */
} as const;
