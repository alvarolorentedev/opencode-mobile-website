---
id: use-opencode-from-phone
title: How to Use OpenCode from Your Phone
description: Run OpenCode on your computer and safely control its sessions, permissions, files, voice input, and terminal commands from an Android phone.
slug: /guides/use-opencode-from-phone
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# How to use OpenCode from your phone

The reliable architecture is simple: OpenCode runs on the machine that owns your project, while your phone acts as a remote control. Do not try to move the repository, model credentials, build tools, and complete development environment onto Android unless on-device development is your explicit goal.

## Recommended architecture

```text
Android phone
  → private VPN or authenticated HTTPS route
  → OpenCode server on your computer
  → project files, tools, providers, and sessions
```

This keeps execution close to the real workspace while making approvals and follow-up work available away from the desk.

## Set it up

1. [Download OpenCode Mobile](/download/).
2. Start an authenticated OpenCode server on `127.0.0.1:4096`.
3. Choose [Tailscale](./tailscale.md), [Cloudflare Tunnel](./cloudflare-tunnel.md), or another [remote-access method](../remote-access.md).
4. Test the server's `/global/health` endpoint from the phone's network.
5. Enter the full API base URL, username, and password in the app.
6. Select the project and confirm the expected session before sending work.

## Good mobile workflows

- Check whether a long task is still progressing.
- Answer a permission or product question.
- Review the changed-file summary before accepting completion.
- Send a short follow-up or dictate it with voice input.
- Inspect a specific file or run a non-interactive test command.
- Switch or archive sessions while keeping each thread focused.

Use the desktop when a change requires broad code navigation, prolonged terminal interaction, complex conflict resolution, or detailed visual review.

## Security boundaries

Your phone can become a route to source code and terminal access. Use strong server authentication, keep public exposure minimal, review permission prompts deliberately, and rotate credentials if a device is lost. Read the [remote-access security guide](./remote-access-security.md) before treating the setup as production-ready.

Continue with the [Android setup guide](../opencode-android-app.md), compare [OpenCode Mobile with OpenCode Web](./mobile-vs-web.md), or diagnose a failure with the [connection checklist](./troubleshooting.md).
