---
title: Set Up OpenCode Mobile
description: Connect OpenCode Mobile from OpenCode Desktop, the TUI or CLI, or an existing reachable server, then finish a first task.
lastUpdated: 2026-11-24
---

This guide starts from the OpenCode setup you already have. OpenCode 2 is the current primary target; OpenCode 1.x servers connect manually for the core surface.

If OpenCode is already running and your phone can reach it, you do not need to install a tunnel, change the port, or configure a password. Pair or connect with the existing route.

## What you need

- An Android device (64-bit ARM) or iPhone/iPad with OpenCode Mobile installed.
- An OpenCode server running on the machine that owns the project. This can be OpenCode Desktop, the TUI, the shared service, or a standalone `opencode serve` process.
- A network route from the phone to that server: local network, VPN, tunnel, reverse proxy, SSH forward, or Cloud Link.

## 1. Install OpenCode Mobile

Use the [Download page](/download/) to choose an installation method:

- **Google Play (recommended):** install and receive updates through Google Play.
- **Direct GitHub APK:** install the latest release manually. Android release artifacts are arm64-v8a only.
- **iOS TestFlight beta:** join the [OpenCode Mobile TestFlight release](https://testflight.apple.com/join/ddcE5Wzz).

See [Download and install](/docs/opencode-android-app/) for platform details.

## 2. Choose the path that matches your setup

| Your setup | Shortest path |
| --- | --- |
| I use OpenCode Desktop | Pair from **Settings → Pairing** |
| I use the TUI or CLI | Run `opencode pair`, or `/pair` in the TUI |
| I already have a reachable OpenCode server | Pair with its URL, or connect manually |
| I need to enable remote connectivity | Choose a route, then pair or connect |

### I use OpenCode Desktop

Desktop runs or adopts the local OpenCode 2 service. You do not need to start a separate server.

1. Open **Settings → Pairing** in OpenCode Desktop.
2. Choose the address your phone can reach. For a VPN or tunnel, enter the URL under **Custom address**.
3. Select **Show details** and scan the QR code with OpenCode Mobile.

If Desktop says only this computer can reach the server, it prints the command that binds the service to a reachable interface. Use that command, reopen Pairing, and scan again.

Desktop pairing exposes Desktop's local server only. It does not expose the remote servers configured in Desktop; add those separately. See [Connect from OpenCode Desktop or TUI](/docs/guides/desktop-and-tui/) and [Use multiple OpenCode servers](/docs/guides/multiple-servers/).

### I use the TUI or CLI

The TUI and CLI use the OpenCode 2 shared service by default.

```bash
opencode service status
opencode pair
```

From the TUI, `/pair` (or the older `/web` alias) opens the same pairing panel.

If the QR code contains only `localhost`, the service is bound to loopback. On a trusted LAN, bind it and pair again:

```bash
opencode service set hostname 0.0.0.0
opencode service start
opencode service status
opencode pair
```

For an address that is already reachable through a VPN, tunnel, or reverse proxy, pass it explicitly:

```bash
opencode pair --url http://<reachable-address>:<port>
```

```bash
opencode pair --url https://your-opencode-host.example
```

Use the port printed by `opencode service status`. `--url` changes the address in the link; it does not make an unreachable address reachable.

Scan the QR code with OpenCode Mobile. The app does not accept a pasted native pairing link. If you cannot use the camera, connect with **Manual** and the service URL and password.

Pairing links expire after five minutes and work once. The connection lasts 30 days; run the same pairing step again when it expires. Changing the server password signs every session out.

### I already have a reachable OpenCode server

**OpenCode 2 shared service:** create a fresh pairing link with the address the phone uses:

```bash
opencode pair --url https://your-opencode-host.example
```

Scan the QR code in the app. If the server is at the origin root, this is the whole setup.

**Standalone `opencode serve` or OpenCode 1.x:** pairing requires the shared service, so connect manually:

1. In the app, choose **Manual**.
2. Enter the full server URL, including any API path prefix.
3. Enter the username and password. If a password is set and the username is blank, the app uses `opencode`.

**Path-prefixed API:** use a manual connection. The current `opencode pair --url` link uses `/auth/connect` at the origin and does not preserve an `/api` prefix. See [Reverse proxy and API prefix](/docs/guides/reverse-proxy/).

### I need to enable remote connectivity

If the phone cannot reach the server yet, choose one route before pairing:

| Route | Use it when |
| --- | --- |
| [Local network](/docs/guides/local-network/) | Phone and computer share a trusted Wi-Fi or LAN |
| [Tailscale](/docs/guides/tailscale/) | Only your own devices need access |
| [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/) | You need a public HTTPS address without router port forwarding |
| [Reverse proxy](/docs/guides/reverse-proxy/) | You already run HTTPS infrastructure or an API prefix |
| [SSH forwarding](/docs/guides/ssh-forward/) | A mobile SSH client can hold a loopback forward |
| [Cloud Link](/docs/cloud-link/) | You want managed remote access with a store subscription |

Cloud Link is optional. See the [OpenCode Cloud Link website](https://opencodecloud.link/) for connector downloads, platform support, and pricing.

OpenCode 2 also supports `opencode pair --remote` on builds that include OpenTunnel. It creates a public tunnel address and pairs through it, separately from Cloud Link. Treat it like any public endpoint and review the [remote-access security guidance](/docs/guides/remote-access-security/).

## 3. Connect the app

On first launch, onboarding walks through these steps:

1. **Welcome** — continue into setup.
2. **Permissions** — optionally enable notifications and voice input.
3. **Connect** — add a server connection.
4. **AI & providers** — optionally configure providers, models, and automatic routing.
5. **Project** — choose a server project or add a folder.
6. **General** — choose the interface language and, on V2, prompt delivery.
7. **Voice & responses** — choose how you talk and hear replies.
8. **Privacy** — choose local diagnostics and, when available, optional remote telemetry.
9. **Ready** — review the setup and start.

The AI and Project steps appear after a connection exists, so a first run that skips the server sees fewer steps. Every step has a Skip action.

In **Connect**, the Add connection chooser offers:

- **Scan QR code** — scan the QR code printed by `opencode pair` or shown by Desktop Pairing. The app scans native pairing codes; it does not paste them. The code must contain an address the phone can reach.
- **Manual** — enter a name (optional), the complete server URL, username, and password. Manual connections can also add custom HTTP headers, a custom CA certificate, or OpenID Connect.
- **Cloud Link** — pair with a managed connector when the app was installed from the App Store or Google Play and an active subscription is available.

For manual setup, include `https://` and any required path prefix. If a password is set and Username is blank, the client uses `opencode` as the Basic-auth username. Entering the explicit username is clearer when troubleshooting.

You can skip permissions, connection, or project during onboarding and configure them later in **Settings → Connection** and the **Projects** tab. Editing a saved connection does not reconnect automatically; use **Reconnect** when you want to apply the change.

See [Add or switch connections](/docs/connections/) for saved profiles, pairing details, custom headers, certificates, OIDC, Cloud Link, and multiple servers.

## 4. Select a project and finish a first task

Choose the project during onboarding or later in **Projects**. The picker lists the projects the server reports, in server order. Search filters the list; **Add project** opens a server folder browser with a manual path fallback.

The selected project scopes files and terminal activity. The app remembers the last session used for each project. If a session started on Desktop or in the TUI is missing, confirm that mobile is connected to the same server and project; see [Connect from Desktop or TUI](/docs/guides/desktop-and-tui/).

1. Open **Chat** and confirm the expected session title and project appear at the top.
2. Select the agent and model above the composer.
3. Send a small, verifiable request such as: `Inspect this project and summarize its purpose. Do not change files.`
4. Watch the transcript while OpenCode works.
5. Respond if a permission or question card appears.
6. Tap the change chip above the composer and confirm that the read-only task produced no edits.

For a first implementation task, ask for one contained change and its related test. Review both the assistant response and the changes overlay before accepting the result.

## 5. If you need to start OpenCode

Skip this section when Desktop, the TUI, or an existing server is already running.

### OpenCode 2 shared service

```bash
opencode service start
opencode service status
```

The service generates its own password. You do not need to set one for pairing. To choose your own, set it before starting:

```bash
opencode service set password 'use-a-strong-password'
opencode service start
```

Print the generated password with `opencode service get password` when you need it for a manual connection.

The shared service keeps the username `opencode`. Its address and port come from `opencode service status`; do not assume a fixed port.

### Standalone server

`opencode serve` runs the same server in the foreground. Use it for an always-on host, a service supervisor, Docker, or a dedicated server:

```bash
OPENCODE_SERVER_PASSWORD='use-a-strong-password' \
  opencode serve --hostname 127.0.0.1 --port <port>
```

Pairing requires the shared service. Connect to a standalone server manually with its URL and password.

### OpenCode 1.x

On OpenCode 1.x, start `opencode serve` for the API, or `opencode web` when you also want the browser UI:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'
opencode serve --hostname 127.0.0.1 --port <port>
```

Connect V1 servers manually. Native pairing is an OpenCode 2 feature. V1 is maintained for the core surface; archive/share, title summarization, worktree reset, LSP/formatter diagnostics, and the composer auto-approve/saved-rules surfaces are not available.

## 6. Verify or troubleshoot

With the shared service running:

```bash
opencode api get /api/info
```

For a manual or external connection, test the exact API base from the phone's network:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/global/health
```

A healthy response includes `healthy: true` and may include the OpenCode version. If the root displays a web UI and the app reports a 404 or a non-API response, enter the API base URL instead, commonly the same address with `/api`.

If the connection still fails:

- Scan a fresh QR code. Pairing codes expire after five minutes and work once.
- For a loopback-only pairing link, bind the service or use a tunnel.
- For a manual connection, check the URL, path prefix, username, and password.
- Read the [troubleshooting checklist](/docs/guides/troubleshooting/) and the [remote-access overview](/docs/remote-access/).

## Security notes

- Exposing OpenCode exposes project files and command execution. Use authentication on every route.
- Prefer loopback plus a VPN, tunnel, or reverse proxy over binding directly to a public interface.
- Binding `0.0.0.0` listens on every interface, not only your LAN. Restrict the port with a firewall or tailnet ACL.
- Treat pairing links, passwords, and Cloud Link QR codes as credentials. Do not paste them into public issues or screenshots.
- Read the [remote-access security guide](/docs/guides/remote-access-security/) before treating a setup as production-ready.
