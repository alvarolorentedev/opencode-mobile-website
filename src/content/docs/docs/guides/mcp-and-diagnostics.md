---
title: OpenCode MCP and Diagnostics on Mobile
description: Manage runtime MCP servers on OpenCode 1.x and read OpenCode Mobile diagnostics for health, realtime, network, errors, and logs.
lastUpdated: 2026-11-06
---

Use **Settings → Diagnostics** when realtime updates look stale, a server integration is unavailable, or you need to inspect app health. MCP management depends on the OpenCode contract.

## Manage MCP servers

### OpenCode 2

MCP definitions are managed in **Settings → Extensions → MCPs**. The Extensions editor writes the selected project or global configuration, validates it, and keeps a backup.

Use the row's runtime controls to connect, disconnect, or refresh a server after the definition exists. Remote servers may require an OAuth flow. See [Manage extensions](/docs/guides/extensions/).

### OpenCode 1.x

OpenCode 1.x keeps the runtime MCP controls under **Settings → Diagnostics → MCP**.

- Add a local command or remote URL.
- Connect, disconnect, enable, disable, or remove a server.
- Start remote OAuth in the browser and submit the authorization code callback.

After changing an MCP server:

1. Refresh its status.
2. Confirm it is enabled and connected.
3. Start a new task if the active session does not discover the changed tool set.

## Read diagnostics

Diagnostics may show:

- OpenCode health and version;
- global realtime event stream status and polling fallback;
- MCP server state and counts when the endpoint is available;
- normalized network type, online/offline, constrained or metered state, reconnect attempts, and local request latency;
- the last JavaScript error recorded on the device, with a fatal/handled marker;
- local log, span, and metric storage, retention, recent events, and key metric summaries;
- optional remote telemetry controls when an OTLP backend is configured.

A polling fallback means the app can keep refreshing important task state, but realtime updates may be less immediate. Reconnect after changing the server URL, proxy, authentication, or OpenCode configuration.

Each diagnostic request can fail independently. Refresh re-reads server diagnostics and the last app error.

## Local logs and export

Diagnostics records structured logs, spans, and metrics locally by default. Storage is bounded to about seven days or 10 MB.

- Choose a normal or verbose recording level.
- Inspect local storage use, recent events, and the most recent failure.
- **Export** creates a sanitized ZIP report on explicit action. It does not upload anything.
- **Clear** removes local history after confirmation.

Local recording can be disabled in **Settings → Diagnostics** or during onboarding. The privacy step in onboarding exposes the same choice.

## Optional remote telemetry

When the build is configured with an OTLP backend, Diagnostics exposes a master remote-telemetry switch and separate crash-report and usage categories. Remote reporting is optional and applies only to new events.

- Only unhandled or fatal JavaScript errors and the minimal server contract counter leave the device.
- Prompts, source code, file contents, and session text are not sent.
- Native hard crashes and ANRs are not captured because no native telemetry SDK is included; only the next-launch JavaScript crash record is available.
- Remote Hermes/JavaScript stacks are not symbolically resolved by the OTLP path. Use a local export for detailed stacks.
- FOSS and unconfigured builds hide the remote controls.

## Supported and unsupported diagnostics

OpenCode 2 and OpenCode 1.x expose different server endpoints. LSP server counts and formatter diagnostics are not part of the supported V1∩V2 surface and are not shown.

Missing MCP, LSP, or formatter data usually means the endpoint is unsupported rather than broken.

## When to use it

- **MCP tools are missing:** manage definitions under Extensions on V2 or Diagnostics on V1, then refresh status.
- **Updates look stale:** confirm whether the event stream is connected or polling.
- **A request failed:** check the last app error, network state, and request statistics before filing a bug.
- **A server feature is missing:** confirm the OpenCode version and contract in [Releases and compatibility](/docs/changelog/).
- **You need to share a report:** export the sanitized ZIP and review it before sending.

Next: [Configure providers](/docs/guides/providers-and-models/), [manage extensions](/docs/guides/extensions/), or use the [connection troubleshooting checklist](/docs/guides/troubleshooting/).
