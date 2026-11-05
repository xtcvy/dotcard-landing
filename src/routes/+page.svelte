<script>
	import Seo from '#lib/Seo.svelte';
	import { first, last, name, title, description, links, contacts, isExternal, pad } from '#lib/profile.js';

	// Shown in uppercase via CSS, so write them in normal case (reads better to screen readers).
	const roleLine = 'UNC Charlotte · CS · Class of ’27';
	const metaLine = 'J&J Automotive · Belmont, NC';

	// Two featured "worlds", your primary fork.
	const featured = [
		{ tag: 'Business', label: 'J&J Automotive', sub: 'The shop · Belmont, NC', href: links.shop },
		{ tag: 'Professional', label: 'LinkedIn', sub: 'The work · SWE / security', href: links.linkedin }
	];
</script>

<Seo {title} {description} path="/" themeColor="#101116" />

<div class="reg tl" aria-hidden="true"></div>
<div class="reg tr" aria-hidden="true"></div>
<div class="reg bl" aria-hidden="true"></div>
<div class="reg br" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<div class="page">
	<main>
		<header class="head">
			<div class="bar">
				<span>Personal index</span>
				<span class="live"><i aria-hidden="true"></i>Open to work</span>
			</div>
			<h1><span>{first}</span> <span>{last}</span></h1>
			<p class="meta">
				<span>{roleLine}</span>
				<span>{metaLine}</span>
			</p>
		</header>

		<section aria-labelledby="worlds">
			<h2 class="rule" id="worlds">Two worlds</h2>
			<ul class="featured">
				{#each featured as f, i}
					<li>
						<a
							class="fcard"
							href={f.href}
							target="_blank"
							rel="noopener noreferrer"
							style="--delay: {180 + i * 80}ms"
						>
							<span class="frow">
								<span class="idx" aria-hidden="true">{pad(i + 1)}</span>
								<span class="tag">{f.tag}</span>
							</span>
							<span class="flabel">{f.label}</span>
							<span class="fsub">{f.sub}</span>
							<span class="sr-only">(opens in new tab)</span>
							<span class="far" aria-hidden="true">→</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<section aria-labelledby="contact">
			<h2 class="rule" id="contact">Contact</h2>
			<ul class="list">
				{#each contacts as d, i}
					{@const ext = isExternal(d.href)}
					<li>
						<a
							class="row"
							href={d.href}
							target={ext ? '_blank' : undefined}
							rel={ext ? 'noopener noreferrer' : undefined}
							style="--delay: {360 + i * 70}ms"
						>
							<span class="idx" aria-hidden="true">{pad(i + 1 + featured.length)}</span>
							<span class="rtext">
								<span class="rlabel">{d.label}</span>
								<span class="rsub">{d.sub}</span>
							</span>
							{#if ext}<span class="sr-only">(opens in new tab)</span>{/if}
							<span class="rar" aria-hidden="true">→</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</main>

	<footer>
		<span>© {new Date().getFullYear()} {name}</span>
	</footer>
</div>

<style>
	:global(:root) {
		--bg: #101116;
		--panel: #181a20;
		--panel-hover: #1e2028;
		--ink: #f4f2ec;
		--muted: #8b8d96;
		--line: #2a2c34;
		--accent: #eae4d6;
		color-scheme: dark;
	}
	:global(*) { box-sizing: border-box; }
	:global(html), :global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--ink);
		font-family: system-ui, -apple-system, "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;
	}

	.sr-only {
		position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
		overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
	}

	/* corner registration marks */
	.reg {
		position: fixed; width: 13px; height: 13px; z-index: 3;
		border: 1px solid var(--muted); opacity: 0.45; pointer-events: none;
	}
	.tl { top: 16px; left: 16px; border-right: 0; border-bottom: 0; }
	.tr { top: 16px; right: 16px; border-left: 0; border-bottom: 0; }
	.bl { bottom: 16px; left: 16px; border-right: 0; border-top: 0; }
	.br { bottom: 16px; right: 16px; border-left: 0; border-top: 0; }

	.grain {
		position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}

	.page {
		position: relative; z-index: 1;
		min-height: 100vh; min-height: 100dvh; max-width: 500px;
		margin: 0 auto; padding: max(64px, 11vh) 28px 52px;
		display: flex; flex-direction: column; gap: 36px;
	}
	main { display: flex; flex-direction: column; gap: 36px; }

	ul { list-style: none; margin: 0; padding: 0; }

	/* mono helper applied widely */
	.bar, .meta, .tag, .idx, .rule, .fsub, .rsub, footer {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	.bar {
		display: flex; justify-content: space-between; align-items: center;
		font-size: 11px; letter-spacing: 0.16em; color: var(--muted); text-transform: uppercase;
		padding-bottom: 14px; border-bottom: 1px solid var(--line);
		animation: rise 0.6s ease both;
	}
	.live { display: inline-flex; align-items: center; gap: 8px; color: var(--ink); }
	.live i {
		width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
		animation: pulse 2.4s infinite;
	}

	/* Size the name from the header's width so "Gonzalez-Silva" stays on one line
	   instead of breaking at the hyphen. */
	.head { container-type: inline-size; }
	h1 {
		font-family: 'Newsreader', Georgia, serif;
		font-weight: 500; font-size: clamp(34px, 14.4cqi, 64px);
		line-height: 0.96; letter-spacing: -0.01em;
		margin: 22px 0 18px; animation: rise 0.7s ease 60ms both;
	}
	h1 span { display: block; }

	.meta {
		display: flex; flex-direction: column; gap: 6px; margin: 0;
		font-size: 11.5px; letter-spacing: 0.1em; color: var(--muted); text-transform: uppercase;
		animation: rise 0.7s ease 130ms both;
	}

	.rule {
		display: flex; align-items: center; gap: 12px; margin: 0 0 14px;
		font-size: 11px; font-weight: 400; letter-spacing: 0.2em; color: var(--muted);
		text-transform: uppercase;
	}
	.rule::after { content: ''; flex: 1; height: 1px; background: var(--line); }

	.featured { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
	@media (max-width: 400px) { .featured { grid-template-columns: 1fr; } }

	.fcard {
		position: relative; display: flex; flex-direction: column; gap: 6px;
		height: 100%; min-height: 136px; padding: 16px 16px 40px;
		border: 1px solid var(--line); border-top: 2px solid var(--accent);
		background: var(--panel); text-decoration: none; color: var(--ink);
		transition: transform 0.22s ease, background 0.22s ease;
		animation: rise 0.6s ease var(--delay) both;
	}
	.frow { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
	.idx { font-size: 11px; letter-spacing: 0.12em; color: var(--accent); }
	.tag { font-size: 10px; letter-spacing: 0.18em; color: var(--muted); text-transform: uppercase; }
	.flabel { font-size: 20px; font-weight: 500; letter-spacing: -0.01em; margin-top: 6px; }
	.fsub { font-size: 12px; line-height: 1.45; color: var(--muted); letter-spacing: 0.02em; }
	.far {
		position: absolute; right: 16px; bottom: 14px; font-size: 16px; color: var(--muted);
		transition: color 0.22s ease, transform 0.22s ease;
	}

	.list li:first-child .row { border-top: 1px solid var(--line); }
	.row {
		display: flex; align-items: center; gap: 16px; padding: 15px 4px; min-height: 64px;
		border-bottom: 1px solid var(--line); text-decoration: none; color: var(--ink);
		transition: padding 0.2s ease, border-color 0.2s ease;
		animation: rise 0.5s ease var(--delay) both;
	}
	.row .idx { width: 22px; flex-shrink: 0; }
	.rtext { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
	.rlabel { font-size: 16px; font-weight: 500; letter-spacing: -0.01em; }
	.rsub { font-size: 11.5px; color: var(--muted); overflow-wrap: anywhere; }
	.rar { font-size: 15px; color: var(--muted); transition: color 0.2s ease, transform 0.2s ease; }

	/* Hover effects only where hover exists (avoids sticky states after a tap);
	   keyboard focus gets the same treatment plus a visible ring. */
	@media (hover: hover) {
		.fcard:hover { transform: translateY(-3px); background: var(--panel-hover); }
		.fcard:hover .far { color: var(--accent); transform: translate(3px, -3px); }
		.row:hover { padding-left: 12px; border-color: var(--accent); }
		.row:hover .rar { color: var(--accent); transform: translateX(3px); }
	}
	a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
	.fcard:focus-visible { background: var(--panel-hover); }
	.fcard:focus-visible .far, .row:focus-visible .rar { color: var(--accent); }

	footer {
		margin-top: auto; display: flex; justify-content: space-between;
		font-size: 11px; letter-spacing: 0.12em; color: var(--muted);
		padding-top: 16px; border-top: 1px solid var(--line);
	}

	@keyframes rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(234, 228, 214, 0.5); }
		70% { box-shadow: 0 0 0 7px rgba(234, 228, 214, 0); }
		100% { box-shadow: 0 0 0 0 rgba(234, 228, 214, 0); }
	}
	@media (prefers-reduced-motion: reduce) {
		* { animation: none !important; transition: none !important; }
	}
</style>
