/** spacing (8px base grid): dense hairline chrome, huge section air */
export const spacing = {
	scale: [8, 16, 24, 32, 44, 64, 96, 136], // sp-1 … sp-8 (px)
	sectionX: 44, // standard section x-padding (30 below 1024px, 20 at ≤720px)
	sectionY: 96, // standard section y-padding
	blockY: 60, // responsive block y-padding (40 below 1024px, 30 below 768px)
	statementY: 136, // statement sections y-padding
	panelPadY: 'clamp(64px, 9vw, 120px)', // inside dark panels
	tilePad: 20, // inside tiles/cards (26 for tall)
	cardGap: 40, // between colored cards in panels
	contentMax: 1240, // shell width, hairline left+right
	icon: 44, // canonical line-icon size (ContourIcon/EtchedIcon), all instances
} as const;

/** structural tiles/buttons/bars stay SHARP (radius 0) */
export const radius = {
	none: 0,
	card: 8, // photographic/case-study cards only
	chip: 3, // small chips/pills
} as const;
