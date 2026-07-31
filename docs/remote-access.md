---
id: remote-access
title: Access OpenCode Remotely from Android
description: Connect OpenCode Mobile to your server through a trusted LAN, Tailscale, Cloudflare Tunnel, reverse proxy, API prefix, or SSH port forward.
sidebar_label: Remote Access Overview
slug: /remote-access
---

# Access OpenCode remotely from Android

OpenCode Mobile can connect through a local address, private VPN, HTTPS tunnel, reverse proxy, or a separate SSH port forward. The app needs an OpenCode API base URL; it does not require a specific tunnel provider.

For step-by-step setup, open the [Tailscale guide](./guides/tailscale.md) or [Cloudflare Tunnel guide](./guides/cloudflare-tunnel.md). Read the [remote-access security model](./guides/remote-access-security.md) before publishing any endpoint.

## Connection requirements

Every method supplies the same three values:

- **Server URL:** origin plus any required API path prefix
- **Username:** `OPENCODE_SERVER_USERNAME`
- **Password:** `OPENCODE_SERVER_PASSWORD`

The client normalizes a missing protocol, preserves configured path prefixes such as `/api`, adds optional HTTP Basic authentication, and scopes session, file, terminal, and event requests to the selected project.

## Method 1: trusted local network

Use this when the phone and OpenCode machine are on the same private Wi-Fi or LAN.

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'

opencode serve --hostname 0.0.0.0 --port 4096
```

Find the machine's private address, then enter a URL such as:

```text
http://192.168.1.20:4096
```

Allow TCP port `4096` only on the private-network firewall profile. Do not forward this port through your router or use this approach on an untrusted network.

## Method 2: Tailscale Serve

Tailscale keeps the OpenCode process bound to loopback while providing a private HTTPS address inside your tailnet.

Start OpenCode:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'

opencode serve --hostname 127.0.0.1 --port 4096
```

Publish it inside the tailnet:

```bash
tailscale serve --bg 4096
tailscale serve status
```

The status output provides an address similar to:

```text
https://machine-name.tailnet-name.ts.net
|-- / proxy http://127.0.0.1:4096
```

Install Tailscale on the phone, sign in to the same tailnet, and enter the HTTPS address in OpenCode Mobile.

Verify from a tailnet-connected device:

```bash
curl -u your-user:use-a-strong-password \
  https://machine-name.tailnet-name.ts.net/global/health
```

The failure reported in [GitHub issue #1](https://github.com/alvarolorentedev/opencode-mobile/issues/1) affected endpoints that worked in a browser but failed in the app. The fix preserves configured API prefixes and request bodies, improves invalid-URL and non-API error messages, and was validated by the maintainer with Tailscale and Cloudflare before the issue was closed. Use the latest release.

## Method 3: Cloudflare Tunnel

### Quick tunnel

With OpenCode bound to `127.0.0.1:4096`:

```bash
cloudflared tunnel --url http://127.0.0.1:4096
```

Cloudflare prints a temporary public HTTPS URL. Enter that URL in the app and keep OpenCode authentication enabled.

### Named tunnel

For a stable hostname:

```bash
cloudflared tunnel login
cloudflared tunnel create opencode-mobile
cloudflared tunnel route dns opencode-mobile opencode.example.com
```

Example configuration:

```yaml
tunnel: opencode-mobile
credentials-file: /home/your-user/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: opencode.example.com
    service: http://127.0.0.1:4096
  - service: http_status:404
```

Run it:

```bash
cloudflared tunnel run opencode-mobile
```

Use `https://opencode.example.com` in the app.

## Method 4: reverse proxy or API path prefix

OpenCode Mobile accepts a base URL with a prefix, for example:

```text
https://dev.example.com/api
```

With that setting, health and session calls stay under the prefix, such as:

```text
https://dev.example.com/api/global/health
```

Terminal WebSockets also preserve the prefix and switch to `wss:` for HTTPS endpoints.

Use this form when:

- `/` serves a web application instead of the OpenCode API
- A proxy mounts OpenCode under `/api` or another subpath
- The app reports that the server returned HTML, a JSON parse error, 404, or another non-API response

Do not append `/api` blindly. Verify the resulting `/global/health` endpoint first.

## Method 5: SSH local forwarding

An Android SSH client or terminal app can keep a local port forward open:

```bash
ssh -N -L 4096:127.0.0.1:4096 your-user@your-server
```

While the tunnel is active, use:

```text
http://127.0.0.1:4096
```

This transport is managed by the separate SSH client, not OpenCode Mobile. Background restrictions on the SSH app can interrupt the connection.

## Security guidance by method

| Method | Exposure | Minimum guidance |
| --- | --- | --- |
| LAN | Private network | Use auth, trusted Wi-Fi, and a private firewall rule |
| Tailscale | Tailnet only | Keep auth enabled and restrict tailnet membership/ACLs |
| Cloudflare Tunnel | Public HTTPS URL | Always use OpenCode auth; consider Cloudflare Access as an additional layer only after confirming API compatibility |
| Reverse proxy | Depends on proxy | Use HTTPS, preserve streaming/WebSocket behavior, and require OpenCode auth |
| SSH forward | Local loopback | Protect the SSH key/account and keep the forwarding client alive |

Connection credentials are stored locally by the app using AsyncStorage so it can reconnect and perform supported background completion checks. This is convenient but is not equivalent to an OS secure credential store.

## Troubleshooting

### Browser works but the app does not

1. Test the exact API health URL, not only the browser UI.
2. Upgrade to the latest OpenCode Mobile release.
3. If the root serves HTML, enter the API base path, commonly `/api`.
4. Confirm that a reverse proxy forwards SSE and terminal WebSockets as well as ordinary HTTP requests.

### Tailscale address does not connect

- Confirm Tailscale is connected on the phone and server.
- Confirm both devices are in the same tailnet and permitted by ACLs.
- Run `tailscale serve status` and verify the proxy target.
- Open the HTTPS `/global/health` URL from the phone.

### Local-network address does not connect

- Use the machine's LAN address, not `localhost` or `127.0.0.1`.
- Confirm OpenCode is listening on `0.0.0.0` or the specific LAN interface.
- Allow the port through the private-network firewall profile.
- Disable client isolation on the Wi-Fi network if devices cannot reach each other.

### Authentication fails

- Match the username and password to `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`.
- If Password is set but Username is blank, the app defaults the Basic-auth username to `opencode`.
- Reconnect after editing connection fields; editing alone intentionally does not start a new connection.

### Connected but no workspace appears

The server is reachable, but it may not expose a project catalog in the expected context. Refresh Workspace, confirm the OpenCode version, and inspect Diagnostics for endpoint availability.

If the connection still fails, use the complete [OpenCode Mobile troubleshooting checklist](./guides/troubleshooting.md).
