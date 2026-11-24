---
title: Connect OpenCode Mobile on a Local Network
description: Pair OpenCode Mobile with the OpenCode 2 shared service on a trusted LAN without a fixed port or a public exposure.
lastUpdated: 2026-11-24
---

Use a trusted local network when the phone and the OpenCode machine are on the same private Wi-Fi or LAN. This keeps the connection off the public internet, but it still requires authentication and a firewall rule limited to the private network.

If OpenCode Desktop is already running, Desktop's **Settings → Pairing** page can create the same code. See [Connect from Desktop or TUI](/docs/guides/desktop-and-tui/).

## Recommended: pair over the LAN

OpenCode 2 uses a shared background service. Check where it listens first:

```bash
opencode service status
opencode pair
```

If the QR code contains only `localhost` or no QR code appears, the service is bound to loopback. Bind it to a reachable interface and pair again:

```bash
opencode service set hostname 0.0.0.0
opencode service start
opencode service status
opencode pair
```

`opencode pair` prints a QR code and link. In OpenCode Mobile, open **Settings → Connection → Add connection → Scan QR code** and scan it. The code expires after five minutes and works once.

Find the machine's private address from `opencode service status`, for example:

```text
http://192.168.1.20:<port>
```

Use the port shown there. The app does not require a fixed OpenCode port.

Allow that TCP port only on the private-network firewall profile. Do not forward it through your router or use this approach on an untrusted network. `0.0.0.0` listens on every interface, not only the LAN.

## Verify the API

Confirm the health endpoint works before opening the app:

```bash
opencode service get password
curl -u opencode:use-a-strong-password \
  http://192.168.1.20:<port>/global/health
```

Use the generated password from `opencode service get password`, or the password you set. Pairing itself does not require you to know it.

## Manual connection

If you use a standalone `opencode serve` process, or an OpenCode 1.x server, connect manually with the URL and password:

```bash
OPENCODE_SERVER_PASSWORD='use-a-strong-password' \
  opencode serve --hostname 0.0.0.0 --port <port>
```

Then enter `http://192.168.1.20:<port>` in the app and use `opencode` as the username if the server expects the default. Pairing requires the OpenCode 2 shared service.

## If the local-network address does not connect

- Use the machine's LAN address, not `localhost` or `127.0.0.1`.
- Confirm OpenCode is listening on `0.0.0.0` or the specific LAN interface.
- Run `opencode service status` and confirm the address and port.
- Allow the port through the private-network firewall profile.
- Disable client isolation on the Wi-Fi network if devices cannot reach each other.
- If the pairing link contains a loopback address, bind the service to the LAN interface and pair again.
- If the camera is unavailable, use **Manual** with the URL and password.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
