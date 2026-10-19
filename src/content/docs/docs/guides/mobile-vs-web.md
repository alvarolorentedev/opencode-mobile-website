---
title: OpenCode Mobile vs OpenCode Web
description: Compare the native OpenCode client for Android and iOS with OpenCode Web across installation, sessions, voice, notifications, sharing, widgets, and remote access.
lastUpdated: 2026-10-19
---

Both interfaces can reach an OpenCode server from a phone. Choose based on the workflow, not on the assumption that an installed app is automatically better.

| Need | OpenCode Mobile | OpenCode Web |
| --- | --- | --- |
| Installation | Android: Play or APK; iOS: TestFlight | No client installation |
| Updates | Play, new APK, TestFlight, or in-app update check | Updated with the server |
| Session monitoring | Native mobile workflow | Browser workflow |
| Voice follow-ups | Dictation and foreground conversation mode | Depends on browser UI |
| Task notifications | Native completion and needs-input alerts | Not supported by the app's background monitor |
| Share into the app | Android share sheet | Browser share target depends on the browser |
| Home-screen access | Quick actions; Android widgets | Bookmarks or installed browser shortcut |
| Focused files and terminal | Native project surfaces | Browser-provided surfaces |
| Saved server profiles | Multiple connections with in-app switching | Usually one browser origin at a time |
| Remote route | LAN, VPN, tunnel, proxy, SSH forward, or Cloud Link | Same network choices, without Cloud Link management |
| Server requirement | OpenCode server/API | `opencode web` server |

## Choose OpenCode Mobile when

- you regularly check or redirect sessions away from your desk;
- native navigation, voice input, sharing, widgets, or device notifications matter;
- you work with several saved OpenCode servers;
- you want a focused control surface instead of a complete desktop-style UI;
- you are comfortable installing a community-built version.

## Choose OpenCode Web when

- you want zero client installation;
- the browser interface already fits your workflow;
- you use several device platforms and want one interface;
- you prefer the server release to control UI updates;
- you need a desktop-sized workspace more than mobile alerts.

## They can coexist

Use `opencode web` when you want the browser UI and API from the same server. Depending on the deployment, the API may be at the origin or below a prefix such as `/api`. OpenCode Mobile must receive the API base, not merely a URL that returns an HTML page.

Regardless of the client, do not expose an unauthenticated server publicly. Use the [remote-access overview](/docs/remote-access/) and [security guide](/docs/guides/remote-access-security/).

To try the native client, follow the [OpenCode Mobile app setup](/docs/opencode-android-app/). If an existing deployment returns HTML or 404 responses, use the [troubleshooting checklist](/docs/guides/troubleshooting/).
