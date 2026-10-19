# Documentation content guide

This guide keeps the public documentation accurate, consistent, and discoverable. It is for maintainers, not website visitors.

## Source of truth

When sources disagree, use this order:

1. Current app code, tests, and `app.config.ts` in `opencode-mobile`.
2. `docs/functional-spec.md`, `docs/architecture.md`, and other implementation docs in `opencode-mobile`.
3. GitHub Releases for the public version and release notes.
4. The website documentation.

Do not copy implementation docs into the website. Translate them into user-facing tasks and outcomes.

## Page roles

| Page | Role |
| --- | --- |
| `/docs/` | Single entry hub; route users by goal |
| `/docs/introduction/` | Concept, boundaries, and screen map |
| `/docs/opencode-android-app/` | Download and install intent page |
| `/docs/getting-started/` | Canonical end-to-end setup |
| `/docs/connections/` | Canonical in-app connection management |
| `/docs/remote-access/` | Canonical route comparison |
| `/docs/cloud-link/` | Canonical managed remote-access page |
| `/docs/features/` | “What do you want to do?” router |
| `/docs/user-manual/` | Operating hub; no repeated setup |
| Focused guides | One workflow or problem each |
| `/docs/changelog/` | Release highlights and compatibility |
| `/docs/faq/` | Short answers with links to canonical guides |
| `/docs/for-ai-agents/` | Canonical facts and machine-readable entry points |

## Terminology

- Use **Projects** for the app tab and project area. “Workspace” is acceptable only when explaining the concept of an OpenCode project directory.
- Use **Chat** for the main tab. Use **Chats** for the session library. The active chat has **Session** and **Files Changed** tabs.
- Use **Cloud Link** for the optional managed remote-access service. Do not call it Connect.
- Distinguish **local QR pairing** (`opencode pair`, same network, free) from **Cloud Link QR pairing** (managed connector, subscription).
- Use **OpenCode 1.x (V1)** and **OpenCode 2.x (V2)** for contracts. Present OpenCode 2 as the current primary target.
- For OpenCode 2, document the shared service (`opencode service start`), one-time pairing (`opencode pair`), and the fact that a standalone `opencode serve` process requires manual connection details.
- Use **server password**, not “app password,” for `OPENCODE_SERVER_PASSWORD`; the V2 shared service password is set with `opencode service set password`.
- Use **xterm-based terminal**, not “line console” or “full VT emulator.”

## Page template

Every page should give the reader:

1. A one-sentence outcome near the top.
2. Who the page is for or when to use it.
3. Prerequisites, if any.
4. Numbered steps or a decision table.
5. What the reader should see or how to verify success.
6. Important limitations and capability differences.
7. A next step or related guide.
8. A `lastUpdated` date when the page is reviewed.

## SEO rules

- Keep stable slugs. Do not rename a URL without an approved 301 redirect.
- Keep the primary keyword phrase in the title and H1.
- Write unique titles and descriptions. Descriptions should be roughly 50–190 characters.
- Use descriptive link text, not “click here.”
- Use H2/H3 headings that match user questions.
- Add one clear internal link from a hub to every new page.
- Do not duplicate a full workflow across pages; link to the canonical page.
- Use tables for decisions, compatibility, and limits.
- Add `lastUpdated` when content is reviewed so sitemap `lastmod` stays useful.
- Raw Markdown is for agents and is `noindex`; the HTML page is the search canonical.

## AI rules

- Write self-contained sections that make sense without the surrounding page.
- State platform and contract differences explicitly.
- Avoid ambiguous pronouns such as “it” when the subject could be the app or the server.
- Prefer canonical facts over marketing claims.
- Keep `llms.txt` free of false “official” claims.
- Do not put secrets, private hostnames, pairing tokens, or customer data in examples.

## Release checklist

On each app release:

1. Check `app.config.ts` and GitHub Releases for the public version.
2. Update `/docs/changelog/` highlights and compatibility only where behavior changed.
3. Search the docs for removed UI labels and changed Settings paths.
4. Verify screenshots still match the current app.
5. Run `npm run build`, `npm test`, and `npm run typecheck`.
6. Check `/docs/` to first-task path, search, mobile sidebar, and raw Markdown/llms output.
