// ── Edit your info here ─────────────────────────────────────────────
// Shared by both variants (`/` dark, `/light` light) and the link-preview tags.

/** Public origin of the deployed site, injected at build time (see vite.config.js). */
export const SITE_URL = __SITE_URL__;

export const first = 'Ian';
export const last = 'Gonzalez-Silva';
export const name = `${first} ${last}`;

/** Browser tab + link-preview title. */
export const title = `${name} · Software & security · J&J Automotive`;

/** Search snippet + link-preview description. Keep it under ~160 characters. */
export const description =
	'CS student at UNC Charlotte (’27) focused on software engineering and security. ' +
	'I also help run J&J Automotive, my family’s auto shop in Belmont, NC.';

export const links = {
	shop: 'https://jjautomotiverepairnc.com',
	linkedin: 'https://www.linkedin.com/in/igonzalez-silva/'
};

/** The contact list under the two featured cards. */
export const contacts = [
	{ label: 'Call the shop', sub: '(980) 990-3935', href: 'tel:+19809903935' },
	{
		label: 'Email the shop',
		sub: 'info@jjautomotiverepairnc.com',
		href: 'mailto:info@jjautomotiverepairnc.com'
	},
	{ label: 'Text me', sub: '(980) 206-4395', href: 'sms:+19802064395' },
	{ label: 'Email me', sub: 'ian.gonzalezsilva@pm.me', href: 'mailto:ian.gonzalezsilva@pm.me' },
	{
		label: 'Find the shop on Google',
		sub: 'Reviews · directions',
		href: 'https://www.google.com/maps/search/?api=1&query=J%26J+Automotive+Repair+Belmont+NC'
	}
];

/** Web links open in a new tab; tel:, sms: and mailto: links don't. */
export const isExternal = (href) => /^https?:/.test(href);

/** "3" → "03" */
export const pad = (n) => String(n).padStart(2, '0');
