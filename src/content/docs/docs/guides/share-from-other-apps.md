---
title: Share Files and Text into OpenCode Mobile
description: Share text, links, images, and documents from Android apps into an OpenCode Mobile chat draft, with limits and privacy details.
lastUpdated: 2026-10-19
---

On Android, OpenCode Mobile can receive content from another app’s Share menu. Use it to send a screenshot, document, log excerpt, or link into a chat without copying and pasting.

iOS inbound sharing is not available yet.

## Share into the app

1. In the source app, choose **Share**.
2. Select **OpenCode Mobile**.
3. Review the share preview.
4. Choose the destination chat, or choose **New chat** in the current project.
5. Tap **Add to chat**.
6. Review the draft and attachments in the composer.
7. Tap Send when the content is ready.

Shared content is added to the draft; it is **never submitted automatically**.

## What you can share

The Android share sheet accepts single or multiple items, including:

- text and links;
- images;
- documents such as PDFs;
- other files the source app exposes.

Limits and behavior:

- up to **10 items** per share;
- **10 MB per file**;
- the selected model must support attachments before sending;
- unsupported, missing, or oversize items remain visible as warnings;
- the draft keeps existing text and attachments;
- a staged share expires after **10 minutes**.

## Choose the destination

The preview defaults to the current chat. You can change to another conversation on the active connection, or create a new chat in the current project.

If the app is not fully onboarded when the share arrives, it shows a finish-setup state and keeps the staged content until it expires. Complete setup, then return to the preview or share again.

## Privacy

Shared content is staged in memory on the device and then sent to the OpenCode server you selected. It is not uploaded to OpenCode Mobile infrastructure. The normal attachment and permission rules still apply.

Avoid sharing secrets, customer data, or private URLs into sessions that are shared publicly.

## Troubleshooting

- **OpenCode Mobile is not in the share sheet:** open the app once after installing it, then try again.
- **An item was skipped:** check its type and size; files over 10 MB are rejected.
- **The share preview disappeared:** the 10-minute staging window expired. Share again.
- **Send is disabled:** choose a model that supports attachments or remove unsupported files.
- **iOS share sheet:** inbound sharing is not implemented yet.

Next: [Start and monitor tasks](/docs/guides/tasks/), [review approvals and changes](/docs/guides/approvals-and-changes/), or [use quick actions and widgets](/docs/guides/quick-actions-and-widgets/).
