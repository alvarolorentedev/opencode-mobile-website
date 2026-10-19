---
title: Set Up OpenCode Mobile
description: Install OpenCode Mobile, start an OpenCode 2 server, pair with a QR code, connect from Android or iOS, and complete your first task.
lastUpdated: 2026-10-19
---

This guide covers the shortest safe path from an OpenCode server to your first completed mobile task. OpenCode 2 is the current primary target; the app also supports OpenCode 1.x servers with manual connections.

## What you need

- An Android device or iPhone/iPad.
- A computer or server running a current OpenCode version.
- A network route from the phone to the server: local network, VPN, tunnel, reverse proxy, SSH forward, or Cloud Link.
- The server URL and password, or a one-time pairing link/QR code.

## 1. Install OpenCode Mobile

Use the [Download page](/download/) to choose an installation method:

- **Google Play (recommended):** install and receive updates through Google Play.
- **Direct GitHub APK:** download and install the latest release manually.
- **iOS TestFlight beta:** join the [OpenCode Mobile TestFlight release](https://testflight.apple.com/join/ddcE5Wzz) and install the beta.

The Android options install the latest Android release; TestFlight installs the iOS beta. See [Download and install](/docs/opencode-android-app/) for platform-specific details.

## 2. Install or update OpenCode

For OpenCode 2, use the current v2 installer:

```bash
curl -fsSL https://opencode.ai/v2/install | bash
```

Or install the CLI with npm:

```bash
npm install -g @opencode/cli
```

Confirm the installed major version:

```bash
opencode --version
```

If you deliberately use an OpenCode 1.x server, install it with the 1.x installer (`https://opencode.ai/install` or `opencode-ai` on npm) and use the V1 startup note below.

## 3. Start OpenCode

### Recommended: OpenCode 2 shared service and pairing

OpenCode 2 normally runs a shared background server. Start it explicitly, confirm its address, and create a pairing link:

```bash
opencode service set password 'use-a-strong-password'
opencode service set port 4096
opencode service start
opencode service status
opencode pair
```

`opencode pair` prints a one-time link and a QR code. Scan the QR code from OpenCode Mobile, or paste the pairing link into the app. Pairing links expire after five minutes and work once.

If the phone is on the same trusted LAN, bind the service to a reachable interface before pairing:

```bash
opencode service set hostname 0.0.0.0
opencode service start
opencode pair
```

Only do this on a trusted network and protect the server with a password. For access through Tailscale, Cloudflare Tunnel, or a reverse proxy, keep the service on loopback and pair with the public URL. If you changed the hostname for LAN access, set it back and restart before pairing:

```bash
opencode service set hostname 127.0.0.1
opencode service start
opencode pair --url https://your-opencode-host.example
```

OpenCode 2 also supports `opencode pair --remote`, which exposes the server through an OpenTunnel address after an explicit confirmation. This is separate from Cloud Link. Treat the tunnel like any other public endpoint and review the [remote-access security guidance](/docs/guides/remote-access-security/).

### Standalone server

`opencode serve` runs the same server in the foreground instead of through the shared background service:

```bash
OPENCODE_SERVER_PASSWORD='use-a-strong-password' \
  opencode serve --hostname 127.0.0.1 --port 4096
```

Use this for an always-on host, a service supervisor, Docker, or a deliberately dedicated server. Pairing requires the shared service, so connect to a standalone server manually with its URL and password.

### OpenCode 1.x

On OpenCode 1.x, start `opencode serve` for the API, or `opencode web` when you also want the browser UI:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'
opencode serve --hostname 127.0.0.1 --port 4096
```

Connect V1 servers manually. Local QR pairing is an OpenCode 2 feature.

### Verify the server

With the shared service running:

```bash
opencode api get /api/info
```

For a manual or external connection, test the exact API base from the phone's network:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/global/health
```

For a path-prefixed proxy, include the prefix:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/api/global/health
```

A healthy response includes `healthy: true` and may include the OpenCode version. If the root displays a web UI and the app reports a 404 or a non-API response, enter the API base URL instead—commonly the same address with `/api`.

## 4. Choose a connection route

| Route | Best for | Phone-side action |
| --- | --- | --- |
| Local network | Phone and server on the same private network | Scan `opencode pair`, or enter the LAN URL |
| Tailscale | Private access across networks | Scan a pair link created with `--url`, or enter the `ts.net` URL |
| Cloudflare Tunnel | Public HTTPS without router port forwarding | Scan a pair link created with `--url`, or enter the tunnel URL |
| Reverse proxy | Existing HTTPS infrastructure or a path prefix | Scan a pair link created with `--url`, or enter the API base |
| SSH local forward | Advanced users with a mobile SSH client | Enter `http://127.0.0.1:4096` manually |
| Cloud Link | Managed access with a store subscription | Scan the connector QR |

Follow [Remote Access](/docs/remote-access/) for the exact commands and security tradeoffs. Use the dedicated [Tailscale](/docs/guides/tailscale/), [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), [local network](/docs/guides/local-network/), or [Cloud Link](/docs/cloud-link/) guide for the route you choose.

## 5. Connect the app

On first launch, onboarding walks through these steps:

1. **Welcome** — continue into setup.
2. **Permissions** — optionally enable notifications and voice input.
3. **Connect** — add a server connection.
4. **Project** — choose an OpenCode project.
5. **Ready** — review the setup and start.

In **Connect**, the Add connection chooser offers:

- **Scan QR code** — scan the link printed by `opencode pair`. The link must contain an address the phone can reach; a loopback-only link will not work across devices unless the phone itself owns that loopback route.
- **Manual** — enter a name (optional), the complete server URL, username, and password.
- **Cloud Link** — pair with a managed connector when the app was installed from the App Store or Google Play and an active subscription is available.

For manual setup, include `https://` and any required path prefix. If a password is set and Username is blank, the client uses `opencode` as the Basic-auth username. Entering the explicit server username is clearer and easier to troubleshoot.

You can skip permissions, connection, or project during onboarding and configure them later in **Settings → Connection** and the **Projects** tab. Editing a saved connection does not reconnect automatically; use **Reconnect** when you want to apply the change.

See [Add or switch connections](/docs/connections/) for saved profiles, pairing details, Cloud Link, and switching servers.

## 6. Select a project

Choose the project during onboarding or later in **Projects**. Refresh the catalog if needed, then open an existing chat or create one.

The selected project scopes chats, files, and terminal activity. OpenCode Mobile remembers the selected project and the last session used for it. If the project does not appear, confirm the server reported it or add the server directory from the project picker.

## 7. Complete your first task

1. Open **Chat** and confirm the expected session title appears at the top.
2. Select the agent and model above the composer.
3. Send a small, verifiable request such as: `Inspect this project and summarize its purpose. Do not change files.`
4. Watch the **Session** tab while OpenCode works.
5. Respond if a permission or question card appears.
6. Open **Files Changed** and confirm that the read-only task produced no edits.

For your first implementation task, ask for one contained change and its related test. Review both the assistant response and **Files Changed** before accepting the result.

## 8. Check optional capabilities

After connecting, use **Settings → Advanced → Diagnostics** and the **Projects** tab to confirm which features the server exposes:

- Provider and model discovery
- Global realtime events
- MCP, LSP, formatter, and health diagnostics
- File status and VCS information
- Experimental worktrees
- PTY terminal support
- Session archive, share, and title summarization on V1
- Saved approval rules on V2

Missing optional endpoints should not prevent core chat use. See [Releases and compatibility](/docs/changelog/) for the V1/V2 capability differences.

## Security notes

- Never expose an unauthenticated OpenCode server to the public internet.
- Prefer Tailscale, Cloudflare Tunnel, or an authenticated HTTPS reverse proxy over router port forwarding.
- Use `0.0.0.0` only for a trusted LAN and restrict the port with the host firewall.
- Set a strong OpenCode service password. Pairing links are credentials: they expire quickly and work once, but they still grant access while valid.
- On native iOS and Android builds, connection passwords are stored in Keychain/Keystore-backed secure storage; non-secret connection details use app storage.
- Treat the device as containing access to your OpenCode server. Rotate credentials if a tunnel URL, device, or password is compromised.
- Cloud Link is optional. Review the [privacy policy](/privacy-policy/) before subscribing.

## If connection still fails

- Confirm the phone can reach the exact API URL.
- Run `opencode service status` and `opencode api get /api/info` on the server.
- Confirm the phone is connected to the same Tailscale tailnet when using Tailscale.
- Check the password against `opencode service set password` or the `OPENCODE_SERVER_PASSWORD` environment variable.
- For local pairing, run `opencode pair` again if the link expired or was already used.
- For a standalone `opencode serve` process, connect manually; pairing requires the shared service.
- If the address returns HTML, 404, or a JSON parse error, use the actual API base path.
- Update to the latest mobile release and check **Settings → Advanced → Diagnostics**.
- Continue with the [connection troubleshooting checklist](/docs/guides/troubleshooting/) before filing a bug.
