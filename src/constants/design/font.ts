/** one grotesque + one monospace — no serif, no third face */
export const font = {
	sans: "'Helvetica Now Display','Neue Haas Grotesk Display','Helvetica Neue',Helvetica,'Segoe UI',Arial,sans-serif",
	mono: "ui-monospace,'Cascadia Mono',Consolas,'SF Mono',Menlo,monospace",
} as const;

/** type scale (desktop targets; clamped to viewport) */
export const fontSize = {
	hero: 'clamp(48px, 7.9vw, 116px)', // lh 1.0, ls -0.04em, w500
	h2: 'clamp(38px, 5.4vw, 66px)', // ls -0.03em, w500
	h3: 'clamp(34px, 4.6vw, 54px)', // ls -0.03em, w500
	lead: 'clamp(19px, 1.85vw, 26.5px)', // lh 1.32, w500
	cardHeadline: 'clamp(24px, 2.9vw, 37px)', // lh 1.16, w500
	title: '20px', // w600, ls -0.015em
	body: '15px', // lh 1.5
	small: '13.5px', // lh 1.45
	button: '15px', // w600
	monoPanel: '14.5px', // ls .08em, lh 1.75, w500
	kicker: '10px', // ls .16em, uppercase
} as const;
