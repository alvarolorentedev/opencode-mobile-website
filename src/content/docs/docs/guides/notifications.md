---
title: OpenCode Task Notifications on Mobile
description: Enable OpenCode completion and needs-input notifications on Android and iOS, and understand background delivery limits.
lastUpdated: 2026-10-19
---

Use notifications when you want to leave the app while a task runs and receive an alert when the tracked session finishes, fails, or needs input.

## Enable notifications

1. Open **Settings → Notifications**.
2. Request notification permission when the operating system asks.
3. Refresh the status and confirm it is enabled.
4. If necessary, open the device’s notification settings and allow OpenCode Mobile.

On Android, also review battery optimization and battery-saver settings if alerts are delayed; some devices aggressively suspend background work. The section links directly to the relevant system settings where supported.

## What you can receive

- **Completion alerts** when a tracked task finishes.
- **Failure alerts** when a tracked task finishes with an error.
- **Needs-input alerts** when a tracked task blocks on a permission or question while the app is not in the foreground.
- **Android ongoing activity** for server-wide work, including tasks started on another project or on the desktop.

Tapping a notification opens the owning connection, project, and session when the app can resolve them.

## How background checking works

The app creates a pending tracker after you submit a prompt. It confirms the result against the server before alerting; a cached idle status is not treated as completion.

- Stopping a session clears its pending completion tracker.
- Interrupted or aborted runs are dropped without a completion alert.
- A record for another project is kept instead of being cleared by the active project.
- On supported native builds outside Expo Go, a background task checks pending sessions periodically.
- On Android, a foreground service and Headless JS keep provider SSE/polling alive while work is active. The ongoing notification stops when all tracked work is idle, dismissed, or the service times out.
- On iOS, background delivery is best effort. iOS grants background time opportunistically, so a suspended app may deliver a completion only when it next runs or when the system schedules the task.

Background monitoring does not work on web or in Expo Go. Android force-stop, removing the app from Recents, and process termination end live monitoring; the server job keeps running.

## What expectations are realistic

Notifications are a convenience, not a guaranteed job queue. Delivery can be affected by:

- device power management and battery settings;
- connectivity;
- app lifecycle and platform restrictions;
- notification permission;
- Android foreground-service limits.

Always open Chat to verify the actual server state when a notification is missing or delayed.

## Widgets and quick actions

Android home-screen widgets can show recent replies, awaiting actions, and plan progress without opening the app. See [Quick actions and widgets](/docs/guides/quick-actions-and-widgets/).

Next: [Start and monitor tasks](/docs/guides/tasks/), [manage sessions](/docs/guides/sessions/), or troubleshoot [stale server state](/docs/guides/troubleshooting/).
