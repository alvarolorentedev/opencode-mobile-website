---
title: Automatic Model Routing in OpenCode Mobile
description: Let OpenCode Mobile classify each prompt and choose a simple, standard, or complex model, using an on-device or server classifier.
lastUpdated: 2026-11-06
---

Auto model routing is opt-in. When it is enabled, OpenCode Mobile classifies each new prompt as **Simple**, **Standard**, or **Complex** and sends it with the model mapped to that tier. It is useful when you want routine checks on a fast model without manually switching models for every turn.

Routing never guesses a tier with a heuristic. If the classifier is unavailable, the send uses your normal default model.

## Before you enable it

- Connect to the server and confirm its model catalog is loaded.
- Configure at least one provider and enable the models you want routing to consider.
- Decide which classifier to use: on-device or OpenCode server.

## Choose a classifier

Open **Settings → AI & providers** and find the auto-routing controls.

### On-device classifier

The private option. The app downloads a small instruction model and classifies the prompt locally.

- The pack is about 491 MB and is downloaded only after you choose it. It is never bundled with the app.
- Classification works on both OpenCode 1.x and 2.x because it does not call the server.
- The model is released after five minutes idle or when the app backgrounds.
- If the pack is missing, removed, or fails to load, routing is skipped for that send.

### OpenCode server classifier

The server option uses the connected OpenCode 2 server's experimental text-generation endpoint.

- The classifier prompt is sent to the selected classifier model on your server before the main prompt.
- The endpoint is probed before the option is enabled. A missing endpoint, authentication failure, or unsupported server leaves the option unavailable.
- A send-time classifier failure falls back to your default model; it does not switch to the on-device classifier or invent a tier.
- OpenCode 1.x does not offer this option.

## Map the tiers

Each tier can stay **Auto** or point at an explicit model:

| Tier | Automatic suggestion |
| --- | --- |
| **Simple** | The cheapest enabled model that supports tools |
| **Standard** | Your current default model, falling back to the simple suggestion |
| **Complex** | The most capable enabled model: reasoning first, then context size, then price |

You can also choose an optional thinking level or model variant for each tier. A variant applies only when the routed model exposes it; otherwise routing continues with the model default.

Automatic suggestions only consider enabled, configured, non-deprecated models. If an explicit tier model becomes unavailable, that send skips routing rather than falling back to a different tier.

## Protect long chats

Prompt-cache protection is enabled by default. Above roughly 32,000 context tokens, a downgrade to a cheaper simple or standard model is skipped unless the target model's input price is at most half of the current model's. Complex upgrades are still allowed.

This avoids losing a warm prompt cache just to save a small amount on a long conversation. Turn it off in the auto-routing settings if you prefer cost savings over cache reuse.

## What you see in Chat

- The model picker shows an **Auto-routing** row when the selected classifier is available.
- Choosing an explicit model turns routing off for that chat. Choose **Auto-routing** again to restore it.
- Each assistant reply shows the model that actually answered it, including auto-routed replies. This is the record of the routed choice after a later turn switches models.
- Settings reports the classifier state, pack status, tier mapping, and cache guard.

## When routing is skipped

Routing is deliberately skipped when:

- auto-routing is off;
- an explicit model is selected;
- the session is not idle;
- the prompt is empty or too long for the classifier;
- no visible models are available;
- the selected classifier is unavailable;
- attachments or the estimated context do not fit the selected model;
- the routed model is already the session model;
- the selected tier is unavailable;
- the long-chat cache guard rejects a downgrade.

A skipped route is not an error. The prompt is sent with the normal model selection.

## Privacy

- On-device classification never sends the prompt off the device.
- Server classification sends the classifier prompt to the classifier model on your OpenCode server before the main prompt.
- The app does not log or persist prompts or classifier results for training.

## Troubleshooting

- **The Auto-routing row is missing:** confirm the classifier is available and the model catalog has loaded.
- **On-device routing is unavailable:** download the pack, or remove and reinstall it if it is corrupt.
- **Server routing is unavailable:** confirm OpenCode 2, the experimental endpoint, and the classifier model.
- **A reply used the default model:** routing was skipped or the classifier failed for that send. Check the settings status and try again.
- **A routed model is missing:** enable it in Providers and models, or map the tier to another model.

Next: [Providers and models](/docs/guides/providers-and-models/), [Start and monitor a task](/docs/guides/tasks/), or [Manage extensions](/docs/guides/extensions/).
