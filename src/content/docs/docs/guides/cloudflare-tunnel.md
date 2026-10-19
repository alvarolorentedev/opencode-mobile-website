---
title: OpenCode Mobile with Cloudflare Tunnel
description: Route an authenticated localhost OpenCode 2 server through a temporary or named Cloudflare Tunnel and pair or connect securely from mobile.
lastUpdated: 2026-10-19
---

Cloudflare Tunnel provides a public HTTPS address without router port forwarding. Because the hostname is publicly reachable, OpenCode authentication is mandatory. Use Tailscale instead when access only needs to work between your own devices.

## 1. Start an authenticated OpenCode 2 service

```bash
opencode service set password 'use-a-strong-password'
opencode service set hostname 127.0.0.1
opencode service set port 4096
opencode service start
opencode service status
```

## 2. Choose a temporary or named tunnel

For short testing:

```bash
cloudflared tunnel --url http://127.0.0.1:4096
```

For a stable hostname:

```bash
cloudflared tunnel login
cloudflared tunnel create opencode-mobile
cloudflared tunnel route dns opencode-mobile opencode.example.com
```

Configure the named tunnel:

```yaml
tunnel: opencode-mobile
credentials-file: /home/your-user/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: opencode.example.com
    service: http://127.0.0.1:4096
  - service: http_status:404
```

Then run `cloudflared tunnel run opencode-mobile`.

## 3. Pair or verify

Create a pairing link with the public origin:

```bash
opencode pair --url https://opencode.example.com
```

Scan the QR code in OpenCode Mobile, or paste the link. Pairing links expire after five minutes and work once.

For a manual connection, verify the API first:

```bash
curl -u opencode:use-a-strong-password \
  https://opencode.example.com/global/health
```

Enter `https://opencode.example.com` in the app only after the health endpoint succeeds. If a reverse proxy mounts the API below `/api`, enter that complete base instead.

## OpenCode 1.x or a standalone server

If you use OpenCode 1.x, or deliberately run a foreground server, start `opencode serve` with authentication and connect manually. Pairing requires the OpenCode 2 shared service.

## Production cautions

- Never remove OpenCode authentication because the tunnel uses HTTPS.
- Restrict DNS and Cloudflare account access with strong authentication.
- Confirm that the route supports server-sent events and terminal WebSockets.
- Treat temporary `trycloudflare.com` URLs as public and disposable.
- Cloudflare Access may add protection, but verify that its authentication flow is compatible with the mobile API before relying on it.

If the tunnel works in a browser but not in the app, use the [troubleshooting checklist](/docs/guides/troubleshooting/). Compare this method with [Tailscale](/docs/guides/tailscale/) and read the [remote-access threat model](/docs/guides/remote-access-security/).
