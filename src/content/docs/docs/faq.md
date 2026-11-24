---
title: FAQ
description: Answers about OpenCode Mobile setup, Desktop and TUI sessions, multiple servers, pairing, Tailscale, Cloud Link, features, privacy, and support.
lastUpdated: 2026-11-24
---

## Is OpenCode Mobile an official OpenCode product?

No. It is an open-source, community-built companion for OpenCode and is not affiliated with the OpenCode team.

## Which devices are supported?

Android is available through [Google Play](https://play.google.com/store/apps/details?id=app.getopencode) and as a [direct APK](/download/). Android release artifacts are arm64-v8a only; 32-bit-only Android devices are unsupported. The iOS beta is available through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz).

## Is it a general AI chatbot or mobile IDE?

No. It is a focused mobile control surface for an OpenCode server. It includes project files and a terminal, but it is not a replacement for a full desktop IDE or terminal workspace.

## Which OpenCode version should I use?

Use OpenCode 2, the current primary target. It supports the quickest setup through the shared service and `opencode pair`, plus extensions, plugin panels, media preview, file mutations, composer mentions and shell mode, and auto-approve. The client also detects OpenCode 1.x (V1) servers with manual connections for core chats, projects, files, and terminal work. Removed V1-only surfaces such as archive/share and worktree reset are not supported. See [Releases and compatibility](/docs/changelog/).

## How do I connect if OpenCode is already running?

Use the setup you already have:

- **OpenCode Desktop:** **Settings → Pairing → Show details**, then scan the QR code.
- **TUI:** run `/pair`, then scan.
- **CLI:** run `opencode pair`, then scan.
- **Already reachable server:** run `opencode pair --url <url>` for a shared service, or connect manually for a standalone or OpenCode 1.x server.

You do not need to install a tunnel or change the port when the phone can already reach the server. See [Set Up OpenCode Mobile](/docs/getting-started/).

## How do I start OpenCode 2 for OpenCode Mobile?

OpenCode 2 normally uses the shared background service:

```bash
opencode service start
opencode service status
opencode pair
```

The service generates its own password; setting one is optional. Scan the QR code with OpenCode Mobile. The link expires after five minutes and works once; the session lasts 30 days. For a reachable URL, use `opencode pair --url https://your-host.example`.

If you run a standalone `opencode serve` process instead, connect manually with the URL and password; pairing requires the shared service.

## Should I run `opencode web` or `opencode serve`?

On OpenCode 2, you normally do not need `opencode web`: the web UI is served by the same server, and `opencode pair` prints a link you can open in a browser. Use `opencode serve` when you want a foreground standalone server, such as on an always-on host or under a process supervisor.

On OpenCode 1.x, use `opencode serve` for the API or `opencode web` when you also want the browser UI. Connect either V1 server manually.

## Can I pair directly from OpenCode Desktop?

Yes. Open **Settings → Pairing**, choose an address under **Local Network** or enter a VPN/tunnel URL under **Custom address**, then select **Show details** and scan the QR code. The **Pair device** command opens the same page.

Desktop pairing exposes Desktop's **local** OpenCode server only. It does not expose remote servers that Desktop has added, and Desktop cannot act as a multi-server proxy for mobile. See [Connect from Desktop or TUI](/docs/guides/desktop-and-tui/).

## Can I continue a conversation started in Desktop or the TUI?

Yes, when OpenCode Mobile connects to the same OpenCode server. Projects, sessions, transcript, progress, approvals, and changes are server-side state. Open the project in **Projects**, then open the chat library and select the session.

If the session is missing, confirm the same server and project, check whether it is archived or deleted, or add the remote server separately. Local drafts, open tabs, and scroll position do not transfer.

## Why do I not see all the servers configured in Desktop?

Desktop combines projects and sessions from its configured servers at the client level. The OpenCode API does not expose that server inventory, its credentials, or a multi-server proxy. Native Desktop pairing exposes only Desktop's local server. Add each server to OpenCode Mobile individually. See [Use multiple OpenCode servers](/docs/guides/multiple-servers/).

## Can I connect to multiple OpenCode servers?

Yes. Save each server as a connection in **Settings → Connection**. You can keep several connected; the chat library groups sessions by server and offers a server filter, and **New chat** lets you choose the server and project. Projects, files, and terminal follow the focused server. Each server must use its own route and credentials.

## Do I need to keep Desktop or the TUI running?

The OpenCode **server** must keep running; the frontend does not. Desktop and the TUI normally use the shared background service, which can outlive the window. Confirm with `opencode service status`. A standalone `opencode serve` process must stay running. If the machine sleeps or loses network access, mobile disconnects until it returns.

## Do I need Cloud Link to use OpenCode Mobile remotely?

No. Cloud Link is an optional managed service for store-installed builds. You can use a local network, Tailscale, Cloudflare Tunnel, a reverse proxy, SSH forwarding, or native OpenCode pairing instead. If Tailscale or an existing tunnel already works, you do not need Cloud Link.

## Which connection methods work?

Supported routes include:

- native OpenCode pairing with `opencode pair`, Desktop Pairing, or TUI `/pair`;
- a trusted local network;
- Tailscale direct or Tailscale Serve;
- `opencode pair --remote` through OpenTunnel where supported;
- Cloudflare Tunnel;
- HTTPS reverse proxies, including path-prefixed APIs for manual connections;
- a loopback port created by a separate SSH forwarding client;
- a manual connection with custom headers, a custom CA, or OIDC;
- optional Cloud Link.

See [Remote access](/docs/remote-access/) and [Add or switch connections](/docs/connections/).

## Can I use Tailscale without Tailscale Serve?

Yes. A direct tailnet address such as `http://<tailscale-ip-or-magicdns>:<port>` works when the service binds to an interface the phone can reach. The traffic is HTTP inside Tailscale's encrypted WireGuard network, not HTTPS. Use Tailscale Serve only when you need an HTTPS `ts.net` endpoint or want to keep OpenCode on loopback. Keep OpenCode authentication enabled either way.

## Why does my pairing link expire?

A native pairing link is a single-use credential. It expires after five minutes so a copied link or QR code cannot be reused later. Run `opencode pair` or open Desktop Pairing again to create a fresh code.

## How do I renew an expired authenticated session?

Native pairing creates a session token that lasts 30 days. When it expires, run `opencode pair` again and scan the new QR code. Changing the server password signs every session out, so pair again after a password change. Cloud Link credentials renew through the app and your store subscription; see [Cloud Link](/docs/cloud-link/).

## What is the difference between native pairing and Cloud Link?

**Native pairing** is a free OpenCode 2 authentication shortcut. It works over a network route the phone can already reach; it does not create that route. It requires the shared service and a camera for QR scanning.

**Cloud Link** is an optional paid remote-access service for App Store and Google Play installs. It uses a desktop connector and a subscription to provide a managed route over the internet. It is not available in direct APK, F-Droid/FOSS, or web builds. See the [OpenCode Cloud Link website](https://opencodecloud.link/) for connector downloads, platform support, and pricing.

## Should I bind OpenCode to `0.0.0.0`?

Only for direct access on a trusted LAN or through a VPN where binding every interface is acceptable. Use authentication, restrict the port to the private firewall profile or tailnet, and never expose it through router port forwarding. Binding `0.0.0.0` listens on every interface, not only the one you intended. For remote access, prefer loopback plus Tailscale Serve, Cloudflare Tunnel, a reverse proxy, SSH forwarding, or Cloud Link.

## Do I need authentication with Tailscale or Cloudflare Tunnel?

Keep OpenCode authentication enabled. A tailnet or HTTPS tunnel controls transport and reachability, but OpenCode Mobile still expects server credentials when the server is protected. If your gateway adds its own auth, configure the connection's custom headers or OIDC manually. Native pairing cannot carry custom gateway headers.

## Can the server URL contain `/api` or another path?

Yes for manual connections. The client preserves a configured path prefix for API requests, realtime events, and terminal WebSockets. Use the prefix only when the proxy or web deployment actually mounts the OpenCode API there. Verify `<base>/global/health` before connecting.

Native pairing links do not preserve a path prefix; use a manual connection for a path-prefixed API.

## Where are connection credentials stored?

On native iOS and Android builds, non-secret connection details use app storage. Server passwords, custom header values, CA material, and OIDC tokens use Keychain/Keystore-backed secure storage. Pending notification records contain the server URL and username but not the password. Browser builds cannot persist credentials through native secure storage.

## Can I use custom headers, a private CA, or OIDC?

Yes, on manual native connections. Custom headers support gateways such as Cloudflare Access, Authelia, and oauth2-proxy. A custom CA is trusted only for that server's `host:port`. OIDC uses the system browser with PKCE and renews tokens silently. Native pairing and Cloud Link profiles do not carry these settings.

## What happens if realtime events disconnect?

The app reconnects the global SSE stream with backoff and uses polling while the stream is unavailable or work is active. Core session visibility should continue without a manual reconnect. **Settings → Diagnostics** shows the current realtime state and network statistics.

## Is the Terminal tab a full terminal emulator?

It is an xterm-based terminal backed by an OpenCode PTY. It supports ANSI/VT cursor behavior, alternate-screen programs, 10,000 lines of scrollback, resize, reconnect, and a mobile keyboard accessory. It is still a mobile terminal, not a desktop terminal replacement.

## Can I edit files from the app?

Yes. File search, read, text save, and download are available on both OpenCode 1.x and 2.x when the server exposes the required endpoints. OpenCode 2 also previews images, audio, and video, opens images in a zoomable viewer, and can copy, move, rename, and delete files when the server provides the required shell utilities. V2 uses `file.write`; the app re-reads the file before saving and rejects an obvious conflict, but V2 has no conditional-write API. V1 binary files are not previewable or downloadable.

## Can I share content into the app?

On Android, yes. Use the system Share sheet to send text, links, images, and documents into a preview, choose a chat, review the draft, and press Send. Up to 10 items and 10 MB per file are accepted. Nothing is submitted automatically. iOS inbound sharing is not available yet.

## Are there widgets or quick actions?

Quick actions are available on iOS and Android. Android also has three home-screen widgets: Latest replies, Awaiting actions, and Plan progress. Quick actions and widgets can show sessions from connected servers. iOS home-screen widgets and Live Activities are not available yet. See [Quick actions and widgets](/docs/guides/quick-actions-and-widgets/).

## Which languages does the app support?

The app interface supports English, Spanish, Hindi, German, French, Simplified Chinese, Portuguese, Japanese, Russian, Arabic, and Hebrew, plus a system-default option. Arabic and Hebrew use right-to-left layout. The website documentation is currently English-only.

## Can I change the theme?

Yes. **Settings → Appearance** offers system, light, and dark modes and six color themes: Green, Blue, Red, Purple, Pink, and Gray. See [Settings and customization](/docs/guides/settings/).

## Does the app update itself?

Google Play and TestFlight deliver updates. Supported Play builds can start a flexible background download and then wait for an explicit **Restart** tap; Play release priority decides whether a flexible or immediate flow is requested first. Configure checks in **Settings → About & support → Update checks**. Direct APK users install a newer APK from GitHub Releases.

## Can I control which model answers each prompt?

Yes. Choose a model explicitly, or enable [automatic model routing](/docs/guides/auto-model-routing/) to classify each prompt as Simple, Standard, or Complex. Routing can run on-device or through an OpenCode 2 server classifier, and each reply shows the model that produced it.

## What are Extensions?

On OpenCode 2, **Settings → Extensions** manages MCP servers, plugins, agents, skills, and slash commands for the current project or all projects. Installed plugins can also expose GUI panels inside the app. See [Manage extensions](/docs/guides/extensions/).

## Do all servers support worktrees, terminal, MCP, and diagnostics?

No. These features depend on compatible server endpoints. Worktree operations use experimental APIs and may change more often than core session behavior. MCP lifecycle is available on both contracts, but full extension editing and plugin GUI panels require OpenCode 2. Auto-approve and saved approval rules are OpenCode 2 only. LSP and formatter diagnostics are not part of the supported surface. See [Releases and compatibility](/docs/changelog/).

## Can I use voice mode in the background?

Conversation mode is a foreground listen → submit → wait → speak loop. It is not continuous background microphone capture, and it pauses for permissions or questions that require on-screen input. On-device mode processes audio locally; system mode uses the OS speech provider. Background completion notifications are separate.

## Where can I report a problem?

Use the [GitHub issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues). Include the mobile release, platform, OpenCode version, connection method, API base URL shape without credentials, and the visible error. Security-sensitive reports belong on the [security page](/security/).

## Where is the screen-by-screen documentation?

The [User manual](/docs/user-manual/) is the operating hub. It links to focused guides for tasks, sessions, approvals, voice, usage, projects, files, terminal, settings, extensions, notifications, sharing, and widgets.
