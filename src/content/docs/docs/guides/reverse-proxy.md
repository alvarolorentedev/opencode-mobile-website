---
title: Connect OpenCode Mobile Through a Reverse Proxy or API Prefix
description: Point OpenCode Mobile at an OpenCode 2 server mounted behind a reverse proxy or under an API path prefix such as /api, with pair or manual setup.
lastUpdated: 2026-10-19
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

- `/` serves a web application instead of the OpenCode API
- A proxy mounts OpenCode under `/api` or another subpath
- The app reports that the server returned HTML, a JSON parse error, 404, or another non-API response

Do not append `/api` blindly. Verify the resulting `/global/health` endpoint first.

## Pair through the proxy

Start the OpenCode 2 shared service on loopback behind the proxy:

```bash
opencode service set password 'use-a-strong-password'
opencode service set hostname 127.0.0.1
opencode service set port 4096
opencode service start
opencode service status
```

Create the pairing link with the public proxy URL:

```bash
opencode pair --url https://dev.example.com/api
```

Scan the QR code in OpenCode Mobile, or paste the link. Pairing links expire after five minutes and work once.

If you use a standalone `opencode serve` process or OpenCode 1.x, connect manually with the complete API base and password instead. Pairing requires the OpenCode 2 shared service.

## Proxy requirements

A reverse proxy must forward ordinary HTTP requests, server-sent events (SSE), and terminal WebSockets. If streaming or WebSocket upgrades are dropped, tasks appear to stall or the terminal fails while the browser UI still works.

## Before you publish

Read the [remote-access security model](/docs/guides/remote-access-security/) first. Use HTTPS, require OpenCode authentication, and avoid exposing an unauthenticated server.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
