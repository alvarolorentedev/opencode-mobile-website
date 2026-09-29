# OpenCode Mobile Website

Public website, Android/iOS download path, and maintained product documentation for [OpenCode Mobile](https://getopencode.app/), built with Astro and Starlight.

## Stack

- Astro 7 (static output, zero client framework)
- Starlight documentation theme
- TypeScript (strict)
- Pagefind full-text search (built in, no configuration)
- `@astrojs/sitemap`, `starlight-links-validator`, `starlight-llms-txt`

## Local setup

Requirements:

- Node.js 20+
- npm 10+

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

The site runs at `http://localhost:4321` by default.

## Production build

```bash
npm run build
```

The static output is written to `build/` (`outDir` is configured to match the deployment workflow).

Serve the production build locally:

```bash
npm run preview
```

## Project structure

```text
.
├── astro.config.ts            # Astro + Starlight configuration
├── src/
│   ├── content/docs/docs/     # Documentation (served at /docs/**)
│   │   ├── introduction.md
│   │   ├── getting-started.md
│   │   ├── features.md
│   │   ├── remote-access.md
│   │   ├── user-manual.md
│   │   ├── index.md           # /docs/ hub
│   │   └── guides/
│   ├── pages/                 # Home, download, support, and legal/info pages
│   ├── layouts/               # MarketingLayout for non-docs pages
│   ├── components/            # Site nav/footer and Starlight overrides
│   ├── lib/                   # Shared constants, support links, QR, clipboard
│   └── styles/                # Starlight theme and marketing styles
├── static/                    # Public assets, robots.txt, _headers, _redirects
└── tests/                     # node:test route-parity and support tests
```

Documentation lives in `src/content/docs/docs/` so Starlight serves it under `/docs/**`, preserving the pre-migration URLs. Root pages (`/`, `/download/`, `/support/`, `/about/`, `/security/`, `/privacy-policy/`, `/terms-and-conditions/`) are regular Astro pages.

## AI/agent discoverability

- `llms.txt`, `llms-small.txt`, and `llms-full.txt` are generated at build time.
- Topic-specific context files are generated under `/_llms-txt/`.
- Every documentation page is also available as raw Markdown at `<url>.md` (for example `/docs/getting-started.md`), and each page links to it with `<link rel="alternate" type="text/markdown">`.
- Structured data is emitted for the site (`WebSite`, `Organization`, `Person`, `MobileApplication`) and documentation (`TechArticle`).

## Production deployment requirements

- Build output: `build/`
- Canonical origin: `https://getopencode.app/`
- Redirect `https://www.getopencode.app/*` to `https://getopencode.app/:splat` with a Cloudflare Redirect Rule or Bulk Redirect. Cloudflare Pages `_redirects` does not support hostname-level redirects.
- Astro uses directory output (`trailingSlash: 'always'`); Cloudflare Pages serves directory output at trailing-slash URLs.
- `static/_headers` sets long-lived asset caching (`/_astro/*`, `/_pagefind/*`) and baseline security headers.
- `static/_redirects` holds path redirects; `static/robots.txt` advertises `sitemap-index.xml`.

## Support links

These environment variables can override the support link defaults in the website build environment:

- `GITHUB_SPONSORS_URL`: defaults to `https://github.com/sponsors/alvarolorentedev`.
- `KOFI_URL`: defaults to `https://ko-fi.com/alvarolorentedev`.

Only HTTPS URLs are accepted. The Ko-fi tip panel URL is derived from the configured Ko-fi profile URL.

Crypto wallet addresses, networks, and payment URIs are centralized in `src/data/cryptoDonations.json`. QR codes are rendered to SVG at build time.

## Useful commands

```bash
npm run dev
npm run build
npm test
npm run preview
npm run typecheck
```
