---
id: remote-access
title: Remote Access
slug: /remote-access
---

# Remote Access

This is the practical setup for reaching OpenCode from your phone.

## Recommended architecture

Use this shape:

1. Run OpenCode on your desktop, server, or always-on workstation
2. Protect it with `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`
3. Keep OpenCode bound to `127.0.0.1`
4. Expose it through a tunnel such as Cloudflare Tunnel
5. Connect the mobile app to the public HTTPS URL from the tunnel

That keeps the OpenCode process private on the host machine while still making it reachable remotely.

## Option A: headless server for the mobile client

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='change-this-password'

opencode serve --hostname 127.0.0.1 --port 4096
```

This is the simplest remote setup for a dedicated mobile client.

## Option B: web UI plus mobile access

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='change-this-password'

opencode web --hostname 127.0.0.1 --port 4096
```

Use this when you also want to open the built-in web interface in a browser.

## Expose it with Cloudflare Tunnel

If `cloudflared` is installed, the quickest path is:

```bash
cloudflared tunnel --url http://127.0.0.1:4096
```

Cloudflare will print a public HTTPS URL that forwards traffic to your local OpenCode server.

Use that HTTPS URL in the mobile app's `Server URL` field.

## Named tunnel setup

For a more stable setup on your own domain, use a named Cloudflare Tunnel.

Typical flow:

```bash
cloudflared tunnel login
cloudflared tunnel create opencode-mobile
cloudflared tunnel route dns opencode-mobile opencode.example.com
```

Example config:

```yaml
tunnel: opencode-mobile
credentials-file: /home/your-user/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: opencode.example.com
    service: http://127.0.0.1:4096
  - service: http_status:404
```

Then run:

```bash
cloudflared tunnel run opencode-mobile
```

Now the mobile app can connect to `https://opencode.example.com`.

## Mobile app setup

Based on the settings screenshot, fill in:

- `Server URL`: the tunnel URL, for example `https://opencode.example.com`
- `Username`: the value from `OPENCODE_SERVER_USERNAME`
- `Password`: the value from `OPENCODE_SERVER_PASSWORD`

Tap `Reconnect` and wait for the connection status to turn healthy.

## Workspace flow after connecting

After authentication succeeds:

1. Open the `Workspace` tab
2. Tap `Refresh` if the project list is stale
3. Pick the workspace that should back the chat session
4. Return to `Chat` and start or continue the task

## Security guidance

- Keep OpenCode bound to `127.0.0.1` when you are using a tunnel
- Always set a server password before exposing it remotely
- Prefer HTTPS tunnel URLs over opening a raw port on your router
- Use a dedicated subdomain instead of reusing a broad personal domain path
- Rotate the password if you suspect the URL or credentials were shared

## Troubleshooting

### Tunnel works but login fails

Usually the username or password in the mobile app does not match the OpenCode server environment variables.

### Tunnel opens but no workspaces appear

The OpenCode process is reachable, but the server may not be running in the expected project context yet.

### Local machine works but phone cannot connect

Check that the tunnel is running and that the mobile app is using the public HTTPS URL, not `localhost` or `127.0.0.1`.
