<script>
	import { SITE_URL, first, last, name, links } from './profile.js';

	/** @type {{ title: string, description: string, path?: string, themeColor: string }} */
	let { title, description, path = '/', themeColor } = $props();

	// Canonical / og:url / og:image must be absolute, so they're only emitted when the
	// build knows the site origin (SITE_URL). Without it, previews fall back to text only.
	const url = $derived(SITE_URL ? SITE_URL + path : '');
	const image = SITE_URL ? `${SITE_URL}/og.png` : '';
	const imageAlt = `${name}: UNC Charlotte CS, class of ’27 · J&J Automotive, Belmont, NC`;

	const jsonLd = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name,
		...(url && { url }),
		sameAs: [links.linkedin],
		worksFor: { '@type': 'AutoRepair', name: 'J&J Automotive', url: links.shop },
		affiliation: { '@type': 'CollegeOrUniversity', name: 'UNC Charlotte' }
	}).replace(/</g, '\\u003c'));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="theme-color" content={themeColor} />
	{#if url}
		<link rel="canonical" href={url} />
		<meta property="og:url" content={url} />
	{/if}

	<meta property="og:type" content="profile" />
	<meta property="profile:first_name" content={first} />
	<meta property="profile:last_name" content={last} />
	<meta property="og:site_name" content={name} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="og:image:type" content="image/png" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content={imageAlt} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={image} />
		<meta name="twitter:image:alt" content={imageAlt} />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}

	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
