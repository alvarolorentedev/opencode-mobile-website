---
title: OpenCode Mobile Security
description: Understand OpenCode Mobile credentials, remote-access risks, safe deployment requirements, and how to report a security issue privately.
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# OpenCode Mobile security

OpenCode Mobile connects to a development server that may access source code, terminals, tools, and AI-provider credentials. Treat that connection as privileged infrastructure, not as a harmless consumer-app login.

## Security model

- Your OpenCode server runs on infrastructure you control.
- The mobile client connects directly to the server URL you configure.
- OpenCode username and password values are persisted in app storage for reconnection. This is convenient, but it is not equivalent to a hardware-backed credential vault.
- The project does not operate a proxy that receives your OpenCode sessions.
- Optional tunnels, VPNs, reverse proxies, and AI providers have their own security and privacy policies.

## Required deployment practices

1. Keep OpenCode bound to `127.0.0.1` unless a trusted private network specifically requires another interface.
2. Configure `OPENCODE_SERVER_USERNAME` and a strong `OPENCODE_SERVER_PASSWORD`.
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
