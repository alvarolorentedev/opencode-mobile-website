---
title: OpenCode Mobile Releases and Compatibility
description: Check the current OpenCode Mobile release, recent release highlights, OpenCode 1.x and 2.x compatibility, app versions, and support boundaries.
lastUpdated: 2026-10-19
---

The latest public release at the time of this review is **v1.0.81**, published **October 18, 2026**. Use [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) as the authoritative source for the current version and complete release notes.

OpenCode Mobile detects and supports the OpenCode 1.x (V1) and 2.x (V2) API contracts. Feature availability also depends on the capabilities the connected server exposes.

## Recent releases

| Release | Focus |
| --- | --- |
| [v1.0.81](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.81) | Full-screen local QR setup flow with clearer scan recovery |
| [v1.0.80](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.80) | Bottom-sheet dismissal polish and chat transcript refresh fixes |
| [v1.0.79](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.79) | Projects naming and opened-project tracking |
| [v1.0.78](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.78) | Cloud Link service management from saved machines |
| [v1.0.77](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.77) | Cloud Link service ports and root services |

## Recent product milestones

- **Cloud Link** with connector QR pairing, subscription recovery, machines, exposed services, and port/root-service management.
- **Local QR pairing** with `opencode pair`, separate from Cloud Link.
- **Multiple saved connections** with switching, editing, and per-connection state.
- **Projects** with opened-project tracking, project picker, files, worktrees, and per-project sessions.
- **xterm-based terminal** with PTY tickets, full-screen program support, 10,000 lines of scrollback, reconnect, and a keyboard accessory.
- **OpenCode 2 file editing** with read-before-write conflict checks, plus V2 saved approval rules.
- **Android inbound sharing**, launcher quick actions, and three home-screen widgets.
- **Eight app languages**, in-app update checks, and expanded notification handling.

## Current technical baseline

| Component | Current declaration |
| --- | --- |
| Public app release | `v1.0.81` |
| OpenCode client contracts | OpenCode 1.x (V1) and 2.x (V2), detected at connection |
| `@opencode-ai/sdk` | `^1.18.3` |
| `@opencode/client` | `^2.0.16` |
| Expo | `^57.0.24` |
| React Native | `0.86.3` |
| React | `19.2.3` |
| License | Apache-2.0 |

These values describe the current source and recent release. Inspect the [application package](https://github.com/alvarolorentedev/opencode-mobile/blob/main/package.json), [app configuration](https://github.com/alvarolorentedev/opencode-mobile/blob/main/app.config.ts), and [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) for exact shipped versions.

## Compatibility and feature availability

| Capability | V1 | V2 | Notes |
| --- | --- | --- | --- |
| Chats, tasks, projects, terminal | Yes | Yes | Core server endpoints still required |
| Diffs and todos | Yes | Yes | V2 todos are derived from transcript tool parts |
| File search and read | Yes | Yes | Server capabilities apply |
| File save | Yes | Yes | V2 uses `file.write`; conflict check is best effort |
| Session archive, restore, share | Yes | No | Hidden on V2 |
| Session title summarization | Yes | No | V2 leaves the session untitled if unavailable |
| Composer auto-approve toggle | Yes | No | V2 uses saved approval rules instead |
| Saved approval rules | No | Yes | **Settings → Approvals** |
| LSP and formatter diagnostics | Yes | No | Other diagnostics remain available |
| Worktrees | Yes | Yes | Reset and start command are V1-only |
| MCP lifecycle and OAuth | Yes | Yes | Persistent config writes differ by contract |
| Local QR pairing | No | Yes | Same-network only; requires `opencode pair` and native camera |
| Cloud Link | Independent | Independent | Store installs only; subscription required |
| Android inbound sharing | Yes | Yes | Android only |
| Android home widgets | Yes | Yes | Android only |
| Quick actions | Yes | Yes | iOS and Android |
| Completion notifications | Yes | Yes | Android has richer background monitoring |
| iOS inbound sharing/widgets | No | No | Deferred |

“Yes” still depends on the connected server exposing the relevant endpoint. The app hides unsupported actions rather than inventing them.

## Update the app

- **Google Play:** updates are delivered by the store. On supported Play-installed builds, the app can also prompt for an available update and complete a flexible download.
- **Direct APK:** install a newer APK from GitHub Releases over the existing app.
- **iOS TestFlight:** install the latest TestFlight build when it appears. iOS in-app update checks require a verified App Store listing and may be disabled in beta builds.
- **Settings → Advanced → Update checks** controls the app's update prompt, not the store's automatic-update setting.

## Support boundaries

- Android is distributed through Google Play and direct APK releases; iOS is distributed through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz).
- Cloud Link is available only for App Store and Google Play installs.
- Experimental worktrees, PTYs, MCP management, and diagnostics depend on server capabilities.
- The mobile terminal is an xterm-based project terminal, not a desktop terminal replacement.
- iOS inbound sharing and iOS home-screen widgets are not available yet.
- OpenCode Mobile is independent and community-built, not an official OpenCode product.

Start with [Download and install](/docs/opencode-android-app/), then use the [troubleshooting checklist](/docs/guides/troubleshooting/) if a current release cannot reach a current server.
