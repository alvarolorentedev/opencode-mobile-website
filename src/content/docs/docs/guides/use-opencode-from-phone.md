---
title: How to Use OpenCode from Your Phone
description: Run OpenCode on your computer and safely continue its sessions, permissions, files, voice input, and terminal commands from a mobile device.
lastUpdated: 2026-11-24
---

The reliable architecture is simple: OpenCode runs on the machine that owns your project, while your phone acts as a remote control. Do not move the repository, model credentials, build tools, and complete development environment onto the phone unless on-device development is your explicit goal.

## Recommended architecture

```text
Mobile phone
  → private VPN, authenticated HTTPS route, or managed tunnel
  → OpenCode server on your computer
  → project files, tools, providers, and sessions
```

OpenCode Desktop, the TUI, and OpenCode Mobile are frontends. The server owns projects, sessions, progress, approvals, and changes. Keeping the server close to the workspace gives every client the same work.

## Set it up

1. [Download OpenCode Mobile](/download/).
2. Use the OpenCode setup you already have:
   - **Desktop:** open **Settings → Pairing → Show details** and scan the QR code.
   - **TUI:** run `/pair` and scan the QR code.
   - **CLI or a reachable shared service:** run `opencode pair` or `opencode pair --url <url>` and scan the QR code.
   - **Standalone server or OpenCode 1.x:** add a manual connection with the URL and password.
3. If the phone cannot reach the server yet, choose [Tailscale](/docs/guides/tailscale/), [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), [local network](/docs/guides/local-network/), [Cloud Link](/docs/cloud-link/), or another [remote-access method](/docs/remote-access/).
4. Select the project and confirm the expected session before sending work.

You do not need to change the OpenCode port or set a password before pairing. The OpenCode 2 shared service generates a password; use `opencode service status` for its address and `opencode service get password` when a manual connection needs the credential.

A standalone `opencode serve` process works too, but pairing requires the shared service, so use manual connection details.

You can save and connect multiple servers in **Settings → Connection**. Sessions from connected servers appear in the chat library; projects, files, and terminal activity follow the focused server. See [Use multiple OpenCode servers](/docs/guides/multiple-servers/).

## Good mobile workflows

- Check whether a long task is still progressing.
- Answer a permission or product question.
- Review Turn, Uncommitted, or Branch changes before accepting completion.
- Send a short follow-up, steer a running turn, or dictate it with voice input.
- Inspect a specific file, save a focused edit, or run a test command in the project terminal.
- Share a screenshot, document, or link from another app into a chat on Android.
- Switch, favorite, rename, fork, or delete sessions while keeping each thread focused.
- Pick up a session that was started in Desktop or the TUI on the same server.

Use the desktop when a change requires broad code navigation, prolonged terminal interaction, complex conflict resolution, or detailed visual review.

## Security boundaries

Your phone can become a route to source code and terminal access. Use strong server authentication, keep public exposure minimal, review permission prompts deliberately, and rotate credentials if a device is lost. A pairing link is a credential, not a network route: pair only after the phone can reach the server. Read the [remote-access security guide](/docs/guides/remote-access-security/) before treating the setup as production-ready.

Continue with the [mobile app setup guide](/docs/opencode-android-app/), compare [OpenCode Mobile with OpenCode Web](/docs/guides/mobile-vs-web/), or diagnose a failure with the [connection checklist](/docs/guides/troubleshooting/).
