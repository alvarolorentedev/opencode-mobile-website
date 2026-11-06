---
title: Manage OpenCode Worktrees from Mobile
description: Create, select, and remove isolated OpenCode worktrees from the mobile app, with current availability and experimental-endpoint limits.
lastUpdated: 2026-11-06
---

Use a worktree when you want an isolated project directory for a parallel change without disturbing the main working directory.

## Create one

1. Open **New chat**.
2. Choose the project that should own the worktree.
3. Select **New worktree** and enter an optional name.
4. Confirm.

The server decides the resulting directory and branch details. The app selects the new location and opens a chat there. Confirm the project and branch before starting work.

You can also select an existing worktree from the worktree switcher beside the project name in **Projects**, **Chat**, or **New chat**.

## Remove one

1. Open the worktree switcher.
2. Enter its management mode.
3. Choose **Remove** for the worktree.
4. Confirm the destructive action.

Removal deletes the worktree managed by OpenCode. Check the displayed directory and branch and make sure any valuable work is committed or backed up first.

## What is not available

- **Reset** to a server-defined starting state is not part of the current app.
- An optional **start command** when creating a worktree is not available.
- Worktree creation is a chat flow, not a separate Projects tab.

Worktree management relies on experimental OpenCode endpoints. Availability and behavior may change more frequently than core session functionality. If the worktree controls are missing, the connected server may not expose them.

## Important limitation

A worktree is still a server directory. It uses the same connection, providers, and permissions as the project that owns it. It is not a sandbox for untrusted code.

Next: [Start a task](/docs/guides/tasks/) in the intended project, [work with files](/docs/guides/workspace-files/), or review [permissions and changes](/docs/guides/approvals-and-changes/).
