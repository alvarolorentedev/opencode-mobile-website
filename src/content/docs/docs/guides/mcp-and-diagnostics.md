---
title: OpenCode MCP Diagnostics on Mobile
description: Manage MCP servers and read OpenCode diagnostics for tools, realtime updates, LSP, formatters, network usage, and app errors on mobile.
lastUpdated: 2026-10-19
---

Use **Settings → Advanced** when OpenCode tools are unavailable, realtime updates look stale, or you need to inspect server integration health.

## Manage MCP servers

On compatible servers, you can add local or remote MCP servers, then enable, disable, connect, disconnect, or remove them. Remote servers may require an OAuth flow.

MCP configuration belongs to OpenCode. The mobile app sends lifecycle actions and displays the state reported by the server. Persistent config changes depend on the server contract; V1 exposes general config writes, while V2 uses the server's integration and credential APIs.

After changing an MCP server:

1. Refresh its status.
2. Confirm it is enabled and connected.
3. Start a new task if the active session does not discover the changed tool set.

For remote OAuth, the app opens the provider flow and submits the authorization code or waits for the attempt to finish. Dismissing a pending flow cancels it where the server supports cancellation.

## Read diagnostics

Diagnostics may show:

- OpenCode health and version
- Global realtime event stream status
- Polling fallback state
- MCP server state
- LSP server count/state on V1
- Formatter availability on V1
- Network request count and known response sizes for the day
- The last JavaScript error recorded on the device

A polling fallback means the app can continue refreshing important task state, but realtime updates may be less immediate. Reconnect after changing the server URL, proxy, authentication, or OpenCode configuration.

Each diagnostic request can fail independently. Refresh re-reads the server diagnostics and the last app error. Missing LSP or formatter data can mean the endpoint is unsupported rather than broken.

## When to use it

- **MCP tools are missing:** check server status before changing the session.
- **Updates look stale:** confirm whether the event stream is connected or polling.
- **A request failed:** check the last app error and network usage before filing a bug.
- **A server feature is missing:** confirm the OpenCode version and V1/V2 contract in [Releases and compatibility](/docs/changelog/).

Next: [Configure providers](/docs/guides/providers-and-models/), review the [remote-access overview](/docs/remote-access/), or use the [connection troubleshooting checklist](/docs/guides/troubleshooting/).
