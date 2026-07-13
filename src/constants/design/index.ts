/**
 * Design tokens needed by client-side scripts (canvas painting, GSAP, etc.).
 * The CSS-facing tokens live in src/styles/global.css under @theme —
 * keep values in sync between the two files.
 *
 * Split by concern (color/font/spacing/motion) for easier maintenance;
 * this barrel re-exports everything so existing `from '.../design-token'`-
 * style imports keep working via `from '.../design'`.
 */
export {
	color,
	charcoalPixelShades,
	greyPixelShades,
	heroCanvasBg,
	heroVoxelRamp,
	designColor,
	designColorDark,
} from './color';
export { font, fontSize } from './font';
export { spacing, radius } from './spacing';
export { motion } from './motion';

import { designColor, designColorDark } from './color';
import { font, fontSize } from './font';
import { spacing, radius } from './spacing';
import { motion } from './motion';

/** INNOGENIO DESIGN SYSTEM — canonical values from design-system.css. */
export const designSystem = {
	color: designColor,
	colorDark: designColorDark,
	font,
	fontSize,
	spacing,
	radius,
	motion,
} as const;
