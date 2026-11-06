---
title: OpenCode Mobile User Manual
description: Navigate OpenCode Mobile chats, projects, approvals, voice, usage, terminal, providers, extensions, settings, notifications, sharing, and widgets.
lastUpdated: 2026-11-06
---

This manual is the navigation hub for operating OpenCode Mobile after installation. It deliberately avoids repeating every control documented in the focused guides. If the app is not connected yet, start with [Set Up OpenCode Mobile](/docs/getting-started/).

<video controls playsInline preload="none" poster="/img/product/opencode-mobile-poster.avif" width="1280" height="720">
  <source src="/media/opencode-mobile-promo.mp4" type="video/mp4" />
  Your browser does not support embedded video.
</video>

## Five-minute orientation

| Area | What it is for |
| --- | --- |
| **Chat** | Start and follow tasks, review changes, answer approvals, use voice, choose models, and check usage |
| **Projects** | Choose a project or worktree, browse and edit files, preview media, and manage entries |
| **Terminal** | Open and use project PTYs |
| **Settings** | Search and manage appearance, chat, voice, notifications, language, connections, providers, extensions, approvals, diagnostics, and updates |

The chat library opens from the title at the top of **Chat**. A change chip above the composer opens the changes review overlay; the old Session and Files Changed tabs are gone.

## Before sending work

Confirm three pieces of context:

1. **Connection:** Settings shows the expected OpenCode server.
2. **Project:** Projects shows the repository that should receive the task.
3. **Session:** Chat shows the intended work thread.

This prevents the most expensive mobile mistake: sending a valid instruction to the wrong project or session.

## Everyday work

- [Start and monitor tasks](/docs/guides/tasks/) — choose a model, send a prompt, attach files, use commands or mentions, steer a running turn, and stop a bad direction.
- [Chats and sessions](/docs/guides/sessions/) — search, favorite, rename, delete, fork, revert, and switch sessions.
- [Approvals and changes](/docs/guides/approvals-and-changes/) — answer permissions and questions and review diffs.
- [Voice](/docs/guides/voice/) — dictate one prompt or use the wake-word conversation loop.
- [Session usage](/docs/guides/usage/) — interpret context pressure, tokens, steps, and cost.
- [Notifications](/docs/guides/notifications/) — completion and needs-input alerts.

## Projects and tools

- [Projects](/docs/guides/projects/) — select, add, archive, and switch projects; understand server-archived projects and worktrees.
- [Project files](/docs/guides/workspace-files/) — search, read, preview, download, move, and save files.
- [Terminal](/docs/guides/terminal/) — use the xterm-based project terminal and keyboard accessory.
- [Worktrees](/docs/guides/worktrees/) — create, select, and remove isolated working directories.

## Device features

- [Share from other apps](/docs/guides/share-from-other-apps/) — send text, links, and files into a chat on Android.
- [Quick actions and widgets](/docs/guides/quick-actions-and-widgets/) — reach recent chats from the launcher or Android home screen.
- [Deep links](/docs/guides/deep-links/) — open a specific session or pairing flow from a link.

## Configure the experience

- [Settings and customization](/docs/guides/settings/) — the complete Settings map.
- [Providers and models](/docs/guides/providers-and-models/) — connect AI providers, choose variants, and manage visible models.
- [Automatic model routing](/docs/guides/auto-model-routing/) — classify prompts and map each tier to a model.
- [Extensions](/docs/guides/extensions/) — manage MCPs, plugins, agents, skills, commands, and plugin panels.
- [MCP and diagnostics](/docs/guides/mcp-and-diagnostics/) — manage runtime MCP state and inspect server health.
- [Add or switch connections](/docs/connections/) — manage multiple servers, custom headers, certificates, and OIDC.
- [Cloud Link](/docs/cloud-link/) — optional managed remote access.

## Remote access and connection failures

Choose a route from the [remote-access overview](/docs/remote-access/). Use the dedicated [Tailscale](/docs/guides/tailscale/), [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), [local network](/docs/guides/local-network/), [reverse proxy](/docs/guides/reverse-proxy/), or [SSH forwarding](/docs/guides/ssh-forward/) guide when applicable.

Read the [remote-access security guide](/docs/guides/remote-access-security/) before exposing a server. If the app returns HTML, 404, authentication errors, certificate errors, missing projects, stale realtime state, or terminal failures, work through the [troubleshooting checklist](/docs/guides/troubleshooting/).

## Product and support information

- [Download and install](/docs/opencode-android-app/)
- [OpenCode Mobile vs OpenCode Web](/docs/guides/mobile-vs-web/)
- [Releases and compatibility](/docs/changelog/)
- [Frequently asked questions](/docs/faq/)
- [About the project and maintainer](/about/)
- [Security reporting](/security/)
