---
title: What Is OpenCode Mobile?
description: Learn what the community-built OpenCode mobile client does, how it connects to your server, which screens it includes, and where its limits are.
lastUpdated: 2026-10-19
---

OpenCode Mobile is a community-built mobile client for an OpenCode server. It keeps active coding work reachable from a phone without trying to turn a small screen into a full desktop IDE.

The app is distributed for Android through Google Play and direct APK releases, and for iOS through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz). Start on the [Download page](/download/), then connect it to an OpenCode server that you control. OpenCode 2 is the current primary target and supports the quickest setup through `opencode service start` and `opencode pair`. The client still detects and supports OpenCode 1.x (V1) servers with manual connections; available actions depend on the contract and server capabilities.

## What you can do

- Start, monitor, steer, stop, and continue OpenCode chats
- Switch between saved servers, projects, and sessions without losing context
- Search, favorite, archive, restore, fork, revert, and share sessions when the server supports those actions
- Review transcript activity, Turn/Uncommitted/Branch diffs, todos, permissions, and questions
- Send prompts, attachments, shared content from other apps, and server-provided slash commands
- Choose agents, models, reasoning behavior, and approval defaults
- Use voice dictation or the foreground conversation loop
- Receive completion and needs-input notifications on supported native builds
- Use quick actions and three Android home-screen widgets
- Inspect server health, realtime status, MCP, LSP, formatter, and app-error diagnostics
- Work with project files, worktrees, MCP servers, and an xterm-based project terminal
- Connect through a LAN, Tailscale, Cloudflare Tunnel, reverse proxy, SSH forward, or optional Cloud Link

## Main areas

### Chat

Chat is the main operator surface. It includes the session picker, transcript history, current activity, diffs, todos, model and agent controls, attachments, permissions, questions, and message actions such as fork, revert, and undo revert.

OpenCode Mobile listens for global server events and uses polling as a fallback. A temporary event-stream interruption should not make an active task invisible.

The composer supports **Steer** and **Append** delivery on OpenCode 2 servers: choose whether a message sent during work should apply at the next step or wait for a later turn.

### Projects

Projects keep chats, files, and terminal sessions tied to the repository selected on the OpenCode server. Depending on server capabilities, you can:

- Select an opened project or add a server directory
- Reopen the remembered session for a project
- Search and read text files and save focused edits
- Inspect changed-file counts and the current VCS branch
- Create, reset, or remove experimental worktrees

### Terminal

Terminal connects to project PTYs through a short-lived server ticket and a project-scoped WebSocket. The xterm-based surface supports ANSI/VT cursor behavior, alternate-screen programs, 10,000 lines of scrollback, resize, reconnect, and a mobile keyboard accessory with Esc, Tab, modifiers, arrows, and paste.

It is still a mobile terminal, not a replacement for a desktop terminal workspace.

### Settings

Settings groups connection profiles, AI providers, Cloud Link (store installs), notifications, voice and responses, advanced editor/general/update/MCP/diagnostics controls, approvals, language, appearance, and support. See [Settings and customization](/docs/guides/settings/) for the complete map.

## Connection model

The app can use:

- A trusted local-network address
- A local QR code created by `opencode pair` on OpenCode 2
- A private Tailscale HTTPS address
- A Cloudflare Tunnel address
- A reverse-proxy address, including a path prefix such as `/api`
- A loopback address backed by a separate SSH forwarding app
- An optional Cloud Link machine

Saved connection profiles let you switch servers without retyping the URL and password. See [Add or switch connections](/docs/connections/) and [Remote access](/docs/remote-access/).

## Important boundaries

- OpenCode Mobile is not an official OpenCode product.
- It is not a generic consumer chatbot or a replacement for a full IDE.
- On native iOS and Android builds, non-secret connection details use app storage and server passwords use Keychain/Keystore-backed secure storage. Browser builds cannot persist passwords through native secure storage.
- Server features vary. Share and archive actions, auto-approve configuration, worktree reset, and some diagnostics are V1-only; saved approval rules are V2-only. File saving is supported on both contracts.
- Cloud Link is an optional paid remote-access service available only in store-installed iOS and Android builds. Direct APK, F-Droid/FOSS, and web builds do not offer it.
- iOS inbound sharing and iOS home-screen widgets are not yet available; Android supports both.
- Older removed API shapes are not compatibility targets. Use a current OpenCode server and the latest mobile release.

The simplest mental model is: OpenCode runs the work; OpenCode Mobile is a focused control surface for it.

## Recommended learning path

1. Follow [Set Up OpenCode Mobile](/docs/getting-started/) to install, connect, and run a first task.
2. Open [Features and guides](/docs/features/) and choose the outcome that matches your situation.
3. Use the [User manual](/docs/user-manual/) for orientation, then open the focused guide from the sidebar.
4. Read [Remote access](/docs/remote-access/) before connecting outside your local network.
