---
title: Connect OpenCode Mobile with SSH Port Forwarding
description: Keep an OpenCode server bound to loopback and reach it from a mobile SSH client with a local port forward.
lastUpdated: 2026-09-29
---

A mobile SSH client or terminal app can keep a local port forward open:

```bash
ssh -N -L 4096:127.0.0.1:4096 your-user@your-server
```

While the tunnel is active, use:

```text
http://127.0.0.1:4096
```

## Important limitation

This transport is managed by the separate SSH client, not OpenCode Mobile. Background restrictions on the SSH app can interrupt the connection, so the forward may close when the app is suspended.

## Before you start

Keep OpenCode bound to `127.0.0.1`, enable username and password authentication, and protect the SSH key or account that opens the forward.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
