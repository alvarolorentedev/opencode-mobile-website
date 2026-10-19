---
title: Access OpenCode Remotely from Mobile
description: Connect OpenCode Mobile through a trusted LAN, local QR pairing, Tailscale, Cloudflare Tunnel, reverse proxy, SSH forward, or Cloud Link.
lastUpdated: 2026-10-19
---

OpenCode Mobile can connect through a local address, private VPN, HTTPS tunnel, reverse proxy, SSH forward, or managed Cloud Link machine. The app needs an OpenCode API base URL; it does not require a specific tunnel provider.

Read the [remote-access security model](/docs/guides/remote-access-security/) before publishing any endpoint.

## Two separate decisions

1. **How will you reach the server?** Choose a LAN, VPN, tunnel, proxy, SSH forward, or Cloud Link.
2. **How will you add the connection in the app?** Use manual details, a local QR code, or Cloud Link.

The [connection guide](/docs/connections/) covers the in-app flow. This page compares the network routes.

## Connection requirements

Every manual route supplies the same three values:

- **Server URL:** origin plus any required API path prefix
- **Username:** `OPENCODE_SERVER_USERNAME`
- **Password:** `OPENCODE_SERVER_PASSWORD`

The client normalizes a missing protocol, preserves configured path prefixes such as `/api`, adds optional HTTP Basic authentication, and scopes session, file, terminal, and event requests to the selected project.

## Choose a route

| Method | Use it when | Guide |
| --- | --- | --- |
| Local network | Phone and server share a private Wi-Fi or LAN | [Local network](/docs/guides/local-network/) |
| Local QR | You want same-network setup without typing the address | [Add or switch connections](/docs/connections/) |
| Tailscale Serve | Only your own devices need access | [Tailscale](/docs/guides/tailscale/) |
| Cloudflare Tunnel | You need a public HTTPS address without router port forwarding | [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/) |
| Reverse proxy or API prefix | OpenCode is mounted under `/api` or another subpath | [Reverse proxy](/docs/guides/reverse-proxy/) |
| SSH local forwarding | A mobile SSH client can hold a port forward open | [SSH forwarding](/docs/guides/ssh-forward/) |
| Cloud Link | You want managed remote access with a store subscription | [Cloud Link](/docs/cloud-link/) |

For a decision-focused comparison, see [Use OpenCode from your phone](/docs/guides/use-opencode-from-phone/). For the in-app choices, see [Add or switch connections](/docs/connections/).

## Local QR versus Cloud Link

These are different features:

- **Local QR** is a free, same-network setup shortcut on OpenCode 2 servers that support pairing. Run `opencode pair` on the computer and scan the code. The server must be reachable from the phone; a code containing only `localhost` will not work.
- **Cloud Link** is an optional paid remote-access service for store-installed iOS and Android builds. It uses a desktop connector and a subscription to provide a managed route. It is not available in direct APK, F-Droid/FOSS, or web builds.

If you already have Tailscale or a reliable tunnel, you do not need Cloud Link.

## Security guidance by method

| Method | Exposure | Minimum guidance |
| --- | --- | --- |
| LAN | Private network | Use auth, trusted Wi-Fi, and a private firewall rule |
| Tailscale | Tailnet only | Keep auth enabled and restrict tailnet membership/ACLs |
| Cloudflare Tunnel | Public HTTPS URL | Always use OpenCode auth; consider Cloudflare Access only after confirming API compatibility |
| Reverse proxy | Depends on proxy | Use HTTPS, preserve streaming/WebSocket behavior, and require OpenCode auth |
| SSH forward | Local loopback | Protect the SSH key/account and keep the forwarding client alive |
| Cloud Link | Managed tunnel | Protect the store account and device; review the Cloud Link privacy details |

On native iOS and Android builds, non-secret connection details use app storage and server passwords use Keychain/Keystore-backed secure storage. Pending notification records contain the server URL and username but not the password. Browser builds cannot persist passwords through native secure storage.

## Troubleshooting

### Browser works but the app does not

1. Test the exact API health URL, not only the browser UI.
2. Upgrade to the latest OpenCode Mobile release.
3. If the root serves HTML, enter the API base path, commonly `/api`.
4. Confirm that a reverse proxy forwards SSE and terminal WebSockets as well as ordinary HTTP requests.

### Authentication fails

- Match the username and password to `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`.
- If Password is set but Username is blank, the app defaults the Basic-auth username to `opencode`.
- Reconnect after editing connection fields; editing alone intentionally does not start a new connection.

### Connected but no project appears

The server is reachable, but it may not expose a project catalog in the expected context. Refresh **Projects**, confirm the OpenCode version, and inspect **Settings → Advanced → Diagnostics** for endpoint availability.

### Local QR will not pair

- Confirm both devices are on a network that can reach each other.
- Confirm the server is not listening only on `localhost`.
- Run `opencode pair` again if the code expired or was already used.

### Cloud Link will not connect

Confirm the app was installed from the App Store or Google Play, the subscription is active, the connector is running on the computer, and the QR code comes from the matching environment. See [Cloud Link](/docs/cloud-link/) and [Troubleshooting](/docs/guides/troubleshooting/).

If the connection still fails, use the complete [OpenCode Mobile troubleshooting checklist](/docs/guides/troubleshooting/).
