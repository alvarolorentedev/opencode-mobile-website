---
title: Select and Manage OpenCode Projects on Mobile
description: Choose, add, and switch OpenCode projects in the mobile app, understand per-project sessions, and use worktrees as isolated projects.
lastUpdated: 2026-10-19
---

A project is the OpenCode directory that owns the chats, files, and terminal sessions shown in the app. The **Projects** tab is the home for that context.

## Choose a project

Use any of these entry points:

- **Projects** — the project name in the header opens the project picker.
- **Chat** — the project button opens the same picker.
- **Onboarding** — the Project step selects the first project.

The picker lists projects opened on this device for the active connection, most recent first. The server provides project names and paths; the app does not invent a server project.

## Add a project

1. Open the project picker.
2. Tap **Add project**.
3. Enter a directory on the OpenCode server.
4. Submit the form.

The app asks the server to resolve the directory, refreshes the project catalog, and selects the resolved project root. If the directory is invalid, the form stays open with an error.

Once a project is opened, it is recorded for that connection. Closing it from the picker removes the local entry without touching the server or deleting files.

## Switch projects

Selecting another project clears the current session selection and rehydrates the appropriate session for that project. The app remembers the last session used per project.

Switching projects changes:

- which chats appear in the Chats library;
- which files and worktrees the Projects tab shows;
- which terminal PTYs are available;
- the scope used for diffs, approvals, and terminal requests.

The active connection remains the same unless you switch servers in Settings.

## Project labels

- **Current** may mark the project reported by the server.
- **Active** marks the app's selected project.
- A selected worktree is kept only while the server resolves it; otherwise the app falls back to the most recent opened project.

## Worktrees as projects

Worktrees are isolated directories managed by OpenCode. From **Projects → Worktrees**, you can create one, select it as the active project, reset it, or remove it. See [Worktrees](/docs/guides/worktrees/).

## Files and branches

The Files tab can show the current VCS branch and changed-file count when the server supplies them. File editing is available on both V1 and V2 contracts, with a save-time conflict check. See [Project files](/docs/guides/workspace-files/).

## Troubleshooting

- **No projects appear:** confirm the server is connected and reports a project catalog, then refresh Projects.
- **Add project fails:** confirm the path exists on the OpenCode server and the server resolved the directory.
- **A project disappeared:** it may have been closed locally. Add it again or choose another opened project.
- **Sessions seem missing:** confirm the active project and connection; sessions are scoped to both.
- **A worktree is not selectable:** confirm the server still resolves that worktree directory.

Next: [Work with files](/docs/guides/workspace-files/), [manage worktrees](/docs/guides/worktrees/), or [start a task](/docs/guides/tasks/).
