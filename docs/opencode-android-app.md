---
id: opencode-android-app
title: OpenCode Android App — Setup and Download
description: Download the community-built OpenCode Android app, connect it to your own server, understand the requirements, and choose a secure remote-access method.
slug: /opencode-android-app
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# OpenCode Android app: setup and download

OpenCode Mobile is an independent Android client for an OpenCode server that you run. It lets you start and monitor coding tasks, review permissions and changes, manage sessions and workspaces, inspect files, and run focused terminal commands from a phone.

It is not an official OpenCode product, a hosted AI service, or a replacement for the OpenCode server.

## Download the Android app

Use the [OpenCode Mobile download page](/download/) to choose one of two installation paths:

- **Google Play beta:** recommended for automatic updates through the Play Store.
- **Direct APK:** downloaded from the project's public [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) when Play testing is unavailable or you prefer manual installation.

The current release history and source code are public. Do not install APK files reposted by unrelated download sites.

## What the app requires

You need:

1. An Android device.
2. A current OpenCode installation on a computer or server that owns the workspace.
3. OpenCode running in server mode.
4. A secure network route from Android to that server.
5. The server URL and configured HTTP Basic-auth credentials.

The shortest complete workflow is in [Set Up OpenCode Mobile on Android](./getting-started.md).

## Start an OpenCode server

Keep the service bound to loopback when using a tunnel or private proxy:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'
opencode serve --hostname 127.0.0.1 --port 4096
```

Then connect through [Tailscale](./guides/tailscale.md), [Cloudflare Tunnel](./guides/cloudflare-tunnel.md), or another method described in the [remote-access overview](./remote-access.md).

Never publish an unauthenticated OpenCode port to the internet.

## App versus browser access

Use OpenCode Mobile when you want a native Android control surface, voice input, app-level notifications, project/session navigation, and compact access to files and terminal commands. Use `opencode web` when you want the browser UI or do not want to install a client.

The complete tradeoff is documented in [OpenCode Mobile vs OpenCode Web](./guides/mobile-vs-web.md).

## Verify the connection

Before opening the app, test the same API base URL from a device on the intended network:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/global/health
```

If the root URL serves HTML, the API may live below a prefix such as `/api`. Enter the complete API base in the app and verify `<base>/global/health` instead of guessing.

Use the [troubleshooting checklist](./guides/troubleshooting.md) for authentication, HTML responses, Tailscale, proxy, realtime, and workspace problems.
