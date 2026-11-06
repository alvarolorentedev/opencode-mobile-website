---
title: Monitor OpenCode Tasks on Mobile
description: Start a task in OpenCode Mobile, attach context, follow live progress, steer or stop a run, and judge whether the result is complete.
lastUpdated: 2026-11-06
---

Use Chat to start work from your phone, check whether a task is progressing, or give OpenCode its next instruction.

The screenshot follows the website’s current color theme.

<img class="theme-screenshot-light" src="/img/docs/task-session-light.webp" alt="Running task with activity and composer controls in OpenCode Mobile, light theme" />
<img class="theme-screenshot-dark" src="/img/docs/task-session-dark.webp" alt="Running task with activity and composer controls in OpenCode Mobile, dark theme" />

## Before you start

- Select the intended project in **Projects** or through the chat library's project button.
- Confirm the session title and project at the top of **Chat**.
- Choose the agent and model above the composer.
- Check whether auto model routing is on if you expect a different model to answer.
- Keep approval prompts enabled when working in an unfamiliar repository.

## Start a new chat

Tap **New chat** in the chat library. The sheet preselects the current server and project; choose another server, project, or worktree if needed. Confirming creates the session there and switches Chat to it while the transcript hydrates in the background.

## Send a task

1. Write the outcome you want in **Ask anything**.
2. Add constraints that OpenCode should preserve.
3. Say how the result should be checked.
4. Tap send.

A useful prompt is specific without dictating every implementation detail:

> Fix the empty state on the account page. Reuse the existing button component, do not change the API, and run the related tests.

You may also attach files with **+**, dictate into the draft with the microphone, or use the composer's command and mention suggestions.

## Use commands, mentions, and shell mode

On OpenCode 2:

- Type `/` at the start of the draft to see server commands and the built-in `/compact` and `/btw`. Selecting one inserts its name; unknown commands never become an ordinary prompt.
- Type `@` to mention an agent, skill, project file, or reference. Mentions are sent as structured context and are dropped if you edit them out.
- Start the draft with `!` to run a shell command through the session shell. The output appears as a shell activity row in the transcript.

On iOS and Android, leading `/` commands and `@` mentions are highlighted in the composer as you type. Attachments disable shell mode and use normal prompt submission.

## Attach context

- Attachments are limited to **10 MB per file**.
- The selected model must advertise attachment support.
- Images, documents, and other supported files can be previewed before sending.
- On Android, content shared from another app opens a review screen first; see [Share from other apps](/docs/guides/share-from-other-apps/).
- Shared or attached content is never submitted automatically.

## Follow the work

The transcript shows the conversation, running status, activity runs, and anything waiting for you.

- Reasoning, tool calls, and patches appear as compact activity runs. Expand a run to inspect thoughts, shell output, reads, and per-file diffs. Runs stay open or closed until you toggle them.
- The progress control shows the current step and completed count; tap it for the full task list.
- A centered change chip above the composer shows the file count and additions/deletions. Tap it to open the review overlay.
- When you scroll away from the bottom, **Jump to latest** appears; **New messages** marks unseen activity.

If the composer is empty while the task is running, its main action becomes **Stop**. Use it to abort a task that is going in the wrong direction.

## Send another message while work is running

Open **Settings → Chat & responses → Messages sent while working** on OpenCode 2:

- **Steer** applies the message at the next step of the current response.
- **Append** queues the message for a later turn.

Choose the behavior that matches the intent. Steering can correct a run quickly; appending preserves the current turn. A prompt attempted while offline is queued and sent once after reconnect; a timeout with an unknown server outcome is marked delivery-uncertain and is not replayed automatically.

## Choose the model

The model picker groups models by provider, supports search, and includes model variants on OpenCode 2. The app remembers the latest model per agent, so switching agents restores that agent's last explicit model.

If [automatic model routing](/docs/guides/auto-model-routing/) is enabled, the picker shows an **Auto-routing** row. Choosing an explicit model turns routing off for that chat.

## What good completion looks like

- The assistant explains what changed.
- The change chip and review overlay match the requested scope.
- Relevant validation passed or any failure is clearly reported.
- No permission or question is still waiting for you.
- The notification, if enabled, matches the actual server state.

Next: [Review approvals and changes](/docs/guides/approvals-and-changes/), [inspect session usage](/docs/guides/usage/), or [manage the session](/docs/guides/sessions/).
