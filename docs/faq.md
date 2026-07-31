---
id: faq
title: FAQ
description: Answers about OpenCode Mobile Android support, installation, server compatibility, remote access, security, providers, privacy, support, and project ownership.
slug: /faq
---

# FAQ

## Is OpenCode Mobile an official OpenCode product?

No. It is an open-source, community-built companion for OpenCode.

## Which devices are supported?

The current public beta is available for Android through [Google Play testing](https://play.google.com/apps/testing/app.getopencode) and as a [direct APK](/download). The Expo/React Native project contains iOS support, but the website does not currently offer an iOS release.

## Is it a general AI chatbot or mobile IDE?

No. It is a workspace-aware control surface for an OpenCode server. It includes focused source and terminal tools, but it is not a replacement for a full desktop IDE or terminal emulator.

## Which OpenCode version should I use?

Use a current release. The client targets the current OpenCode v2 SDK contract and does not maintain compatibility with older removed endpoint shapes.

## Should I run `opencode web` or `opencode serve`?

Use `opencode serve` when the mobile client is the main consumer. Use `opencode web` when you also want the browser UI. If the browser UI occupies the root URL, the API may be mounted at a path such as `/api`; enter that complete API base URL in the app.

## Which connection methods work?

Supported transports include:

- Trusted local LAN
- Tailscale Serve
- Cloudflare Tunnel
- HTTPS reverse proxies, including path-prefixed APIs
- A loopback port created by a separate SSH forwarding client

See [Remote Access](./remote-access.md) for commands and security guidance.

## Was the Tailscale connection problem fixed?

Yes. [Issue #1](https://github.com/alvarolorentedev/opencode-mobile/issues/1) was closed after the maintainer validated a current build with Tailscale and Cloudflare. The connection code now preserves configured API prefixes and request bodies, validates server URLs, and reports useful hints when an address serves a web UI instead of the OpenCode API.

Upgrade to the latest mobile release before troubleshooting an old build.

## Should I bind OpenCode to `0.0.0.0`?

Only for direct access on a trusted LAN. Use authentication, restrict the port to the private firewall profile, and never expose it through router port forwarding. For remote access, prefer loopback plus Tailscale, Cloudflare Tunnel, a reverse proxy, or SSH forwarding.

## Do I need authentication with Tailscale or Cloudflare Tunnel?

Keep OpenCode authentication enabled. A tailnet or HTTPS tunnel controls transport and reachability, but OpenCode Mobile still expects the server credentials when the server is protected.

## Can the server URL contain `/api` or another path?

Yes. The client preserves a configured path prefix for generated SDK requests, manual HTTP calls, and terminal WebSockets. Use the prefix only when the proxy or web deployment actually mounts the OpenCode API there.

## Where are connection credentials stored?

Server URL, username, and password are persisted locally with AsyncStorage so the app can reconnect. Pending notification tracking may also retain the connection information needed for a background completion check. This is not equivalent to an operating-system secure credential store.

## What happens if realtime events disconnect?

The app reconnects the global SSE stream with backoff and uses polling while the stream is unavailable or work is active. Core session visibility should continue without a manual reconnect.

## Is the Terminal tab a full terminal emulator?

No. It is a compact line console backed by OpenCode PTYs. It sends newline-terminated input, strips common ANSI control sequences, and does not emulate VT cursor behavior.

## Can I edit files from the app?

Current compatible servers can expose text-file editing through the Workspace tools. The app re-reads the file before save and rejects the update if the server copy changed. Binary/base64 files are read-only.

## Do all servers support worktrees, terminal, MCP, and diagnostics?

No. These features depend on compatible server endpoints. Worktree operations use experimental APIs and may change more often than core session behavior.

## Can I use voice mode in the background?

Conversation mode is designed as a foreground listen → submit → wait → speak loop. It is not continuous background microphone capture, and it pauses for permissions or questions that require on-screen input.

## Where can I report a problem?

Use the [GitHub issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues). Include the mobile release, OpenCode version, connection method, API base URL shape without credentials, and the visible error message.

## Where is the screen-by-screen documentation?

The [User Manual](./user-manual.md) covers the first task, chat and session controls, permissions, usage, voice, workspace files, worktrees, terminal, providers, MCP, diagnostics, notifications, and recovery steps.
