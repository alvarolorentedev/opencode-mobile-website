---
title: Connect from OpenCode Desktop or TUI
description: Pair OpenCode Mobile with the server behind OpenCode Desktop or the TUI, continue existing sessions, and understand which client keeps state.
lastUpdated: 2026-11-24
---

OpenCode Desktop, the TUI, the CLI, and OpenCode Mobile are frontends. The OpenCode server owns the project catalog, sessions, transcript, approvals, and changes. Once the mobile app reaches the same server, the work you started on your computer is available on the phone.

This page assumes OpenCode is already running. If it is not, start with [Set Up OpenCode Mobile](/docs/getting-started/).

## Same server, same work

OpenCode Mobile does not copy or mirror a Desktop window. It connects to the server that Desktop or the TUI uses and reads the same server-side state.

That means you can:

- open an existing project in **Projects**;
- open a conversation from the chat library and continue it;
- follow a running turn, answer a permission or question, and review changed files;
- start a task on the phone and inspect it later from Desktop or the TUI.

When Desktop or the TUI is configured to use a different server, mobile must connect to that server too. Being open on the same computer is not enough.

## Pair from OpenCode Desktop

OpenCode 2 Desktop has a built-in pairing page for its local server:

1. Open **Settings → Pairing**.
2. Under **Local Network**, choose the address the phone can reach. Desktop separates local network, VPN, and other advertised addresses.
3. If the phone reaches the computer through a tunnel or proxy that Desktop cannot detect, enter that URL under **Custom address**.
4. Select **Show details**, then scan the pairing QR code with OpenCode Mobile.

You can also run the **Pair device** command from the Desktop command palette; it opens the same page.

If the page says **Only this computer can reach the OpenCode server**, the local service is still bound to loopback. Use the provided command, reopen Pairing, and try again:

```bash
opencode service set hostname 0.0.0.0
```

`0.0.0.0` listens on every interface, so keep the server password enabled and restrict the port with your firewall or tailnet ACLs. For a private route that does not need a LAN bind, see [Tailscale](/docs/guides/tailscale/).

Desktop pairing exposes **Desktop's local OpenCode server only**. It does not expose remote servers that Desktop has added to its own sidebar, and it cannot act as a proxy for them. See [Use multiple OpenCode servers](/docs/guides/multiple-servers/).

The pairing code expires after five minutes and works once. The session it creates lasts 30 days. Run the same pairing step again to renew it.

## Pair from the TUI or CLI

Both the TUI and the CLI use the OpenCode 2 shared service by default.

From the TUI, open the command palette and run `/pair` (the older `/web` alias still works). From a terminal:

```bash
opencode service status
opencode pair
```

`opencode service status` prints the service address and port. `opencode pair` prints links and, when a reachable address exists, a QR code.

If the phone is on the same trusted network but the QR code is missing or contains only `localhost`, bind the service and pair again:

```bash
opencode service set hostname 0.0.0.0
opencode service start
opencode service status
opencode pair
```

For an already reachable address, name it explicitly:

```bash
opencode pair --url http://<reachable-address>:<port>
```

For Tailscale, Cloudflare Tunnel, or a reverse proxy, pass the public origin:

```bash
opencode pair --url https://your-opencode-host.example
```

Use the port from `opencode service status`; the service does not require a fixed port. `--url` changes the address in the pairing link. It does not make an unreachable address reachable.

Scan the QR code in OpenCode Mobile. The app does not accept a pasted native pairing link; if the camera is unavailable, use **Manual** with the service URL and password instead.

## Do Desktop or the TUI need to stay open?

The **server** must keep running. The frontend does not.

- OpenCode 2 Desktop and the TUI normally use the shared background service. Closing the Desktop window or quitting the TUI does not necessarily stop that service.
- Confirm with `opencode service status`.
- A standalone `opencode serve` process must stay running for the whole time you want remote access.
- If the machine sleeps, loses its network route, or stops the service, mobile disconnects until it returns.

## What stays in sync

| Item | Shared through the server? |
| --- | --- |
| Projects and worktrees | Yes |
| Sessions, prompts, and transcript | Yes |
| Running progress, permissions, and questions | Yes |
| Changed files, diffs, and todos | Yes |
| Open tabs, scroll position, and unsent drafts | No |
| Theme, text size, and other device preferences | No |

Mobile listens to server events and re-reads the session when it reconnects or returns to the foreground. A brief event-stream interruption should not hide server-side progress. If updates look stale, open **Settings → Diagnostics** and check the realtime state.

If another client answers a permission or question first, the server records that answer. The remaining clients see the result rather than a second prompt.

## Frontend versus server

| Piece | Role |
| --- | --- |
| OpenCode Desktop | Desktop frontend; starts or adopts the local shared service |
| OpenCode TUI | Terminal frontend; connects to the same shared service by default |
| OpenCode CLI | Commands and service management; can also start a standalone server |
| OpenCode Mobile | Android/iOS frontend |
| OpenCode server | API, sessions, project access, and command execution |

Pairing is about the server, not about the Desktop window. That is why mobile can continue a Desktop session while Desktop is closed, and why mobile cannot see a remote server that only Desktop knows about.

## If a session is missing

1. Confirm mobile is connected to the same server that Desktop or the TUI uses. **Settings → Connection** shows the active profiles.
2. Open the project in **Projects**, then open the chat library.
3. Check whether the session is archived, deleted, or belongs to a different project directory.
4. If Desktop is connected to a remote server, add that server to mobile separately. Desktop's local pairing will not expose it.

Next: [Use multiple OpenCode servers](/docs/guides/multiple-servers/), [manage sessions](/docs/guides/sessions/), or [compare mobile and web](/docs/guides/mobile-vs-web/).
