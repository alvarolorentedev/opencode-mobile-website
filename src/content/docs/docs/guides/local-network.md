---
title: Connect OpenCode Mobile on a Local Network
description: Bind an authenticated OpenCode server to a private LAN address and connect the mobile app without exposing a public port.
lastUpdated: 2026-09-29
---

Use a trusted local network when the phone and the OpenCode machine are on the same private Wi-Fi or LAN. This keeps the connection off the public internet, but it still requires authentication and a firewall rule that is limited to the private network.

## Start an authenticated server

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'

opencode serve --hostname 0.0.0.0 --port 4096
```

Find the machine's private address, then enter a URL such as:

```text
http://192.168.1.20:4096
```

Allow TCP port `4096` only on the private-network firewall profile. Do not forward this port through your router or use this approach on an untrusted network.

## Verify the API

Confirm the health endpoint works before opening the app:

```bash
curl -u your-user:use-a-strong-password \
  http://192.168.1.20:4096/global/health
```

## If the local-network address does not connect

- Use the machine's LAN address, not `localhost` or `127.0.0.1`.
- Confirm OpenCode is listening on `0.0.0.0` or the specific LAN interface.
- Allow the port through the private-network firewall profile.
- Disable client isolation on the Wi-Fi network if devices cannot reach each other.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
