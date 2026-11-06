---
title: OpenCode Mobile Releases and Compatibility
description: Check the current OpenCode Mobile release, recent highlights, OpenCode 1.x and 2.x compatibility, and current app and platform support.
lastUpdated: 2026-11-06
---

The latest public release at the time of this review is **v1.0.139**, published **November 6, 2026**. Use [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) as the authoritative source for the current version and complete release notes.

OpenCode 2 is the current primary target. It uses the shared background service and one-time `opencode pair` links for the quickest app setup. OpenCode 1.x (V1) remains supported with manual connections for the core chat, project, file, and terminal surface. Feature availability also depends on the capabilities the connected server exposes.

## Recent releases

| Release | Focus |
| --- | --- |
| [v1.0.139](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.139) | Chat library grouped by server and project path, V2 `/compact` and `/btw`, direct update install |
| [v1.0.137](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.137) | Onboarding privacy step, project search, per-agent model memory, Play update priority |
| [v1.0.135](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.135) | Mention and command highlighting, device-local project archive |
| [v1.0.133](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.133) | Server-derived project and session ordering, explicit update restart |
| [v1.0.131](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.131) | Server-archived projects, folder-browser project setup |
| [v1.0.129](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.129) | Arabic and Hebrew RTL, extension button on every chat |
| [v1.0.128](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.128) | Sandboxed plugin GUI panels |
| [v1.0.126](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.126) | OpenID Connect PKCE connections |

## Highlights since v1.0.81

- **Settings and appearance:** searchable grouped settings, light/dark/system modes, six accent themes, and a slim interface.
- **Voice:** System and On-device input modes, wake phrase, spoken confirmation, local speech models, speaker verification, and Piper/Kokoro playback.
- **Models:** automatic model routing, variants, per-agent model memory, and the model used for each reply.
- **Chat:** provider command suggestions, `@` mentions, `!` shell mode, `/compact`, `/btw`, live highlighting, and a two-level activity timeline.
- **Extensions:** MCP, plugin, agent, skill, and command management with project/global scope, plus sandboxed plugin GUI panels.
- **Projects:** server-derived catalogs, device-local archive markers, server-archived projects, folder-browser setup, and file copy/move/rename/delete.
- **Connections:** custom HTTP headers, per-connection CA certificates, and OIDC PKCE.
- **Diagnostics:** local-first logs, spans, metrics, sanitized export, and optional OTLP telemetry.
- **Updates:** Play-priority flexible downloads that wait for an explicit Restart.
- **Languages:** Russian, Arabic, and Hebrew added; Arabic and Hebrew mirror the interface right-to-left.

## Current technical baseline

| Component | Current declaration |
| --- | --- |
| Public app release | `v1.0.139` |
| OpenCode client contracts | OpenCode 1.x (V1) and 2.x (V2), detected at connection |
| `@opencode-ai/sdk` | `^1.18.3` |
| `@opencode/client` | `2.2.5` |
| Expo | `58.0.22` |
| React Native | `0.88.1` |
| React | `19.3.0` |
| License | Apache-2.0 |

These values describe the current source and recent release. Inspect the [application package](https://github.com/alvarolorentedev/opencode-mobile/blob/main/package.json), [app configuration](https://github.com/alvarolorentedev/opencode-mobile/blob/main/app.config.ts), and [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) for exact shipped versions.

## Compatibility and feature availability

| Capability | V1 | V2 | Notes |
| --- | --- | --- | --- |
| Chats, tasks, projects, terminal | Yes | Yes | Core server endpoints still required |
| Diffs and todos | Yes | Yes | V2 todos are derived from transcript tool parts |
| File search, read, text save | Yes | Yes | Conflict check is best effort |
| Media preview and download | No | Yes | V1 does not return binary file bytes |
| File copy, move, rename, delete | No | Yes | Requires V2 shell utilities |
| Session delete, rename, fork, revert | Yes | Yes | Where the server supports them |
| Session archive, restore, share | No | No | Removed from the current app |
| Composer auto-approve and saved rules | No | Yes | **Settings → Approvals** on V2 |
| Composer `/`, `@`, `!`, `/compact`, `/btw` | No | Yes | V2-only API surface |
| Auto model routing (on-device) | Yes | Yes | No server API dependency |
| Auto model routing (server classifier) | No | Yes | Experimental endpoint |
| Extensions management and plugin GUI | No | Yes | V2-only |
| Worktrees | Yes | Yes | Create, select, remove; reset/start command unavailable |
| MCP lifecycle | Yes | Yes | V1 runtime controls; V2 definitions in Extensions |
| LSP and formatter diagnostics | No | No | Not part of the supported surface |
| Local QR pairing | No | Yes | Same-network only; requires the shared service and native camera |
| Cloud Link | Independent | Independent | Store installs only; subscription required |
| Android inbound sharing | Yes | Yes | Android only |
| Android home widgets | Yes | Yes | Android only |
| Quick actions | Yes | Yes | iOS and Android |
| Completion notifications | Yes | Yes | Android has richer background monitoring |
| Themes, languages, RTL | Yes | Yes | 11 interface languages; Arabic/Hebrew RTL |
| iOS inbound sharing/widgets | No | No | Deferred |

“Yes” still depends on the connected server exposing the relevant endpoint. The app hides unsupported actions rather than inventing them.

## Update the app

- **Google Play:** updates are delivered by the store. On supported Play-installed builds, the app can start a flexible background download and then waits for an explicit **Restart** tap. Play release priority decides whether a flexible or immediate flow is requested first.
- **Direct APK:** install a newer APK from GitHub Releases over the existing app.
- **iOS TestFlight:** install the latest TestFlight build when it appears. iOS in-app update checks require a verified App Store listing and may be disabled in beta builds.
- **Settings → About & support → Update checks** controls the app's update prompt and check period, not the store's automatic-update setting.

## Support boundaries

- **Android:** distributed through Google Play and direct APK releases. Release artifacts are **arm64-v8a only**; 32-bit-only Android devices are unsupported.
- **iOS:** distributed through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz).
- Cloud Link is available only for App Store and Google Play installs.
- OpenCode 1.x is maintained for the feature intersection with OpenCode 2. Removed V1-only surfaces are not coming back through the mobile app.
- Experimental worktrees, PTYs, extensions, MCP management, and diagnostics depend on server capabilities.
- The mobile terminal is an xterm-based project terminal, not a desktop terminal replacement.
- iOS inbound sharing and iOS home-screen widgets are not available yet.
- OpenCode Mobile is independent and community-built, not an official OpenCode product.

Start with [Download and install](/docs/opencode-android-app/), then use the [troubleshooting checklist](/docs/guides/troubleshooting/) if a current release cannot reach a current server.
