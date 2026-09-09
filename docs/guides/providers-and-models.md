---
id: providers-and-models
title: OpenCode Providers and Models on Android
sidebar_label: Providers and Models
slug: /guides/providers-and-models
---

# Configure providers and models

Use this page when a model is missing from Chat, a provider needs authentication, or you want a shorter model picker.

## Understand the two authentications

- **Connection credentials** protect access to your OpenCode server.
- **Provider credentials** allow OpenCode to call an AI provider.

Changing one does not configure the other.

## Add a provider

1. Open **Settings → AI & providers**.
2. Choose an unconfigured provider.
3. Select an authentication method supplied by the server.
4. Complete OAuth in the browser or enter the requested API/manual credential.
5. Return to Settings and confirm the provider appears as configured.

Some OAuth methods ask you to paste an authorization code back into the app. Removing a provider removes the credentials stored through OpenCode for that provider.

## Choose visible models

Expand a configured provider and enable the models you want available in Chat. Disabling a model removes clutter from the picker; it does not delete the provider.

In Chat, the searchable picker groups models by provider, and selecting a model also selects its provider. Attachment, reasoning, input-modality, context, and tool capabilities are discovered from the server. If an attachment action is unavailable, select a model that advertises attachment support.

## Pick for the job

- Use a capable reasoning model for planning and difficult code changes.
- Use a faster or less expensive model for routine summaries and status checks.
- Keep the session focused so model choice is not compensating for unrelated context.

Next: [Understand usage](./usage.md), [start a task](./tasks.md), or inspect [MCP and server diagnostics](./mcp-and-diagnostics.md).
