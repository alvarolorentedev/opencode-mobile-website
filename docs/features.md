---
id: features
title: Features
slug: /features
---

# Features

OpenCode Mobile centers the parts of an agent workflow that are useful away from a desk: session control, context, approvals, diagnostics, and short interventions.

This page is a capability reference. For instructions, see the [User Manual](./user-manual.md).

## Capability overview

| Capability | What the user can do | Requirements or limits |
| --- | --- | --- |
| Sessions | Create, switch, rename, share, archive, restore, delete, fork, revert, and stop | Lifecycle actions require corresponding current server endpoints |
| Prompts | Send text, attachments, or server commands with agent/model choices | Attachments require a compatible model; local files are limited to 10 MB |
| Progress | Follow messages, activity, todos, pending requests, and changed files | Realtime uses SSE with polling fallback |
| Approvals | Allow once, always allow, or deny permissions; answer or reject questions | A pending interaction can block the session until answered |
| Usage | Inspect context utilization, tokens, reasoning, cache activity, steps, and estimated cost | Cost is absent when pricing metadata is unavailable |
| Voice | Dictate a draft, play replies, or use a hands-free conversation loop | Foreground-only; pauses for on-screen decisions |
| Workspace | Search/read files, edit text with conflict protection, inspect branch and status | Binary files are read-only; editing is full-file patch based |
| Worktrees | Create, refresh, reset, and remove worktrees | Experimental server capability |
| Terminal | Create/select/close PTYs and send commands | Line console, not a VT terminal emulator |
| Providers | Configure OAuth or manual/API authentication and filter visible models | Methods and models are discovered from the server |
| MCP | Add and manage local/remote MCP servers and complete OAuth | Requires compatible MCP endpoints |
| Diagnostics | Inspect health, version, realtime, MCP, LSP, and formatter state | Individual signals depend on server support |
| Notifications | Receive Android task-completion notifications and open system settings | Subject to Android power management and app lifecycle |

## Chat and session control

- Create, open, rename, archive, restore, share, and delete sessions
- Fork a session from a user message
- Revert to a user message and undo the current revert
- Stop a running session
- Load older transcript pages without losing the latest activity
- Track the latest-turn diff, todos, session status, and usage information

Only user messages and assistant text or errors appear as primary transcript messages. Reasoning, tool activity, patches, file references, subtasks, retries, and step activity are summarized as supporting detail.

## Prompts, commands, and attachments

- Send text prompts and server-provided slash commands
- Attach multiple files when the selected model supports attachments
- Keep attachments and draft text after a failed send
- Reject local files larger than 10 MB before encoding
- Select the active agent, provider/model, and reasoning behavior

The model picker uses capabilities discovered from the connected server, so available inputs and controls can differ by provider and model.

## Permissions and questions

OpenCode can stop and ask for user input. The mobile UI surfaces these requests in the active session:

- Allow a permission once
- Always allow it
- Deny it
- Answer single- or multi-choice questions
- Enter a custom answer or reject a question

Pending interactions are recovered from both realtime events and list APIs, so a missed event does not permanently hide a blocking request.

## Workspace and source tools

- Discover projects from the server and remember the last session per project
- Search and read workspace files
- Inspect changed files and the current VCS branch
- Edit non-base64 text files with a re-read conflict check before applying a full-file patch
- Manage experimental worktrees when the server supports them

The conflict check rejects a save when the server-side file changed after it was opened.

## Remote terminal

The Terminal tab can list, create, reconnect to, and terminate project PTYs. Input is sent as newline-terminated commands through a ticket-authenticated WebSocket.

This surface is intentionally a line console. It strips common ANSI control sequences and does not emulate cursor movement or other full terminal behavior.

## Providers, models, and MCP

- Discover configured providers, models, and agents from OpenCode
- Add providers with OAuth or API/manual authentication
- Remove configured provider credentials
- Choose which configured models appear in Chat
- Add local or remote MCP servers
- Connect, disconnect, enable, disable, remove, and complete remote MCP OAuth when supported

Server authentication and AI-provider authentication are separate. The username and password in Connection protect the OpenCode server; provider credentials are managed through OpenCode provider APIs.

## Voice and conversation mode

- Dictate text into the draft field
- Play assistant replies with text-to-speech
- Run a foreground conversation loop: listen, submit, wait, speak, and listen again
- Prefer on-device recognition where available
- Configure speech locale, voice, rate, working sound, and response style

Conversation mode stops when a permission or question requires on-screen input. It is a foreground interaction and should not be treated as continuous background microphone capture.

## Notifications and diagnostics

- Receive local task-completion notifications on supported native builds
- Open Android notification and battery settings from the app
- Inspect OpenCode health and version
- See whether realtime SSE is connected or polling fallback is active
- Inspect MCP, LSP, and formatter counts when those endpoints are available
- Copy useful session/model context when a send or asynchronous session error occurs

Background notification checks are not supported on web or in Expo Go.

## Realtime behavior

The client combines two update paths:

1. A global SSE subscription filtered to the active project
2. A five-second polling fallback while SSE is unavailable, a session is busy, a prompt is submitting, or conversation mode is active

This makes temporary event-stream failures recoverable without requiring a manual reconnect.
