# OpenCode Mobile Website

Public website, Android download path, and maintained product documentation for [OpenCode Mobile](https://getopencode.app/), built with Docusaurus and TypeScript.

## Stack

- Docusaurus 3
- TypeScript
- React 19
- CSS modules plus a small global theme layer

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
npm start
```

The site runs at `http://localhost:3000` by default.

## Production build

```bash
npm run build
```

Serve the production build locally:

```bash
npm run serve
```

## Project structure

```text
.
├── docs/
│   ├── introduction.md
│   ├── getting-started.md
│   ├── features.md
│   ├── remote-access.md
│   ├── user-manual.md
│   └── guides/
├── src/
│   ├── css/custom.css
│   └── pages/
│       ├── index.tsx
│       └── index.module.css
├── static/img/
│   ├── favicon.ico
│   ├── logo.png
│   ├── logo.svg
│   └── opencode-mobile-social-card.svg
├── docusaurus.config.ts
├── sidebars.ts
└── package.json
```

## Production deployment requirements

- Build output: `build/`
- Canonical origin: `https://getopencode.app/`
- Redirect `https://www.getopencode.app/*` to `https://getopencode.app/:splat` with a Cloudflare Redirect Rule or Bulk Redirect. Cloudflare Pages `_redirects` does not support hostname-level redirects.
- Keep Docusaurus `trailingSlash: true`; Cloudflare Pages serves directory output at trailing-slash URLs.
- `static/_headers` sets long-lived asset caching and baseline security headers.
- `static/robots.txt` advertises the sitemap.

## Useful commands

```bash
npm start
npm run build
npm run serve
npm run typecheck
```
