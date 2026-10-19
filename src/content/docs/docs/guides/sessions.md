---
title: Manage OpenCode Sessions from Mobile
description: Search, switch, favorite, rename, archive, restore, share, delete, fork, or revert OpenCode sessions from the mobile app.
lastUpdated: 2026-10-19
---

Sessions separate different pieces of work. Use them like focused work threads: one goal, its discussion, and its resulting changes.

## Open the Chats library

Tap the session title at the top of **Chat** to open **Chats**. From there you can:

- search the active, favorite, or archived list;
- switch to an existing session or create a new one;
- open a session from another project;
- favorite a session for quick access;
- hide subagent chats;
- use row actions supported by the connected server.

The library’s **Running & recent** group shows up to four sessions from the whole connection, running ones first. Selecting one switches to its project and opens it in one tap.

The app remembers the last session used for each project. Switching projects changes which sessions are shown.

## Create, rename, and organize

In the Chats library:

- **New chat** starts a new session in the active project.
- **Rename** gives the session a clear outcome-oriented title.
- **Favorite** keeps a session accessible across projects.
- **Archive** hides finished work without deleting its history.
- **Restore** brings an archived session back when work resumes.
- **Delete** permanently removes a session after confirmation.
- **Share** creates a public URL when the server supports sharing; **Unshare** removes it later.

Archive, restore, and share actions currently depend on the OpenCode 1.x (V1) contract. They are hidden on OpenCode 2.x (V2), which does not expose those actions. Delete, rename, create, fork, and revert remain available where the server supports them.

Project-scoped row actions are offered only for sessions in the active project. Sessions from other projects can still be opened and favorited; the app switches project first.

Before sharing, review the transcript for source code, credentials, internal URLs, customer information, or other sensitive context. Anyone with a share link may be able to view the session.

## Explore a different direction

Use actions on one of your messages:

- **Fork** starts a separate session from that point. Use it to compare approaches without losing the original.
- **Revert** asks OpenCode to undo session changes after that message.
- **Undo revert** restores the reverted session state.

Forking is the safer choice when you want to preserve both directions. Revert changes server-side session state and deserves the same care as any source-changing action.

## Find older context

Chat initially shows the newest transcript page. Tap **Load earlier messages** when you need prior decisions. Long-press a message to copy it; use the speaker action on an assistant message to hear it aloud.

## Session links

A session can be opened from a notification, quick action, or deep link. See [Deep links](/docs/guides/deep-links/) for the link format and behavior.

Next: [Start and monitor a task](/docs/guides/tasks/), [review approvals and changes](/docs/guides/approvals-and-changes/), or [understand session usage](/docs/guides/usage/).
