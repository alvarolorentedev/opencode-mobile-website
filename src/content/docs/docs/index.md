---
title: OpenCode Mobile Documentation
description: Set up OpenCode Mobile, connect your OpenCode server, and use chats, projects, terminal, voice, notifications, sharing, and Cloud Link on Android or iOS.
lastUpdated: 2026-10-19
---

OpenCode Mobile is a community-built Android and iOS client for an [OpenCode](https://opencode.ai/) server that you run yourself. It keeps agent work, approvals, project files, and terminal commands reachable from your phone.

OpenCode Mobile is **not** an official OpenCode product, a hosted AI service, or a replacement for the OpenCode server.

## Choose your starting point

| If you want to... | Start here |
| --- | --- |
| Understand what the app does | [What is OpenCode Mobile?](/docs/introduction/) |
| Download the app | [Download and install](/docs/opencode-android-app/) |
| Connect a server and finish a first task | [Set up OpenCode Mobile](/docs/getting-started/) |
| Manage servers, QR pairing, or Cloud Link | [Add or switch connections](/docs/connections/) |
| Learn the controls after setup | [User manual](/docs/user-manual/) |
| Fix a connection or feature problem | [Troubleshooting](/docs/guides/troubleshooting/) |

## The shortest safe path

1. **[Install the app](/docs/opencode-android-app/)** from Google Play, the direct APK, or TestFlight.
2. **[Start OpenCode with authentication](/docs/getting-started/#2-start-the-server)** on the machine that owns your project.
3. **[Connect the app](/docs/getting-started/#4-connect-the-app)** with a URL, local QR code, or Cloud Link.
4. **[Select a project](/docs/getting-started/#5-select-a-project)** and send a small, verifiable task.

If you only need the app on the same trusted network, the [local network guide](/docs/guides/local-network/) is the shortest route. For access outside your network, compare [Tailscale, Cloudflare Tunnel, a reverse proxy, SSH, and Cloud Link](/docs/remote-access/).

## Do a specific task

- **[Start and monitor a task](/docs/guides/tasks/)** — send work, follow progress, steer a running turn, and stop a bad direction.
- **[Manage chats and sessions](/docs/guides/sessions/)** — search, favorite, archive, restore, fork, or share work.
- **[Review approvals and changes](/docs/guides/approvals-and-changes/)** — answer permissions and review Turn, Uncommitted, or Branch diffs.
- **[Use voice](/docs/guides/voice/)** — dictate a prompt or run a hands-free conversation.
- **[Understand session usage](/docs/guides/usage/)** — read context pressure, tokens, steps, and cost estimates.
- **[Work with project files](/docs/guides/workspace-files/)** — search, read, and save focused edits.
- **[Use the terminal](/docs/guides/terminal/)** — open a project PTY in the xterm-based terminal.
- **[Manage worktrees](/docs/guides/worktrees/)** — isolate parallel work.
- **[Configure providers and models](/docs/guides/providers-and-models/)** — connect AI providers and choose models.
- **[Manage MCP and diagnostics](/docs/guides/mcp-and-diagnostics/)** — inspect tools, realtime updates, and server health.
- **[Receive task notifications](/docs/guides/notifications/)** — completion and needs-input alerts.
- **[Share from another app](/docs/guides/share-from-other-apps/)** — send text, links, and files into a chat on Android.
- **[Use quick actions and widgets](/docs/guides/quick-actions-and-widgets/)** — reach recent chats from the launcher or Android home screen.

## Connect your way

| Method | Best for | Guide |
| --- | --- | --- |
| Manual URL | Any reachable server, including a VPN or tunnel | [Connections](/docs/connections/) |
| Local QR | Phone and computer on the same network (OpenCode 2) | [Local network](/docs/guides/local-network/) |
| Tailscale | Private access between your own devices | [Tailscale](/docs/guides/tailscale/) |
| Cloudflare Tunnel | A public HTTPS address with your own tunnel | [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/) |
| Reverse proxy | Existing HTTPS infrastructure or an API prefix | [Reverse proxy](/docs/guides/reverse-proxy/) |
| SSH forwarding | Advanced users with a mobile SSH client | [SSH forwarding](/docs/guides/ssh-forward/) |
| Cloud Link | Managed remote access with a store subscription | [Cloud Link](/docs/cloud-link/) |

Read the [remote access security model](/docs/guides/remote-access-security/) before exposing a server beyond a trusted network.

## How the pieces fit

| Piece | What it is | Where it runs |
| --- | --- | --- |
| OpenCode Mobile | The mobile client you install | Android or iOS |
| OpenCode server | The coding agent that owns your project | Your computer or server |
| Connection route | LAN, VPN, tunnel, proxy, SSH forward, or Cloud Link | Between the phone and server |

The app is a remote control. Your repository, provider credentials, build tools, and complete development environment stay on the machine that runs OpenCode.

## Configure the app

Use [Settings and customization](/docs/guides/settings/) for connection profiles, AI providers, model visibility, notifications, voice, appearance, language, approvals, MCP, diagnostics, and update checks.

## Fix a problem

- **[Troubleshooting](/docs/guides/troubleshooting/)** — work from the server outward with a symptom-based checklist.
- **[FAQ](/docs/faq/)** — short answers about platforms, connections, file editing, sharing, widgets, and privacy.
- **[Releases and compatibility](/docs/changelog/)** — current release, OpenCode 1.x/2.x support, and known limits.

## For AI assistants

Use [Documentation for AI assistants](/docs/for-ai-agents/) for canonical facts, machine-readable endpoints, and citation guidance. The site also publishes [`llms.txt`](https://getopencode.app/llms.txt), [`llms-full.txt`](https://getopencode.app/llms-full.txt), and raw Markdown for every page.
