---
title: Access OpenCode Remotely from Mobile
description: Connect OpenCode Mobile to your server through a trusted LAN, Tailscale, Cloudflare Tunnel, reverse proxy, API prefix, or SSH port forward.
---

OpenCode Mobile can connect through a local address, private VPN, HTTPS tunnel, reverse proxy, or a separate SSH port forward. The app needs an OpenCode API base URL; it does not require a specific tunnel provider.

Read the [remote-access security model](/docs/guides/remote-access-security/) before publishing any endpoint.

## Connection requirements

Every method supplies the same three values:

- **Server URL:** origin plus any required API path prefix
- **Username:** `OPENCODE_SERVER_USERNAME`
- **Password:** `OPENCODE_SERVER_PASSWORD`

The client normalizes a missing protocol, preserves configured path prefixes such as `/api`, adds optional HTTP Basic authentication, and scopes session, file, terminal, and event requests to the selected project.

## Choose a method

| Method | Use it when | Guide |
| --- | --- | --- |
| Trusted local network | Phone and server share a private Wi-Fi or LAN | [Local network](/docs/guides/local-network/) |
| Tailscale Serve | Only your own devices need access | [Tailscale](/docs/guides/tailscale/) |
| Cloudflare Tunnel | You need a public HTTPS address | [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/) |
| Reverse proxy or API prefix | OpenCode is mounted under `/api` or another subpath | [Reverse proxy](/docs/guides/reverse-proxy/) |
| SSH local forwarding | A mobile SSH client can hold a port forward open | [SSH forwarding](/docs/guides/ssh-forward/) |

For a decision-focused comparison, see [Use OpenCode from your phone](/docs/guides/use-opencode-from-phone/).

## Security guidance by method

| Method | Exposure | Minimum guidance |
| --- | --- | --- |
| LAN | Private network | Use auth, trusted Wi-Fi, and a private firewall rule |
| Tailscale | Tailnet only | Keep auth enabled and restrict tailnet membership/ACLs |
| Cloudflare Tunnel | Public HTTPS URL | Always use OpenCode auth; consider Cloudflare Access as an additional layer only after confirming API compatibility |
| Reverse proxy | Depends on proxy | Use HTTPS, preserve streaming/WebSocket behavior, and require OpenCode auth |
| SSH forward | Local loopback | Protect the SSH key/account and keep the forwarding client alive |

On native iOS and Android builds, non-secret connection details use app storage and server passwords use `expo-secure-store`. Pending notification records contain the server URL and username but not the password. Browser builds cannot persist passwords through native secure storage.

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

### Connected but no workspace appears

The server is reachable, but it may not expose a project catalog in the expected context. Refresh Workspace, confirm the OpenCode version, and inspect Diagnostics for endpoint availability.

If the connection still fails, use the complete [OpenCode Mobile troubleshooting checklist](/docs/guides/troubleshooting/).
