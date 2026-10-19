---
title: FAQ
description: Answers about OpenCode Mobile platforms, connections, Cloud Link, local QR, file editing, terminal support, sharing, widgets, privacy, and support.
lastUpdated: 2026-10-19
---

## Is OpenCode Mobile an official OpenCode product?

No. It is an open-source, community-built companion for OpenCode and is not affiliated with the OpenCode team.

## Which devices are supported?

Android is available through [Google Play](https://play.google.com/store/apps/details?id=app.getopencode) and as a [direct APK](/download/). The iOS beta is available through [TestFlight](https://testflight.apple.com/join/ddcE5Wzz).

## Is it a general AI chatbot or mobile IDE?

No. It is a focused mobile control surface for an OpenCode server. It includes project files and a terminal, but it is not a replacement for a full desktop IDE or terminal workspace.

## Which OpenCode version should I use?

Use OpenCode 2, the current primary target. It supports the quickest setup through the shared service and `opencode pair`. The client also detects and supports OpenCode 1.x (V1) API contracts with manual connections. Feature availability varies by contract; older removed endpoint shapes are not supported. See [Releases and compatibility](/docs/changelog/).

## How do I start OpenCode 2 for OpenCode Mobile?

OpenCode 2 normally uses the shared background service:

```bash
opencode service set password 'use-a-strong-password'
opencode service set port 4096
opencode service start
opencode service status
opencode pair
```

Scan the QR code or paste the pairing link into the app. The link expires after five minutes and works once. For a remote URL, use `opencode pair --url https://your-host.example`.

If you run a standalone `opencode serve` process instead, connect manually with the URL and password; pairing requires the shared service.

## Should I run `opencode web` or `opencode serve`?

On OpenCode 2, you normally do not need `opencode web`: the web UI is served by the same server, and `opencode pair` prints a link you can open in a browser. Use `opencode serve` when you want a foreground standalone server, such as on an always-on host or under a process supervisor.

On OpenCode 1.x, use `opencode serve` for the API or `opencode web` when you also want the browser UI. Connect either V1 server manually.

## Which connection methods work?

Supported routes include:

- trusted local LAN;
- local QR pairing with `opencode pair` on OpenCode 2;
- Tailscale Serve;
- Cloudflare Tunnel;
- HTTPS reverse proxies, including path-prefixed APIs;
- a loopback port created by a separate SSH forwarding client;
- optional Cloud Link.

See [Remote access](/docs/remote-access/) and [Add or switch connections](/docs/connections/).

## What is the difference between local QR and Cloud Link?

**Local QR** is a free same-network setup shortcut for OpenCode 2. Start the shared service with `opencode service start`, run `opencode pair`, scan the one-time code, and the app saves the connection. The server must be reachable from the phone, not only from `localhost`. Links expire after five minutes.

**Cloud Link** is an optional paid remote-access service for App Store and Google Play installs. It uses a desktop connector and a subscription to provide a managed route over the internet. It is not available in direct APK, F-Droid/FOSS, or web builds. See the [OpenCode Cloud Link website](https://opencodecloud.link/) for connector downloads, platform support, and pricing.

## Can I save more than one server?

Yes. Use **Settings → Connection** to add, switch, edit, or delete saved servers. Projects, remembered sessions, favorites, notifications, and terminal state are scoped to the connection.

## Was the Tailscale connection problem fixed?

Yes. The path-prefix and connection handling fixes were validated with Tailscale and Cloudflare before the public issue was closed. Update to a current release before troubleshooting an old build.

## Should I bind OpenCode to `0.0.0.0`?

Only for direct access on a trusted LAN. Use authentication, restrict the port to the private firewall profile, and never expose it through router port forwarding. For remote access, prefer loopback plus Tailscale, Cloudflare Tunnel, a reverse proxy, SSH forwarding, or Cloud Link.

## Do I need authentication with Tailscale or Cloudflare Tunnel?

Keep OpenCode authentication enabled. A tailnet or HTTPS tunnel controls transport and reachability, but OpenCode Mobile still expects the server credentials when the server is protected.

## Can the server URL contain `/api` or another path?

Yes. The client preserves a configured path prefix for API requests, realtime events, and terminal WebSockets. Use the prefix only when the proxy or web deployment actually mounts the OpenCode API there. Verify `<base>/global/health` before connecting.

## Where are connection credentials stored?

On native iOS and Android builds, non-secret connection details use app storage and server passwords use Keychain/Keystore-backed secure storage. Pending notification records contain the server URL and username but not the password. Browser builds cannot persist passwords through native secure storage.

## What happens if realtime events disconnect?

The app reconnects the global SSE stream with backoff and uses polling while the stream is unavailable or work is active. Core session visibility should continue without a manual reconnect. **Settings → Advanced → Diagnostics** shows the current realtime state.

## Is the Terminal tab a full terminal emulator?

It is an xterm-based terminal backed by an OpenCode PTY. It supports ANSI/VT cursor behavior, alternate-screen programs, 10,000 lines of scrollback, resize, reconnect, and a mobile keyboard accessory. It is still a mobile terminal, not a desktop terminal replacement.

## Can I edit files from the app?

Yes. File search, read, and save are available on both OpenCode 1.x and 2.x servers when the server exposes the required endpoints. V2 uses `file.write`; the app re-reads the file before saving and rejects an obvious conflict, but V2 has no conditional-write API. Binary/base64 files are read-only.

## Can I share content into the app?

On Android, yes. Use the system Share sheet to send text, links, images, and documents into a preview, choose a chat, review the draft, and press Send. Up to 10 items and 10 MB per file are accepted. Nothing is submitted automatically. iOS inbound sharing is not available yet.

## Are there widgets or quick actions?

Quick actions are available on iOS and Android. Android also has three home-screen widgets: Latest replies, Awaiting actions, and Plan progress. iOS home-screen widgets and Live Activities are not available yet. See [Quick actions and widgets](/docs/guides/quick-actions-and-widgets/).

## Which languages does the app support?

The app interface supports English, Spanish, Hindi, German, French, Simplified Chinese, Portuguese, and Japanese, plus a system-default option. The website documentation is currently English-only.

## Does the app update itself?

Google Play and TestFlight deliver updates. Supported store builds can also check for updates in **Settings → Advanced → Update checks**. Direct APK users install a newer APK from GitHub Releases.

## Do all servers support worktrees, terminal, MCP, and diagnostics?

No. These features depend on compatible server endpoints. Worktree operations use experimental APIs and may change more often than core session behavior. LSP and formatter diagnostics are V1-only; saved approval rules are V2-only. See [Releases and compatibility](/docs/changelog/).

## Can I use voice mode in the background?

Conversation mode is a foreground listen → submit → wait → speak loop. It is not continuous background microphone capture, and it pauses for permissions or questions that require on-screen input. Background completion notifications are separate.

## Where can I report a problem?

Use the [GitHub issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues). Include the mobile release, platform, OpenCode version, connection method, API base URL shape without credentials, and the visible error. Security-sensitive reports belong on the [security page](/security/).

## Where is the screen-by-screen documentation?

The [User manual](/docs/user-manual/) is the operating hub. It links to focused guides for tasks, sessions, approvals, voice, usage, projects, files, terminal, settings, notifications, sharing, and widgets.
