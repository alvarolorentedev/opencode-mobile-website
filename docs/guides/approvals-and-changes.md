---
id: approvals-and-changes
title: Review OpenCode Changes on Mobile
sidebar_label: Approvals and Changes
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

On compatible OpenCode 1.x (V1) servers, the composer approval toggle updates configuration for common permissions such as editing, shell commands, web fetches, loop detection, and external directories. OpenCode 2.x (V2) does not expose this configuration write, so the app hides the toggle there. Permission cards still support per-request choices.

The approval view follows the website’s current color theme.

<img className="theme-screenshot-light" src="/img/docs/approval-request-light.webp" alt="Pending file permission request in OpenCode Mobile, light theme" />
<img className="theme-screenshot-dark" src="/img/docs/approval-request-dark.webp" alt="Pending file permission request in OpenCode Mobile, dark theme" />

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

The diff view follows the website’s current color theme.

<img className="theme-screenshot-light" src="/img/docs/file-changes-light.webp" alt="Expanded file diff in OpenCode Mobile, light theme" />
<img className="theme-screenshot-dark" src="/img/docs/file-changes-dark.webp" alt="Expanded file diff in OpenCode Mobile, dark theme" />

## When a request disappeared

Pending interactions are refreshed from both realtime events and server list APIs. If one vanishes, it may already have been answered elsewhere. Refresh the session before assuming it was lost.

Next: [Edit a workspace file](./workspace-files.md), [manage sessions](./sessions.md), or review the [remote-access security model](./remote-access-security.md).
