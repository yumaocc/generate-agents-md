# generate-agents-md

A Codex skill for generating practical `AGENTS.md` files from two inputs:

- the user's explicit development preferences
- facts discovered from the repository

The skill is intentionally generic. It can be used for frontend, backend, full-stack, library, monorepo, or colocated multi-project repositories.

## What It Does

`generate-agents-md` guides Codex to inspect a codebase and create or update `AGENTS.md` files that future coding agents can follow.

It focuses on:

- project boundaries
- important entrypoints
- commands and validation workflows
- local ports and services
- reusable modules or components
- dependency and cross-project rules
- files and generated directories to avoid
- user-specific development preferences

It avoids:

- generic best-practice dumps
- invented commands or ports
- overlong documentation
- unnecessary nested `AGENTS.md` files
- silently overwriting useful existing instructions

## Install

Use the Codex skill installer with this repository:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo <owner>/generate-agents-md \
  --path skills/generate-agents-md
```

Restart Codex after installing the skill.

For local development, copy the skill folder directly:

```bash
cp -R skills/generate-agents-md ~/.codex/skills/generate-agents-md
```

Then restart Codex.

## Usage

Example prompt:

```text
Use $generate-agents-md to generate AGENTS.md for this repository.

My requirements:
- keep instructions concise
- do not invent commands
- preserve existing project conventions
- create nested AGENTS.md files only when subprojects have different commands or boundaries
```

Another example:

```text
Use $generate-agents-md to update this project's AGENTS.md.

Add my preferences:
- prefer existing abstractions over new ones
- run the right validation command after edits
- do not edit generated files
```

## Repository Layout

```text
.
└── skills/
    └── generate-agents-md/
        ├── SKILL.md
        └── agents/
            └── openai.yaml
```

## License

MIT
