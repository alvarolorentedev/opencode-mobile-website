---
title: What Is OpenCode Mobile?
description: Learn what the community-built OpenCode mobile client does, how it connects to Desktop, TUI, or a server, and where its limits are.
lastUpdated: 2026-11-24
---

OpenCode Mobile is a community-built mobile client for an OpenCode server. It keeps active coding work reachable from a phone without trying to turn a small screen into a full desktop IDE.

The app is distributed for Android through Google Play and direct APK releases, and for iOS through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz). Start on the [Download page](/download/), then connect it to an OpenCode server that you control. OpenCode 2 is the current primary target and supports the quickest setup through Desktop Pairing, `opencode pair`, or TUI `/pair`. The client still detects and supports OpenCode 1.x (V1) servers with manual connections for the core surface.

## What you can do

- Start, monitor, steer, stop, and continue OpenCode chats
- Continue sessions that were started in OpenCode Desktop or the TUI when both clients use the same server
- Switch between saved servers, server projects, worktrees, and sessions without losing context
- Favorite, rename, delete, fork, and revert sessions; jump back to the latest activity
- Review transcript activity, changes, diffs, todos, permissions, and questions
- Send prompts, attachments, shared content from other apps, slash commands, mentions, and shell commands
- Choose agents, models, variants, reasoning behavior, and per-agent model memory
- Let automatic model routing choose a model for each prompt
- Use voice dictation, on-device wake-word conversation mode, and spoken replies
- Receive completion and needs-input notifications on supported native builds
- Use quick actions and three Android home-screen widgets
- Inspect server health, realtime status, network behavior, MCP state, and app-error diagnostics
- Work with project files, media previews, file actions, worktrees, MCP servers, extensions, and an xterm-based project terminal
- Manage MCPs, plugins, agents, skills, and slash commands on OpenCode 2
- Open sandboxed plugin GUI panels inside the app
- Connect through a LAN, Tailscale, Cloudflare Tunnel, reverse proxy, SSH forward, OIDC, or optional Cloud Link

## Main areas

### Chat

Chat is the main operator surface. It includes the chat library, transcript, current activity, changes review, todos, model and agent controls, attachments, permissions, questions, and message actions such as fork, revert, and undo revert.

The chat library groups sessions by server and project and shows project paths. When several servers are connected, it can filter by server. A change chip above the composer opens the review overlay; there are no separate Session and Files Changed tabs.

The composer supports server commands, `@` mentions, and `!` shell mode on OpenCode 2, plus the built-in `/compact` and `/btw` commands. On OpenCode 2, **Steer** and **Append** control whether a message sent during work applies at the next step or waits for a later turn.

OpenCode Mobile listens for global server events and uses polling as a fallback. A temporary event-stream interruption should not make an active task invisible. A prompt attempted while offline is queued and sent once after reconnect; an uncertain timeout is marked and never replayed automatically.

### Projects

Projects keep chats, files, and terminal sessions tied to the repository selected on the OpenCode server. The picker lists the server's projects in server order; it does not keep a separate local “opened” list. Depending on server capabilities, you can:

- Select a server project or add a directory through a folder browser
- Hide a project on this device, or restore a server-archived project on OpenCode 2
- Search and read text files, preview media, download files, and save focused edits
- Copy, move, rename, or delete files on OpenCode 2
- Inspect changed-file counts and the current VCS branch
- Create, select, and remove experimental worktrees

Projects, files, and terminal activity follow the focused server. Sessions from other connected servers remain available in the chat library.

### Terminal

Terminal connects to project PTYs through a short-lived server ticket and a project-scoped WebSocket. The xterm-based surface supports ANSI/VT cursor behavior, alternate-screen programs, 10,000 lines of scrollback, resize, reconnect, and a mobile keyboard accessory with Esc, Tab, modifiers, arrows, and paste.

It is still a mobile terminal, not a replacement for a desktop terminal workspace.

### Settings

Settings is searchable and grouped into **App preferences** (Appearance, Chat & responses, Voice & audio, Notifications, Language, About & support), **Connections** (Connection, Cloud Link), and the **Selected server** (AI & providers, Extensions, Approvals, Diagnostics).

See [Settings and customization](/docs/guides/settings/) for the complete map.

## Connection model

The app needs a reachable OpenCode API. Reaching it and authenticating to it are separate decisions.

**Network routes:**

- A trusted local-network address
- A private Tailscale address, with optional HTTPS through Tailscale Serve
- A Cloudflare Tunnel address
- A reverse-proxy address
- A loopback address backed by a separate SSH forwarding app
- An optional Cloud Link machine
- OpenTunnel through `opencode pair --remote`, where supported

**Authentication methods:**

- Native OpenCode pairing from Desktop, TUI `/pair`, or `opencode pair`
- A manual URL and password
- Custom headers for a gateway
- OIDC through a manual connection
- Cloud Link entitlement

Native pairing does not make an unreachable server reachable. A manual connection can use any route. Saved connection profiles let you keep several servers and switch servers without retyping the URL and password. See [Add or switch connections](/docs/connections/) and [Remote access](/docs/remote-access/).

## Important boundaries

- OpenCode Mobile is not an official OpenCode product.
- It is not a generic consumer chatbot or a replacement for a full IDE.
- On native iOS and Android builds, non-secret connection details use app storage and credentials use Keychain/Keystore-backed secure storage. Browser builds cannot persist credentials through native secure storage.
- OpenCode 1.x is supported for the core V1∩V2 surface. Archive/restore/share, title summarization, worktree reset, LSP/formatter diagnostics, and the composer auto-approve/saved-rules surfaces are not available.
- Extensions management, plugin GUI panels, media preview, file mutations, composer mentions/shell mode, and server-classifier routing require OpenCode 2.
- Cloud Link is an optional paid remote-access service available only in store-installed iOS and Android builds. Direct APK and web builds do not offer it.
- OpenCode Desktop's server inventory is not exposed to other clients. Add each remote server to mobile separately. See [Use multiple OpenCode servers](/docs/guides/multiple-servers/).
- Android release artifacts are arm64-v8a only; 32-bit-only devices are unsupported.
- iOS inbound sharing and iOS home-screen widgets are not yet available; Android supports both.
- Older removed API shapes are not compatibility targets. Use a current OpenCode server and the latest mobile release.

The simplest mental model is: OpenCode runs the work; OpenCode Mobile is a focused control surface for it. Desktop, the TUI, and mobile are frontends to the same server when they point at the same server.

## Recommended learning path

1. Follow [Set Up OpenCode Mobile](/docs/getting-started/) to connect from your existing setup and run a first task.
2. If you use Desktop or the TUI, read [Connect from Desktop or TUI](/docs/guides/desktop-and-tui/).
3. If you use more than one server, read [Use multiple OpenCode servers](/docs/guides/multiple-servers/).
4. Open [Features and guides](/docs/features/) and choose the outcome that matches your situation.
5. Use the [User manual](/docs/user-manual/) for orientation, then open the focused guide from the sidebar.
6. Read [Remote access](/docs/remote-access/) before connecting outside your local network.
