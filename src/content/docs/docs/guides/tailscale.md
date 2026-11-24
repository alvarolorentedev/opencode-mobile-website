---
title: Connect OpenCode Mobile with Tailscale
description: Pair OpenCode Mobile over Tailscale in one command, then optionally add HTTPS with Tailscale Serve and secure the route.
lastUpdated: 2026-11-24
---

Tailscale is the preferred route when only your own devices need remote access. If the OpenCode 2 shared service is already reachable from your tailnet, pairing takes one command. Tailscale Serve is optional.

## 1. If OpenCode is already reachable over Tailscale

On the computer that runs OpenCode:

```bash
opencode pair --url http://<tailscale-ip-or-magicdns>:<port>
```

Get the Tailscale address with `tailscale ip -4` (or use the machine's MagicDNS name) and the OpenCode port from `opencode service status`. Do not assume a fixed port; use the address and port that status prints.

The `--url` value needs an `http://` or `https://` scheme. It changes the address in the pairing link; it does not bind the service or make an unreachable address reachable.

## 2. Connect the app

Scan the QR code with OpenCode Mobile. The app opens **Settings → Connection → Add connection → Scan QR code**, or the same chooser appears during onboarding.

OpenCode Mobile scans native pairing codes; it does not accept a pasted pairing link. If you cannot use the camera, choose **Manual** and enter the server URL and password. Print the generated password with `opencode service get password`.

Using `--url` keeps only the tailnet address in the link. Plain `opencode pair` can also advertise LAN or public addresses on a multi-homed host.

Pairing links expire after five minutes and work once. The connection they create lasts 30 days. When it expires, run the same command again and scan the new link. Changing the server password signs every session out.

### If the link contains localhost or the QR code is missing

The service is still bound to loopback. For a direct tailnet route, bind it to an interface the phone can reach and restart:

```bash
opencode service set hostname 0.0.0.0
opencode service start
opencode service status
```

Then pair again with the Tailscale address:

```bash
opencode pair --url http://<tailscale-ip-or-magicdns>:<port>
```

`0.0.0.0` also listens on your other interfaces, so keep the server password enabled and restrict the port with your firewall or tailnet ACLs. Where the Tailscale address is stable, binding it specifically is narrower:

```bash
opencode service set hostname <tailscale-ip>
opencode service start
opencode service status
```

## 3. If Tailscale is not installed or connected yet

1. Install Tailscale on the computer and on the phone, and sign both in to the same tailnet. See the [Tailscale install guide](https://tailscale.com/download).
2. Confirm the computer is online with `tailscale status`.
3. Confirm the phone can reach the computer's Tailscale address. If ACLs restrict the tailnet, allow the phone identity to reach the serving device and port.
4. Start or bind OpenCode as described above.
5. Pair with the Tailscale address.

You do not need router port forwarding for a direct tailnet route.

## 4. Optional: add HTTPS with Tailscale Serve

If you need an HTTPS `ts.net` address, keep OpenCode on loopback and let Tailscale Serve forward to it:

```bash
opencode service set hostname 127.0.0.1
opencode service start
opencode service status
tailscale serve --bg <opencode-port>
tailscale serve status
opencode pair --url https://machine-name.tailnet-name.ts.net
```

Use the port from `opencode service status`. `tailscale serve status` should show the HTTPS hostname forwarding to `http://127.0.0.1:<port>`.

Tailscale Serve controls the transport and TLS endpoint. Keep OpenCode authentication enabled; Serve does not replace the server password.

## 5. HTTP over Tailscale versus HTTPS

A direct tailnet link such as `http://100.x.y.z:<port>` is HTTP carried inside Tailscale's encrypted WireGuard network. Traffic is encrypted in transit between tailnet devices, but it is not HTTPS/TLS for the OpenCode endpoint. Any device or identity that can reach the service through the tailnet is inside that trust boundary.

Tailscale Serve adds HTTPS at the serving device. That gives you a normal TLS endpoint and a `ts.net` hostname, while OpenCode still authenticates every request. Use Serve when your policy requires HTTPS, when you need a stable hostname, or when you do not want to bind OpenCode beyond loopback.

In both cases:

- Keep OpenCode authentication enabled.
- Restrict tailnet membership and ACLs to the devices that should reach the server.
- Do not reuse a tailnet-only pairing link outside the tailnet.

## 6. Verify before troubleshooting the app

The service generates a password. Print it with `opencode service get password`, or set your own with `opencode service set password 'use-a-strong-password'`. From another tailnet-connected device:

```bash
curl -u opencode:use-a-strong-password \
  https://machine-name.tailnet-name.ts.net/global/health
```

For the direct tailnet route, test `http://<tailscale-ip-or-magicdns>:<port>/global/health` instead. If either check fails, fix the route, tailnet ACLs, or OpenCode authentication first. The mobile client cannot compensate for an unreachable API.

## OpenCode 1.x or a standalone server

If you use OpenCode 1.x, or deliberately run a foreground `opencode serve` process, start it with authentication and connect manually:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'
opencode serve --hostname 127.0.0.1 --port <port>
```

Pairing requires the OpenCode 2 shared service.

## Common failures

- **Phone is on the internet but not the tailnet:** open Tailscale and reconnect it.
- **Pairing link contains `localhost`:** rerun `opencode pair --url` with the Tailscale IP or MagicDNS name, after binding the service.
- **Service still bound to `127.0.0.1`:** bind it to a reachable interface and restart before pairing.
- **Session stops working after 30 days:** run `opencode pair` again and scan the new link. A password change also signs out existing sessions.
- **Hostname opens a web interface but the API fails:** use the correct API base path, potentially `/api`.
- **Serve points at the wrong port:** compare `tailscale serve status` with `opencode service status`.
- **ACL rejection:** allow the phone's identity to reach the serving device and port.
- **Old mobile build:** update before diagnosing a path-prefix bug.

Review the [security model](/docs/guides/remote-access-security/), the broader [remote-access overview](/docs/remote-access/), and the [troubleshooting checklist](/docs/guides/troubleshooting/).
