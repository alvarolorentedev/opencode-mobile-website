---
title: Fix OpenCode Mobile Connection Problems
description: Diagnose OpenCode Mobile authentication, local QR, Cloud Link, HTML and 404 responses, Tailscale, Cloudflare, proxies, realtime updates, and missing projects.
lastUpdated: 2026-10-19
---

Debug the connection from the server outward. Reinstalling the app before proving the API is reachable usually wastes time.

## Start with the symptom

| Symptom | Most likely area |
| --- | --- |
| Server URL cannot be reached | Network route, firewall, VPN, tunnel, or wrong address |
| HTML page, 404, or JSON parse error | Wrong API base or missing `/api` prefix |
| 401 or 403 | Server username/password or Cloud Link access |
| Connected but no project appears | Project catalog, server context, or permission |
| Messages update only after refresh | SSE blocked or polling fallback |
| Terminal fails while chat works | PTY endpoint or WebSocket forwarding |
| File save is rejected | File changed, editing unsupported, or V2 conflict |
| Model is missing | Provider configuration or model visibility |
| Local QR fails | Loopback-only address, expired code, or different networks |
| Cloud Link is missing or inactive | Store install, subscription, connector, or environment |
| Notifications are delayed | Battery optimization, iOS scheduling, or app lifecycle |

## 1. Confirm versions and server mode

Update OpenCode Mobile and use a current OpenCode release. Start `opencode serve` for a dedicated API or `opencode web` when you also need the browser UI.

```bash
opencode --version
```

Check **Settings → Advanced → Diagnostics** for the OpenCode version, health status, realtime state, and last app error.

## 2. Test the exact API base

Append `/global/health` to the same base URL entered in the app:

```bash
curl -i -u your-user:your-password \
  https://your-opencode-host.example/global/health
```

Expected: a successful HTTP response containing OpenCode health data.

- **HTML response:** you probably entered the web UI rather than the API base.
- **404:** check whether the API is mounted below `/api` or another prefix.
- **401/403:** verify `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`, or Cloud Link access.
- **Timeout/DNS failure:** fix the network, tunnel, VPN, or hostname before changing the app.

## 3. Check the selected transport

For [Tailscale](/docs/guides/tailscale/), confirm both devices are connected to the same tailnet, ACLs allow the route, and `tailscale serve status` points at the OpenCode port.

For [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), confirm `cloudflared` is running, the hostname resolves, ingress targets `127.0.0.1:4096`, and authentication remains enabled.

For a [reverse proxy](/docs/guides/reverse-proxy/), preserve the API prefix, authorization header, server-sent events, and WebSocket upgrade headers.

For a [local network](/docs/guides/local-network/) connection, use the machine's LAN address, allow the port on the private firewall profile, and disable Wi-Fi client isolation if devices cannot reach each other.

## 4. Local QR pairing

- Run `opencode pair` again if the code expired or was already used.
- Confirm the server listens on an address reachable from the phone, not only `localhost`.
- If the app reports a loopback-only code, follow its guidance and bind the server to a trusted reachable interface.
- Confirm both devices are on the same network and that the camera permission is allowed.

See [Add or switch connections](/docs/connections/) for the full flow.

## 5. Cloud Link

- Confirm the app was installed from the App Store or Google Play.
- Confirm the subscription is active, or use **Restore purchases**.
- Confirm the connector is running on the computer.
- Use a fresh connector QR code from the matching environment.
- Approve the connection on the computer if prompted.
- If access expired, reconnect and renew the subscription if needed.

See [Cloud Link](/docs/cloud-link/) for setup, machines, and exposed services.

## 6. Interpret the app state

- **Connected but no project appears:** refresh **Projects**, confirm the server reported a project, and inspect diagnostics.
- **Messages update only after refresh:** inspect realtime status and proxy support for the event stream.
- **Terminal fails but chat works:** verify project PTY endpoints and WebSocket forwarding. Terminal support is optional.
- **File save fails:** reopen the file, check that the connected contract supports editing, and retry after resolving the conflict.
- **A model is missing:** provider authentication and model visibility are server settings; use [Providers and models](/docs/guides/providers-and-models/).
- **MCP or diagnostics are missing:** the connected server may not expose those optional endpoints.

## 7. Collect a useful bug report

Include:

- mobile release and platform;
- OpenCode version and V1/V2 contract;
- connection method (manual, local QR, Tailscale, Cloudflare, proxy, SSH, or Cloud Link);
- sanitized API base shape;
- health-response status and visible error;
- whether the issue affects chat, realtime, terminal, files, or notifications.

Never include passwords, provider keys, private hostnames, Cloud Link pairing tokens, customer data, or source code.

Search the [public issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues) before opening a duplicate. Security-sensitive reports belong on the [private security contact page](/security/).
