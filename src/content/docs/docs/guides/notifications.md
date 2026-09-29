---
title: OpenCode Task Notifications on Mobile
description: Enable OpenCode task notifications on Android and iOS and understand when alerts may be delayed.
---
Use notifications when you want to leave the app while a task runs and receive a local alert when the tracked session completes.

## Enable notifications

1. Open **Settings → Notifications**.
2. Request notification permission when the operating system asks.
3. Refresh the status and confirm it is enabled.
4. If necessary, open the device’s notification settings and allow OpenCode Mobile.

On Android, also inspect notification and battery settings if alerts are delayed; some devices aggressively suspend background work. iOS schedules and background checks are subject to system scheduling.

## What to expect

The app creates pending completion tracking after a prompt is submitted. Stopping a session clears that pending tracker. Tapping a completion notification should bring you back to the relevant app context when the platform supports it.

Notifications are supported on native iOS and Android builds, but they are a convenience rather than a guaranteed job queue. Delivery can be affected by device power management, connectivity, app lifecycle, and platform restrictions. Background notification checks do not work on web or in Expo Go.

Always open Chat to verify the actual server state when a notification is missing or delayed.

Next: [Start and monitor tasks](/docs/guides/tasks/), [manage sessions](/docs/guides/sessions/), or troubleshoot [stale server state](/docs/guides/troubleshooting/).
