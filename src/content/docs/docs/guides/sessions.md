---
title: Manage OpenCode Sessions from Mobile
description: Search, switch, favorite, rename, delete, fork, or revert OpenCode sessions from the mobile app, and review changes without losing context.
lastUpdated: 2026-11-06
---

Sessions separate different pieces of work. Use them like focused work threads: one goal, its discussion, and its resulting changes.

## Open the chat library

Tap the current chat title at the top of **Chat** to open the library. From there you can:

- search the active or favorite list;
- switch to an existing session or create a new one;
- open a session from another project or server;
- favorite a session for quick access;
- hide subagent chats;
- rename or delete a session.

The library groups sessions by server and project and shows each project's path, so two projects with similar names are distinguishable. The **Running & recent** group shows up to four sessions from the whole connection, running ones first. Selecting one switches to its project and opens it in one tap.

## Create, rename, and organize

- **New chat** opens a sheet that preselects the current server and project. Choose another server, project, or worktree if needed, then confirm. The app creates the session there and switches the Chat view to it.
- **Rename** opens a focused editor with Save, Cancel, and keyboard submit. Empty names are rejected, and the action stays below the title field.
- **Delete** permanently removes a session after confirmation.
- **Favorite** keeps a session accessible across projects.
- **Hide subagent chats** keeps delegated child sessions out of the list.

Archive, restore, and share actions are not part of the current app. Use delete for finished work you no longer need, and fork or revert when you want to preserve or change a direction.

Project-scoped row actions are offered only for sessions in the active project. Sessions from other projects can still be opened and favorited; the app switches project first.

## Read the transcript

- Chat no longer uses separate **Session** and **Files Changed** tabs. The transcript fills the chat, and a change chip above the composer opens the review overlay.
- Each assistant bubble shows the model that produced that reply, including auto-routed replies, and the reasoning variant when the server reports one.
- Contiguous reasoning, tool calls, and patches appear as a two-level activity run. Expand a run to inspect thoughts, commands, reads, and per-file diffs.
- While you are away from the bottom, **Jump to latest** appears and changes to **New messages** when rows arrive. Tap it to restore follow mode.
- Opening a session loads the newest page. Scrolling to the top keeps paging older history; loaded history is not capped.
- Long-press a message to copy it. Use the speaker action on an assistant message to hear it aloud.
- Undo a revert from its notice; the reverted prompt and attachments return to the composer.

## Explore a different direction

Use actions on one of your messages:

- **Fork** starts a separate session from that point. Use it to compare approaches without losing the original.
- **Revert** asks OpenCode to undo session changes after that message. An in-flight reply is stopped before the rewind is staged.
- **Undo revert** restores the reverted session state and the prompt.

Forking is the safer choice when you want to preserve both directions. Revert changes server-side session state and deserves the same care as any source-changing action.

## Session commands

On OpenCode 2, two client built-ins are available from the composer:

- `/compact` asks the server to compact the session. Compaction events rebuild the transcript window.
- `/btw <question>` asks a transient question about the session context. The answer opens in a local sheet and is not added to the conversation, does not run tools, and disappears when the sheet closes.

Server-provided slash commands, `@` mentions, and `!` shell mode are documented under [Start and monitor a task](/docs/guides/tasks/).

## Session links

A session can be opened from a notification, quick action, widget, or deep link. See [Deep links](/docs/guides/deep-links/) for the link format and behavior.

Next: [Start and monitor a task](/docs/guides/tasks/), [review approvals and changes](/docs/guides/approvals-and-changes/), or [understand session usage](/docs/guides/usage/).
