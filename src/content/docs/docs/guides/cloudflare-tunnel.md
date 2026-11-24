---
title: OpenCode Mobile with Cloudflare Tunnel
description: Route an authenticated loopback OpenCode 2 server through a temporary or named Cloudflare Tunnel and pair or connect securely from mobile.
lastUpdated: 2026-11-24
---

Cloudflare Tunnel provides a public HTTPS address without router port forwarding. Because the hostname is publicly reachable, OpenCode authentication is mandatory. Use Tailscale instead when access only needs to work between your own devices.

## 1. Start an authenticated OpenCode 2 service

```bash
opencode service set hostname 127.0.0.1
opencode service start
opencode service status
```

Use the address and port from `opencode service status`; you do not need to change the port. The service generates a password by default. To choose one:

```bash
opencode service set password 'use-a-strong-password'
opencode service start
```

## 2. Choose a temporary or named tunnel

For short testing, put the port from `opencode service status` in this command:

```bash
cloudflared tunnel --url http://127.0.0.1:<port>
```

For a stable hostname:

```bash
cloudflared tunnel login
cloudflared tunnel create opencode-mobile
cloudflared tunnel route dns opencode-mobile opencode.example.com
```

Configure the named tunnel with the same local port:

```yaml
tunnel: opencode-mobile
credentials-file: /home/your-user/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: opencode.example.com
    service: http://127.0.0.1:<port>
  - service: http_status:404
```

Then run `cloudflared tunnel run opencode-mobile`.

## 3. Pair or verify

Create a pairing link with the public origin:

```bash
opencode pair --url https://opencode.example.com
```

Scan the QR code in OpenCode Mobile. The app scans native pairing codes; it does not accept a pasted link. If you cannot use the camera, use a manual connection with the URL and password.

Pairing links expire after five minutes and work once. The session lasts 30 days.

For a manual connection, verify the API first:

```bash
curl -u opencode:use-a-strong-password \
  https://opencode.example.com/global/health
```

Enter `https://opencode.example.com` in the app only after the health endpoint succeeds. If a reverse proxy mounts the API below `/api`, enter that complete base instead.

## Cloudflare Access

Native pairing cannot carry Cloudflare Access service-token headers. If Access protects the hostname, use a **Manual** connection with the `CF-Access-Client-Id` and `CF-Access-Client-Secret` headers, or use OIDC where appropriate. Pairing alone will be rejected by the gateway.

## OpenCode 1.x or a standalone server

If you use OpenCode 1.x, or deliberately run a foreground server, start `opencode serve` with authentication and connect manually. Pairing requires the OpenCode 2 shared service.

## Production cautions

- Never remove OpenCode authentication because the tunnel uses HTTPS.
- Restrict DNS and Cloudflare account access with strong authentication.
- Confirm that the route supports server-sent events and terminal WebSockets.
- Treat temporary `trycloudflare.com` URLs as public and disposable.
- If Access is enabled, verify that the app's manual headers or OIDC flow reach the API before relying on it.

If the tunnel works in a browser but not in the app, use the [troubleshooting checklist](/docs/guides/troubleshooting/). Compare this method with [Tailscale](/docs/guides/tailscale/) and read the [remote-access threat model](/docs/guides/remote-access-security/).
