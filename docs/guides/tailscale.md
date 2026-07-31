---
id: tailscale
title: Connect OpenCode Mobile with Tailscale
description: Keep OpenCode bound to localhost and connect the Android app through a private Tailscale Serve HTTPS address without opening a router port.
slug: /guides/tailscale
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# Connect OpenCode Mobile with Tailscale

Tailscale is the preferred default when only your own devices need remote access. It keeps the route inside your tailnet, provides a stable private HTTPS hostname, and avoids opening a router port.

## 1. Start OpenCode on loopback

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'
opencode serve --hostname 127.0.0.1 --port 4096
```

Keeping the server on `127.0.0.1` prevents direct LAN or public access. Tailscale Serve becomes the intended network entry point.

## 2. Publish it inside the tailnet

```bash
tailscale serve --bg 4096
tailscale serve status
```

The status output should show an HTTPS hostname forwarding to `http://127.0.0.1:4096`.

## 3. Connect Android

1. Install Tailscale on Android.
2. Sign in to the same tailnet used by the OpenCode machine.
3. Confirm Tailscale is connected.
4. Enter the complete `https://...ts.net` address in OpenCode Mobile.
5. Enter the OpenCode username and password, then reconnect.

## 4. Verify before troubleshooting the app

From another tailnet-connected device, run:

```bash
curl -u your-user:use-a-strong-password \
  https://machine-name.tailnet-name.ts.net/global/health
```

If this fails, fix Tailscale Serve, device membership, ACLs, or OpenCode authentication first. The mobile client cannot compensate for an unreachable API.

## Common failures

- **Phone is on the internet but not the tailnet:** open Tailscale and reconnect it.
- **Hostname opens a web interface but the API fails:** use the correct API base path, potentially `/api`.
- **Serve points at the wrong port:** compare `tailscale serve status` with the OpenCode port.
- **ACL rejection:** allow the Android identity to reach the serving device and port.
- **Old mobile build:** update before diagnosing a path-prefix bug; the fix was validated in [issue #1](https://github.com/alvarolorentedev/opencode-mobile/issues/1).

Review the [security model](./remote-access-security.md), the broader [remote-access overview](../remote-access.md), and the [troubleshooting checklist](./troubleshooting.md).
