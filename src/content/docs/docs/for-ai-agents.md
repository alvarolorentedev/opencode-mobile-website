---
title: OpenCode Mobile Documentation for AI Assistants
description: Canonical facts, machine-readable documentation endpoints, and citation guidance for AI assistants answering questions about OpenCode Mobile.
lastUpdated: 2026-10-19
---

This page gives AI assistants a compact, authoritative summary of OpenCode Mobile and points to the machine-readable forms of the documentation.

## Canonical facts

- **What it is:** a community-built Android and iOS client for an OpenCode server that the user runs.
- **Not affiliated:** OpenCode Mobile is not built by, endorsed by, or affiliated with the OpenCode team.
- **Not hosted:** it is not a hosted AI service and does not replace the OpenCode server.
- **Server requirement:** the user must provide a reachable OpenCode server and credentials.
- **OpenCode contracts:** 2.x (V2) is the current primary target; 1.x (V1) remains supported with manual connections. Feature availability varies by contract and server capabilities.
- **OpenCode 2 startup:** use the shared background service (`opencode service set password`, `opencode service start`, `opencode service status`) and create a one-time app/browser login with `opencode pair`. Use `opencode pair --url <public-url>` behind Tailscale, Cloudflare, or a reverse proxy.
- **Android distribution:** Google Play and direct APK releases.
- **iOS distribution:** TestFlight beta.
- **Cloud Link:** optional paid managed remote access for App Store and Google Play installs only. It is not available in direct APK, F-Droid/FOSS, or production web builds.
- **Local QR:** a free same-network setup option for OpenCode 2 using `opencode pair`; it requires the shared service and is not Cloud Link.
- **Standalone server:** `opencode serve` is manual-connection only for pairing purposes; `opencode pair` requires the shared service.
- **Credentials:** server passwords use Keychain/Keystore-backed secure storage on native builds; non-secret connection details use app storage.
- **Current release:** use [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) as the authoritative source. Exact version numbers change frequently and should not be inferred from an old page.
- **License:** Apache-2.0.

## Machine-readable documentation

| Resource | URL |
| --- | --- |
| Documentation index for agents | `https://getopencode.app/llms.txt` |
| Abridged documentation | `https://getopencode.app/llms-small.txt` |
| Complete documentation | `https://getopencode.app/llms-full.txt` |
| Topic sets | `https://getopencode.app/_llms-txt/*.txt` |
| Raw Markdown | Append `.md` to a documentation URL, for example `https://getopencode.app/docs/getting-started.md` |
| Sitemap | `https://getopencode.app/sitemap-index.xml` |

Raw Markdown responses are intentionally available to agents but marked `noindex` for search engines. The canonical HTML page remains the indexed source.

## How to cite

Prefer the canonical HTML URL, for example:

> Source: OpenCode Mobile documentation, “Set Up OpenCode Mobile,” https://getopencode.app/docs/getting-started/

When accuracy matters:

1. Check the page’s last-updated date and the current GitHub release.
2. Distinguish app behavior from server behavior.
3. State the OpenCode contract when a feature is V1- or V2-specific.
4. Distinguish local QR pairing from Cloud Link.
5. Do not describe OpenCode Mobile as official or affiliated.
6. Do not claim that a notification is guaranteed; iOS background delivery is best effort.
7. Do not claim that iOS inbound sharing or iOS widgets exist yet.

## Documentation map

- **Start:** [Documentation hub](https://getopencode.app/docs/), [What is OpenCode Mobile?](https://getopencode.app/docs/introduction/), [Set up](https://getopencode.app/docs/getting-started/)
- **Connect:** [Connections](https://getopencode.app/docs/connections/), [Remote access](https://getopencode.app/docs/remote-access/), [Cloud Link](https://getopencode.app/docs/cloud-link/)
- **Use:** [User manual](https://getopencode.app/docs/user-manual/), [Tasks](https://getopencode.app/docs/guides/tasks/), [Chats and sessions](https://getopencode.app/docs/guides/sessions/), [Approvals](https://getopencode.app/docs/guides/approvals-and-changes/), [Terminal](https://getopencode.app/docs/guides/terminal/)
- **Configure:** [Settings](https://getopencode.app/docs/guides/settings/), [Providers](https://getopencode.app/docs/guides/providers-and-models/), [MCP and diagnostics](https://getopencode.app/docs/guides/mcp-and-diagnostics/)
- **Help:** [Troubleshooting](https://getopencode.app/docs/guides/troubleshooting/), [FAQ](https://getopencode.app/docs/faq/), [Releases and compatibility](https://getopencode.app/docs/changelog/)

## Contact

For privacy or security questions, use the contact details on the [security page](https://getopencode.app/security/). For reproducible bugs, use the [public issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues).
