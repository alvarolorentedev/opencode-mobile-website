# OpenCode Mobile Website

Marketing and starter docs site for OpenCode Mobile, built with Docusaurus and TypeScript.

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
│   └── faq.md
├── src/
│   ├── css/custom.css
│   └── pages/
│       ├── index.tsx
│       └── index.module.css
├── static/img/
│   ├── logo.svg
│   └── opencode-mobile-social-card.svg
├── docusaurus.config.ts
├── sidebars.ts
└── package.json
```

## Notes before deploy

- Update `url` in `docusaurus.config.ts` to your real production domain.
- Replace the placeholder GitHub links in `docusaurus.config.ts` with your actual repository.
- Swap the social card or favicon if you want branded launch assets.

## Useful commands

```bash
npm start
npm run build
npm run serve
npm run typecheck
```
