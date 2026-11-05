# dotcard-landing

The landing page behind Ian Gonzalez-Silva's dot card: a one-page personal contact card
with his name, two featured links (J&J Automotive and LinkedIn) and tap-to-call / text /
email contacts.

It comes in two visual variants with the same content:

| Route    | Look                    |
| -------- | ----------------------- |
| `/`      | Dark, monochrome        |
| `/light` | Light, paper and pastel |

Built with SvelteKit 3, Svelte 5 and Vite 8. Every page is prerendered to plain HTML by
`@sveltejs/adapter-static`, and no JavaScript is shipped to the browser.

## Requirements

- Node.js 22.17 or newer (`.nvmrc` pins Node 22)
- npm

## Local development

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:5173> and <http://localhost:5173/light>.

### Editing the content

- **`src/lib/profile.js`**: name, contact rows, featured link URLs, and the page title and
  description used by search engines and link previews. Both variants read from here.
- **`src/routes/+page.svelte`** (dark) and **`src/routes/light/+page.svelte`** (light):
  the copy specific to each variant (role lines, featured-card labels, intro blurbs) at the
  top of each file, then the markup and styles.
- **`static/`**: favicon (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`), the
  link-preview image `og.png` (1200×630) and `robots.txt`. If the name or role line changes,
  replace `og.png` with a new image of the same size.

## Build

```bash
SITE_URL=https://your-domain.example npm run build
```

```bash
npm run preview
```

The site is written to `build/` (`index.html`, `light.html`, CSS, icons and images).

`SITE_URL` is the public origin of the deployed site, such as `https://example.com`. Link
previews (iMessage, Slack, LinkedIn, X and others) need absolute URLs for the preview image,
so the build uses it for `og:image`, `og:url`, `canonical` and the JSON-LD `url`. You can set
it in the environment, as above, or in a `.env` / `.env.production` file, which git ignores.

- If it isn't set, the build still succeeds, but it prints a warning and leaves those tags
  out, and shared links show only the title and description, with no image.
- If it isn't a valid `http(s)://` origin (for example `example.com` with no scheme, or a URL
  with a path), the build fails with a message saying so.

## Deploy

`build/` is a plain static site, so any static host works.

**Vercel:** import the repo and keep the detected SvelteKit preset, with no output-directory
override. On Vercel, `adapter-static` switches to zero-config mode: it writes Vercel's own
output format, including the routing that serves `/light`. `SITE_URL` is optional, because
the build falls back to the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`).

**Netlify, Cloudflare Pages and other static hosts:**

- **Build command:** `npm run build`
- **Output / publish directory:** `build`
- **Node version:** 22 or newer
- **Environment variable:** `SITE_URL=https://<your production domain>` (optional on Netlify,
  which falls back to the site's `URL`)

Set `SITE_URL` anyway on any host if you serve the site from a different domain than the one
the host reports.

`/light` is served from `light.html`. Netlify and Cloudflare Pages map that automatically. On
other hosts, make sure extensionless URLs resolve to `.html` files.

After deploying, paste the URL into a link-preview checker, such as LinkedIn's Post Inspector
or Facebook's Sharing Debugger, to confirm the card and image show up. Those tools also force
a re-scrape after you change `og.png`.

## Project layout

```
src/
  app.html               HTML shell: fonts, favicon links
  lib/profile.js         shared content (edit your info here)
  lib/Seo.svelte         <head> tags: title, description, Open Graph, Twitter, JSON-LD
  routes/+layout.js      prerender everything, no client-side JS
  routes/+page.svelte    dark variant  (/)
  routes/light/+page.svelte  light variant (/light)
static/                  favicon set, og.png, robots.txt (copied as-is)
vite.config.js           SvelteKit + adapter-static config, SITE_URL detection
```

## Security notes

- `npm audit` reports 4 low-severity advisories, all for `deepmerge`, which
  `@sveltejs/vite-plugin-svelte` uses at build time. No patched release exists upstream, and
  it never runs in the browser or on a server.
- The page intentionally publishes phone numbers and email addresses. Anything added to
  `src/lib/profile.js` is public.
