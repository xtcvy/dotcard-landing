<script>
	const first = 'Ian';
	const last = 'Gonzalez-Silva';
	const descriptor = "CS student at UNC Charlotte. I build software and help run my family's auto shop in Belmont.";

	// Synex-style numbered intro row: who you are, in three lines.
	const creds = [
		{ no: 'FOCUS', title: 'Software & security', body: 'CS at UNC Charlotte. I build tools, study systems, and ship real things.' },
		{ no: 'BUSINESS', title: 'Auto shop operations', body: 'I run estimates, insurance, and the books at J&J Automotive.' },
		{ no: 'BASED', title: 'Charlotte, NC · ’27', body: 'Open to software engineering and security roles.' }
	];

	const featured = [
		{
			no: '01', tone: 'sand', tag: 'THE SHOP',
			label: 'J&J Automotive',
			sub: 'Collision & repair · Belmont, NC',
			href: 'https://jjautomotiverepairnc.com'
		},
		{
			no: '02', tone: 'cool', tag: 'THE WORK',
			label: 'LinkedIn',
			sub: 'Software engineering · security',
			href: 'https://www.linkedin.com/in/igonzalez-silva/'
		}
	];

	const direct = [
		{ no: '03', label: 'Call the shop', sub: '(980) 990-3935', href: 'tel:+19809903935' },
		{ no: '04', label: 'Email the shop', sub: 'info@jjautomotiverepairnc.com', href: 'mailto:info@jjautomotiverepairnc.com' },
		{ no: '05', label: 'Text me', sub: '(980) 206-4395', href: 'sms:+19802064395' },
		{ no: '06', label: 'Email me', sub: 'ian.gonzalezsilva@pm.me', href: 'mailto:ian.gonzalezsilva@pm.me' },
		{ no: '07', label: 'Find us on Google', sub: 'Reviews · directions', href: 'https://maps.google.com/?q=J%26J+Automotive+Repair+Belmont+NC' }
	];

	const ext = (h) => h.startsWith('http');
</script>

<svelte:head>
	<title>{first} {last}</title>
	<meta name="description" content="{first} {last} — {descriptor}" />
</svelte:head>

<main>
	<div class="masthead">
		<span>{first} {last}</span>
		<span>CHARLOTTE, NC</span>
	</div>

	<header class="hero">
		<h1>{first}<br />{last}</h1>
		<p class="desc">{descriptor}</p>
	</header>

	<section class="creds">
		{#each creds as c, i}
			<div class="cred" style="--delay: {140 + i * 70}ms">
				<span class="cno">{c.no}</span>
				<span class="ctitle">{c.title}</span>
				<span class="cbody">{c.body}</span>
			</div>
		{/each}
	</section>

	<section class="featured">
		{#each featured as f, i}
			<a class="fcard {f.tone}" href={f.href} target={ext(f.href) ? '_blank' : undefined}
				rel={ext(f.href) ? 'noopener noreferrer' : undefined} style="--delay: {360 + i * 90}ms">
				<span class="ftop"><span class="no">[ {f.no} ]</span><span class="tag">{f.tag}</span></span>
				<span class="flabel">{f.label}</span>
				<span class="fsub">{f.sub}</span>
				<span class="far" aria-hidden="true">→</span>
			</a>
		{/each}
	</section>

	<section class="list">
		{#each direct as d, i}
			<a class="row" href={d.href} target={ext(d.href) ? '_blank' : undefined}
				rel={ext(d.href) ? 'noopener noreferrer' : undefined} style="--delay: {540 + i * 70}ms">
				<span class="no">[ {d.no} ]</span>
				<span class="rtext"><span class="rlabel">{d.label}</span><span class="rsub">{d.sub}</span></span>
				<span class="rar" aria-hidden="true">→</span>
			</a>
		{/each}
	</section>

	<footer>
		<span>© {new Date().getFullYear()} {first} {last}</span>
	</footer>
</main>

<style>
	:global(:root) {
		--paper: #f5f2ec;
		--ink: #16140f;
		--soft: #6b6760;
		--line: #ddd8cf;
		--sand: #ece1cf;
		--sand-line: #d8c5a6;
		--cool: #dfe6ec;
		--cool-line: #c0cdd9;
	}
	:global(*) { box-sizing: border-box; }
	:global(html), :global(body) {
		margin: 0; background: var(--paper); color: var(--ink);
		font-family: system-ui, -apple-system, "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	main {
		min-height: 100dvh; max-width: 560px;
		margin: 0 auto; padding: 6vh 28px 52px;
		display: flex; flex-direction: column; gap: 34px;
	}

	.masthead, .no, .cno, .tag, .desc, .fsub, .rsub, .cbody, footer {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	.masthead {
		display: flex; justify-content: space-between; align-items: center;
		font-size: 10px; letter-spacing: 0.16em; color: var(--soft);
		text-transform: uppercase;
		padding-bottom: 14px; border-bottom: 1px solid var(--ink);
		animation: rise 0.6s ease both;
	}

	.hero { animation: rise 0.7s ease 60ms both; }
	h1 {
		font-family: 'Newsreader', Georgia, serif;
		font-weight: 500; font-size: clamp(50px, 14vw, 80px);
		line-height: 0.92; letter-spacing: -0.015em; margin: 8px 0 0;
	}
	.desc { font-size: 12px; line-height: 1.6; color: var(--soft);
		letter-spacing: 0.01em; margin: 18px 0 0; max-width: 26em; }

	/* Synex-style numbered intro row */
	.creds {
		display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
		padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
	}
	@media (max-width: 480px) { .creds { grid-template-columns: 1fr; gap: 16px; } }
	.cred { display: flex; flex-direction: column; gap: 7px; animation: rise 0.6s ease var(--delay) both; }
	.cno { font-size: 9px; letter-spacing: 0.2em; color: var(--soft); text-transform: uppercase; padding-bottom: 2px; border-bottom: 1px solid var(--line); align-self: flex-start; }
	.ctitle { font-size: 13.5px; font-weight: 600; letter-spacing: -0.01em; }
	.cbody { font-size: 10px; line-height: 1.55; color: var(--soft); }

	.featured { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	@media (max-width: 420px) { .featured { grid-template-columns: 1fr; } }
	.fcard {
		position: relative; display: flex; flex-direction: column; gap: 7px;
		min-height: 150px; padding: 18px 18px 20px;
		border: 1px solid var(--line); border-radius: 10px;
		text-decoration: none; color: var(--ink); background: #fff;
		transition: transform 0.22s ease, box-shadow 0.22s ease;
		animation: rise 0.6s ease var(--delay) both;
	}
	.fcard.sand { background: var(--sand); border-color: var(--sand-line); }
	.fcard.cool { background: var(--cool); border-color: var(--cool-line); }
	.fcard:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(20, 18, 14, 0.12); }
	.ftop { display: flex; justify-content: space-between; align-items: center; }
	.no { font-size: 10px; letter-spacing: 0.1em; color: var(--soft); }
	.tag { font-size: 8.5px; letter-spacing: 0.18em; color: var(--soft); }
	.flabel { font-size: 20px; font-weight: 600; letter-spacing: -0.015em; margin-top: 8px; }
	.fsub { font-size: 10.5px; color: var(--soft); line-height: 1.45; }
	.far { position: absolute; right: 18px; bottom: 16px; font-size: 17px; color: var(--ink); transition: transform 0.22s ease; }
	.fcard:hover .far { transform: translate(3px, -3px); }

	.list { display: flex; flex-direction: column; }
	.row {
		display: flex; align-items: center; gap: 16px; padding: 16px 4px;
		border-bottom: 1px solid var(--line); text-decoration: none; color: var(--ink);
		transition: padding 0.2s ease; animation: rise 0.5s ease var(--delay) both;
	}
	.row:first-child { border-top: 1px solid var(--line); }
	.row:hover { padding-left: 12px; }
	.row .no { width: 42px; flex-shrink: 0; }
	.rtext { display: flex; flex-direction: column; gap: 2px; flex: 1; }
	.rlabel { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
	.rsub { font-size: 10.5px; color: var(--soft); }
	.rar { font-size: 15px; color: var(--ink); transition: transform 0.2s ease; }
	.row:hover .rar { transform: translateX(4px); }

	footer {
		margin-top: auto; display: flex; justify-content: space-between;
		font-size: 9.5px; letter-spacing: 0.12em; color: var(--soft); text-transform: uppercase;
		padding-top: 16px; border-top: 1px solid var(--line);
	}

	@keyframes rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
	@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
