---
title: Select and Manage OpenCode Projects on Mobile
description: Choose, add, archive, and switch OpenCode projects from the mobile app, including server-archived projects, worktrees, and project files.
lastUpdated: 2026-11-06
---

A project is the OpenCode directory that owns the chats, files, and terminal sessions shown in the app. The **Projects** tab is the home for that context.

## Choose a project

Use any of these entry points:

- **Projects** — the project name in the header opens the project picker.
- **Chat** — the chat library's project button opens the same picker.
- **Onboarding** — the Project step lists the server's projects.

The picker shows the projects the **server** reports, in server order. The app does not keep an “opened on this device” list, so a stale local entry cannot hide or invent a project.

Search filters the list. The currently active project is labeled **Active**; a project that matches the server's current location may be labeled **Current**.

## Add a project

1. Open the project picker.
2. Tap **Add project**.
3. Browse server folders, or choose **Enter path manually**.
4. Select a folder or type its directory, then submit.

Folder browsing lists direct child folders with the current path and an **Up** action. **Select this folder** fills the directory field. The app asks the server to resolve the directory, refreshes the project catalog, and selects the resolved project root. An invalid directory keeps the form open with the error.

Adding a project registers the directory on the OpenCode server. It does not copy the repository onto the phone.

## Archive projects

There are two different archive concepts. Neither one deletes repository files.

### Archived on this device

A project row's device-local archive action hides that server project only on this device.

- Hidden projects move to a collapsed **Archived on this device (N)** section.
- **Restore** brings one back.
- Search expands and filters the archived section.
- Hiding the active project activates the first remaining visible project on that connection.

These markers are stored per connection and never create a local project row.

### Archived on OpenCode

On OpenCode 2, the picker also offers an **Archived on OpenCode** switch.

- The normal list stays the server's default and excludes archived projects.
- Enabling the switch fetches archived entries from the server and shows them as read-only.
- **Restore** asks the server to resolve the project's directory again. It succeeds only when the folder exists; the server error is shown otherwise.
- The app does not offer a server-side archive action for an active project.
- OpenCode 1.x hides this section.

A project can be archived on the device and on the server at the same time. While the server still reports it as archived, the server-archived section determines how it is shown.

## Switch projects

Selecting another project clears the current session selection and rehydrates or creates the appropriate session for that project. The app remembers the last session used per project.

Switching projects changes:

- which chats appear in the chat library;
- which files and worktrees the Projects tab shows;
- which terminal PTYs are available;
- the scope used for diffs, approvals, and terminal requests.

The active connection remains the same unless you switch servers in Settings.

## Worktrees as projects

A worktree is an isolated checkout managed by OpenCode. When a project has more than one checkout, a worktree selector appears beside the project name.

- Create a worktree from **New chat**; an optional name is accepted.
- Select a worktree as the active location.
- Remove a worktree from the management mode in the worktree switcher. Removal requires destructive confirmation.

Worktree reset and an optional start command are not available in the current app. Worktree operations use experimental OpenCode endpoints, so availability depends on the server.

## Files and branches

The **Projects** tab opens the project's Files surface. It can show the current VCS branch and changed-file count when the server supplies them.

From there you can search, read files, preview images, audio, and video on OpenCode 2, download files, and save focused text edits. On OpenCode 2 you can also copy, move, rename, and delete entries. See [Project files](/docs/guides/workspace-files/).

## Troubleshooting

- **No projects appear:** confirm the server is connected and reports a project catalog, then refresh Projects.
- **Add project fails:** confirm the path exists on the OpenCode server and the server resolved the directory.
- **A project disappeared:** check the device-local archive section and, on OpenCode 2, the server-archived switch.
- **Sessions seem missing:** confirm the active project and connection; sessions are scoped to both.
- **A worktree is not selectable:** confirm the server still resolves that worktree directory.
- **Restore fails:** the server-archived folder may no longer exist. Recreate it on the server first.

Next: [Work with files](/docs/guides/workspace-files/), [manage worktrees](/docs/guides/worktrees/), or [start a task](/docs/guides/tasks/).
