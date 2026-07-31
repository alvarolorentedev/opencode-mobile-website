---
id: cloudflare-tunnel
title: OpenCode Mobile with Cloudflare Tunnel
description: Route an authenticated localhost OpenCode server through a temporary or named Cloudflare Tunnel and connect securely from Android.
slug: /guides/cloudflare-tunnel
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# Connect OpenCode Mobile with Cloudflare Tunnel

Cloudflare Tunnel provides a public HTTPS address without router port forwarding. Because the hostname is publicly reachable, OpenCode authentication is mandatory. Use Tailscale instead when access only needs to work between your own devices.

## 1. Start an authenticated local server

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'
opencode serve --hostname 127.0.0.1 --port 4096
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

## 3. Verify the API

```bash
curl -u your-user:use-a-strong-password \
  https://opencode.example.com/global/health
```

Enter `https://opencode.example.com` in the app only after the health endpoint succeeds. If a reverse proxy mounts the API below `/api`, enter that complete base instead.

## Production cautions

- Never remove OpenCode Basic authentication because the tunnel uses HTTPS.
- Restrict DNS and Cloudflare account access with strong authentication.
- Confirm that the route supports server-sent events and terminal WebSockets.
- Treat temporary `trycloudflare.com` URLs as public and disposable.
- Cloudflare Access may add protection, but verify that its authentication flow is compatible with the mobile API before relying on it.

If the tunnel works in a browser but not in the app, use the [troubleshooting checklist](./troubleshooting.md). Compare this method with [Tailscale](./tailscale.md) and read the [remote-access threat model](./remote-access-security.md).
