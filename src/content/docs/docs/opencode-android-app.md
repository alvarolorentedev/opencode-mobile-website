---
title: OpenCode Mobile App — Setup and Download
description: Download OpenCode Mobile for Android or iOS, install the APK or TestFlight beta, and connect it to your own OpenCode server.
lastUpdated: 2026-10-19
---

OpenCode Mobile is an independent Android and iOS client for an OpenCode server that you run. It lets you start and monitor coding tasks, review permissions and changes, manage projects and sessions, inspect files, and use a project terminal from a phone.

It is not an official OpenCode product, a hosted AI service, or a replacement for the OpenCode server.

## Download the app

Use the [OpenCode Mobile download page](/download/) to choose an installation path:

- **Google Play (recommended):** install and receive updates through Google Play.
- **Direct APK:** download the latest release from the project's public [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases) when Play is unavailable or you prefer manual installation.
- **iOS TestFlight beta:** join the [OpenCode Mobile TestFlight release](https://testflight.apple.com/join/ddcE5Wzz) on an iPhone or iPad.

Do not install APK files reposted by unrelated download sites. The current release history and source code are public.

## What the app requires

You need:

1. An Android device or iPhone/iPad.
2. A current OpenCode installation on a computer or server that owns the project.
3. OpenCode running in server mode.
4. A network route from the phone to that server.
5. A one-time pairing link/QR from OpenCode 2, or a server URL and password for manual setup.

The complete setup is in [Set Up OpenCode Mobile](/docs/getting-started/). The in-app connection choices are explained in [Add or switch connections](/docs/connections/).

## Install the app

### Android

1. Open the [download page](/download/) and choose Google Play or the direct APK.
2. If Android asks, allow installation from your browser or file manager for the APK path.
3. Open OpenCode Mobile and continue with onboarding.

### iOS

1. Install TestFlight from the App Store if needed.
2. Join the [OpenCode Mobile TestFlight release](https://testflight.apple.com/join/ddcE5Wzz).
3. Install the beta and continue with onboarding.

The iOS build is a beta. Features that depend on native iOS integrations may lag behind Android; see [Releases and compatibility](/docs/changelog/).

## Start an OpenCode server

OpenCode 2 is the current primary target. Install it with the v2 installer:

```bash
curl -fsSL https://opencode.ai/v2/install | bash
```

Start the shared background service, set a password, and create a pairing link:

```bash
opencode service set password 'use-a-strong-password'
opencode service set port 4096
opencode service start
opencode service status
opencode pair
```

Scan the printed QR code in the app, or paste the pairing link. Pairing links expire after five minutes and work once.

For access through [Tailscale](/docs/guides/tailscale/), [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), or a [reverse proxy](/docs/guides/reverse-proxy/), keep the service on loopback and pass the public URL to the pairing command:

```bash
opencode pair --url https://your-opencode-host.example
```

If you need a foreground server instead, use `opencode serve`:

```bash
OPENCODE_SERVER_PASSWORD='use-a-strong-password' \
  opencode serve --hostname 127.0.0.1 --port 4096
```

Pairing requires the shared service; connect to a standalone `opencode serve` process manually with its URL and password. OpenCode 1.x uses `opencode serve` or `opencode web` and also connects manually.

Never publish an unauthenticated OpenCode port to the internet.

## Connect the app

On first launch, onboarding walks through **Welcome**, **Permissions**, **Connect**, **Project**, and **Ready**. In **Connect**, choose:

- **Scan QR code** for a local OpenCode 2 pairing code created by `opencode pair`
- **Manual** for a server URL, username, and password
- **Cloud Link** for a managed remote machine, when available in a store-installed build

After onboarding, use **Settings → Connection** to add or switch saved servers. See [Add or switch connections](/docs/connections/).

## App versus browser access

Use OpenCode Mobile when you want native navigation, voice input, notifications, sharing from other apps, home-screen widgets, and saved server profiles. Use the OpenCode web UI when you want the browser interface: in OpenCode 2, open a link printed by `opencode pair`; in OpenCode 1.x, run `opencode web`.

The complete tradeoff is documented in [OpenCode Mobile vs OpenCode Web](/docs/guides/mobile-vs-web/).

## Verify the connection

Before opening the app, test the same API base URL from a device on the intended network:

```bash
curl -u your-user:use-a-strong-password \
  https://your-opencode-host.example/global/health
```

If the root URL serves HTML, the API may live below a prefix such as `/api`. Enter the complete API base in the app and verify `<base>/global/health` instead of guessing.

Use the [troubleshooting checklist](/docs/guides/troubleshooting/) for authentication, HTML responses, local QR pairing, Cloud Link, proxy, realtime, and project problems.

## Update or remove the app

- **Google Play:** updates are delivered by the store. The app can also check for available updates in **Settings → Advanced → Update checks**.
- **Direct APK:** install a newer APK from GitHub Releases over the existing app.
- **iOS TestFlight:** install the latest TestFlight build when it appears.
- Removing the app removes local settings and saved credentials. It does not delete data from your OpenCode server or cancel a Cloud Link subscription.
