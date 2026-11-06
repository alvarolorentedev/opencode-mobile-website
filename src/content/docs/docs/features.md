---
title: OpenCode Mobile Features and Guides
description: Choose an OpenCode Mobile workflow for tasks, sessions, approvals, voice, files, terminal, providers, extensions, Cloud Link, sharing, or remote access.
lastUpdated: 2026-11-06
---

Start with the outcome you need. Each guide explains when the capability is useful, the exact mobile workflow, what you should see, and the important limitations.

<video controls playsInline preload="none" poster="/img/product/opencode-mobile-poster.avif" width="1280" height="720">
  <source src="/media/opencode-mobile-promo.mp4" type="video/mp4" />
  Your browser does not support embedded video.
</video>

## I want OpenCode to work on something

Use [Start and monitor tasks](/docs/guides/tasks/) to choose an agent and model, write a useful prompt, attach context, follow live progress, steer a running turn, stop a bad direction, and decide when the result is actually complete.

## I want to continue or reorganize existing work

Use [Chats and sessions](/docs/guides/sessions/) to search, switch, favorite, rename, delete, fork, or revert sessions without losing track of the active project. The library groups chats by server and project and shows running and recent sessions across the connection.

## OpenCode is waiting for me

Use [Approvals and changes](/docs/guides/approvals-and-changes/) to understand permission choices, answer product questions, review Turn/Uncommitted/Branch diffs, and avoid approving a risky action by habit.

## I cannot conveniently type

Use [Voice](/docs/guides/voice/) to dictate a reviewed draft or run the wake-word conversation loop. System speech and On-device voice are separate input modes, and playback can use a system or on-device voice.

## The session is getting long or expensive

Use [Session usage](/docs/guides/usage/) to interpret context utilization, input/output/reasoning tokens, cache activity, steps, and provider cost estimates.

## I need to inspect, move, or adjust a file

Use [Project files](/docs/guides/workspace-files/) to search the active project, read a file, preview media, download a file, move or rename entries on OpenCode 2, and save a small text patch. File editing is available on both contracts, with a conflict check before saving.

## I need to run a command

Use [Terminal](/docs/guides/terminal/) for tests, status checks, short logs, and project commands in an xterm-based project PTY. It supports common full-screen programs and a mobile keyboard accessory, but it is not a desktop terminal replacement.

## I need isolated parallel work

Use [Worktrees](/docs/guides/worktrees/) to create, select, and remove experimental OpenCode worktrees safely.

## A model is missing or a provider needs sign-in

Use [Providers and models](/docs/guides/providers-and-models/) to distinguish server authentication from AI-provider authentication, complete OAuth/manual setup, manage multiple provider accounts, choose model variants, and control which models appear in Chat.

## I want the app to choose the model

Use [Automatic model routing](/docs/guides/auto-model-routing/) to classify each prompt as Simple, Standard, or Complex and map each tier to a model, with an on-device or OpenCode server classifier.

## I need to change server configuration

Use [Manage extensions](/docs/guides/extensions/) to edit MCP servers, plugins, agents, skills, and slash commands for a project or the whole server, and to open plugin GUI panels in Chat.

## Tools or realtime updates are not behaving as expected

Use [MCP and diagnostics](/docs/guides/mcp-and-diagnostics/) to manage runtime MCP servers on OpenCode 1.x, read OpenCode 2 MCP state, and inspect health, realtime fallback, network behavior, local logs, and app errors.

## I want to leave while a task runs

Use [Notifications](/docs/guides/notifications/) to enable completion and needs-input alerts, review Android background behavior, and understand when iOS delivery may be delayed.

## I want to connect or switch servers

- [Add or switch connections](/docs/connections/) — manual setup, local QR pairing on OpenCode 2, custom headers, custom certificates, OIDC, saved profiles, and Cloud Link.
- [Remote access](/docs/remote-access/) — compare LAN, Tailscale, Cloudflare Tunnel, reverse proxy, SSH, and Cloud Link.
- [Cloud Link](/docs/cloud-link/) — managed remote access with a store subscription. See the [Cloud Link website](https://opencodecloud.link/) for connector downloads and pricing.

## I want to send content from another app

Use [Share from other apps](/docs/guides/share-from-other-apps/) to send text, links, images, and documents into a reviewed chat draft on Android. Nothing is submitted until you press Send.

## I want faster access from my home screen

Use [Quick actions and widgets](/docs/guides/quick-actions-and-widgets/) for launcher shortcuts and the Android Latest replies, Awaiting actions, and Plan progress widgets.

## I want to configure or customize the app

Use [Settings and customization](/docs/guides/settings/) for the searchable settings map: appearance, chat behavior, voice, notifications, language, connections, providers, extensions, approvals, diagnostics, updates, and support.

## I cannot connect to the server

Use [Troubleshooting](/docs/guides/troubleshooting/) to work through authentication, local QR, custom headers, certificates, OIDC, Cloud Link, HTML/404 responses, realtime updates, terminal WebSockets, and missing projects.
