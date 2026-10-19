---
title: Set Up OpenCode Mobile
description: Install OpenCode Mobile, start and secure an OpenCode server, connect with a URL, local QR code, or Cloud Link, and complete your first task.
lastUpdated: 2026-10-19
---

This guide covers the shortest safe path from an OpenCode server to your first completed mobile task.

## What you need

- An Android device or iPhone/iPad.
- A computer or server running a current OpenCode version.
- A network route from the phone to the server: local network, VPN, tunnel, reverse proxy, SSH forward, or Cloud Link.
- The server URL and the username/password configured for OpenCode, if authentication is enabled.

## 1. Install OpenCode Mobile

Use the [Download page](/download/) to choose an installation method:

- **Google Play (recommended):** install and receive updates through Google Play.
- **Direct GitHub APK:** download and install the latest release manually.
- **iOS TestFlight beta:** join the [OpenCode Mobile TestFlight release](https://testflight.apple.com/join/ddcE5Wzz) and install the beta.

The Android options install the latest Android release; TestFlight installs the iOS beta. See [Download and install](/docs/opencode-android-app/) for platform-specific details.

## 2. Start the server

For a dedicated mobile client, use `opencode serve`:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'

opencode serve --hostname 127.0.0.1 --port 4096
```

Use `opencode web` when you also want the built-in browser UI:

```bash
export OPENCODE_SERVER_USERNAME=your-user
export OPENCODE_SERVER_PASSWORD='use-a-strong-password'

opencode web --hostname 127.0.0.1 --port 4096
```

Keep a stable port so the app, tunnel, and reverse proxy do not need repeated updates. OpenCode Mobile detects OpenCode 1.x (V1) and 2.x (V2) contracts and shows the actions the connected server supports.

## 3. Choose a connection route

| Route | Best for | Phone-side URL or action |
| --- | --- | --- |
| Trusted LAN | Phone and server on the same private network | `http://192.168.1.20:4096` |
| Local QR | Quick setup on the same network (OpenCode 2) | Run `opencode pair` and scan |
| Tailscale | Private access across networks | `https://machine-name.tailnet-name.ts.net` |
| Cloudflare Tunnel | Public HTTPS without router port forwarding | `https://opencode.example.com` |
| Reverse proxy | Existing HTTPS infrastructure or a path prefix | `https://dev.example.com/api` |
| SSH local forward | Advanced users with a mobile SSH client | `http://127.0.0.1:4096` |
| Cloud Link | Managed access with a store subscription | Scan the connector QR |

Follow [Remote Access](/docs/remote-access/) for exact commands and security tradeoffs. Use the dedicated [Tailscale](/docs/guides/tailscale/), [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), [local network](/docs/guides/local-network/), or [Cloud Link](/docs/cloud-link/) guide for the route you choose.

## 4. Connect the app

On first launch, onboarding walks through these steps:

1. **Welcome** — continue into setup.
2. **Permissions** — optionally enable notifications and voice input.
3. **Connect** — add a server connection.
4. **Project** — choose an OpenCode project.
5. **Ready** — review the setup and start.

In **Connect**, the Add connection chooser offers:

- **Scan QR code** — on an OpenCode 2 server, run `opencode pair` on the computer and scan the code. The phone and server must be on a reachable network; a code containing only `localhost` cannot work from the phone.
- **Manual** — enter a name (optional), the complete server URL, username, and password.
- **Cloud Link** — pair with a managed connector when the app was installed from the App Store or Google Play and an active subscription is available.

For manual setup, include `https://` and any required path prefix. If a password is set and Username is blank, the client uses `opencode` as the Basic-auth username. Entering the explicit server username is clearer and easier to troubleshoot.

You can skip permissions, connection, or project during onboarding and configure them later in **Settings → Connection** and the **Projects** tab. Editing a saved connection does not reconnect automatically; use **Reconnect** when you want to apply the change.

See [Add or switch connections](/docs/connections/) for saved profiles, local QR details, Cloud Link, and switching servers.

## 5. Select a project

Choose the project during onboarding or later in **Projects**. Refresh the catalog if needed, then open an existing chat or create one.

The selected project scopes chats, files, and terminal activity. OpenCode Mobile remembers the selected project and the last session used for it. If the project does not appear, confirm the server reported it or add the server directory from the project picker.

## 6. Verify the API endpoint

Test the same base URL you plan to enter in the app:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/global/health
```

For a path-prefixed proxy, include the prefix:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/api/global/health
```

A healthy response includes `healthy: true` and may include the OpenCode version. Do not assume that a browser-rendered page is the API base. If the root displays a web UI and the app reports a 404 or a non-API response, enter the API base URL instead—commonly the same address with `/api`.

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
- On native iOS and Android builds, connection passwords are stored in Keychain/Keystore-backed secure storage; non-secret connection details use app storage.
- Treat the device as containing access to your OpenCode server. Rotate credentials if a tunnel URL, device, or password is compromised.
- Cloud Link is optional. Review the [privacy policy](/privacy-policy/) before subscribing.

## If connection still fails

- Confirm the phone can reach the exact `/global/health` URL.
- Confirm the phone is connected to the same Tailscale tailnet when using Tailscale.
- Check the username and password against the server environment variables.
- For local QR, confirm the server is reachable beyond `localhost`.
- If the address returns HTML, 404, or a JSON parse error, use the actual API base path.
- Update to the latest mobile release and check **Settings → Advanced → Diagnostics**.
- Continue with the [connection troubleshooting checklist](/docs/guides/troubleshooting/) before filing a bug.
