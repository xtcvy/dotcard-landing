import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/**
 * Public origin of the deployed site, e.g. "https://example.com" (no trailing slash).
 * Link previews need absolute URLs for og:image / og:url / canonical, so this has to be
 * known at build time. Set SITE_URL in your host's build environment. Vercel and
 * Netlify builds fall back to the project's production URL automatically.
 */
function resolveSiteUrl() {
	const env = process.env;
	const url =
		env.SITE_URL ||
		(env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
		(env.NETLIFY === 'true' && env.URL) ||
		'';
	return url.replace(/\/+$/, '');
}

export default defineConfig(({ command }) => {
	const siteUrl = resolveSiteUrl();
	// SvelteKit loads this config in several (child) processes per build; warn once.
	if (command === 'build' && !siteUrl && !process.env.DOTCARD_WARNED) {
		process.env.DOTCARD_WARNED = '1';
		console.warn(
			'\n[dotcard] SITE_URL is not set: building without og:image, og:url and canonical tags.' +
				'\n           Link previews will show title + description only. See README → Deploy.\n'
		);
	}

	return {
		define: {
			__SITE_URL__: JSON.stringify(siteUrl)
		},
		plugins: [
			// SvelteKit 3 takes its config here; svelte.config.js is no longer read.
			sveltekit({
				adapter: adapter({
					pages: 'build',
					assets: 'build',
					fallback: undefined,
					precompress: false,
					strict: true
				})
			})
		]
	};
});
