---
title: Connect OpenCode Mobile with Tailscale
description: Keep OpenCode on loopback, publish it through Tailscale Serve, and pair the mobile app with a private HTTPS address without opening a router port.
lastUpdated: 2026-10-19
---

Tailscale is the preferred default when only your own devices need remote access. It keeps the route inside your tailnet, provides a stable private HTTPS hostname, and avoids opening a router port.

## 1. Start OpenCode 2 on loopback

Set a password and start the shared service on loopback:

```bash
opencode service set password 'use-a-strong-password'
opencode service set hostname 127.0.0.1
opencode service set port 4096
opencode service start
opencode service status
```

Keeping the service on `127.0.0.1` prevents direct LAN or public access. Tailscale Serve becomes the intended network entry point.

## 2. Publish it inside the tailnet

```bash
tailscale serve --bg 4096
tailscale serve status
```

The status output should show an HTTPS hostname forwarding to `http://127.0.0.1:4096`.

## 3. Pair or connect the phone

Create a pairing link that uses the Tailscale HTTPS origin:

```bash
opencode pair --url https://machine-name.tailnet-name.ts.net
```

Scan the QR code in OpenCode Mobile, or paste the link. The link expires after five minutes and works once.

If you prefer a manual connection, install Tailscale on Android or iOS, sign in to the same tailnet, and enter the complete `https://...ts.net` address plus the OpenCode password.

## 4. Verify before troubleshooting the app

From another tailnet-connected device, run:

```bash
curl -u opencode:use-a-strong-password \
  https://machine-name.tailnet-name.ts.net/global/health
```

If this fails, fix Tailscale Serve, device membership, ACLs, or OpenCode authentication first. The mobile client cannot compensate for an unreachable API.

## OpenCode 1.x or a standalone server

If you use OpenCode 1.x, or deliberately run a foreground `opencode serve` process, start it with authentication and connect manually:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'
opencode serve --hostname 127.0.0.1 --port 4096
```

Pairing requires the OpenCode 2 shared service.

## Common failures

- **Phone is on the internet but not the tailnet:** open Tailscale and reconnect it.
- **Hostname opens a web interface but the API fails:** use the correct API base path, potentially `/api`.
- **Serve points at the wrong port:** compare `tailscale serve status` with the OpenCode port.
- **ACL rejection:** allow the phone’s identity to reach the serving device and port.
- **Old mobile build:** update before diagnosing a path-prefix bug.

Review the [security model](/docs/guides/remote-access-security/), the broader [remote-access overview](/docs/remote-access/), and the [troubleshooting checklist](/docs/guides/troubleshooting/).
