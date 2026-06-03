---
name: generate-agents-md
description: Generate or update AGENTS.md files for any codebase by combining explicit user requirements with repository facts, including project boundaries, commands, conventions, tooling, validation workflows, and nested project instructions. Use when the user wants reusable agent instructions for a new or existing project.
---

# Generate AGENTS.md

Use this skill to create concise, project-specific `AGENTS.md` files. The goal is to turn the user's preferences plus the repository's actual conventions into instructions a future coding agent can follow.

## Core Principle

User requirements are first-class constraints. Repository facts refine and ground those requirements. Do not invent commands, ports, architecture, tools, or conventions.

## Workflow

1. Capture the user's explicit requirements before reading too much into the codebase.
2. Inspect the repository shape with fast tools such as `rg --files`, `find`, and package/config reads.
3. Determine project boundaries:
   - single project
   - true workspace or monorepo
   - several independent projects colocated together
   - library, application, service, or mixed repository
4. Read representative evidence:
   - root README and docs
   - manifests such as `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`, `.csproj`
   - framework/build configs
   - test, lint, formatter, CI, and container configs
   - source entry points, routing, shared modules, packages, apps, services, or libraries
   - existing `AGENTS.md`, `CONTRIBUTING.md`, coding standards, or architecture docs
5. Identify practical instructions:
   - project purpose and stack
   - install/dev/build/test/lint/typecheck commands
   - local ports and services when present
   - important entry files and directories
   - reusable modules, components, packages, helpers, or APIs
   - generated/cache/vendor directories to avoid
   - dependency and cross-boundary rules
   - validation expectations and how to report failures
6. Decide file placement:
   - Use one root `AGENTS.md` when the repository has one coherent project.
   - Use a short root `AGENTS.md` plus nested `AGENTS.md` files when subprojects have different commands, stacks, ownership boundaries, or conventions.
   - Do not create nested files just because directories exist.
7. Write or update the files.
8. Summarize generated files, key assumptions, and any facts that could not be verified.

## Content Shape

Prefer these sections when relevant:

- Project Context
- Work Boundaries
- Important Entrypoints
- Reuse Priorities
- Coding Rules
- Styling or Architecture Rules
- Data, API, or Dependency Rules
- Commands and Validation
- Local Ports or Services
- Files to Avoid

Keep each `AGENTS.md` operational and compact. Avoid generic advice unless the user asked for it or the repository clearly supports it.

## User Requirements Handling

Preserve user preferences such as:

- coding style and architecture preferences
- testing or review expectations
- UI/design rules
- dependency restrictions
- security, performance, or accessibility expectations
- generated-file handling
- forbidden operations
- multi-project boundaries

If a user requirement conflicts with repository evidence, do not silently resolve it. Explain the conflict and choose the safer, less destructive option.

## Detection Guidance

- If a root workspace file exists, treat the repository as a workspace unless project files show the apps are intentionally independent.
- If subdirectories each have their own manifest and lockfile, consider whether they are colocated independent projects.
- Commands should come from manifests, Makefiles, task runners, CI, docs, or obvious framework conventions. Mark uncertain items as not found instead of inventing them.
- Local ports should come from config files, scripts, docs, compose files, or environment examples.
- Generated folders such as `node_modules`, `.next`, `dist`, `build`, `.turbo`, `.umi`, `target`, `.venv`, `__pycache__`, and coverage output should usually be excluded from inspection and editing.

## Quality Bar

Good `AGENTS.md` files are:

- specific to the repository
- short enough to be read every time
- clear about boundaries and commands
- grounded in evidence
- faithful to the user's requirements
- useful for day-to-day coding, review, testing, and maintenance

Avoid:

- long essays
- generic best-practice dumps
- invented commands or ports
- broad rewrite instructions unless the user asked for them
- duplicating the same detailed rules in every nested file
- overwriting existing project instructions without preserving useful content
