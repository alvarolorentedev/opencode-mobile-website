---
title: OpenCode MCP Diagnostics on Mobile
description: Manage MCP servers and read OpenCode diagnostics for tools, realtime updates, LSP, and formatters on mobile.
---
Use **Settings → Advanced** when OpenCode tools are unavailable, realtime updates look stale, or you need to inspect server integration health.

## Manage MCP servers

On compatible servers, you can add local or remote MCP servers, then enable, disable, connect, disconnect, or remove them. Remote servers may require an OAuth flow.

MCP configuration belongs to OpenCode. The mobile app sends lifecycle actions and displays the state reported by the server.

After changing an MCP server:

1. Refresh its status.
2. Confirm it is enabled and connected.
3. Start a new task if the active session does not discover the changed tool set.

## Read diagnostics

Diagnostics may show:

- OpenCode health and version
- Realtime SSE connection or polling fallback
- MCP server state
- LSP server count/state
- Formatter availability

A polling fallback means the app can continue refreshing important task state, but realtime updates may be less immediate. Reconnect after changing the server URL, proxy, authentication, or OpenCode configuration.

Missing diagnostic data can mean the endpoint is unsupported rather than broken. Confirm the server version before filing a mobile bug.

Next: [Configure providers](/docs/guides/providers-and-models/), review the [remote-access overview](/docs/remote-access/), or use the [connection troubleshooting checklist](/docs/guides/troubleshooting/).
