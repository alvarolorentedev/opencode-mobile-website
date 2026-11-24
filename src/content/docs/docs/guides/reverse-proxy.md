---
title: Connect OpenCode Mobile Through a Reverse Proxy or API Prefix
description: Point OpenCode Mobile at an OpenCode server behind a reverse proxy or under an API prefix such as /api, with manual or root-origin pairing.
lastUpdated: 2026-11-24
---

OpenCode Mobile accepts a base URL with a prefix, for example:

```text
https://dev.example.com/api
```

With that setting, health and session calls stay under the prefix, such as:

```text
https://dev.example.com/api/global/health
```

Terminal WebSockets also preserve the prefix and switch to `wss:` for HTTPS endpoints.

## When to use a path prefix

- `/` serves a web application instead of the OpenCode API.
- A proxy mounts OpenCode under `/api` or another subpath.
- The app reports that the server returned HTML, a JSON parse error, 404, or another non-API response.

Do not append `/api` blindly. Verify the resulting `/global/health` endpoint first.

## Root-origin pairing

If the proxy exposes OpenCode at the origin root, keep the service on loopback and create a pairing link with that origin:

```bash
opencode service set hostname 127.0.0.1
opencode service start
opencode service status
opencode pair --url https://dev.example.com
```

Scan the QR code in OpenCode Mobile. The app scans native pairing codes; it does not accept a pasted link. Pairing links expire after five minutes and work once.

The proxy must forward `/auth/connect/<code>` as well as the API. Use the port from `opencode service status` as the proxy target; do not assume a fixed port.

## Path-prefixed APIs use a manual connection

The current `opencode pair --url` command builds the link with `/auth/connect` at the origin and does not preserve an API prefix such as `/api`. A pairing link created with `--url https://dev.example.com/api` will therefore point at the wrong path.

For an API mounted below `/api` or another prefix:

1. Start the shared service on loopback.
2. Configure the proxy to forward the full prefix.
3. In OpenCode Mobile, choose **Manual** and enter the complete API base, for example `https://dev.example.com/api`.
4. Enter the username and password. Print the generated password with `opencode service get password`.

A standalone `opencode serve` process and OpenCode 1.x also use a manual connection.

## Proxy requirements

A reverse proxy must forward ordinary HTTP requests, server-sent events (SSE), and terminal WebSockets. If streaming or WebSocket upgrades are dropped, tasks appear to stall or the terminal fails while the browser UI still works.

Keep the authorization header intact. If the proxy adds its own authentication, use the connection's custom headers or OIDC rather than removing OpenCode authentication.

## Before you publish

Read the [remote-access security model](/docs/guides/remote-access-security/) first. Use HTTPS, require OpenCode authentication, and avoid exposing an unauthenticated server.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
