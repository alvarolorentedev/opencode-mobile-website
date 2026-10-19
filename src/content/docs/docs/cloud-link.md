---
title: "OpenCode Cloud Link: Remote Access from Mobile"
description: Use Cloud Link to reach your OpenCode machine over the internet with a store subscription, connector QR pairing, and managed machines.
lastUpdated: 2026-10-19
---

Cloud Link is an optional managed remote-access service for OpenCode Mobile. It connects the app to a Cloud Link connector running on your computer, so you can reach an OpenCode machine without configuring your own VPN, tunnel, or reverse proxy.

Cloud Link is **not** an official OpenCode service. It is part of the independent OpenCode Mobile project. It is also different from the free local QR pairing flow: local QR works on the same network, while Cloud Link is designed for access over the internet.

## Who Cloud Link is for

Cloud Link is a good fit when:

- you want access from outside your home network without maintaining a tunnel;
- the app was installed from the App Store or Google Play;
- you are willing to use a paid store subscription;
- you want to manage more than one machine from the app.

Use a manual connection, [Tailscale](/docs/guides/tailscale/), or another [remote-access route](/docs/remote-access/) instead when:

- you use a direct APK, F-Droid/FOSS build, or the web app;
- you already have a reliable private VPN or tunnel;
- you do not want a managed subscription service.

## Requirements

- OpenCode Mobile installed from the App Store or Google Play.
- An active Cloud Link subscription purchased or restored through the store.
- The Cloud Link connector installed and running on the computer that runs OpenCode.
- The connector QR code or pairing link.
- A working internet connection on both devices.

Cloud Link is not offered in direct APK, F-Droid/FOSS, or production web builds. Existing Cloud Link connection profiles and deep links can still work in an unsupported install, but the subscription and machine management surfaces are hidden.

## Set up Cloud Link

1. Install and open the Cloud Link connector on your computer.
2. In OpenCode Mobile, open **Settings → Cloud Link**.
3. Choose **Subscribe** and complete the App Store or Google Play purchase, or choose **Restore purchases** if you already subscribed.
4. Keep the connector's QR code visible on the computer.
5. Tap **Scan QR code** and scan the connector code.
6. Confirm the connection on the computer if prompted.
7. Wait for the app to save the machine credentials and connect.

Opening the Cloud Link section does not request camera access, pair a machine, purchase a subscription, or restore a purchase by itself. Those actions happen only after you choose them.

If you already have an active subscription, the assistant can skip the purchase step and go to pairing. If access expires, the app returns to the subscription step.

## Manage machines and services

The Cloud Link section shows verified access status, exposed services, subscription controls, and your machines.

### Machines

- **Manage subscription** opens the App Store subscriptions page on iOS or the Google Play subscriptions page on Android.
- **Restore purchases** recovers an existing store purchase on a new device or installation.
- **Your machines** lists machines paired to the subscription. You can reconnect, forget a local profile, or revoke a machine when the connector supports it.
- Credential expiry is shown in the section. Expired credentials stop data-plane access until access is renewed.

The paid-through date is not a promise of automatic renewal. Billing and cancellation remain in the store.

### Exposed services

A Cloud Link connector can expose additional local services through its tunnel. From **Settings → Cloud Link → Exposed services**, you can add, edit, copy the link for, enable, disable, or remove a service.

Service settings can include:

- a service ID and optional name;
- a local target such as `127.0.0.1:3000`;
- a public path, or the port root when the connector supports root services;
- a dedicated service port on newer connectors;
- private or public access;
- whether to strip the matched path prefix.

Changes apply to the running connector without restarting it. The connector validates the request and returns the canonical values; the app displays those values after saving.

Older connectors may support only path services on the legacy port. The app shows an update hint when a connector is too old for root services or port selection.

## Cloud Link, local QR, and Tailscale

| Option | Network scope | Cost | Setup | Best for |
| --- | --- | --- | --- | --- |
| Local QR | Same reachable network | Free | `opencode pair` + scan | Quick local setup |
| Tailscale | Your tailnet | Free/paid Tailscale plan | Tailscale Serve + app URL | Private access between your devices |
| Cloud Link | Internet | Store subscription | Connector + subscription + QR | Managed access without your own tunnel |

If you already run Tailscale successfully, you do not need Cloud Link.

## Security and privacy

Cloud Link processes the minimum data needed to verify the subscription and authorize the connection, including store transaction proof, service/session identifiers, and pairing/device identifiers. Payments are handled by Apple or Google; the project does not receive card details.

Your prompts, source code, files, and provider credentials continue to flow between the app and your OpenCode machine. They are not stored by the Cloud Link control plane as part of normal tunnel traffic. Read the [privacy policy](/privacy-policy/) for the full data-handling description.

Keep the store account, connector QR code, and pairing links private. A pairing link or QR code can grant access to a machine, so do not paste it into a public issue, chat, or screenshot. If a device is lost, revoke the machine or rotate access from the connector where available.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Cloud Link section is missing | The app must come from the App Store or Google Play |
| Subscription is inactive | Purchase or restore through the store, then retry |
| QR code is rejected | Use a fresh connector QR from the matching environment |
| Connection waits for approval | Confirm the connection on the computer |
| Machine is listed but cannot connect | Check that the connector is running and the machine is online |
| Services will not save | Confirm the target is loopback and the port/path is not already used |
| Access expired | Reconnect and renew the subscription if needed |

For account, purchase, or privacy requests that cannot be resolved in the app, use the contact details on the [support page](/support/) or email `contact@getopencode.app`.

Continue with [Connections](/docs/connections/), [Remote access](/docs/remote-access/), or [Troubleshooting](/docs/guides/troubleshooting/).
