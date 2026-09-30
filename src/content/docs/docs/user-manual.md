---
title: OpenCode Mobile User Manual
description: Navigate OpenCode Mobile tasks, sessions, approvals, voice, usage, files, terminal access, providers, diagnostics, notifications, and remote access.
---
This manual is the navigation hub for operating OpenCode Mobile after installation. It deliberately avoids repeating every control documented in the focused guides. If the app is not connected yet, start with [Set Up OpenCode Mobile](/docs/getting-started/).

<video controls playsInline preload="none" poster="/img/product/walkthrough-poster.avif" width="1280" height="720">
  <source src="/media/opencode-mobile-promo.mp4" type="video/mp4" />
  Your browser does not support embedded video.
</video>

## Before sending work

Confirm three pieces of context:

1. **Connection:** Settings shows the expected OpenCode server.
2. **Project:** Workspace shows the repository that should receive the task.
3. **Session:** Chat shows the intended work thread.

This prevents the most expensive mobile mistake: sending a valid instruction to the wrong project or session.

## Chat and task control

Use [Start and Monitor OpenCode Tasks](/docs/guides/tasks/) to choose an agent and model, write a useful instruction, attach context, follow progress, stop a bad direction, and decide whether the result is complete.

Use [Manage OpenCode Sessions](/docs/guides/sessions/) to switch, rename, delete, fork, or revert work threads. Archive, restore, and share actions depend on the server contract. Keep one outcome per session so context usage and review remain understandable.

## Permissions, questions, and changes

OpenCode may need permission to use a tool or a product decision before continuing. [Review Permissions and Code Changes](/docs/guides/approvals-and-changes/) explains temporary and persistent approval choices, question responses, changed-file inspection, and safe completion checks.

Treat permissions as security decisions. Read the requested action, active project, command, and path before approving.

## Voice and notifications

[Use Voice with OpenCode](/docs/guides/voice/) for a reviewed dictated prompt or the foreground conversation loop. Voice input does not remove the need to inspect high-impact instructions on screen.

[OpenCode Task Notifications](/docs/guides/notifications/) covers native completion alerts, Android battery restrictions, app lifecycle limits, and the difference between a notification and authoritative server state.

## Usage, models, and providers

[Track Token and Session Usage](/docs/guides/usage/) explains context utilization, input and output tokens, reasoning tokens, caching, steps, and estimated cost.

[Configure Providers and Models](/docs/guides/providers-and-models/) distinguishes OpenCode server credentials from AI-provider credentials and explains authentication, visible-model selection, and capability discovery.

## Workspace files and worktrees

[Edit Workspace Files](/docs/guides/workspace-files/) is appropriate for searching, reading, and saving a small text correction with a conflict check. Use Chat or a desktop editor for multi-file work.

[Manage OpenCode Worktrees](/docs/guides/worktrees/) covers the experimental worktree controls and the consequences of reset and removal operations.

## Mobile terminal

[Use the OpenCode Terminal from Mobile](/docs/guides/terminal/) for focused, non-interactive commands such as tests, Git status, and short logs. It is a line-oriented project console, not a complete VT terminal emulator.

## MCP and diagnostics

[Troubleshoot MCP and Diagnostics](/docs/guides/mcp-and-diagnostics/) explains server health, realtime fallback, MCP state, LSP state, and formatter availability. Optional endpoints vary by OpenCode version and deployment.

## Remote access and connection failures

Choose a route from the [remote-access overview](/docs/remote-access/). Use the dedicated [Tailscale](/docs/guides/tailscale/) or [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/) setup when applicable, and read the [remote-access security guide](/docs/guides/remote-access-security/) before exposing a server.

If the app returns HTML, 404, authentication errors, missing workspaces, stale realtime state, or terminal failures, work through the [connection troubleshooting checklist](/docs/guides/troubleshooting/).

## Product and support information

- [OpenCode Mobile app setup and download](/docs/opencode-android-app/)
- [OpenCode Mobile vs OpenCode Web](/docs/guides/mobile-vs-web/)
- [Releases and compatibility](/docs/changelog/)
- [Frequently asked questions](/docs/faq/)
- [About the project and maintainer](/about/)
- [Security reporting](/security/)
