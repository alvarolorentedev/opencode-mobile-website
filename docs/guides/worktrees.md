---
id: worktrees
title: Manage Worktrees
slug: /guides/worktrees
---

# Manage worktrees

Use a worktree when you want an isolated project directory for a parallel change without disturbing the main working directory.

## Create one

1. Open **Workspace → Tools**.
2. Enter an optional name.
3. Enter an optional start command.
4. Create the worktree.
5. Refresh if it does not immediately appear.

The server decides the resulting directory and branch details. Confirm them before starting work.

## Reset or remove

- **Reset** returns the worktree to its server-defined starting state.
- **Remove** deletes the worktree managed by OpenCode.

Both actions require confirmation. Check the displayed directory and branch and make sure any valuable work is committed or backed up first.

## Important limitation

Worktree management relies on experimental OpenCode endpoints. Availability and behavior may change more frequently than core session functionality. If the Tools panel has no worktree controls, the connected server may not expose them.

Next: [Start a task](./tasks.md) in the intended project or [work with files](./workspace-files.md).
