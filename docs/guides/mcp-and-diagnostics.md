---
id: mcp-and-diagnostics
title: OpenCode MCP Diagnostics on Android
sidebar_label: MCP and Diagnostics
slug: /guides/mcp-and-diagnostics
---

# MCP and diagnostics

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

Next: [Configure providers](./providers-and-models.md), review the [remote-access overview](../remote-access.md), or use the [connection troubleshooting checklist](./troubleshooting.md).
