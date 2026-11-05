// Every page is prerendered to plain HTML at build time.
export const prerender = true;

// The pages have no client-side interactivity (links + CSS animation only), so skip
// shipping the SvelteKit runtime. Remove this line if you add interactive components.
export const csr = false;
