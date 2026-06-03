# generate-agents-md

`generate-agents-md` 是一套 AI agent 工作流说明，用来为任意代码仓库生成或更新项目专属的 `AGENTS.md`。

它以 Codex skill 的目录格式发布，因此可以被 Codex 直接安装；同时它的核心内容只是 Markdown 指令，也可以被其他 AI 编程工具复用。

它的核心思想很简单：

```text
用户的开发偏好 + 代码库里的真实事实 = 可执行的 AGENTS.md
```

## 背景

AI 编程工具越来越强，但一个常见问题是：每次进入新项目，AI 都需要重新理解项目结构、技术栈、命令、边界和团队偏好。

如果没有清晰的 `AGENTS.md`，AI 很容易：

- 臆造不存在的命令、端口或目录
- 把多个独立项目误当成 monorepo
- 跨项目引入不该共享的代码
- 忽略已有公共模块、组件或工具函数
- 跑错测试命令，或者干脆不验证
- 生成一堆泛泛而谈、无法执行的项目规范

手动为每个项目写 `AGENTS.md` 又很麻烦。尤其当你经常切换项目、维护多个仓库，或者希望把自己的开发习惯沉淀成可复用工作流时，这件事会变成重复劳动。

所以我们做了 `generate-agents-md`。

## 它解决什么问题

这套工作流会指导 AI agent 先读取用户要求，再阅读仓库事实，最后生成真正贴合项目的 `AGENTS.md`。

它适用于：

- 前端项目
- 后端项目
- 全栈项目
- 工具库
- 单体仓库
- monorepo
- 多个独立项目放在一起的仓库

它关注的不是“写一份漂亮文档”，而是生成一份未来 AI agent 能照着工作的项目说明。

## 优点

- **通用**：不绑定前端、后端或某个框架。
- **用户要求优先**：先保留你的开发偏好，再用代码库事实补全。
- **基于证据**：命令、端口、目录、框架和边界都来自仓库文件，不鼓励臆造。
- **支持多项目**：能判断是单项目、monorepo，还是多个独立项目放在一起。
- **支持嵌套说明**：只有当子项目确实有不同命令、技术栈或边界时，才建议生成 nested `AGENTS.md`。
- **短而可执行**：避免把 `AGENTS.md` 写成空泛的工程学长文。
- **尊重已有规范**：更新已有 `AGENTS.md` 时，会尽量保留有价值的内容。

## 安装

### 非 Codex 工具如何使用

如果你使用的不是 Codex，也可以直接打开：

```text
skills/generate-agents-md/SKILL.md
```

把其中的工作流内容复制到你的 AI 工具中，例如：

- Claude / Claude Code 的项目说明或自定义指令
- Cursor / Windsurf 的 rules 或 project instructions
- GitHub Copilot 的 custom instructions
- 其他支持 system prompt、rules、skills、memory 或项目上下文的 AI 编程工具

推荐使用方式：

```text
请按照下面这份 generate-agents-md 工作流，为当前仓库生成 AGENTS.md。

我的额外要求：
- ...

[粘贴 SKILL.md 内容]
```

### 使用 Node / npx 安装

Codex 用户可以用 Node 安装脚本。仓库发布到 GitHub 后可以直接用：

```bash
npx github:<owner>/generate-agents-md
```

安装后重启 Codex。

本地开发时，可以在仓库根目录运行：

```bash
git clone https://github.com/<owner>/generate-agents-md.git
cd generate-agents-md
node scripts/install.mjs
```

然后重启 Codex。

如果以后发布到 npm，也可以使用：

```bash
npx generate-agents-md
```

### 使用 Codex skill installer

Codex 用户如果环境有 Python，也可以使用 Codex skill installer：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo <owner>/generate-agents-md \
  --path skills/generate-agents-md
```

安装后重启 Codex。

## 使用方式

示例：

```text
Use $generate-agents-md to generate AGENTS.md for this repository.

My requirements:
- keep instructions concise
- do not invent commands
- preserve existing project conventions
- create nested AGENTS.md files only when subprojects have different commands or boundaries
```

中文也可以：

```text
用 $generate-agents-md 给这个仓库生成 AGENTS.md。

我的要求：
- 多个项目要分开写
- 不要臆造命令和端口
- 保留已有项目规范
- 改完要写清楚验证方式
```

## 仓库结构

```text
.
└── skills/
    └── generate-agents-md/
        ├── SKILL.md
        └── agents/
            └── openai.yaml
```

## 许可证

MIT

---

# generate-agents-md

`generate-agents-md` is an AI agent workflow for generating or updating project-specific `AGENTS.md` files for any codebase.

It is distributed in the Codex skill folder format, so Codex can install it directly. The core content is plain Markdown instructions, so other AI coding tools can reuse it too.

The core idea is simple:

```text
User development preferences + repository facts = actionable AGENTS.md
```

## Background

AI coding tools are becoming more capable, but they still face a recurring problem: every time they enter a new repository, they need to rediscover the project structure, stack, commands, boundaries, and team preferences.

Without a clear `AGENTS.md`, AI agents can easily:

- invent commands, ports, or directories
- mistake colocated independent projects for a monorepo
- import code across boundaries that should remain separate
- ignore existing shared modules, components, or helpers
- run the wrong validation command, or skip validation entirely
- produce generic project rules that are not actually useful

Writing `AGENTS.md` manually for every project is repetitive. This is especially painful when you switch between many repositories or want to turn your development habits into a reusable workflow.

That is why `generate-agents-md` exists.

## What It Solves

This workflow guides an AI agent to capture the user's requirements first, inspect the repository second, and then generate an `AGENTS.md` that fits the actual project.

It works for:

- frontend projects
- backend projects
- full-stack projects
- libraries
- single-project repositories
- monorepos
- repositories that colocate several independent projects

The goal is not to write pretty documentation. The goal is to create instructions that future AI coding agents can actually follow.

## Strengths

- **Generic**: not tied to frontend, backend, or a specific framework.
- **User-first**: preserves your development preferences before filling in repository-specific details.
- **Evidence-based**: commands, ports, directories, frameworks, and boundaries should come from repository files.
- **Multi-project aware**: can distinguish between a single project, a monorepo, and colocated independent projects.
- **Nested instructions when useful**: only suggests nested `AGENTS.md` files when subprojects have meaningfully different commands, stacks, or boundaries.
- **Concise and operational**: avoids turning `AGENTS.md` into a long essay of generic engineering advice.
- **Respectful of existing docs**: preserves useful content when updating an existing `AGENTS.md`.

## Install

### Use with non-Codex tools

If you are not using Codex, open:

```text
skills/generate-agents-md/SKILL.md
```

Copy the workflow into your AI tool, for example:

- Claude / Claude Code project instructions or custom instructions
- Cursor / Windsurf rules or project instructions
- GitHub Copilot custom instructions
- any AI coding tool that supports system prompts, rules, skills, memory, or project context

Recommended prompt:

```text
Please follow the generate-agents-md workflow below and generate AGENTS.md for this repository.

My extra requirements:
- ...

[paste SKILL.md content]
```

### Install with Node / npx

Codex users can install with the Node installer. After publishing the repo to GitHub, run:

```bash
npx github:<owner>/generate-agents-md
```

Restart Codex after installing the skill.

For local development, run the installer from the repository root:

```bash
git clone https://github.com/<owner>/generate-agents-md.git
cd generate-agents-md
node scripts/install.mjs
```

Then restart Codex.

If this package is later published to npm, you can use:

```bash
npx generate-agents-md
```

### Install with the Codex skill installer

Codex users with Python can also use the Codex skill installer:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo <owner>/generate-agents-md \
  --path skills/generate-agents-md
```

Restart Codex after installing the skill.

## Usage

Example:

```text
Use $generate-agents-md to generate AGENTS.md for this repository.

My requirements:
- keep instructions concise
- do not invent commands
- preserve existing project conventions
- create nested AGENTS.md files only when subprojects have different commands or boundaries
```

Chinese prompts work too:

```text
用 $generate-agents-md 给这个仓库生成 AGENTS.md。

我的要求：
- 多个项目要分开写
- 不要臆造命令和端口
- 保留已有项目规范
- 改完要写清楚验证方式
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
