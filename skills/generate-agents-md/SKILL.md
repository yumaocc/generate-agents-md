---
name: generate-agents-md
description: Generate or update team-shared Codex coding instructions by combining explicit user requirements with repository facts. Use when the user wants AGENTS.md, .agents/rules files, project boundary detection, frontend/backend identification, development rules, validation commands, or reusable agent instructions for a new or existing project.
---

# Generate Agent Instructions

Use this skill to create concise, project-specific Codex instructions a team can commit to the repository. Prefer a small `AGENTS.md` entrypoint plus reusable rule files when the project needs shared guidance.

## Core Principle

User requirements are first-class constraints. Repository facts refine and ground those requirements. Do not invent commands, ports, architecture, tools, or conventions.

Generated instructions must help future agents know:

- which files or directories are frontend, backend, shared, docs, generated output, or tooling
- which existing files show the preferred development style
- which commands verify frontend, backend, or whole-project changes
- which boundaries must not be crossed without an explicit user request

## Workflow

1. Capture the user's explicit requirements before reading too much into the codebase.
2. Inspect the repository shape with fast tools such as `rg --files`, `find`, and package/config reads.
3. Determine project boundaries:
   - single project
   - true workspace or monorepo
   - several independent projects colocated together
   - library, application, service, or mixed repository
4. Classify important directories before writing rules:
   - frontend: pages, routes, components, UI state, styles, assets, request clients, frontend tests
   - backend: API handlers, controllers, services, repositories, schemas, migrations, jobs, backend tests
   - shared: generated clients, DTOs, types, SDKs, protobuf/OpenAPI files, constants
   - project docs: README, docs, architecture notes, existing rules, design docs
   - generated/cache/vendor output that agents should avoid editing
5. Read representative evidence:
   - root README and docs
   - manifests such as `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`, `.csproj`
   - framework/build configs
   - test, lint, formatter, CI, and container configs
   - source entry points, routing, shared modules, packages, apps, services, or libraries
   - existing `AGENTS.md`, `CONTRIBUTING.md`, coding standards, or architecture docs
6. Scan existing development rules for both sides when present:
   - frontend: component patterns, routing, API client usage, styling system, state management, form handling, loading/error/empty states, browser verification
   - backend: layering, API handler style, DTO/schema style, validation, auth, error handling, persistence, migrations, tests
   - cross-boundary: API contracts, generated types, field compatibility, auth/session assumptions, error response conventions
7. Identify practical instructions:
   - project purpose and stack
   - install/dev/build/test/lint/typecheck commands
   - local ports and services when present
   - important entry files and directories
   - reusable modules, components, packages, helpers, or APIs
   - generated/cache/vendor directories to avoid
   - dependency and cross-boundary rules
   - validation expectations and how to report failures
8. Decide file placement:
   - Use one root `AGENTS.md` when the repository has one coherent project.
   - Use a short root `AGENTS.md` plus nested `AGENTS.md` files when subprojects have different commands, stacks, ownership boundaries, or conventions.
   - Do not create nested files just because directories exist.
   - For team-shared reusable rules, prefer `.agents/rules/*.md` over duplicating long sections in `AGENTS.md`.
9. Write or update the files.
10. Summarize generated files, key assumptions, and any facts that could not be verified.

## Recommended Output Layout

For most frontend/backend or full-stack repositories, prefer:

```text
AGENTS.md
.agents/
  rules/
    common.md
    project-structure.md
    development.md
    validation.md
    api-contract.md       # only when API boundaries are present
```

For separate frontend and backend repositories, run the skill once in each repository. Each repository should contain its own `AGENTS.md` and `.agents/rules/*`. Do not require a parent folder to exist.

`AGENTS.md` should be the entrypoint and router. Put durable details in `.agents/rules/*`:

- `common.md`: team-wide expectations, preserving existing conventions, git safety, generated files, validation reporting
- `project-structure.md`: which paths are frontend, backend, shared, docs, scripts, generated output, and what each area owns
- `development.md`: concrete coding rules extracted from existing frontend/backend code; keep backend rules generic when the evidence is thin
- `validation.md`: commands and manual checks, split by frontend/backend when possible
- `api-contract.md`: frontend/backend contract rules when APIs, DTOs, generated clients, OpenAPI/protobuf, auth, or error formats exist

If the repository is very small, a single `AGENTS.md` is acceptable. Avoid creating empty rule files.

## Content Shape

Prefer these sections when relevant:

- Project Context
- Work Boundaries
- Important Entrypoints
- Reuse Priorities
- Frontend Areas
- Backend Areas
- Shared Contract Areas
- Coding Rules
- UI, Styling, or Architecture Rules
- Data, API, or Dependency Rules
- Commands and Validation
- Local Ports or Services
- Files to Avoid

Keep each file operational and compact. Avoid generic advice unless the user asked for it or the repository clearly supports it.

## Output Quality Requirements

Every generated rule should be actionable, evidence-based, and easy to verify:

- Tie important rules to concrete paths, commands, configs, docs, or representative existing files.
- Prefer "use `src/api/request.ts` for HTTP calls" over "write clean API code".
- For every command, include where it came from when practical, such as `package.json`, `Makefile`, CI, README, or config files.
- Mark uncertain commands, ports, services, ownership boundaries, and framework assumptions as unverified instead of guessing.
- Name the existing frontend or backend files that future agents should inspect before adding similar behavior.
- State whether a rule applies to frontend, backend, shared contracts, tests, docs, or the whole repository.
- Include the minimum validation expected for common change types when the repository provides enough evidence.
- Preserve manual project rules when updating existing files; if a rule conflicts with repository evidence, report the conflict instead of silently deleting it.

Avoid rules that cannot guide an edit, review, or verification decision. Phrases such as "write maintainable code", "follow best practices", or "keep code elegant" are only useful when paired with project-specific examples or constraints.

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
- Common frontend evidence includes `src/pages`, `src/routes`, `app/`, `pages/`, `components/`, `views/`, `layouts/`, `router`, `store`, `public/`, `vite.config.*`, `next.config.*`, `nuxt.config.*`, browser test configs, and dependencies such as React, Vue, Svelte, Next, Nuxt, Vite, Tailwind, Ant Design, or Element Plus.
- Common backend evidence includes `controllers`, `handlers`, `routes`, `api`, `server`, `service`, `services`, `repository`, `repositories`, `models`, `schema`, `migrations`, `prisma`, `drizzle`, `cmd`, `internal`, `pkg`, `go.mod`, `pom.xml`, `build.gradle`, `Cargo.toml`, Docker or compose service configs, and dependencies for Express, Nest, Fastify, Koa, Spring, Gin, Kratos, Django, Flask, Rails, Laravel, or similar server frameworks.
- When backend evidence exists but the framework is unfamiliar, write generic evidence-based backend rules instead of pretending expertise: follow existing module layout, existing handler/service/data patterns, existing error handling, and existing tests.
- Commands should come from manifests, Makefiles, task runners, CI, docs, or obvious framework conventions. Mark uncertain items as not found instead of inventing them.
- Local ports should come from config files, scripts, docs, compose files, or environment examples.
- Generated folders such as `node_modules`, `.next`, `dist`, `build`, `.turbo`, `.umi`, `target`, `.venv`, `__pycache__`, and coverage output should usually be excluded from inspection and editing.

## Quality Bar

Good generated instruction files are:

- specific to the repository
- short enough to be read every time
- clear about boundaries and commands
- grounded in evidence
- faithful to the user's requirements
- useful for day-to-day coding, review, testing, and maintenance
- explicit about what is frontend, backend, shared, generated, or off-limits

Avoid:

- long essays
- generic best-practice dumps
- invented commands or ports
- broad rewrite instructions unless the user asked for them
- duplicating the same detailed rules in every nested file
- overwriting existing project instructions without preserving useful content
- overconfident backend framework rules when the repository evidence is thin
