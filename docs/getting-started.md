---
id: getting-started
title: Getting Started
slug: /getting-started
---

# Getting Started

This page covers the fastest practical path: run OpenCode in server mode, secure it, and connect from the mobile UI.

## 1. Install OpenCode

Use one of the official install paths:

```bash
curl -fsSL https://opencode.ai/install | bash
```

Or install with npm:

```bash
npm install -g opencode-ai
```

## 2. Decide which mode you want

OpenCode gives you two useful remote setups.

### `opencode web`

Use this when you want the built-in browser UI.

```bash
OPENCODE_SERVER_USERNAME=your-user \
OPENCODE_SERVER_PASSWORD='change-this-password' \
opencode web --port 4096 --hostname 127.0.0.1
```

### `opencode serve`

Use this when you want a headless HTTP server that a client can talk to.

```bash
OPENCODE_SERVER_USERNAME=your-user \
OPENCODE_SERVER_PASSWORD='change-this-password' \
opencode serve --port 4096 --hostname 127.0.0.1
```

`opencode serve` is the cleaner default for a remote mobile client. `opencode web` is useful when you also want the OpenCode web UI in a browser.

## 3. Keep the server on a fixed port

Using a stable port makes tunneling and reconnecting much simpler.

Recommended default:

```bash
4096
```

## 4. Verify the server locally

Before exposing anything remotely, make sure the server responds on the machine where OpenCode is running.

For example:

```bash
curl -u your-user:change-this-password http://127.0.0.1:4096/global/health
```

For a healthy server you should get a response that includes `healthy: true`.

## 5. Connect from the mobile app

Use the settings screen shown in the screenshots:

1. Open `Settings`
2. Paste the remote server URL into `Server URL`
3. Enter the same username and password configured on the server
4. Tap `Reconnect`
5. Confirm the status changes to `Connected`

Once connected, move to the workspace screen and choose the project that should back the current chat.

## Notes

- Do not expose an unsecured OpenCode server to the internet.
- Prefer a tunnel or reverse proxy over binding directly to a public interface.
- Use a strong password if the server is reachable from outside your local machine.
