---
title: What Is OpenCode Mobile?
description: Learn what the community-built OpenCode mobile app does, how it connects to your server, which workflows it supports, and where its limits are.
---
OpenCode Mobile is a community-built mobile client for an OpenCode server. It keeps active coding work reachable from a phone without trying to turn a small screen into a full desktop IDE.

The app is distributed for Android through Google Play testing and as a direct APK, and for iOS through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz). Start on the [Download page](/download), then connect it to an OpenCode server that you control. The client detects and supports the OpenCode 1.x (V1) and 2.x (V2) API contracts; available actions depend on the contract and server capabilities.

## What you can do

- Start, monitor, stop, and continue OpenCode sessions
- Switch projects and sessions without losing context
- Review transcript activity, file changes, todos, permissions, and questions
- Send prompts, attachments, and server-provided slash commands
- Choose agents, models, reasoning behavior, and approval defaults
- Use voice dictation or the hands-free conversation loop
- Receive task-completion notifications on supported native builds
- Inspect server health, realtime status, MCP, LSP, and formatter diagnostics
- Work with project files, worktrees, MCP servers, and a compact remote terminal when the connected server supports them

## Main areas

### Chat

Chat is the main operator surface. It includes session selection, transcript history, current activity, diffs, todos, model and agent controls, attachments, permissions, questions, and message-level actions such as fork, revert, and undo revert.

OpenCode Mobile listens for global server events and also uses polling as a fallback. A temporary event-stream interruption should not make an active task invisible.

### Terminal

The Terminal tab connects to project PTYs using a short-lived server ticket and a project-scoped WebSocket. It is a compact, line-oriented console for focused commands—not a full VT terminal emulator.

The terminal is available only when the connected OpenCode server exposes the required PTY endpoints.

### Workspace

Workspace keeps project and session context together. Depending on server capabilities, you can:

- Select a project and reopen its remembered session
- Create, rename, or delete sessions; archive, restore, and share actions depend on the server contract
- Search and read text files; edit them with conflict checks when the server supports saving
- Inspect changed-file counts and the current VCS branch
- Create and manage experimental worktrees

Experimental worktree operations depend on the connected OpenCode server and may be less stable than the core session API.

### Settings

Settings covers:

- Server URL and optional HTTP Basic authentication
- Provider OAuth or API/manual authentication
- Enabled models and chat defaults
- MCP server configuration and OAuth
- Notifications, voice, response style, and working sound
- Health, realtime, MCP, LSP, and formatter diagnostics

## Connection model

The app accepts a base server URL plus an optional username and password. The URL may be:

- A trusted local-network address
- A private Tailscale HTTPS address
- A Cloudflare Tunnel address
- A reverse-proxy address, including a path prefix such as `/api`
- A loopback address backed by a separate SSH port-forwarding app

See [Remote Access](/docs/remote-access/) for complete examples.

## Important boundaries

- OpenCode Mobile is not an official OpenCode product.
- It is not a generic consumer chatbot or a replacement for a full IDE.
- On native iOS and Android builds, non-secret connection details use app storage and server passwords use `expo-secure-store`. Browser builds cannot persist passwords through native secure storage.
- Server features vary. Experimental worktrees, terminal PTYs, MCP management, diagnostics, and some lifecycle actions require compatible OpenCode endpoints.
- Older removed API shapes are not compatibility targets. Use a current OpenCode server and the latest mobile release.

The simplest mental model is: OpenCode runs the work; OpenCode Mobile is a focused control surface for it.

## Recommended learning path

1. Follow [Getting Started](/docs/getting-started/) to install, connect, and run a first task.
2. Open [What Do You Want to Do?](/docs/features/) and choose the outcome that matches your situation.
3. Use the [User Manual](/docs/user-manual/) for orientation, then open the focused capability guide from the **Use the app** sidebar.
4. Use [Remote Access](/docs/remote-access/) when connecting outside your local network.
