<script>
	import Seo from '#lib/Seo.svelte';
	import { first, last, name, title, description, links, contacts, isExternal, pad } from '#lib/profile.js';

	const descriptor =
		'CS student at UNC Charlotte. I build software and help run my family’s auto shop in Belmont.';

	// Numbered intro row: who you are, in three lines.
	const creds = [
		{ key: 'Focus', title: 'Software & security', body: 'I build tools, study systems, and ship real things.' },
		{ key: 'Business', title: 'Auto shop operations', body: 'I run estimates, insurance, and the books at J&J Automotive.' },
		{ key: 'Based', title: 'Charlotte, NC', body: 'Class of ’27. Open to software engineering and security roles.' }
	];

	const featured = [
		{ tone: 'sand', tag: 'The shop', label: 'J&J Automotive', sub: 'Collision & repair · Belmont, NC', href: links.shop },
		{ tone: 'cool', tag: 'The work', label: 'LinkedIn', sub: 'Software engineering · security', href: links.linkedin }
	];
</script>

<Seo {title} {description} path="/light" themeColor="#f5f2ec" />

<div class="page">
	<main>
		<div class="masthead">
			<span>{name}</span>
			<span>Charlotte, NC</span>
		</div>

		<header class="hero">
			<h1><span>{first}</span> <span>{last}</span></h1>
			<p class="desc">{descriptor}</p>
		</header>

		<section aria-labelledby="about">
			<h2 class="sr-only" id="about">About</h2>
			<dl class="creds">
				{#each creds as c, i}
					<div class="cred" style="--delay: {140 + i * 70}ms">
						<dt class="cno">{c.key}</dt>
						<dd class="ctitle">{c.title}</dd>
						<dd class="cbody">{c.body}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<section aria-labelledby="links">
			<h2 class="sr-only" id="links">Links</h2>
			<ul class="featured" role="list">
				{#each featured as f, i}
					<li>
						<a
							class="fcard {f.tone}"
							href={f.href}
							target="_blank"
							rel="noopener noreferrer"
							style="--delay: {360 + i * 90}ms"
						>
							<span class="ftop">
								<span class="no" aria-hidden="true">[ {pad(i + 1)} ]</span>
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
			<h2 class="sr-only" id="contact">Contact</h2>
			<ul class="list" role="list">
				{#each contacts as d, i}
					{@const ext = isExternal(d.href)}
					<li>
						<a
							class="row"
							href={d.href}
							target={ext ? '_blank' : undefined}
							rel={ext ? 'noopener noreferrer' : undefined}
							style="--delay: {540 + i * 70}ms"
						>
							<span class="no" aria-hidden="true">[ {pad(i + 1 + featured.length)} ]</span>
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
		--paper: #f5f2ec;
		--ink: #16140f;
		--soft: #5f5b54;
		--line: #ddd8cf;
		--sand: #ece1cf;
		--sand-line: #d8c5a6;
		--cool: #dfe6ec;
		--cool-line: #c0cdd9;
		color-scheme: light;
	}
	:global(*) { box-sizing: border-box; }
	:global(html), :global(body) {
		margin: 0; background: var(--paper); color: var(--ink);
		font-family: system-ui, -apple-system, "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;
	}

	.sr-only {
		position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
		overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
	}

	.page {
		min-height: 100vh; min-height: 100dvh; max-width: 560px;
		margin: 0 auto; padding: max(40px, 6vh) 28px 52px;
		display: flex; flex-direction: column; gap: 34px;
	}
	main { display: flex; flex-direction: column; gap: 34px; }

	ul, dl, dd { list-style: none; margin: 0; padding: 0; }

	.masthead, .no, .cno, .tag, .desc, .fsub, .rsub, .cbody, footer {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	.masthead {
		display: flex; justify-content: space-between; align-items: center; gap: 12px;
		font-size: 11px; letter-spacing: 0.16em; color: var(--soft);
		text-transform: uppercase;
		padding-bottom: 14px; border-bottom: 1px solid var(--ink);
		animation: rise 0.6s ease both;
	}

	/* Size the name from the column width so "Gonzalez-Silva" stays on one line
	   instead of breaking at the hyphen. */
	.hero { container-type: inline-size; animation: rise 0.7s ease 60ms both; }
	h1 {
		font-family: 'Newsreader', Georgia, serif;
		font-weight: 500; font-size: clamp(34px, 14.4cqi, 76px);
		line-height: 0.94; letter-spacing: -0.015em; margin: 8px 0 0;
	}
	h1 span { display: block; }
	.desc {
		font-size: 13px; line-height: 1.6; color: var(--soft);
		letter-spacing: 0.01em; margin: 18px 0 0; max-width: 30em;
	}

	.creds {
		display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
		padding: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
	}
	@media (max-width: 480px) { .creds { grid-template-columns: 1fr; gap: 18px; } }
	.cred { display: flex; flex-direction: column; gap: 7px; animation: rise 0.6s ease var(--delay) both; }
	.cno {
		font-size: 10px; letter-spacing: 0.2em; color: var(--soft); text-transform: uppercase;
		padding-bottom: 2px; border-bottom: 1px solid var(--line); align-self: flex-start;
	}
	.ctitle { font-size: 14.5px; font-weight: 600; letter-spacing: -0.01em; }
	.cbody { font-size: 11.5px; line-height: 1.55; color: var(--soft); }

	.featured { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	@media (max-width: 420px) { .featured { grid-template-columns: 1fr; } }
	.fcard {
		position: relative; display: flex; flex-direction: column; gap: 7px;
		height: 100%; min-height: 150px; padding: 18px 18px 44px;
		border: 1px solid var(--line); border-radius: 10px;
		text-decoration: none; color: var(--ink); background: #fff;
		transition: transform 0.22s ease, box-shadow 0.22s ease;
		/* backwards, not both: a held end state would pin transform and block the hover lift */
		animation: rise 0.6s ease var(--delay) backwards;
	}
	.fcard.sand { background: var(--sand); border-color: var(--sand-line); }
	.fcard.cool { background: var(--cool); border-color: var(--cool-line); }
	.ftop { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
	.no { font-size: 11px; letter-spacing: 0.1em; color: var(--soft); white-space: nowrap; }
	.tag { font-size: 10px; letter-spacing: 0.18em; color: var(--soft); text-transform: uppercase; }
	.flabel { font-size: 20px; font-weight: 600; letter-spacing: -0.015em; margin-top: 8px; }
	.fsub { font-size: 12px; color: var(--soft); line-height: 1.45; }
	.far { position: absolute; right: 18px; bottom: 16px; font-size: 17px; color: var(--ink); transition: transform 0.22s ease; }

	.list li:first-child .row { border-top: 1px solid var(--line); }
	.row {
		display: flex; align-items: center; gap: 16px; padding: 16px 4px; min-height: 64px;
		border-bottom: 1px solid var(--line); text-decoration: none; color: var(--ink);
		transition: padding 0.2s ease; animation: rise 0.5s ease var(--delay) both;
	}
	.row .no { width: 48px; flex-shrink: 0; }
	.rtext { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
	.rlabel { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
	.rsub { font-size: 11.5px; color: var(--soft); overflow-wrap: anywhere; }
	.rar { font-size: 15px; color: var(--ink); transition: transform 0.2s ease; }

	/* Hover effects only where hover exists (avoids sticky states after a tap);
	   keyboard focus gets a visible ring. */
	@media (hover: hover) {
		.fcard:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(20, 18, 14, 0.12); }
		.fcard:hover .far { transform: translate(3px, -3px); }
		.row:hover { padding-left: 12px; }
		.row:hover .rar { transform: translateX(4px); }
	}
	a:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }

	footer {
		margin-top: auto; display: flex; justify-content: space-between;
		font-size: 11px; letter-spacing: 0.12em; color: var(--soft); text-transform: uppercase;
		padding-top: 16px; border-top: 1px solid var(--line);
	}

	@keyframes rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
	@media (prefers-reduced-motion: reduce) {
		* { animation: none !important; transition: none !important; }
	}
</style>
