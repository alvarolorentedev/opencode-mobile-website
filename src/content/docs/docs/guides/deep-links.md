---
title: OpenCode Mobile Deep Links and Session Links
description: Open a specific OpenCode Mobile session from a custom-scheme or web link, understand connection scoping, and handle errors.
lastUpdated: 2026-10-19
---

OpenCode Mobile can open a specific session from a deep link. Notifications, quick actions, and some shared links use the same resolver.

## Session link format

```text
opencodemobile://session/<sessionId>?project=<url-encoded project path>
```

Example:

```text
opencodemobile://session/ses_abc123?project=%2FUsers%2Fyou%2Fcode%2Fmy-project
```

The app:

1. resolves the link against the currently configured server;
2. switches to the given project if it differs from the active project;
3. opens the session and replaces the current route with the Chat tab.

The link does not carry a server identity. It resolves against the active connection. A saved notification or quick-action link may include a connection scope so the app can switch servers first.

Archived sessions are not reachable through a session deep link; restore the session first.

## Web path

On the web build, the equivalent route is:

```text
/session/<sessionId>
```

Universal/app links over HTTPS are not configured. A link works when it uses the app scheme or the web path directly.

## Errors

If the session does not belong to the given project or cannot be found, the app shows a **Could not open session** screen with the server message. It does not create a replacement session or silently open a different chat.

Common causes:

- the session was archived, deleted, or belongs to another server;
- the project path is wrong or not URL-encoded;
- the active connection changed after the link was created;
- the app is not onboarded or connected.

## Pairing links

Cloud Link pairing links use a different format and include a pairing identifier and token. Treat them as credentials. Do not paste them into public issues, logs, or screenshots. See [Cloud Link](/docs/cloud-link/).

## Create a session link

Use the share action in the Chats library when the server supports session sharing. Sharing creates a public session URL; it is different from the local app deep link. Review the session for sensitive content before sharing.

## Security

- Deep links can open a session but cannot approve permissions or submit prompts.
- A link does not bypass server authentication.
- Pairing links and share links can grant access or expose content; handle them as sensitive.
- If a link is exposed, revoke the share or rotate the relevant credentials.

Next: [Chats and sessions](/docs/guides/sessions/), [notifications](/docs/guides/notifications/), or [Cloud Link](/docs/cloud-link/).
