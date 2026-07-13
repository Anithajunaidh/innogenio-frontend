/**
 * Color tokens needed by client-side scripts. The CSS-facing tokens live
 * in src/styles/global.css under @theme — keep values in sync.
 * Canonical source: design-system.css (derived 1:1 from mistral.ai).
 */
export const color = {
	surfaceDark: '#000000',
	charcoal: '#2E2C34',
	inkInverse: '#ffffff',
} as const;

/**
 * Pixel-dissolve bloom ramp for Button's pixel variant — the charcoal-face
 * cells bloom charcoal (46,44,52) → deep brand purple (138,6,188), the same
 * six-step ramp the nav CTA uses in innogenio-home-v2. Cells pick a shade at
 * random so the mosaic reads graded rather than flat.
 */
export const charcoalPixelShades = [
	'#4E1F64',
	'#5C1978',
	'#670E88',
	'#720A99',
	'#7D0BA9',
	'#8A06BC',
] as const;

/**
 * Grey → white bloom ramp for the ghost / transparent header CTA ("See Our
 * Work"). Cells bloom light grey (201,197,210) → white (255,255,255), the same
 * six-step ramp innogenio-home-v2's `.hdr-more` button uses. Reads as a soft
 * light wash on both the light paper header and the dark header.
 */
export const greyPixelShades = [
	'#DCD9E2',
	'#E4E2E9',
	'#EAE9EE',
	'#F1F0F3',
	'#F7F7F9',
	'#FFFFFF',
] as const;

/**
 * Hero "binary city" canvas (innogenio-home hero): deep-violet backdrop
 * and the 9-step purple ramp the voxel faces are shaded with.
 */
export const heroCanvasBg = '#160323';
export const heroVoxelRamp = [
	'#22042C',
	'#340647',
	'#4B0765',
	'#5C0782',
	'#73079F',
	'#8A06BC',
	'#9F00D4',
	'#B93FE6',
	'#DFA9F6',
] as const;

/** INNOGENIO DESIGN SYSTEM — canonical color values from design-system.css. */
export const designColor = {
	ink: '#17121F', // near-black, all primary text
	inkSecondary: '#6A6277', // secondary text
	paper: '#FAF9F6', // warm off-white page
	line: '#E8E3F0', // hairline borders (1px everywhere)
	tile: '#FFFFFF', // content tile face
	fillWarm: '#F1EDE4', // warm beige filler blocks
	panelDark: '#1A1424', // dark feature panels (charcoal-purple)
	brand: '#9F00D4',
	brandSoft: '#F7E9FD',
	/* sequence ramp — dark text on ALL steps */
	ramp: ['#ECC8FA', '#D18BF4', '#B44BE8', '#9317CF'],
	rampText: '#1D0429', // dark aubergine on ramp steps
} as const;

/** '#RRGGBB' → [r, g, b] — for canvas scripts that grade token colors */
export const hexRgb = (hex: string): number[] =>
	(hex.replace('#', '').match(/../g) ?? []).map((h) => parseInt(h, 16));

/** dark-mode counterpart values */
export const designColorDark = {
	ink: '#F1EDF7',
	inkSecondary: '#9A92A8',
	paper: '#0F0B16',
	line: '#291F3C',
	tile: '#171021',
	fillWarm: '#1A1224',
	brand: '#C155EC',
	brandSoft: '#2B0A3A',
} as const;
