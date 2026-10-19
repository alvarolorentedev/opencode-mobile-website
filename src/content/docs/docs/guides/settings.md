---
title: OpenCode Mobile Settings and Customization
description: Understand every OpenCode Mobile setting for connections, providers, Cloud Link, notifications, voice, appearance, language, approvals, MCP, diagnostics, and updates.
lastUpdated: 2026-10-19
---

OpenCode Mobile groups configuration into a small set of Settings sections. This page is the map; follow the focused guides for details.

| Section | What it controls |
| --- | --- |
| **Connection** | Saved servers, manual setup, local QR pairing, switching, editing, and reconnecting |
| **AI & providers** | Provider login, stored accounts, and which models appear in Chat |
| **Cloud Link** | Subscription, machines, exposed services, and managed remote access; store installs only |
| **Notifications** | Completion and needs-input alerts, system permission, and Android battery settings |
| **Voice & responses** | Dictation, conversation mode, playback, locale, response scope, and working sound |
| **Advanced** | Editor, general appearance, update checks, MCP servers, and diagnostics |
| **Approvals** | Saved **Always allow** rules on OpenCode 2 servers; shown only when supported |
| **Support** | Rate the app, send feedback, or open the support page |

## Connection

Use **Connection** to add a manual server, scan a local QR code, switch saved profiles, or open Cloud Link. Editing a profile does not reconnect automatically. See [Add or switch connections](/docs/connections/).

## AI & providers

Use **AI & providers** to add a provider, manage multiple accounts, and enable the models shown in Chat. Provider credentials belong to the connected OpenCode server, not the mobile app. See [Providers and models](/docs/guides/providers-and-models/).

## Cloud Link

Cloud Link appears only when the app was installed from the App Store or Google Play. Use it to subscribe or restore access, pair a machine, manage machines, and edit exposed services. Direct APK, F-Droid/FOSS, and web builds do not show this section. See [Cloud Link](/docs/cloud-link/).

## Notifications

Use **Notifications** to request permission and refresh status. Android also links to notification, battery optimization, and battery-saver settings. See [Notifications](/docs/guides/notifications/).

## Voice & responses

Voice settings include:

- on-device recognition preference;
- speech locale and playback voice;
- speech rate;
- auto-play assistant replies;
- resume listening after reply;
- response scope: brief, balanced, or detailed;
- simple next actions;
- working sound, variant, and volume;
- a voice check for permission, recognition, and playback.

Conversation mode is foreground-only. See [Voice](/docs/guides/voice/).

## Advanced

### Editor

- **Messages sent while working** (OpenCode 2 only): choose **Steer** or **Append**.
- **Chat text size**: adjust transcript text size.
- **Flat conversation**: remove bubbles for a denser transcript.

### General

- **Slim interface**: shrink buttons, spacing, and headers in Chat, Terminal, and Projects.
- **Language**: follow the system language or choose English, Spanish, Hindi, German, French, Simplified Chinese, Portuguese, or Japanese.
- **Show widget previews** (Android): show or hide reply, request, and plan text on home-screen widgets.
- **Reset onboarding**: reopen the setup assistant without clearing existing settings.

### Update checks

On supported store builds, choose whether the app checks for updates and whether it checks when available, daily, or weekly. This controls the app's update prompt, not the store's automatic-update setting.

### MCP servers and diagnostics

Use these sections to manage MCP tools and inspect health, realtime status, LSP, formatters, network usage, and the last app error. See [MCP and diagnostics](/docs/guides/mcp-and-diagnostics/).

## Approvals

On OpenCode 2 servers, **Approvals** lists rules created by **Always allow**. Removing a rule makes the server ask again. On V1 servers, the composer approval toggle controls common permission categories directly.

## App appearance

The app follows the device light/dark theme by default. Chat text size, flat conversation, and slim interface are under **Advanced**. The docs website has its own theme control in the header.

## Support

Use **Support** to rate the app on Google Play, open the GitHub issue tracker, or visit the [support page](/support/).

## Related guides

- [Add or switch connections](/docs/connections/)
- [Providers and models](/docs/guides/providers-and-models/)
- [Cloud Link](/docs/cloud-link/)
- [Notifications](/docs/guides/notifications/)
- [Voice](/docs/guides/voice/)
- [MCP and diagnostics](/docs/guides/mcp-and-diagnostics/)
- [Quick actions and widgets](/docs/guides/quick-actions-and-widgets/)
