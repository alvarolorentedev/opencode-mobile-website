---
id: terminal
title: Use the Terminal
slug: /guides/terminal
---

# Use the terminal

Use Terminal for a focused command such as checking Git status, running a test, reading a short log, or invoking a project script.

## Open a terminal

1. Select a project in **Workspace**.
2. Open **Terminal**.
3. Tap **+** to create a project PTY, or open the title menu to reconnect to an existing one.
4. Type one command and tap send.

Use refresh to reload the server's terminal list. Closing the active terminal terminates that PTY after confirmation.

## Commands that work well

```bash
git status --short
npm test
npm run typecheck
tail -n 80 path/to/log
```

## What it is not

The mobile terminal is a line console. It sends newline-terminated input and simplifies common ANSI output. It does not emulate a complete VT terminal, so interactive full-screen programs, cursor-heavy tools, and complex terminal UIs may display incorrectly.

If input appears ineffective, confirm that the command does not require an interactive prompt. Prefer explicit flags and non-interactive commands.

Terminal support depends on compatible OpenCode PTY endpoints and a working project-scoped WebSocket through your proxy or tunnel.

Next: [Troubleshoot remote access](../remote-access.md) or [work with files](./workspace-files.md).
