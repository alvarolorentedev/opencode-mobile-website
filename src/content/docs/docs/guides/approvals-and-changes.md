---
title: Review OpenCode Changes on Mobile
description: Answer OpenCode permissions and questions, review Turn, Uncommitted, or Branch diffs, and manage saved approval rules in the mobile app.
lastUpdated: 2026-10-19
---

Use this workflow when OpenCode needs permission, asks a product question, or has produced code that you want to inspect before continuing.

## Answer a permission

A permission card describes the requested operation and may include a command, pattern, or path. If a subagent requested the action, the card names the requesting session.

- **Allow once** approves only this request.
- **Always allow** approves that permission category for future requests.
- **Deny** refuses it.

Read the request before deciding. Prefer **Allow once** for destructive commands, unfamiliar projects, external network access, and paths outside the selected project.

On compatible OpenCode 1.x (V1) servers, the composer approval toggle updates configuration for common permissions such as editing, shell commands, web fetches, loop detection, and external directories. V2 servers expose saved approval rules instead: open **Settings → Approvals** to review or remove rules created by **Always allow**.

The approval view follows the website’s current color theme.

<img class="theme-screenshot-light" src="/img/docs/approval-request-light.webp" alt="Pending file permission request in OpenCode Mobile, light theme" />
<img class="theme-screenshot-dark" src="/img/docs/approval-request-dark.webp" alt="Pending file permission request in OpenCode Mobile, dark theme" />

## Answer a question

Question cards can allow one choice, multiple choices, or a custom response. On V2 servers, forms can also include booleans, numbers, external links, required fields, defaults, and conditional fields.

- Answer in the order presented and submit.
- Drafts survive dismissal and reopening.
- Rejecting a question tells OpenCode not to continue with that unanswered decision.
- A failed submission keeps the answers for retry.

Conversation mode pauses for permissions and questions because they require deliberate on-screen input.

## Review changed files

Chat’s **Files Changed** tab can show three diff scopes. Use the source control in the diff overlay to switch:

| Scope | What it shows |
| --- | --- |
| **Turn** | The diff recorded for a user turn. The latest turn with a recorded change is shown by default. |
| **Uncommitted** | The project’s current VCS working-tree changes. Not session-scoped. |
| **Branch** | Changes against the project’s default branch. Not session-scoped. |

When more than one turn has a recorded diff, the Turn scope lets you choose an earlier turn. If a turn has no structured diff, the app shows the changed-file list and notes that diff lines are unavailable for that turn.

To review:

1. Open **Files Changed** in Chat.
2. Compare the changed-file count with the task scope.
3. Expand each file and review added and removed lines.
4. Switch scope when you need the working tree or branch view.
5. Return to **Session** and ask for a correction when something is unexpected.

The diff is a focused mobile review surface, not a replacement for repository tests, a desktop code review, or version-control safeguards.

The diff view follows the website’s current color theme.

<img class="theme-screenshot-light" src="/img/docs/file-changes-light.webp" alt="Expanded file diff in OpenCode Mobile, light theme" />
<img class="theme-screenshot-dark" src="/img/docs/file-changes-dark.webp" alt="Expanded file diff in OpenCode Mobile, dark theme" />

## When a request disappeared

Pending interactions are refreshed from both realtime events and server list APIs. If one vanishes, it may already have been answered elsewhere. Refresh the session before assuming it was lost.

Next: [Edit a project file](/docs/guides/workspace-files/), [manage sessions](/docs/guides/sessions/), or review the [remote-access security model](/docs/guides/remote-access-security/).
