---
id: mobile-vs-web
title: OpenCode Mobile vs OpenCode Web
description: Compare the native OpenCode client for Android and iOS with OpenCode Web across installation, sessions, voice, notifications, files, terminal use, and remote access.
slug: /guides/mobile-vs-web
last_update:
  author: Alvaro Lorente
  date: 2026-09-29
---

# OpenCode Mobile vs OpenCode Web

Both interfaces can reach an OpenCode server from a phone. Choose based on the workflow, not on the assumption that an installed app is automatically better.

| Need | OpenCode Mobile | OpenCode Web |
| --- | --- | --- |
| Installation | Android: Play or APK; iOS: TestFlight | No client installation |
| Updates | Play, new APK, or TestFlight | Updated with the server |
| Session monitoring | Native mobile workflow | Browser workflow |
| Voice follow-ups | Dictation and foreground conversation mode | Depends on browser UI |
| Task notifications | Native completion alerts on supported builds | Not supported by the app's background monitor |
| Focused files and terminal | Native compact surfaces | Browser-provided surfaces |
| Server requirement | OpenCode server/API | `opencode web` server |
| Remote route | LAN, VPN, tunnel, proxy, SSH forward | Same network choices |

## Choose OpenCode Mobile when

- you regularly check or redirect sessions away from your desk;
- native navigation, voice input, or device notifications matter;
- you want a focused control surface instead of a complete desktop-style UI;
- you are comfortable installing a community-built version.

## Choose OpenCode Web when

- you want zero client installation;
- the browser interface already fits your workflow;
- you use several device platforms and want one interface;
- you prefer the server release to control UI updates.

## They can coexist

Use `opencode web` when you want the browser UI and API from the same server. Depending on the deployment, the API may be at the origin or below a prefix such as `/api`. OpenCode Mobile must receive the API base, not merely a URL that returns an HTML page.

Regardless of the client, do not expose an unauthenticated server publicly. Use the [remote-access overview](../remote-access.md) and [security guide](./remote-access-security.md).

To try the native client, follow the [OpenCode Mobile app setup](../opencode-android-app.md). If an existing deployment returns HTML or 404 responses, use the [troubleshooting checklist](./troubleshooting.md).
