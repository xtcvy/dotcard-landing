<script>
	// ── Edit your info here ───────────────────────────────────────────
	const first = 'Ian';
	const last = 'Gonzalez-Silva';
	const roleLine = "UNC CHARLOTTE · CS · CLASS OF '27";
	const metaLine = 'J&J AUTOMOTIVE · BELMONT, NC';

	// Two featured "worlds" — your primary fork.
	const featured = [
		{
			idx: '01',
			tag: 'BUSINESS',
			label: 'J&J Automotive',
			sub: 'The shop · Belmont, NC',
			href: 'https://jjautomotiverepairnc.com'
		},
		{
			idx: '02',
			tag: 'PROFESSIONAL',
			label: 'LinkedIn',
			sub: 'The work · SWE / security',
			href: 'https://www.linkedin.com/in/igonzalez-silva/'
		}
	];

	// Slim utility list.
	const direct = [
		{ idx: '03', label: 'Call the shop', sub: '(980) 990-3935', href: 'tel:+19809903935' },
		{ idx: '04', label: 'Email the shop', sub: 'info@jjautomotiverepairnc.com', href: 'mailto:info@jjautomotiverepairnc.com' },
		{ idx: '05', label: 'Text me', sub: '(980) 206-4395', href: 'sms:+19802064395' },
		{ idx: '06', label: 'Email me', sub: 'ian.gonzalezsilva@pm.me', href: 'mailto:ian.gonzalezsilva@pm.me' },
		{ idx: '07', label: 'Find us on Google', sub: 'Reviews · directions', href: 'https://maps.google.com/?q=J%26J+Automotive+Repair+Belmont+NC' }
	];

	const ext = (h) => h.startsWith('http');
</script>

<svelte:head>
	<title>{first} {last}</title>
	<meta name="description" content="{first} {last} — {roleLine}" />
</svelte:head>

<div class="reg tl" aria-hidden="true"></div>
<div class="reg tr" aria-hidden="true"></div>
<div class="reg bl" aria-hidden="true"></div>
<div class="reg br" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<main>
	<header class="head">
		<div class="bar">
			<span>PERSONAL&nbsp;INDEX</span>
			<span class="live"><i></i>OPEN TO WORK</span>
		</div>
		<h1>{first}<br />{last}</h1>
		<div class="meta">
			<span>{roleLine}</span>
			<span>{metaLine}</span>
		</div>
	</header>

	<section>
		<p class="rule"><span>TWO WORLDS</span></p>
		<div class="featured">
			{#each featured as f, i}
				<a class="fcard" href={f.href} target={ext(f.href) ? '_blank' : undefined}
					rel={ext(f.href) ? 'noopener noreferrer' : undefined} style="--delay: {180 + i * 80}ms">
					<span class="frow"><span class="idx">{f.idx}</span><span class="tag">{f.tag}</span></span>
					<span class="flabel">{f.label}</span>
					<span class="fsub">{f.sub}</span>
					<span class="far" aria-hidden="true">→</span>
				</a>
			{/each}
		</div>
	</section>

	<section>
		<p class="rule"><span>CONTACT</span></p>
		<div class="list">
			{#each direct as d, i}
				<a class="row" href={d.href} target={ext(d.href) ? '_blank' : undefined}
					rel={ext(d.href) ? 'noopener noreferrer' : undefined} style="--delay: {360 + i * 70}ms">
					<span class="idx">{d.idx}</span>
					<span class="rtext"><span class="rlabel">{d.label}</span><span class="rsub">{d.sub}</span></span>
					<span class="rar" aria-hidden="true">→</span>
				</a>
			{/each}
		</div>
	</section>

	<footer>
		<span>© {new Date().getFullYear()} {first} {last}</span>
	</footer>
</main>

<style>
	:global(:root) {
		--bg: #101116;
		--panel: #181a20;
		--ink: #f4f2ec;
		--muted: #8b8d96;
		--line: #2a2c34;
		--accent: #eae4d6;
	}
	:global(*) { box-sizing: border-box; }
	:global(html), :global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--ink);
		font-family: system-ui, -apple-system, "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
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

	main {
		position: relative; z-index: 1;
		min-height: 100dvh; max-width: 500px;
		margin: 0 auto; padding: 11vh 28px 52px;
		display: flex; flex-direction: column; gap: 36px;
	}

	/* mono helper applied widely */
	.bar, .meta, .tag, .idx, .rule, .fsub, .rsub, footer, .live {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	.bar {
		display: flex; justify-content: space-between; align-items: center;
		font-size: 10px; letter-spacing: 0.16em; color: var(--muted);
		padding-bottom: 14px; border-bottom: 1px solid var(--line);
		animation: rise 0.6s ease both;
	}
	.live { display: inline-flex; align-items: center; gap: 7px; color: var(--ink); }
	.live i {
		width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
		box-shadow: 0 0 0 0 rgba(214, 163, 92, 0.6); animation: pulse 2.4s infinite;
	}

	h1 {
		font-family: 'Newsreader', Georgia, serif;
		font-weight: 500; font-size: clamp(46px, 13vw, 70px);
		line-height: 0.94; letter-spacing: -0.01em;
		margin: 22px 0 18px; animation: rise 0.7s ease 60ms both;
	}

	.meta { display: flex; flex-direction: column; gap: 5px; font-size: 10.5px;
		letter-spacing: 0.1em; color: var(--muted); animation: rise 0.7s ease 130ms both; }

	.rule { display: flex; align-items: center; gap: 12px; margin: 0 0 14px;
		font-size: 10px; letter-spacing: 0.2em; color: var(--muted); }
	.rule::after { content: ''; flex: 1; height: 1px; background: var(--line); }

	.featured { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
	@media (max-width: 400px) { .featured { grid-template-columns: 1fr; } }

	.fcard {
		position: relative; display: flex; flex-direction: column; gap: 6px;
		min-height: 132px; padding: 16px 16px 18px;
		border: 1px solid var(--line); border-top: 2px solid var(--accent);
		background: var(--panel); text-decoration: none; color: var(--ink);
		transition: border-color 0.22s ease, transform 0.22s ease, background 0.22s ease;
		animation: rise 0.6s ease var(--delay) both;
	}
	.fcard:hover { transform: translateY(-3px); background: #16161a; border-color: var(--line); border-top-color: var(--accent); }
	.frow { display: flex; justify-content: space-between; align-items: center; }
	.idx { font-size: 10px; letter-spacing: 0.12em; color: var(--accent); }
	.tag { font-size: 8.5px; letter-spacing: 0.18em; color: var(--muted); }
	.flabel { font-size: 19px; font-weight: 500; letter-spacing: -0.01em; margin-top: 6px; }
	.fsub { font-size: 10.5px; color: var(--muted); letter-spacing: 0.02em; }
	.far { position: absolute; right: 16px; bottom: 14px; font-size: 16px; color: var(--muted);
		transition: color 0.22s ease, transform 0.22s ease; }
	.fcard:hover .far { color: var(--accent); transform: translate(3px, -3px); }

	.list { display: flex; flex-direction: column; }
	.row {
		display: flex; align-items: center; gap: 16px; padding: 15px 4px;
		border-bottom: 1px solid var(--line); text-decoration: none; color: var(--ink);
		transition: padding 0.2s ease, border-color 0.2s ease;
		animation: rise 0.5s ease var(--delay) both;
	}
	.row:first-child { border-top: 1px solid var(--line); }
	.row:hover { padding-left: 12px; border-color: var(--accent); }
	.row .idx { width: 22px; flex-shrink: 0; }
	.rtext { display: flex; flex-direction: column; gap: 2px; flex: 1; }
	.rlabel { font-size: 15px; font-weight: 500; letter-spacing: -0.01em; }
	.rsub { font-size: 10.5px; color: var(--muted); }
	.rar { font-size: 15px; color: var(--muted); transition: color 0.2s ease, transform 0.2s ease; }
	.row:hover .rar { color: var(--accent); transform: translateX(3px); }

	footer {
		margin-top: auto; display: flex; justify-content: space-between;
		font-size: 9.5px; letter-spacing: 0.12em; color: var(--muted);
		padding-top: 16px; border-top: 1px solid var(--line);
	}

	@keyframes rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(234, 228, 214, 0.5); }
		70% { box-shadow: 0 0 0 7px rgba(234, 228, 214, 0); }
		100% { box-shadow: 0 0 0 0 rgba(234, 228, 214, 0); }
	}
	@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
