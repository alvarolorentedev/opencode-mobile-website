---
title: OpenCode Mobile Releases and Compatibility
description: Check the current OpenCode Mobile release, public changelog, OpenCode API target, framework versions, and support boundaries.
lastUpdated: 2026-09-29
---
The latest public release is **1.0.34**, published September 29, 2026. The current source package declares **1.0.35**, which is not listed as a public release at this check. The app detects and supports the OpenCode 1.x (V1) and 2.x (V2) API contracts; feature availability varies by contract and server capabilities.

## Release history

| Release | Published | Details |
| --- | --- | --- |
| 1.0.34 | September 29, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.34) |
| 1.0.32 | September 29, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.32) |
| 1.0.31 | September 28, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.31) |
| 1.0.30 | September 28, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.30) |
| 1.0.29 | September 27, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.29) |

The canonical release history is always [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases). Update through Google Play testing when possible or install the latest APK from that repository.

## Current updates

- iOS distribution uses a dedicated signed release workflow and the [TestFlight beta](https://testflight.apple.com/join/ddcE5Wzz).
- The Chat model picker is searchable and groups configured models by provider.
- The current iOS build includes the required photo-library explanation for attaching selected images.

## Current technical baseline

| Component | Current project declaration |
| --- | --- |
| App source package | `1.0.35` |
| OpenCode client contracts | OpenCode 1.x (V1) and 2.x (V2), detected at connection |
| `@opencode-ai/sdk` | `^1.18.3` |
| Expo | `^57.0.24` |
| React Native | `0.86.3` |
| React | `19.2.3` |
| License | Apache-2.0 |

These values describe the current source package, not the latest published release. Inspect the [application package file](https://github.com/alvarolorentedev/opencode-mobile/blob/main/package.json) for the exact declaration; consult [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) for shipped versions.

## Support boundaries

- Android is distributed through Google Play and direct APK releases; iOS is distributed through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz).
- The app detects the OpenCode 1.x and 2.x API contracts; server-dependent actions are hidden when unsupported.
- Experimental worktrees, PTYs, MCP management, diagnostics, and some lifecycle actions depend on server capabilities.
- The mobile terminal is a focused line console, not a complete VT terminal emulator.
- OpenCode Mobile is independent and community-built, not an official OpenCode product.

Start with the [mobile app guide](/docs/opencode-android-app/), then use the [troubleshooting checklist](/docs/guides/troubleshooting/) if a current release cannot reach a current server.
