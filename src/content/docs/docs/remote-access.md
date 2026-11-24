---
title: Access OpenCode Remotely from Mobile
description: Choose how the phone reaches OpenCode, then pair or connect. Compare native pairing, LAN, Tailscale, Cloud Link, Cloudflare, proxies, and manual routes.
lastUpdated: 2026-11-24
---

OpenCode Mobile needs a reachable OpenCode API. It does not require a specific tunnel provider, and it does not create a network route by itself.

## Two separate decisions

1. **How will the phone reach the server?** Choose a LAN, VPN, tunnel, proxy, SSH forward, or Cloud Link.
2. **How will the app authenticate?** Use native OpenCode pairing, a manual URL and password, custom headers or OIDC, or Cloud Link.

Native pairing is an authentication shortcut. It exchanges a one-time code for a session token; it does **not** bind the server, open a firewall, or install a tunnel. Pairing an otherwise unreachable server will still fail.

Read the [remote-access security model](/docs/guides/remote-access-security/) before publishing any endpoint.

## Connection requirements

Every manual route supplies the same values:

- **Server URL:** origin plus any required API path prefix
- **Username:** `opencode` for the OpenCode 2 shared service, or `OPENCODE_SERVER_USERNAME`
- **Password:** the generated or configured service password, or `OPENCODE_SERVER_PASSWORD`

Manual connections can also attach custom HTTP headers for a gateway, trust a private CA for that `host:port`, or sign in through OIDC. Native pairing and Cloud Link profiles do not carry custom headers or a custom CA.

The client normalizes a missing protocol, preserves configured path prefixes such as `/api`, adds optional HTTP Basic authentication, and scopes project, file, terminal, and event requests to the focused project.

## Start OpenCode for mobile

| OpenCode version | Recommended start | App connection |
| --- | --- | --- |
| **OpenCode 2 shared service** | `opencode service start`, then `opencode pair` | Scan the QR code |
| **OpenCode 2 standalone** | `opencode serve --hostname 127.0.0.1 --port <port>` | Enter the URL and password manually |
| **OpenCode 1.x** | `opencode serve` for the API, or `opencode web` for the browser UI | Enter the URL and password manually |

For OpenCode 2, the service generates its own password. You do not need to set one for pairing. Check the address and port with:

```bash
opencode service start
opencode service status
opencode pair
```

The pair command prints a one-time link and, when a reachable address exists, a QR code. Pairing links expire after five minutes and work once. The session lasts 30 days; pair again when it expires. Changing the server password signs every session out.

For a reachable URL behind Tailscale, Cloudflare Tunnel, or a reverse proxy, create the link with that origin:

```bash
opencode pair --url https://your-opencode-host.example
```

`--url` changes only the address in the pairing link. Use the port from `opencode service status`; do not assume a fixed port. Pairing requires the shared background service. A standalone `opencode serve` process must be connected manually.

If OpenCode is mounted under an API prefix such as `/api`, use a manual connection. The current pairing link uses `/auth/connect` at the origin and does not preserve the prefix.

## Choose a route

| Method | What it provides | Use it when | Guide |
| --- | --- | --- | --- |
| Native OpenCode pairing | Authentication shortcut; use with any reachable route | OpenCode 2 shared service and a phone-reachable QR/link address | [Connections](/docs/connections/) |
| Local network | Reachability on the same private Wi-Fi or LAN | Phone and server share a trusted network | [Local network](/docs/guides/local-network/) |
| Tailscale (direct) | Private reachability over a tailnet | Only your own devices need access | [Tailscale](/docs/guides/tailscale/) |
| Tailscale Serve | Private reachability plus HTTPS | You need a `ts.net` HTTPS address | [Tailscale](/docs/guides/tailscale/) |
| Cloud Link | Managed reachability with store entitlement | You want managed access without your own tunnel | [Cloud Link](/docs/cloud-link/) |
| Native remote access | OpenTunnel public address, where supported | Your OpenCode 2 build includes `opencode pair --remote` | This page |
| Cloudflare Tunnel | Public HTTPS without router port forwarding | You need a public hostname and control DNS | [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/) |
| Reverse proxy | Reachability through existing HTTPS or an API prefix | You already run a proxy | [Reverse proxy](/docs/guides/reverse-proxy/) |
| SSH forwarding | Loopback reachability through a mobile SSH client | You can keep a forward open on the phone | [SSH forwarding](/docs/guides/ssh-forward/) |
| Manual connection | Authentication with URL, password, headers, CA, or OIDC | Any reachable server, including standalone and V1 | [Connections](/docs/connections/) |
| Legacy connection | Older V1 or pairing formats | You cannot use a current shared service | [Connections](/docs/connections/) |

## Decision guide

- **Phone and computer on the same Wi-Fi?** Start with [local network](/docs/guides/local-network/) or native pairing.
- **Only your devices need access?** Use [Tailscale direct](/docs/guides/tailscale/). Add Serve only if you need HTTPS.
- **Need a public HTTPS address without port forwarding?** Use [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/) or an existing [reverse proxy](/docs/guides/reverse-proxy/).
- **Want OpenCode to create a public address?** Use `opencode pair --remote` where supported.
- **Want a managed service?** Use [Cloud Link](/docs/cloud-link/). You do not need it if LAN, Tailscale, or a tunnel already works.
- **Server is standalone or OpenCode 1.x?** Use a manual connection.
- **Server is only reachable from another computer?** Give the phone its own route; pairing cannot borrow that computer's network access.

## Native OpenCode pairing

Native pairing is free and part of OpenCode 2. It authenticates the app against the shared service and produces a profile with a session token.

- Start from **Settings → Pairing** in OpenCode Desktop, `/pair` in the TUI, or `opencode pair` in a terminal.
- The Desktop page advertises Desktop's local server. It does not expose remote servers configured in Desktop.
- OpenCode Mobile scans the QR code. It does not accept a pasted native pairing link; use **Manual** if the camera is unavailable.
- A loopback-only link cannot work from another device. Bind the service or use a tunnel.
- Pairing does not carry custom headers or a custom CA. For Cloudflare Access or a gateway, use a manual connection.

## Native remote access

On builds that support it, `opencode pair --remote` enables OpenTunnel, waits for a public address, and pairs through it:

```bash
opencode pair --remote
```

This is separate from Cloud Link. It creates a public endpoint through OpenTunnel and should be treated like any other internet-facing route. Keep OpenCode authentication enabled, do not share the pairing link, and review the [security guidance](/docs/guides/remote-access-security/). Availability depends on the OpenCode build and network.

## Native pairing versus Cloud Link

These are different features:

- **Native pairing** is a free OpenCode 2 authentication shortcut. It works over any route the phone can already reach. It is not a tunnel and is not Cloud Link.
- **Cloud Link** is an optional paid remote-access service for store-installed iOS and Android builds. It uses a desktop connector and a subscription to provide a managed route. It is not available in direct APK, F-Droid/FOSS, or web builds. See the [OpenCode Cloud Link website](https://opencodecloud.link/) for downloads, platform support, and pricing.

If you already have Tailscale or a reliable tunnel, you do not need Cloud Link.

## Security guidance by method

| Method | Exposure | Minimum guidance |
| --- | --- | --- |
| LAN | Private network | Use auth, trusted Wi-Fi, and a private firewall rule |
| Tailscale direct | Tailnet only | Keep auth enabled; restrict tailnet membership and ACLs |
| Tailscale Serve | Tailnet HTTPS | Keep OpenCode auth; use Serve for TLS, not as a password replacement |
| Cloudflare Tunnel | Public HTTPS URL | Always use OpenCode auth; Cloudflare Access requires a manual connection with Access headers |
| Reverse proxy | Depends on proxy | Use HTTPS, preserve streaming/WebSocket behavior, and require OpenCode auth |
| SSH forward | Local loopback | Protect the SSH key/account and keep the forwarding client alive |
| Native remote (OpenTunnel) | Public HTTPS | Treat as public; keep auth and do not share the pairing link |
| Cloud Link | Managed tunnel | Protect the store account and device; review the Cloud Link privacy details |

On native iOS and Android builds, non-secret connection details use app storage. Server passwords, custom header values, CA material, and OIDC tokens use Keychain/Keystore-backed secure storage. Pending notification records contain the server URL and username but not the password. Browser builds cannot persist credentials through native secure storage.

## Troubleshooting

### Browser works but the app does not

1. Test the exact API health URL, not only the browser UI.
2. Upgrade to the latest OpenCode Mobile release.
3. If the root serves HTML, enter the API base path, commonly `/api`.
4. Confirm that a reverse proxy forwards SSE and terminal WebSockets as well as ordinary HTTP requests.

### Authentication fails

- For native pairing, run `opencode pair` again if the code expired or was already used.
- For manual connections, match the username and password to the server. The shared service username is `opencode`; its password is generated or set with `opencode service set password`.
- Reconnect after editing connection fields; editing alone intentionally does not start a new connection.

### Connected but no project appears

The server is reachable, but it may not expose a project catalog in the expected context. Refresh **Projects**, confirm the OpenCode version, and inspect **Settings → Diagnostics** for endpoint availability.

### A Desktop or TUI session is missing

Confirm mobile is connected to the same server and project. Desktop's local pairing does not expose remote servers that Desktop has added. See [Connect from Desktop or TUI](/docs/guides/desktop-and-tui/) and [Use multiple OpenCode servers](/docs/guides/multiple-servers/).

### Native pairing will not work

- Confirm both devices are on a network that can reach each other.
- Confirm the server is not listening only on `localhost`.
- Run `opencode pair` again if the code expired or was already used.
- If the camera is unavailable, use a manual connection.

### Cloud Link will not connect

Confirm the app was installed from the App Store or Google Play, the subscription is active, the connector is running on the computer, and the QR code comes from the matching environment. See [Cloud Link](/docs/cloud-link/) and [Troubleshooting](/docs/guides/troubleshooting/).

If the connection still fails, use the complete [OpenCode Mobile troubleshooting checklist](/docs/guides/troubleshooting/).
