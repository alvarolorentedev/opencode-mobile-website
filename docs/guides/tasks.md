---
id: tasks
title: Monitor OpenCode Tasks on Android
sidebar_label: Start and Monitor Tasks
slug: /guides/tasks
---

# Start and monitor tasks

Use Chat when you need to start work from your phone, check whether an existing task is progressing, or give OpenCode its next instruction.

![OpenCode Mobile Chat screen showing a new task, session controls, and the message composer](/img/product/task-session.webp)

## Before you start

- Select the intended project in **Workspace**.
- Confirm the session title at the top of **Chat**.
- Choose the agent and model above the composer.
- Keep approval prompts enabled when working in an unfamiliar repository.

## Send a task

1. Write the outcome you want in **Ask anything**.
2. Add constraints that OpenCode should preserve.
3. Say how the result should be checked.
4. Tap send.

A useful prompt is specific without dictating every implementation detail:

> Fix the empty state on the account page. Reuse the existing button component, do not change the API, and run the related tests.

You may also attach files with **+**, dictate into the draft with the microphone, or select a server-provided slash command after typing `/`.

## Follow the work

The **Session** tab shows the conversation, running status, todos, and anything waiting for you. Tool activity and reasoning appear as compact supporting details beneath assistant messages.

The **Files Changed** tab shows the current diff. Expand a file to inspect additions and deletions before treating the task as complete.

If the composer is empty while the task is running, its main action becomes **Stop**. Use it to abort a task that is going in the wrong direction.

## What good completion looks like

- The assistant explains what changed.
- **Files Changed** matches the requested scope.
- Relevant validation passed or any failure is clearly reported.
- No permission or question is still waiting for you.

Next: [Review approvals and changes](./approvals-and-changes.md), [inspect session usage](./usage.md), or [manage the session](./sessions.md).
