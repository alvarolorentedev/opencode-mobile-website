---
title: OpenCode Mobile Security
description: Understand OpenCode Mobile credentials, remote-access risks, safe deployment requirements, and how to report a security issue privately.
layout: ../layouts/MarketingLayout.astro
prose: true
last_update:
  author: Alvaro Lorente
  date: 2026-10-19
---

# OpenCode Mobile security

OpenCode Mobile connects to a development server that may access source code, terminals, tools, and AI-provider credentials. Treat that connection as privileged infrastructure, not as a harmless consumer-app login.

## Security model

- Your OpenCode server runs on infrastructure you control.
- The mobile client connects directly to the server URL you configure, or through an optional Cloud Link tunnel you pair with.
- Server passwords are stored in Keychain/Keystore-backed secure storage on native builds. Non-secret connection metadata remains in app storage. Treat the device as privileged access to the server.
- The project does not store your OpenCode prompts or source code as part of normal direct connections. Optional Cloud Link processes only the data needed to verify a subscription and pair a machine; see the [privacy policy](/privacy-policy/) and [Cloud Link security documentation](https://opencodecloud.link/docs/security/).
- Optional tunnels, VPNs, reverse proxies, Cloud Link, and AI providers have their own security and privacy policies. For Cloud Link product details, see the [OpenCode Cloud Link website](https://opencodecloud.link/).

## Required deployment practices

1. Keep OpenCode bound to `127.0.0.1` unless a trusted private network specifically requires another interface.
2. Set a strong OpenCode password with `opencode service set password` on OpenCode 2, or `OPENCODE_SERVER_PASSWORD` on a standalone/V1 server.
3. Prefer Tailscale, an authenticated HTTPS reverse proxy, or a carefully configured Cloudflare Tunnel.
4. Never expose an unauthenticated OpenCode port through router forwarding or a public tunnel.
5. Review permission requests and file changes before approving high-impact work.
6. Rotate credentials after losing a device, exposing a tunnel URL, or sharing a password.

The [remote-access security guide](/docs/guides/remote-access-security/) explains the threat model and configuration choices in more detail.

## Report a vulnerability

Do not publish exploitable details in a public issue. Email [contact@getopencode.app](mailto:contact@getopencode.app) with:

- the affected app version;
- the affected OpenCode version;
- reproduction steps or a minimal proof of concept;
- the security impact;
- whether the issue is already being exploited or publicly known.

The maintainer will acknowledge the report, reproduce it when possible, coordinate a fix, and publish release information after users have a reasonable opportunity to update.

For ordinary bugs without security impact, use the [public issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues).
