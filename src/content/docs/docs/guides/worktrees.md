---
title: Manage OpenCode Worktrees from Mobile
description: Create, select, reset, and remove isolated OpenCode worktrees from the mobile app.
lastUpdated: 2026-10-19
---

Use a worktree when you want an isolated project directory for a parallel change without disturbing the main working directory.

## Create one

1. Open **Projects → Worktrees**.
2. Enter an optional name.
3. On OpenCode 1.x servers, enter an optional start command.
4. Create the worktree.
5. Refresh if it does not immediately appear.
6. Tap the worktree to use it as the active project.

The server decides the resulting directory and branch details. Confirm them before starting work.

## Reset or remove

- **Reset** returns the worktree to its server-defined starting state.
- **Remove** deletes the worktree managed by OpenCode.

Both actions require confirmation. Check the displayed directory and branch and make sure any valuable work is committed or backed up first.

Reset and the optional start command are available only on compatible OpenCode 1.x (V1) servers. Creating, listing, selecting, and removing worktrees can be available on V2 when the server exposes the worktree endpoints.

## Important limitation

Worktree management relies on experimental OpenCode endpoints. Availability and behavior may change more frequently than core session functionality. If the Worktrees tab has no controls, the connected server may not expose them.

Next: [Start a task](/docs/guides/tasks/) in the intended project, [work with files](/docs/guides/workspace-files/), or review [permissions and changes](/docs/guides/approvals-and-changes/).
