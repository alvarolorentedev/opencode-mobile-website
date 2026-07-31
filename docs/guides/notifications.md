---
id: notifications
title: OpenCode Task Notifications on Android
sidebar_label: Task Notifications
slug: /guides/notifications
---

# Task notifications

Use notifications when you want to leave the app while a task runs and receive a local alert when the tracked session completes.

## Enable notifications

1. Open **Settings → Notifications**.
2. Request Android notification permission.
3. Refresh the status and confirm it is enabled.
4. If necessary, open Android notification settings and allow OpenCode Mobile.

For delayed or missing alerts, also inspect Android battery settings. Some devices aggressively suspend background work.

## What to expect

The app creates pending completion tracking after a prompt is submitted. Stopping a session clears that pending tracker. Tapping a completion notification should bring you back to the relevant app context when the platform supports it.

Notifications are a convenience, not a guaranteed job queue. Delivery can be affected by device power management, connectivity, app lifecycle, and platform restrictions. Background notification checks do not work on web or in Expo Go.

Always open Chat to verify the actual server state when a notification is missing or delayed.

Next: [Start and monitor tasks](./tasks.md), [manage sessions](./sessions.md), or troubleshoot [stale server state](./troubleshooting.md).
