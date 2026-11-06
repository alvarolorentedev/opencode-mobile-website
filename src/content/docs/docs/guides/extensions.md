---
title: Manage OpenCode Extensions from Mobile
description: Manage MCP servers, plugins, agents, skills, and slash commands from OpenCode Mobile, including project or global scope and plugin GUI panels.
lastUpdated: 2026-11-06
---

Use **Settings → Extensions** when you need to change how OpenCode itself works: add an MCP server, install a plugin, create an agent, write a skill, or edit a slash command. Extensions are server configuration, not app preferences.

Extensions management requires an OpenCode 2 server. On OpenCode 1.x, the app keeps the runtime MCP controls under **Settings → Diagnostics** and does not offer the broader editor.

## Open the extensions manager

1. Connect to the OpenCode 2 server that owns the configuration.
2. Open **Settings → Extensions**.
3. Choose the scope:
   - **This project** edits the selected project's configuration.
   - **All projects** edits the user-global configuration for this server.
4. Choose **MCPs**, **Plugins**, **Agents**, **Skills**, or **Commands**.

The current server and project stay visible while you edit. Global changes show a one-time confirmation for that scope visit so a project edit cannot silently become a server-wide change.

## What each tab manages

### MCPs

Add a local MCP command or a remote HTTP(S) server, then connect, disconnect, enable, disable, or remove it. Local entries use an executable plus individual arguments, without shell parsing. Remote entries require a valid HTTP(S) URL.

On OpenCode 2, MCP definitions are written to the selected `opencode.json` or `opencode.jsonc`. Runtime status stays separate: use the row controls to connect or refresh the server, and use the Extensions editor to change the stored definition.

Remote MCP authentication can open the provider flow in the browser and submit the authorization code or wait for completion.

### Plugins

Add or remove a plugin package or local target. Plugins execute code inside the OpenCode server process, so install only plugins you trust and review the target before saving.

Built-in plugins are not listed because the app cannot change them.

### Agents

Create, view, edit, rename, or remove agents. New agents default to Markdown under `.opencode/agents` for the project or the global `agents` directory. Existing JSONC agents stay editable in place and are never migrated silently.

The focused editor exposes the description, mode, model, permissions, and instructions. Model selection uses a searchable, provider-grouped picker with inheritance and variants, independently of which models are visible in Chat. Legacy `mode`/`modes` agents and inherited definitions are read-only in the app.

### Skills

Create a skill under the selected scope, edit its `SKILL.md`, and choose whether it can be invoked automatically. Advanced source editing preserves metadata and comments the structured fields do not expose.

Removing a skill moves it to `.opencode-mobile-trash` so a failed server reload can restore it.

### Commands

Create slash commands as Markdown under `.opencode/commands` for the project or the global `commands` directory. Existing Markdown commands in canonical and legacy directories are discovered and editable. JSONC commands stay editable in place.

A JSONC definition overridden by a same-name Markdown file stays visible as overridden and removable. The app prevents duplicate names across formats and scopes.

## Plugin GUI panels

Installed plugins can expose a graphical panel, such as a workflow graph. When the active chat has a plugin GUI, a plugin button appears in the chat header, including on an empty chat.

- The panel opens in a sandboxed viewer inside the app.
- It can run as a large overlay or in a side-by-side layout.
- Opening a session from a panel stays inside OpenCode Mobile instead of leaving the app.
- The plugin still runs on your OpenCode server; the viewer only renders its interface.

## Safety and limits

- Every save is backed up and replaced atomically, then checked against the server's reloaded configuration. A failed validation restores the previous file.
- Editing is disabled for system-managed configuration, symlinked files, ambiguous global roots, unreadable or invalid JSONC/frontmatter, Windows servers, and servers without the required shell utilities.
- The app never silently converts JSONC definitions to Markdown or rewrites unknown metadata.
- Removing a plugin or command can change what the agent can do. Review the change before relying on the next turn.
- An extension may require a new chat or a refreshed capability catalog before it appears in Chat.

## If an extension is missing

- Confirm the active server is OpenCode 2.
- Confirm the correct project or global scope is selected.
- Refresh the extension list after saving.
- Check that the server accepted the configuration; a rejected save keeps your draft.
- For runtime MCP state, check **Settings → Diagnostics** on either contract.
- If the server reports a read-only configuration, edit it on the server directly.

Next: [Auto model routing](/docs/guides/auto-model-routing/), [Providers and models](/docs/guides/providers-and-models/), or [MCP and diagnostics](/docs/guides/mcp-and-diagnostics/).
