---
id: changelog
title: OpenCode Mobile Releases and Compatibility
description: Check the current OpenCode Mobile release, public changelog, OpenCode API target, framework versions, and support boundaries.
slug: /changelog
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# OpenCode Mobile releases and compatibility

The current source identifies OpenCode Mobile as version **1.0.12** and targets the current OpenCode v2 SDK contract. The website does not promise compatibility with older endpoint shapes removed by OpenCode.

## Release history

| Release | Published | Details |
| --- | --- | --- |
| 1.0.10 | August 14, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.10) |
| 1.0.8 | July 21, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.8) |
| 1.0.7 | July 19, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.7) |
| 1.0.3 beta | July 18, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.3) |

The canonical release history is always [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases). Update through Google Play testing when possible or install the latest APK from that repository.

## Current updates

- The iOS build now has a dedicated bundle identifier, signed release workflow, and [TestFlight beta](https://testflight.apple.com/) distribution path.
- The Chat model picker is searchable and groups configured models by provider.
- The current iOS build includes the required photo-library explanation for attaching selected images.

## Current technical baseline

| Component | Current project declaration |
| --- | --- |
| OpenCode client contract | Current v2 SDK API |
| `@opencode-ai/sdk` | `^1.18.3` |
| Expo | `~54.0.37` |
| React Native | `0.81.5` |
| React | `19.1.0` |
| License | Apache-2.0 |

These values describe the current public source at the time this page was updated. Inspect the [application package file](https://github.com/alvarolorentedev/opencode-mobile/blob/main/package.json) for the exact current declaration.

## Support boundaries

- Android is distributed through Google Play and direct APK releases.
- The iOS beta is distributed through [TestFlight](https://testflight.apple.com/).
- Experimental worktrees, PTYs, MCP management, diagnostics, and some lifecycle actions depend on server capabilities.
- The mobile terminal is a focused line console, not a complete VT terminal emulator.
- OpenCode Mobile is independent and community-built, not an official OpenCode product.

Start with the [mobile app guide](./opencode-android-app.md), then use the [troubleshooting checklist](./guides/troubleshooting.md) if a current release cannot reach a current server.
