---
id: approvals-and-changes
title: Approvals and Changes
slug: /guides/approvals-and-changes
---

# Approvals and changes

Use this workflow when OpenCode needs permission, asks a product question, or has produced code that you want to inspect before continuing.

## Answer a permission

A permission card describes the requested operation and may include a command, pattern, or path.

- **Allow once** approves only this request.
- **Always allow** approves that permission category for future requests.
- **Deny** refuses it.

Read the request before deciding. Prefer **Allow once** for destructive commands, unfamiliar workspaces, external network access, and paths outside the selected project.

The composer approval toggle updates OpenCode configuration for common permissions such as editing, shell commands, web fetches, loop detection, and external directories. It is more than a visual preference.

## Answer a question

Question cards can allow one choice, multiple choices, or a custom response. Answer in the order presented and submit. Rejecting a question tells OpenCode not to continue with that unanswered decision.

Conversation mode pauses for permissions and questions because they require deliberate on-screen input.

## Review changed files

1. Open **Files Changed** in Chat.
2. Compare the changed-file count with the task scope.
3. Expand each file.
4. Review added and removed lines.
5. Return to **Session** and ask for a correction when something is unexpected.

The diff is a focused mobile review surface, not a replacement for repository tests, a desktop code review, or version-control safeguards.

## When a request disappeared

Pending interactions are refreshed from both realtime events and server list APIs. If one vanishes, it may already have been answered elsewhere. Refresh the session before assuming it was lost.

Next: [Edit a workspace file](./workspace-files.md) or [manage sessions](./sessions.md).
