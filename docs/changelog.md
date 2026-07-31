---
id: changelog
title: OpenCode Mobile Releases and Compatibility
description: Check the current OpenCode Mobile Android release, public changelog, OpenCode API target, framework versions, and support boundaries.
slug: /changelog
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# OpenCode Mobile releases and compatibility

The public Android project currently identifies itself as version **1.0.8** and targets the current OpenCode v2 SDK contract. The website does not promise compatibility with older endpoint shapes removed by OpenCode.

## Release history

| Release | Published | Details |
| --- | --- | --- |
| 1.0.8 | July 21, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.8) |
| 1.0.7 | July 19, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.7) |
| 1.0.3 beta | July 18, 2026 | [Release and comparison](https://github.com/alvarolorentedev/opencode-mobile/releases/tag/v1.0.3) |

The canonical release history is always [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases). Update through Google Play testing when possible or install the latest APK from that repository.

## Current technical baseline

| Component | Current project declaration |
| --- | --- |
| OpenCode client contract | Current v2 SDK API |
| `@opencode-ai/sdk` | `^1.18.3` |
| Expo | `~54.0.33` |
| React Native | `0.81.5` |
| React | `19.1.0` |
| License | Apache-2.0 |

These values describe the current public source at the time this page was updated. Inspect the [application package file](https://github.com/alvarolorentedev/opencode-mobile/blob/main/package.json) for the exact current declaration.

## Support boundaries

- Android is the currently distributed public beta platform.
- The repository contains iOS-capable project code, but this website does not offer an iOS release.
- Experimental worktrees, PTYs, MCP management, diagnostics, and some lifecycle actions depend on server capabilities.
- The mobile terminal is a focused line console, not a complete VT terminal emulator.
- OpenCode Mobile is independent and community-built, not an official OpenCode product.

Start with the [Android app guide](./opencode-android-app.md), then use the [troubleshooting checklist](./guides/troubleshooting.md) if a current release cannot reach a current server.
