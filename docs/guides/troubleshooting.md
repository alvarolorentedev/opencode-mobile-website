---
id: troubleshooting
title: Fix OpenCode Mobile Connection Problems
description: Diagnose OpenCode Mobile authentication, HTML and 404 responses, Tailscale, Cloudflare, reverse proxies, realtime updates, and missing workspaces.
slug: /guides/troubleshooting
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# Troubleshoot OpenCode Mobile connection problems

Debug the connection from the server outward. Reinstalling the app before proving the API is reachable usually wastes time.

## 1. Confirm versions and server mode

Update OpenCode Mobile and use a current OpenCode release. Start `opencode serve` for a dedicated API or `opencode web` when you also need the browser UI.

```bash
opencode --version
```

## 2. Test the exact API base

Append `/global/health` to the same base URL entered in the app:

```bash
curl -i -u your-user:your-password \
  https://your-opencode-host.example/global/health
```

Expected: a successful HTTP response containing OpenCode health data.

- **HTML response:** you probably entered the web UI rather than the API base.
- **404:** check whether the API is mounted below `/api` or another prefix.
- **401/403:** verify `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`.
- **Timeout/DNS failure:** fix the network, tunnel, VPN, or hostname before changing the app.

## 3. Check the selected transport

For [Tailscale](./tailscale.md), confirm both devices are connected to the same tailnet, ACLs allow the route, and `tailscale serve status` points at the OpenCode port.

For [Cloudflare Tunnel](./cloudflare-tunnel.md), confirm `cloudflared` is running, the hostname resolves, ingress targets `127.0.0.1:4096`, and authentication remains enabled.

For a reverse proxy, preserve the API prefix, authorization header, server-sent events, and WebSocket upgrade headers.

## 4. Interpret the app state

- **Connected but no workspaces:** refresh Workspace, verify server compatibility, and inspect Settings → Advanced diagnostics.
- **Messages update only after refresh:** inspect realtime status and proxy support for the event stream.
- **Terminal fails but chat works:** verify project PTY endpoints and WebSocket forwarding. Terminal support is optional.
- **A model is missing:** provider authentication and model visibility are server settings; use [Providers and Models](./providers-and-models.md).
- **MCP or diagnostics are missing:** the connected server may not expose those optional endpoints.

## 5. Collect a useful bug report

Include the mobile release, OpenCode version, connection method, sanitized API base shape, health-response status, and visible error. Never include passwords, provider keys, private hostnames, customer data, or source code.

Search the [public issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues) before opening a duplicate. Security-sensitive reports belong on the [private security contact page](/security/).
