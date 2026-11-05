import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

/**
 * Public origin of the deployed site, e.g. "https://example.com" (no trailing slash).
 * Link previews need absolute URLs for og:image / og:url / canonical, so this has to be
 * known at build time. Set SITE_URL in your host's build environment or in a local
 * .env / .env.production file. Vercel and Netlify builds fall back to the project's
 * production URL automatically.
 */
function resolveSiteUrl(mode) {
	const env = process.env;
	const raw =
		// loadEnv gives variables already set in the environment priority over .env files
		loadEnv(mode, process.cwd(), 'SITE_URL').SITE_URL ||
		(env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
		(env.NETLIFY === 'true' && env.URL) ||
		'';
	if (!raw) return '';

	// Fail the build on a malformed value rather than emit broken preview tags.
	let url;
	try {
		url = new URL(raw);
	} catch {
		url = null;
	}
	if (!url || !/^https?:$/.test(url.protocol) || url.pathname !== '/' || url.search || url.hash) {
		throw new Error(
			`[dotcard] SITE_URL must be an absolute http(s) origin like "https://example.com", got "${raw}".`
		);
	}
	return url.origin;
}

export default defineConfig(({ command, mode }) => {
	const siteUrl = resolveSiteUrl(mode);
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
			// adapter() with no options writes to build/ and, on Vercel, switches to
			// zero-config mode (Vercel output format with clean URLs such as /light).
			sveltekit({ adapter: adapter() })
		]
	};
});
