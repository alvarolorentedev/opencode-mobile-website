---
id: faq
title: FAQ
slug: /faq
---

# FAQ

## Is OpenCode Mobile a general AI chatbot?

No. It is a mobile interface for OpenCode sessions, workspaces, and remote workflow control.

## Should I run `opencode web` or `opencode serve`?

Use `opencode serve` if the mobile client is the main consumer. Use `opencode web` if you also want the built-in browser UI on the same server.

## Should I bind OpenCode to `0.0.0.0`?

Not by default. For internet-facing access, it is safer to keep OpenCode on `127.0.0.1` and expose it through a tunnel or reverse proxy.

## Do I need authentication if I use Cloudflare Tunnel?

Yes. The tunnel gives you transport and HTTPS, but you should still keep OpenCode protected with `OPENCODE_SERVER_USERNAME` and `OPENCODE_SERVER_PASSWORD`.

## Can I connect the phone directly to a machine on my local network?

Yes. OpenCode supports network access, but a tunnel is usually easier and safer when you want access outside your home or office network.

## What can I do from the mobile UI shown in the screenshots?

You can connect to a remote OpenCode server, select the workspace backing the session, configure visible providers, and start or monitor tasks from the chat view.
