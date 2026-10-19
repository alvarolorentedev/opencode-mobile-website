---
title: Connect OpenCode Mobile with SSH Port Forwarding
description: Keep an OpenCode 2 server bound to loopback and reach it from a mobile SSH client with a local port forward.
lastUpdated: 2026-10-19
---

A mobile SSH client or terminal app can keep a local port forward open:

```bash
ssh -N -L 4096:127.0.0.1:4096 your-user@your-server
```

While the tunnel is active, use:

```text
http://127.0.0.1:4096
```

## Start OpenCode on the expected port

For the OpenCode 2 shared service, set the port and keep it on loopback:

```bash
opencode service set password 'use-a-strong-password'
opencode service set hostname 127.0.0.1
opencode service set port 4096
opencode service start
opencode service status
```

Alternatively, run a foreground standalone server on the same port:

```bash
OPENCODE_SERVER_PASSWORD='use-a-strong-password' \
  opencode serve --hostname 127.0.0.1 --port 4096
```

## Connect manually

In OpenCode Mobile, add a manual connection:

- **Server URL:** `http://127.0.0.1:4096`
- **Username:** `opencode`, or the configured `OPENCODE_SERVER_USERNAME`
- **Password:** the OpenCode service or server password

SSH forwarding is managed by the separate SSH client. A pairing link printed on the server is not useful here unless the phone itself owns the forwarded loopback port, so use manual entry.

## Important limitation

This transport is managed by the separate SSH client, not OpenCode Mobile. Background restrictions on the SSH app can interrupt the connection, so the forward may close when the app is suspended.

## Before you start

Keep OpenCode bound to `127.0.0.1`, enable password authentication, and protect the SSH key or account that opens the forward.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
