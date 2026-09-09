---
title: About OpenCode Mobile and its maintainer
description: Learn who builds OpenCode Mobile, how the mobile app relates to OpenCode, and where its source, releases, testing evidence, and support channels live.
last_update:
  author: Alvaro Lorente
  date: 2026-07-31
---

# About OpenCode Mobile

OpenCode Mobile is an independent, community-built Android and iOS client for the open-source [OpenCode](https://opencode.ai/) coding agent. It is not an official OpenCode product and does not replace the OpenCode server. The app connects to a server that you run and control.

## Maintainer

The project is built and maintained by [Alvaro Lorente](https://github.com/alvarolorentedev). Product decisions, source changes, releases, issue responses, and documentation are public so users can inspect how the project works instead of relying on unsupported marketing claims.

## Evidence of first-hand work

- The [application source](https://github.com/alvarolorentedev/opencode-mobile) is public under the Apache-2.0 license.
- Builds are published through [GitHub Releases](https://github.com/alvarolorentedev/opencode-mobile/releases), Google Play testing, and the [iOS TestFlight beta](https://testflight.apple.com/).
- Bugs and compatibility reports are tracked in the [public issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues).
- The remote-access flow has been tested with Tailscale, Cloudflare Tunnel, path-prefixed API deployments, realtime events, and OpenCode health endpoints. The related fixes and verification are recorded in [issue #1](https://github.com/alvarolorentedev/opencode-mobile/issues/1).
- This website and its documentation have their own [public source repository](https://github.com/alvarolorentedev/opencode-mobile-website).

## Product scope

OpenCode runs the agents, models, tools, sessions, and workspace operations. OpenCode Mobile is a focused control surface for starting and monitoring that work from your phone. It is deliberately not presented as a general chatbot, complete mobile IDE, or full terminal emulator.

Read the [mobile app setup guide](/docs/opencode-android-app/), review the [security model](/security/), or inspect the [current release history](/docs/changelog/).

## Contact and support

Use the [GitHub issue tracker](https://github.com/alvarolorentedev/opencode-mobile/issues) for reproducible bugs and feature requests. For privacy, security, or legal questions that should not be public, email [contact@getopencode.app](mailto:contact@getopencode.app).
