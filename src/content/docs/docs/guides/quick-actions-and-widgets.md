---
title: OpenCode Mobile Quick Actions and Android Widgets
description: Use launcher quick actions and Android home-screen widgets to reach recent OpenCode chats, approvals, and plan progress.
lastUpdated: 2026-10-19
---

OpenCode Mobile can surface recent work outside the app. Quick actions are available on iOS and Android; home-screen widgets are Android-only.

## Launcher quick actions

Long-press the app icon or open the launcher’s quick-action menu to see:

- **New chat**;
- up to three running or recently updated sessions from the active connection.

Session labels follow the app language and update when sessions change. Tapping a session opens the owning connection, project, and chat. Opening a session from another saved connection switches connections first.

Quick actions are published while the app is in the foreground and are debounced to avoid excessive launcher updates. If the app is not connected, no session items are published.

## Android home-screen widgets

Android offers three resizable widgets:

| Widget | What it shows |
| --- | --- |
| **Latest replies** | The newest readable assistant reply from up to three recent root chats |
| **Awaiting actions** | Up to three conversations with permission or question counts and short request excerpts |
| **Plan progress** | The current chat’s todo steps, completed/total count, current step, and upcoming steps |

Widgets use the app’s existing realtime and polling data. They show the last successful update time, so a suspended app can display a dated snapshot. Widgets do not require notification permission.

### Privacy

Android supports **Show widget previews** under **Settings → Advanced → General**. When disabled, reply, request, and plan text is removed from snapshots and placed widgets; titles, counts, and status remain.

Widgets do not include approve, deny, reply, abort, or auto-approve controls. Tapping a widget opens the app, where the action can be reviewed.

### Limitations

- Widget content depends on the app having synced recently. A force-stopped app cannot update widgets until it runs again.
- Gallery labels and descriptions are English-only; rendered widget content follows the app language.
- iOS home-screen widgets and Live Activities are not available yet.
- Quick actions are not a background task queue; they only open existing sessions or create a new chat.

## Requirements

- Native Android or iOS build. Web and Expo Go do not provide these surfaces.
- The app must be connected to a server for session items.
- Android widgets require a native Android build and at least one app launch.

Next: [Notifications](/docs/guides/notifications/), [manage sessions](/docs/guides/sessions/), or [configure settings](/docs/guides/settings/).
