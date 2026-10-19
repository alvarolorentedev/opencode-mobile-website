---
title: Connect OpenCode Mobile on a Local Network
description: Start an OpenCode 2 server on a private LAN, pair with a QR code, and connect the mobile app without exposing a public port.
lastUpdated: 2026-10-19
---

Use a trusted local network when the phone and the OpenCode machine are on the same private Wi-Fi or LAN. This keeps the connection off the public internet, but it still requires authentication and a firewall rule that is limited to the private network.

## Recommended: pair over the LAN

OpenCode 2 uses a shared background service and a one-time pairing link:

```bash
opencode service set password 'use-a-strong-password'
opencode service set hostname 0.0.0.0
opencode service set port 4096
opencode service start
opencode service status
opencode pair
```

`opencode pair` prints a QR code and link. In OpenCode Mobile, open **Settings → Connection → Add connection → Scan QR code** and scan it. The link expires after five minutes and works once.

Find the machine's private address from `opencode service status`, for example:

```text
http://192.168.1.20:4096
```

Allow TCP port `4096` only on the private-network firewall profile. Do not forward this port through your router or use this approach on an untrusted network.

## Verify the API

Confirm the health endpoint works before opening the app:

```bash
curl -u opencode:use-a-strong-password \
  http://192.168.1.20:4096/global/health
```

## Manual connection

If you use a standalone `opencode serve` process, or an OpenCode 1.x server, connect manually with the URL and password:

```bash
OPENCODE_SERVER_PASSWORD='use-a-strong-password' \
  opencode serve --hostname 0.0.0.0 --port 4096
```

Then enter `http://192.168.1.20:4096` in the app and use `opencode` as the username if the server expects the default. Pairing requires the OpenCode 2 shared service.

## If the local-network address does not connect

- Use the machine's LAN address, not `localhost` or `127.0.0.1`.
- Confirm OpenCode is listening on `0.0.0.0` or the specific LAN interface.
- Run `opencode service status` and confirm the port.
- Allow the port through the private-network firewall profile.
- Disable client isolation on the Wi-Fi network if devices cannot reach each other.
- If the pairing link contains a loopback address, bind the service to the LAN interface and pair again.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
