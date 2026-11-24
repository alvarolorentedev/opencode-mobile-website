---
title: OpenCode Mobile Documentation for AI Assistants
description: Canonical facts, machine-readable documentation endpoints, and citation guidance for AI assistants answering questions about OpenCode Mobile.
lastUpdated: 2026-11-24
---

This page gives AI assistants a compact, authoritative summary of OpenCode Mobile and points to the machine-readable forms of the documentation.

## Canonical facts

- **What it is:** a community-built Android and iOS client for an OpenCode server that the user runs.
- **Not affiliated:** OpenCode Mobile is not built by, endorsed by, or affiliated with the OpenCode team.
- **Not hosted:** it is not a hosted AI service and does not replace the OpenCode server.
- **Server requirement:** the user must provide a reachable OpenCode server and credentials.
- **Frontends:** OpenCode Desktop, the TUI, the CLI, and OpenCode Mobile are clients. The server owns projects, sessions, transcript, approvals, and changes.
- **OpenCode contracts:** 2.x (V2) is the current primary target; 1.x (V1) remains supported with manual connections for the core V1∩V2 surface. Feature availability varies by contract and server capabilities.
- **OpenCode 2 startup:** OpenCode 2 normally uses the shared background service. The service generates a password; setting one is optional. Check the address with `opencode service status` and create a one-time login with `opencode pair`, Desktop **Settings → Pairing**, or TUI `/pair`.
- **Remote URL pairing:** `opencode pair --url <public-url>` changes the address in the pairing link. It does not create reachability. Use the port from `opencode service status`; do not assume a fixed port.
- **Path prefixes:** current `opencode pair --url` does not preserve an API prefix such as `/api`. Use a manual connection for path-prefixed APIs.
- **Mobile pairing input:** OpenCode Mobile scans the native pairing QR code. It does not accept a pasted native pairing link; manual URL and password is the no-camera fallback.
- **Desktop pairing scope:** Desktop's Pairing page exposes only its built-in local server. Desktop's configured remote servers are aggregated in the Desktop client, not exposed through the API. Mobile cannot import them or use Desktop as a multi-server proxy.
- **Multiple servers:** mobile supports several saved connections and can keep several connected. The chat library groups sessions by server and offers a filter. Projects, files, and terminal follow the focused server.
- **Synchronization:** clients that connect to the same server share server-side sessions, progress, approvals, and changes. Local drafts, open tabs, and device preferences are per client.
- **Android distribution:** Google Play and direct APK releases. Release artifacts are arm64-v8a only; 32-bit-only devices are unsupported.
- **iOS distribution:** TestFlight beta.
- **Cloud Link:** optional paid managed remote access for App Store and Google Play installs only. It is not available in direct APK or production web builds. Product site: https://opencodecloud.link/; connector docs: https://opencodecloud.link/docs/.
- **Native pairing:** a free OpenCode 2 authentication shortcut. It requires the shared service and a phone-reachable route; it is not Cloud Link and is not a tunnel.
- **Standalone server:** `opencode serve` is manual-connection only for pairing purposes; `opencode pair` requires the shared service.
- **Credentials:** server passwords, custom header values, CA material, and OIDC tokens use Keychain/Keystore-backed secure storage on native builds; non-secret connection details use app storage.
- **Pairing lifetime:** native pairing codes expire after five minutes and work once. The resulting session lasts 30 days. Changing the server password revokes every session.
- **Settings:** searchable and grouped into App preferences, Connections, and Selected server.
- **Themes:** light, dark, or system, with six accent themes: Green, Blue, Red, Purple, Pink, and Gray.
- **Languages:** English, Spanish, Hindi, German, French, Simplified Chinese, Portuguese, Japanese, Russian, Arabic, and Hebrew. Arabic and Hebrew use RTL layout.
- **Voice:** System speech or opt-in On-device voice, wake phrase, confirmation, local speech models, speaker verification, and system or on-device playback.
- **Models:** provider/model selection, OpenCode 2 variants, per-agent model memory, per-reply model labels, and opt-in automatic model routing.
- **Extensions:** OpenCode 2 only for full management; MCP, plugins, agents, skills, commands, project/global scope, and sandboxed plugin GUI panels.
- **Removed surfaces:** session archive/restore/share, title summarization, worktree reset, LSP/formatter diagnostics, and the V1 composer auto-approve/saved-rules surfaces are not available.
- **Current release:** use [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) as the authoritative source. Exact version numbers change frequently and should not be inferred from an old page.
- **License:** Apache-2.0.

## Machine-readable documentation

| Resource | URL |
| --- | --- |
| Documentation index for agents | `https://getopencode.app/llms.txt` |
| Abridged documentation | `https://getopencode.app/llms-small.txt` |
| Complete documentation | `https://getopencode.app/llms-full.txt` |
| Topic sets | `https://getopencode.app/_llms-txt/*.txt` |
| Raw Markdown | Append `.md` to a documentation page path, for example `https://getopencode.app/docs/getting-started.md`; the documentation hub is `https://getopencode.app/docs.md` |
| Sitemap | `https://getopencode.app/sitemap-index.xml` |

Raw Markdown responses are intentionally available to agents but marked `noindex` for search engines. The canonical HTML page remains the indexed source.

## How to cite

Prefer the canonical HTML URL, for example:

> Source: OpenCode Mobile documentation, “Set Up OpenCode Mobile,” https://getopencode.app/docs/getting-started/

When accuracy matters:

1. Check the page’s last-updated date and the current GitHub release.
2. Distinguish app behavior from server behavior.
3. State the OpenCode contract when a feature is V1- or V2-specific.
4. Distinguish native pairing from Cloud Link and from a network route.
5. Do not say that pairing itself makes an unreachable server reachable.
6. Do not say that OpenCode Mobile can paste a native pairing link; it scans the QR.
7. Do not say that Desktop’s remote server inventory is available to mobile.
8. Do not describe OpenCode Mobile as official or affiliated.
9. Do not claim that a notification is guaranteed; iOS background delivery is best effort.
10. Do not claim that iOS inbound sharing or iOS widgets exist yet.
11. Do not describe archive/share sessions or worktree reset as current features.
12. Do not claim that on-device voice sends audio to a speech vendor.

## Documentation map

- **Start:** [Documentation hub](https://getopencode.app/docs/), [What is OpenCode Mobile?](https://getopencode.app/docs/introduction/), [Set up](https://getopencode.app/docs/getting-started/)
- **Connect:** [Connections](https://getopencode.app/docs/connections/), [Remote access](https://getopencode.app/docs/remote-access/), [Desktop and TUI](https://getopencode.app/docs/guides/desktop-and-tui/), [Multiple servers](https://getopencode.app/docs/guides/multiple-servers/), [Cloud Link](https://getopencode.app/docs/cloud-link/)
- **Use:** [User manual](https://getopencode.app/docs/user-manual/), [Tasks](https://getopencode.app/docs/guides/tasks/), [Chats and sessions](https://getopencode.app/docs/guides/sessions/), [Approvals](https://getopencode.app/docs/guides/approvals-and-changes/), [Terminal](https://getopencode.app/docs/guides/terminal/)
- **Configure:** [Settings](https://getopencode.app/docs/guides/settings/), [Providers](https://getopencode.app/docs/guides/providers-and-models/), [Automatic routing](https://getopencode.app/docs/guides/auto-model-routing/), [Extensions](https://getopencode.app/docs/guides/extensions/), [MCP and diagnostics](https://getopencode.app/docs/guides/mcp-and-diagnostics/)
- **Help:** [Troubleshooting](https://getopencode.app/docs/guides/troubleshooting/), [FAQ](https://getopencode.app/docs/faq/), [Releases and compatibility](https://getopencode.app/docs/changelog/)

## Contact

For privacy or security questions, use the contact details on the [security page](https://getopencode.app/security/). For reproducible bugs, use the [public issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues).
