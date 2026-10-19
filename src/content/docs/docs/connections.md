---
title: Connect OpenCode Mobile to Your Server
description: Add, save, and switch OpenCode server connections using a URL, local QR pairing, or Cloud Link, and understand how credentials are stored.
lastUpdated: 2026-10-19
---

Use **Settings → Connection** to add a server, switch between saved servers, edit a profile, or reconnect. The app can keep multiple connection profiles, and every project, session, favorite, notification record, and terminal tab is scoped to the active connection.

## Choose how to add a connection

| Method | Best for | Requirements |
| --- | --- | --- |
| **Manual** | Any reachable server | Server URL, optional username, password |
| **Scan QR code** | Fast setup on the same network | `opencode pair`, camera, reachable server |
| **Cloud Link** | Managed access over the internet | Store-installed app, active subscription, desktop connector |

These are different from the network route. A manual connection can use a LAN, Tailscale, Cloudflare Tunnel, or reverse proxy. Cloud Link is its own managed route. See [Remote access](/docs/remote-access/).

## Add a manual connection

1. Open **Settings → Connection**.
2. Tap **Add connection**.
3. Choose **Manual**.
4. Enter a name, server URL, username, and password.
5. Tap **Save & connect**.

The name is optional; the app uses the normalized hostname when it is blank. The server URL should include the protocol and any required path prefix, for example `https://dev.example.com/api`. The app preserves the prefix for API, event, file, and terminal requests.

If a password is set and the username is blank, the app uses `opencode` as the Basic-auth username. Entering the configured username explicitly is easier to troubleshoot.

After the address is entered, the app probes the server without switching the active connection. You can go back, change fields, and retry without losing the form values.

## Add a local QR connection

Local QR pairing is an OpenCode 2 flow and requires the shared background service. On the computer running OpenCode:

```bash
opencode service set password 'use-a-strong-password'
opencode service set port 4096
opencode service start
opencode service status
opencode pair
```

`opencode pair` prints a one-time link and QR code. In the app, open **Settings → Connection → Add connection → Scan QR code** and scan it. A successful scan saves the profile and connects automatically. Links expire after five minutes and work once.

The server must listen on an address the phone can reach. If the phone is on the same trusted LAN, bind the shared service before pairing:

```bash
opencode service set hostname 0.0.0.0
opencode service start
opencode pair
```

A link containing only `localhost` or `127.0.0.1` cannot work from another device. Only expose the server on a trusted network. Local QR pairing does not require a Cloud Link subscription. Camera scanning is available on native builds; FOSS builds omit the camera module and keep manual entry.

For a public Tailscale, Cloudflare, or reverse-proxy URL, keep the service on loopback and create the link with that origin:

```bash
opencode service set hostname 127.0.0.1
opencode service start
opencode pair --url https://your-opencode-host.example
```

Pairing requires the shared service. A standalone `opencode serve` process must be connected manually. If the code is invalid or expired, run `opencode pair` again. A failed save or connection keeps the redeemed credential so you can retry without pairing again.

## Add a Cloud Link machine

Cloud Link is the managed option. It requires an app installed from the App Store or Google Play, an active subscription, and the Cloud Link connector running on the computer. Direct APK, F-Droid/FOSS, and web builds do not show the Cloud Link section.

Open **Settings → Cloud Link**, then follow the guided steps to subscribe or restore access, scan the connector QR code, approve the connection on the computer, and connect. See [Cloud Link](/docs/cloud-link/) for the full flow and limits.

## Manage saved connections

Each saved connection appears as a collapsible row in **Settings → Connection**:

- **Connect** switches to that server.
- **Edit** updates the saved profile. Editing the active connection does not reconnect automatically; use **Reconnect** to apply it.
- **Delete** removes a saved profile after confirmation. The active connection cannot be deleted.
- The active row shows an **Active** or **Connecting** badge.
- The current unsaved connection appears as **Current connection** until you save it.

Switching connections saves the outgoing profile's model selection, restores the target profile's selection, clears server-derived state, and reconnects. A session running on the previous server is not transferred; notifications and remembered sessions are kept per connection.

## Credentials and privacy

- Non-secret metadata such as the connection name, URL, username, and model selection is stored in app storage.
- Server passwords are stored in Keychain/Keystore-backed secure storage on native builds.
- Notification records store the server URL and username but never the password.
- Browser builds cannot persist passwords through native secure storage.
- Treat a device with a saved connection as having access to that server. Rotate the password after losing a device.

## Verify the connection

Test the exact API base from the phone's network:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/global/health
```

A web page at the root is not proof that the API is reachable. If the app sees HTML, a 404, or a JSON parse error, use the API base path, commonly `/api`.

## Troubleshooting

- **The server is unreachable:** confirm the URL, network route, VPN/tunnel, and firewall.
- **Authentication is rejected:** confirm `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`; reconnect after editing.
- **The app connects but no project appears:** refresh **Projects** and check diagnostics.
- **Local QR says the address is loopback-only:** bind the server to a reachable interface on a trusted network.
- **Cloud Link is missing:** confirm the app came from the App Store or Google Play and the subscription is available.

Continue with [Troubleshooting](/docs/guides/troubleshooting/) or review the [remote-access security guide](/docs/guides/remote-access-security/).
