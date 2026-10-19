---
title: OpenCode Providers and Models on Mobile
description: Connect AI providers, manage multiple accounts, and choose which models appear in OpenCode Mobile, including the two authentication layers.
lastUpdated: 2026-10-19
---

Use this page when a model is missing from Chat, a provider needs authentication, or you want a shorter model picker.

## Understand the two authentications

- **Connection credentials** protect access to your OpenCode server.
- **Provider credentials** allow OpenCode to call an AI provider.

Changing one does not configure the other. A provider key is stored by the connected OpenCode server, not used as the mobile server password.

## Add a provider

1. Open **Settings → AI & providers**.
2. Tap **Add provider**.
3. Choose a provider with an available login method.
4. Select **API key**, OAuth, or another method supplied by the server.
5. Complete the browser flow or enter the requested credential.
6. Return to Settings and confirm the provider appears as configured.

Some OAuth flows open the browser and wait for completion. Others show a pairing/device code or ask you to paste an authorization code. The app shows the instructions and a copy action when the code is available.

A provider can have multiple stored accounts on OpenCode 2 servers. Select the active account from the provider row, or add another account for the same provider. Removing an account deletes the credentials stored through OpenCode for that account.

## Choose visible models

Expand a configured provider and enable the models you want available in Chat. Disabling a model removes clutter from the picker; it does not delete the provider.

In Chat, the model picker is searchable, groups models by provider, and shows **Selected** and **Recent** sections. Selecting a model also selects its provider.

Model capabilities come from the server, including attachment support, input modalities, tool use, reasoning, status, and context/output limits. If an attachment action is unavailable, select a model that advertises attachment support.

If neither the stored model nor the server-configured default resolves, the picker shows **Select model** and the app sends without a model so the server default can apply. It does not silently choose a blocked model.

## Choose how to send messages during work

On OpenCode 2 servers, **Settings → Advanced → Editor** controls **Messages sent while working**:

- **Steer** applies the next message at the next step of the current response.
- **Append** queues it for a later turn.

This setting affects prompt delivery, not model selection.

## Pick for the job

- Use a capable reasoning model for planning and difficult code changes.
- Use a faster or less expensive model for routine summaries and status checks.
- Keep the session focused so model choice is not compensating for unrelated context.
- Check [Session usage](/docs/guides/usage/) when cost or context pressure matters.

## Troubleshooting

- **No providers appear:** connect to the server first and refresh.
- **A provider is missing from Add provider:** the server did not expose an interactive login method for it. Configure environment-only providers on the server.
- **A model is missing:** confirm the provider is configured, the model is enabled, and the server reports it.
- **OAuth never finishes:** reopen the provider row, retry the browser flow, or cancel the pending attempt.
- **Provider credentials are rejected:** remove and re-add the account, or check the provider dashboard.

Next: [Understand usage](/docs/guides/usage/), [start a task](/docs/guides/tasks/), or inspect [MCP and server diagnostics](/docs/guides/mcp-and-diagnostics/).
