---
title: Connect OpenCode Mobile with SSH Port Forwarding
description: Keep an OpenCode server bound to loopback and reach it from a mobile SSH client with a local port forward.
lastUpdated: 2026-11-24
---

A mobile SSH client or terminal app can keep a local port forward open. This is an advanced route: the forwarding app must stay active on the phone, and OpenCode Mobile cannot create the forward for you.

Get the OpenCode address and port first:

```bash
opencode service status
```

Create a local forward on the phone. You can reuse the remote port or choose another local port:

```bash
ssh -N -L <local-port>:127.0.0.1:<opencode-port> your-user@your-server
```

While the tunnel is active, use this URL in the app:

```text
http://127.0.0.1:<local-port>
```

## Start OpenCode on the forwarded port

For the OpenCode 2 shared service, keep it on loopback and note the port from status:

```bash
opencode service status
```

If you need a known port for the forward, set one explicitly:

```bash
opencode service set hostname 127.0.0.1
opencode service set port <port>
opencode service start
opencode service status
```

Alternatively, run a foreground standalone server on the same port:

```bash
OPENCODE_SERVER_PASSWORD='use-a-strong-password' \
  opencode serve --hostname 127.0.0.1 --port <port>
```

## Connect manually

In OpenCode Mobile, add a manual connection:

- **Server URL:** `http://127.0.0.1:<local-port>`
- **Username:** `opencode`, or the configured `OPENCODE_SERVER_USERNAME`
- **Password:** the OpenCode service or server password. Print a generated shared-service password with `opencode service get password`.

SSH forwarding is managed by the separate SSH client. A pairing link printed on the server is not useful here, so use manual entry.

## Important limitation

This transport is managed by the separate SSH client, not OpenCode Mobile. Background restrictions on the SSH app can interrupt the connection, so the forward may close when the app is suspended. The phone must own the forwarded loopback port; a forward held on another computer does not help the phone.

## Before you start

Keep OpenCode bound to `127.0.0.1`, enable password authentication, and protect the SSH key or account that opens the forward.

For other routes, return to the [remote-access overview](/docs/remote-access/) or use the [troubleshooting checklist](/docs/guides/troubleshooting/).
