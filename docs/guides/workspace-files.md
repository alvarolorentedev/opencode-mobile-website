---
id: workspace-files
title: Edit OpenCode Workspace Files from Android
sidebar_label: Work with Files
slug: /guides/workspace-files
---

# Work with workspace files

Use the Files panel to inspect a project or make a small, deliberate text correction without opening a desktop editor.

## Find and read a file

1. Select the correct project in **Workspace**.
2. Open **Files**.
3. Search by path or filename.
4. Tap a result to load its current server content.

The panel can also show the current version-control branch and changed-file count when the server supplies them.

## Make a focused edit

1. Open a supported text file.
2. Tap **Edit**.
3. Change only the necessary content.
4. Tap **Save patch**.

Before saving, the app re-reads the server file. If another process changed it after you opened it, the save is rejected rather than overwriting newer content.

Reopen the file, incorporate the current version, and try again. Binary or base64 content is read-only.

## Choose the right tool

Mobile file editing works well for a typo, configuration value, or small documentation adjustment. For multi-file refactors, use Chat to describe the goal and review the diff, or return to a desktop editor.

Next: [Review approvals and changes](./approvals-and-changes.md), [use worktrees](./worktrees.md), or run a focused [terminal command](./terminal.md).
