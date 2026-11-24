---
title: Fix OpenCode Mobile Connection Problems
description: Diagnose OpenCode Mobile authentication, native pairing, Desktop sessions, multiple servers, Tailscale, Cloudflare, proxies, realtime, and missing projects.
lastUpdated: 2026-11-24
---

Debug the connection from the server outward. Reinstalling the app before proving the API is reachable usually wastes time.

## Start with the symptom

| Symptom | Most likely area |
| --- | --- |
| Server URL cannot be reached | Network route, firewall, VPN, tunnel, or wrong address |
| HTML page, 404, or JSON parse error | Wrong API base or missing `/api` prefix |
| 401 or 403 | Server username/password, custom gateway headers, OIDC, or Cloud Link access |
| Certificate rejected | Custom CA does not match the host, expired, or not trusted |
| OIDC sign-in loops | Issuer, client ID, scopes, redirect URI, or revoked refresh grant |
| Connected but no project appears | Project catalog, server context, or permission |
| A Desktop or TUI session is missing | Different server, different project, archived session, or Desktop-only remote server |
| Messages update only after refresh | SSE blocked or polling fallback |
| Terminal fails while chat works | PTY endpoint or WebSocket forwarding |
| File save is rejected | File changed, editing unsupported, or V2 conflict |
| Model is missing | Provider configuration, model visibility, or routing |
| Native pairing fails | Loopback-only address, expired code, missing shared service, or different networks |
| Cloud Link is missing or inactive | Store install, subscription, connector, or environment |
| Notifications are delayed | Battery optimization, iOS scheduling, or app lifecycle |

## 1. Confirm versions and server mode

Update OpenCode Mobile and use a current OpenCode release. OpenCode 2 is the primary target and normally runs as a shared background service:

```bash
opencode --version
opencode service status
opencode api get /api/info
```

Start it with `opencode service start` if needed. For a foreground server, use `opencode serve`; OpenCode 1.x also supports `opencode web` for the browser UI. Pairing requires the OpenCode 2 shared service, so a standalone server uses manual connection details.

Check **Settings → Diagnostics** for the OpenCode version, health status, realtime state, network behavior, local logs, and last app error.

## 2. Test the exact API base

Append `/global/health` to the same base URL entered in the app:

```bash
curl -i -u your-user:your-password \
  https://your-opencode-host.example/global/health
```

Expected: a successful HTTP response containing OpenCode health data.

- **HTML response:** you probably entered the web UI rather than the API base.
- **404:** check whether the API is mounted below `/api` or another prefix.
- **401/403:** for the OpenCode 2 shared service, verify the password with `opencode service get password` or the password you set; for a standalone or V1 server, verify `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`. For Cloud Link, check subscription access.
- **Timeout/DNS failure:** fix the network, tunnel, VPN, or hostname before changing the app.

### Gateway headers, certificates, and OIDC

- **401 or 403 behind Cloudflare Access, Authelia, or oauth2-proxy:** confirm the connection's custom header names and values, then reconnect. Native pairing and Cloud Link profiles do not carry custom headers.
- **Certificate rejected:** import the correct PEM or DER certificate for the same `host:port`, confirm it has not expired, and reconnect. The custom CA is hidden and cleared on OpenCode 1.x.
- **OIDC loops or expires:** confirm the issuer, client ID, scopes, token header, and registered redirect URI. A revoked refresh grant requires **Sign in again**; a temporary provider outage should preserve the session.
- **OIDC is unavailable:** it requires HTTPS except for loopback development, and Cloud Link connections do not offer it.

## 3. Check the selected transport

For [Tailscale](/docs/guides/tailscale/), confirm both devices are connected to the same tailnet, ACLs allow the route, and the OpenCode port is reachable. For a direct tailnet route, use `tailscale status` and the address/port from `opencode service status`. For Tailscale Serve, `tailscale serve status` must point at the OpenCode port.

For [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), confirm `cloudflared` is running, the hostname resolves, ingress targets `127.0.0.1:<opencode-port>` from `opencode service status`, and authentication remains enabled. If Cloudflare Access protects the hostname, use a manual connection with Access headers rather than native pairing.

For a [reverse proxy](/docs/guides/reverse-proxy/), preserve the API prefix, authorization header, server-sent events, and WebSocket upgrade headers. A path-prefixed API must use a manual connection.

For a [local network](/docs/guides/local-network/) connection, use the machine's LAN address, allow the actual port on the private firewall profile, and disable Wi-Fi client isolation if devices cannot reach each other.

For an [SSH forward](/docs/guides/ssh-forward/), confirm the phone owns the forwarding session and the SSH app is still running.

## 4. Native pairing

- Confirm `opencode service status` shows a running OpenCode 2 service.
- Run `opencode pair` again if the link expired or was already used. Links expire after five minutes and work once.
- If pairing is disabled, run `opencode service unset disabled`; pairing requires the shared service.
- Confirm the server listens on an address reachable from the phone, not only `localhost`.
- If the app reports a loopback-only link, bind the service to a trusted reachable interface and pair again.
- For a public URL, create the link with `opencode pair --url https://your-host.example`.
- OpenCode Mobile scans the QR code. It does not accept a pasted native pairing link; use **Manual** if the camera is unavailable.
- Confirm camera permission is allowed.

A standalone `opencode serve` process cannot pair; use a manual URL and password instead. See [Add or switch connections](/docs/connections/) for the full flow.

## 5. Desktop, TUI, and multiple-server problems

- **A Desktop or TUI session is missing:** confirm mobile is connected to the same server and project. Opening the same computer is not enough if Desktop uses a different remote server.
- **Desktop has several servers but mobile shows one:** Desktop's aggregation is client-side. Native pairing exposes only its local server. Add each remote server to mobile separately.
- **Mobile shows several servers unexpectedly:** check **Settings → Connection**. Saved profiles can stay connected and appear in the chat library.
- **A session opens on the wrong server:** session IDs are server-specific. Open the session from the library, which switches to its owning connection.
- **The transcript updates in two clients but drafts do not:** server-side state is shared; unsent drafts and open tabs are local to each client.

See [Connect from Desktop or TUI](/docs/guides/desktop-and-tui/) and [Use multiple OpenCode servers](/docs/guides/multiple-servers/).

## 6. Cloud Link

- Confirm the app was installed from the App Store or Google Play.
- Confirm the subscription is active, or use **Restore purchases**.
- Confirm the connector is running on the computer.
- Use a fresh connector QR code from the matching environment.
- Approve the connection on the computer if prompted.
- If access expired, reconnect and renew the subscription if needed.

See [Cloud Link](/docs/cloud-link/) for setup, machines, and exposed services.

## 7. Interpret the app state

- **Connected but no project appears:** refresh **Projects**, confirm the server reported a project, and inspect diagnostics.
- **Messages update only after refresh:** inspect realtime status and proxy support for the event stream.
- **Terminal fails but chat works:** verify project PTY endpoints and WebSocket forwarding. Terminal support is optional.
- **File save fails:** reopen the file, check that the connected contract supports editing, and retry after resolving the conflict.
- **File actions are missing:** copy, move, rename, and delete require OpenCode 2 and the server shell utilities.
- **A model is missing:** provider authentication and model visibility are server settings; use [Providers and models](/docs/guides/providers-and-models/) or [Automatic model routing](/docs/guides/auto-model-routing/).
- **Extensions are missing:** extension management requires OpenCode 2. On V1, use the MCP tab under Diagnostics.
- **Diagnostics are missing:** the connected server may not expose those optional endpoints.
- **Voice recognition fails:** check the permission, locale, recognizer availability, and on-device model status in **Settings → Voice & audio**.

## 8. Collect a useful bug report

Include:

- mobile release and platform;
- OpenCode version and V1/V2 contract;
- connection method (native pairing, manual, Tailscale, Cloudflare, proxy, SSH, or Cloud Link);
- sanitized API base shape;
- health-response status and visible error;
- whether the issue affects chat, realtime, terminal, files, or notifications.

Never include passwords, provider keys, private hostnames, pairing tokens, customer data, or source code.

Search the [public issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues) before opening a duplicate. Security-sensitive reports belong on the [private security contact page](/security/).
