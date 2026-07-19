---
id: introduction
title: Introduction
slug: /introduction
---

# Introduction

OpenCode Mobile is a community-built mobile client for an OpenCode server. It keeps active coding work reachable from a phone without trying to turn a small screen into a full desktop IDE.

The current public build is distributed for Android. It targets the current OpenCode v2 API and is designed for an OpenCode server that you control.

## What you can do

- Start, monitor, stop, and continue OpenCode sessions
- Switch projects and sessions without losing context
- Review transcript activity, file changes, todos, permissions, and questions
- Send prompts, attachments, and server-provided slash commands
- Choose agents, models, reasoning behavior, and approval defaults
- Use voice dictation or the hands-free conversation loop
- Receive task-completion notifications on supported Android builds
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
- Create, rename, archive, restore, share, or delete sessions
- Search, read, and edit text files with conflict checks
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

See [Remote Access](./remote-access.md) for complete examples.

## Important boundaries

- OpenCode Mobile is not an official OpenCode product.
- It is not a generic consumer chatbot or a replacement for a full IDE.
- Server URL, username, and password are persisted locally for convenience using app storage; this is not equivalent to an operating-system secure credential store.
- Server features vary. Experimental worktrees, terminal PTYs, MCP management, diagnostics, and some lifecycle actions require compatible OpenCode endpoints.
- Older removed API shapes are not compatibility targets. Use a current OpenCode server and the latest mobile release.

The simplest mental model is: OpenCode runs the work; OpenCode Mobile is a focused control surface for it.

## Recommended learning path

1. Follow [Getting Started](./getting-started.md) to install, connect, and run a first task.
2. Use the [User Manual](./user-manual.md) for screen-by-screen workflows and safety notes.
3. Check [Features](./features.md) for the complete capability matrix and server dependencies.
4. Use [Remote Access](./remote-access.md) when connecting outside your local network.
