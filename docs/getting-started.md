---
id: getting-started
title: Set Up OpenCode Mobile on Android
description: Install OpenCode Mobile on Android, start and secure an OpenCode server, connect the app, select a workspace, and complete a first task.
sidebar_label: Getting Started
slug: /getting-started
---

# Set up OpenCode Mobile on Android

This guide covers the shortest safe path from an OpenCode server to your first completed mobile task.

## Install OpenCode Mobile

Use the [Download page](/download) to choose an installation method:

- **Google Play (recommended):** join the testing program, then install and receive updates through Google Play.
- **Direct GitHub APK:** download and install the latest release manually. Android may ask you to allow installation from your browser or file manager.

Both methods install the latest Android release. The rest of this guide explains how to connect it to your OpenCode server.

## 1. Install or update OpenCode

Use an official install path:

```bash
curl -fsSL https://opencode.ai/install | bash
```

Or install with npm:

```bash
npm install -g opencode-ai
```

OpenCode Mobile targets the current v2 API. Update the server before debugging an older or removed endpoint shape.

## 2. Start the server

For a dedicated mobile client, use `opencode serve`:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'

opencode serve --hostname 127.0.0.1 --port 4096
```

Use `opencode web` when you also want the built-in browser UI:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'

opencode web --hostname 127.0.0.1 --port 4096
```

Keep a stable port so the mobile app, tunnel, and reverse proxy do not need repeated updates.

## 3. Choose a connection method

| Method | Best for | Mobile server URL |
| --- | --- | --- |
| Trusted LAN | Phone and server on the same private network | `http://192.168.1.20:4096` |
| Tailscale Serve | Private access across networks | `https://machine-name.tailnet-name.ts.net` |
| Cloudflare Tunnel | Public HTTPS endpoint without router port forwarding | `https://opencode.example.com` |
| Reverse proxy | Existing HTTPS infrastructure or a path-prefixed deployment | `https://dev.example.com/api` |
| SSH local forward | Advanced users with a mobile SSH client | `http://127.0.0.1:4096` |

Follow [Remote Access](./remote-access.md) for exact commands and security tradeoffs.

For a focused setup, use the dedicated [Tailscale guide](./guides/tailscale.md) or [Cloudflare Tunnel guide](./guides/cloudflare-tunnel.md). Compare the native client with the browser interface in [OpenCode Mobile vs OpenCode Web](./guides/mobile-vs-web.md).

## 4. Verify the API endpoint

Test the same base URL you plan to enter in the app:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/global/health
```

For a path-prefixed proxy, include the prefix:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/api/global/health
```

A healthy response includes `healthy: true` and may include the OpenCode version.

Do not assume that a browser-rendered page is the API base. If the root displays a web UI and the app reports a 404 or a non-API response, enter the API base URL instead—commonly the same address with `/api`.

## 5. Connect the app

1. Open **Settings**.
2. Expand **Connection**.
3. Enter the complete server URL, including `https://` and any required path prefix.
4. Enter the OpenCode server username and password.
5. Tap **Reconnect**.
6. Confirm the card says **Connected** and review its connection message.

If a password is set and Username is blank, the client uses `opencode` as the Basic-auth username. Entering the explicit server username is clearer and easier to troubleshoot.

## 6. Select a workspace

1. Open **Workspace**.
2. Refresh the project catalog if needed.
3. Select the project that should scope sessions, files, and terminal activity.
4. Open an existing session or create a new one.
5. Return to **Chat** and send a specific task.

OpenCode Mobile remembers the selected project and last session for the next launch.

## 7. Check optional capabilities

After connecting, use Settings and Workspace to confirm which features the server exposes:

- Provider and model discovery
- Global realtime events
- MCP, LSP, formatter, and health diagnostics
- File status and VCS information
- Experimental worktrees
- PTY terminal support

Missing optional endpoints should not prevent core session use.

## 8. Complete your first task

1. Open **Chat** and confirm the expected session title appears at the top.
2. Select the agent and model above the composer.
3. Send a small, verifiable request such as: `Inspect this workspace and summarize its purpose. Do not change files.`
4. Watch the status in **Session** while OpenCode works.
5. Respond if a permission or question card appears.
6. Open **Files Changed** and confirm that the read-only task produced no edits.

For your first implementation task, ask for one contained change and its related test. Review both the assistant response and **Files Changed** before accepting the result.

## 9. Learn the controls

Continue with the [User Manual](./user-manual.md) for:

- Chat controls, attachments, commands, permissions, and session history
- Voice dictation and hands-free conversation mode
- Usage and context-window visibility
- Workspace files, session lifecycle, and worktrees
- Remote terminal behavior and limitations
- Providers, models, MCP, diagnostics, and notifications

## Security notes

- Never expose an unauthenticated OpenCode server to the public internet.
- Prefer Tailscale, Cloudflare Tunnel, or an authenticated HTTPS reverse proxy over router port forwarding.
- Use `0.0.0.0` only for a trusted LAN and restrict the port with the host firewall.
- Connection credentials are persisted in app storage for convenience; treat the device as containing access to your OpenCode server.
- Rotate credentials if a tunnel URL, device, or password is compromised.

## If connection still fails

- Confirm the phone can reach the exact `/global/health` URL.
- Confirm the phone is connected to the same Tailscale tailnet when using Tailscale.
- Check the username and password against the server environment variables.
- If the address returns HTML, 404, or a JSON parse error, use the actual API base path.
- Upgrade to the latest mobile release. The Tailscale and path-prefix problem tracked in [issue #1](https://github.com/alvarolorentedev/opencode-mobile/issues/1) was fixed and validated with Tailscale and Cloudflare before the issue was closed.
- Continue with the [connection troubleshooting checklist](./guides/troubleshooting.md) before filing a bug.
