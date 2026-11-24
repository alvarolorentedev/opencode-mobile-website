---
title: Connect OpenCode Mobile with Tailscale
description: Pair OpenCode Mobile over a private tailnet in one command, then optionally publish the service through Tailscale Serve for HTTPS.
lastUpdated: 2026-11-24
---

Tailscale is the preferred default when only your own devices need remote access. If the OpenCode 2 shared service is already reachable from your tailnet, pairing takes one command. Tailscale Serve is an optional way to add HTTPS without opening a router port.

## 1. Pair over the tailnet

On the computer running OpenCode:

```bash
opencode pair --url http://<tailscale-ip-or-magicdns>:49374
```

Use the computer's Tailscale IP (`tailscale ip -4`) or its MagicDNS name, and the port from `opencode service status`. The default is `49374` on macOS, Linux, and WSL; Windows uses `28894`. The `--url` value needs an `http://` or `https://` scheme.

Scan the QR code in OpenCode Mobile, or paste the link into **Settings → Connection → Add connection → Scan QR code**. Using `--url` keeps only the tailnet address in the link; plain `opencode pair` can also advertise LAN or public addresses on a multi-homed host.

The service must listen on an interface the phone can reach. If `opencode service status` still shows `127.0.0.1`, bind it and restart:

```bash
opencode service set hostname 0.0.0.0
opencode service start
opencode service status
```

`0.0.0.0` also listens on your other interfaces, so keep the server password enabled and restrict the port with your firewall where needed. Tailscale encrypts traffic between tailnet devices; the HTTP link stays private inside the tailnet and should not be reused outside it.

Pairing links expire after five minutes and work once. The connection they create lasts 30 days. When it expires, run the same `opencode pair` command again and scan the new link. Changing the server password signs every session out.

## 2. Optional: add HTTPS with Tailscale Serve

If you prefer an HTTPS `ts.net` address, keep the service on loopback and let Tailscale Serve forward to it:

```bash
opencode service set hostname 127.0.0.1
opencode service start
tailscale serve --bg 49374
tailscale serve status
opencode pair --url https://machine-name.tailnet-name.ts.net
```

Use the actual OpenCode port in `tailscale serve --bg`. `tailscale serve status` should show the HTTPS hostname forwarding to `http://127.0.0.1:<port>`.

## 3. Verify before troubleshooting the app

The service generates a password. Print it with `opencode service get password`, or set your own with `opencode service set password 'use-a-strong-password'`. From another tailnet-connected device:

```bash
curl -u opencode:use-a-strong-password \
  https://machine-name.tailnet-name.ts.net/global/health
```

For the direct tailnet route, test `http://<tailscale-ip-or-magicdns>:49374/global/health` instead. If either check fails, fix the route, tailnet ACLs, or OpenCode authentication first. The mobile client cannot compensate for an unreachable API.

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
- **Pairing link contains `localhost`:** rerun `opencode pair --url` with the Tailscale IP or MagicDNS name.
- **Service still bound to `127.0.0.1`:** bind it to a reachable interface and restart before pairing.
- **Session stops working after 30 days:** run `opencode pair` again and scan the new link. A password change also signs out existing sessions.
- **Hostname opens a web interface but the API fails:** use the correct API base path, potentially `/api`.
- **Serve points at the wrong port:** compare `tailscale serve status` with `opencode service status`.
- **ACL rejection:** allow the phone's identity to reach the serving device and port.
- **Old mobile build:** update before diagnosing a path-prefix bug.

Review the [security model](/docs/guides/remote-access-security/), the broader [remote-access overview](/docs/remote-access/), and the [troubleshooting checklist](/docs/guides/troubleshooting/).
