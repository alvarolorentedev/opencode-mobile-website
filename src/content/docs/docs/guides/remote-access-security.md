---
title: Secure OpenCode Remote Access from Mobile
description: Threat-model an OpenCode mobile connection, protect server credentials, compare private and public routes, and respond to a lost device or exposed endpoint.
lastUpdated: 2026-09-29
---
An OpenCode server may read and change source files, execute commands, and invoke configured AI providers. Remote access therefore creates a privileged path into a development machine. HTTPS alone does not make that path safe.

## Threats to plan for

- A public scanner discovers an exposed OpenCode endpoint.
- A weak or reused Basic-auth password is guessed or leaked.
- A lost phone retains a working server URL and credentials.
- A proxy forwards normal HTTP but breaks or exposes realtime and terminal traffic.
- A user approves a dangerous tool action without reviewing the active project or session.
- A temporary tunnel URL is pasted into a public issue, log, or screenshot.

## Minimum controls

1. Bind OpenCode to `127.0.0.1` when using a VPN, tunnel, or local reverse proxy.
2. Configure a unique username and strong password.
3. Prefer a private [Tailscale route](/docs/guides/tailscale/) over a public hostname when possible.
4. If using [Cloudflare Tunnel](/docs/guides/cloudflare-tunnel/), keep OpenCode authentication enabled and protect the Cloudflare account.
5. Restrict firewall rules and tailnet ACLs to the minimum required scope.
6. Keep OpenCode Mobile and the OpenCode server current.
7. Review permissions, questions, changed files, and the selected project before accepting completion.

## Credential handling

On native iOS and Android builds, non-secret connection details use app storage and the server password uses `expo-secure-store`. Treat the device as holding access to the development server. Use device encryption and a strong screen lock, and rotate the OpenCode password after a device is lost or transferred. Browser builds cannot persist passwords through native secure storage.

Do not reuse an AI-provider API key as the OpenCode server password. Provider authentication and server connection authentication protect different systems.

## Incident response

If an endpoint or credential is exposed:

1. Stop or disable the tunnel or proxy route.
2. Rotate the OpenCode username/password.
3. Review server, proxy, and provider logs for unexpected activity.
4. Revoke affected provider credentials if tool or environment exposure is plausible.
5. Update the app connection only after the route is secured again.

Report product vulnerabilities privately through the [security page](/security/). Use the [troubleshooting checklist](/docs/guides/troubleshooting/) for failures without security impact.
