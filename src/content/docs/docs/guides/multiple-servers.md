---
title: Use Multiple OpenCode Servers
description: Add several OpenCode servers to the mobile app, follow sessions across connected servers, and understand the limits of OpenCode Desktop's server inventory.
lastUpdated: 2026-11-24
---

OpenCode Mobile can keep several saved server connections. Each connection has its own URL, credentials, projects, favorites, and terminal state. You can connect more than one at a time and see recent work from each connected server in the chat library.

Each server must be configured in the app. OpenCode Desktop's own server list is not imported automatically.

## Add and connect a server

1. Open **Settings → Connection → Add connection**.
2. Choose **Manual**, **Scan QR code**, or **Cloud Link**.
3. Save the connection.

A saved connection can be connected or disconnected independently. Connecting a second server does not remove the first. Use [Add or switch connections](/docs/connections/) for the connection details and [Remote access](/docs/remote-access/) for the network route.

## Where multiple servers appear

- The **chat library** groups sessions by server and project. When more than one server is connected, a server filter and server labels appear.
- **New chat** lets you choose the server, project, and worktree before creating the session.
- **Mission Control** can summarize activity across connected servers.
- Quick actions and widgets can surface sessions from more than one connected server.

Projects, files, worktrees, and the terminal follow the **focused** server and project. Opening a session from another server switches the focus there first.

Opening a session never copies it between servers. A favorite is a local pointer to a session on a specific connection.

## Desktop does not export its server list

OpenCode Desktop can combine projects and sessions from its local server and from servers it has added itself. That merged view belongs to the Desktop client.

The OpenCode API does not provide:

- a list of the servers configured in Desktop;
- the credentials for those servers;
- a way for Desktop to act as a multi-server proxy for another client.

Native pairing is also local-only: the Desktop Pairing page advertises Desktop's built-in local server, not every server in its sidebar.

As a result, a server that you configured only in Desktop must be added to OpenCode Mobile separately, or paired from the machine that runs it. If Desktop reaches a server through a Desktop-only SSH or remote extension, mobile needs its own route to that server.

This is an API and product boundary, not a synchronization problem. Two clients that connect to the same server share that server's sessions and progress.

## Why this limitation exists

Desktop's aggregation is a client-side convenience. The OpenCode server contract is per server origin: a session ID belongs to the server that returned it. A client that connected to Desktop's local server should not assume that IDs from another server are valid there.

The current API has no endpoint that says “run this on the server with this ID” or “proxy this request to another server.” Without that, a mobile client cannot safely reuse Desktop's inventory.

## What works today

| Need | Supported? |
| --- | --- |
| Save several servers and switch between them | Yes |
| Keep several servers connected | Yes |
| See sessions from connected servers in the chat library | Yes |
| Choose a server when creating a chat | Yes |
| Work on the same session from Desktop/TUI and mobile | Yes, when both use the same server |
| Import Desktop's configured remote servers automatically | No |
| Use Desktop as a proxy for its remote servers | No |
| Synchronize sessions between two different servers | No |

## Practical setup

- If you have one OpenCode server, pair it once and ignore this page.
- If you have several, add each reachable server in **Settings → Connection**. Pairing from each server's own Desktop/TUI is often the shortest path.
- If two saved profiles point at the same server with different credentials, treat them as separate connections with separate local favorites and terminal state.
- If a server is reachable only from another machine, give the phone its own route with [Tailscale](/docs/guides/tailscale/), [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), a [reverse proxy](/docs/guides/reverse-proxy/), or [Cloud Link](/docs/cloud-link/).

Next: [Connect from Desktop or TUI](/docs/guides/desktop-and-tui/), [manage sessions](/docs/guides/sessions/), or [review remote-access security](/docs/guides/remote-access-security/).
