# generate-agents-md

[中文](#中文) | [English](#english)

---

## 中文

`generate-agents-md` 是一个 Codex skill，用来为项目生成或更新团队共享的 Codex 编码规则。

它会指导 Codex 先读取你的要求，再扫描仓库事实，最后生成适合团队提交到仓库里的规则文件，例如：

```text
AGENTS.md
.agents/rules/common.md
.agents/rules/project-structure.md
.agents/rules/development.md
.agents/rules/validation.md
.agents/rules/api-contract.md
```

核心思想：

```text
用户偏好 + 仓库事实 + 前后端边界 = 可执行的团队 Codex 规则
```

### 适用场景

- 给现有项目生成 `AGENTS.md`
- 把规则沉淀到 `.agents/rules/*`
- 识别哪些目录是前端、后端、共享类型、文档、脚本或生成产物
- 扫描已有前端和后端开发习惯
- 给 Codex 使用 `AGENTS.md` 和 `.agents/rules/*`
- 处理单项目、前后端同仓、monorepo、多个独立项目放在一起的仓库

这个 skill 不追求内置所有后端框架知识。遇到后端项目时，它会优先根据仓库已有代码总结通用规则，例如分层方式、接口处理、错误处理、数据库访问、测试命令和文件边界。

生成规则时，它会要求重要规则绑定到具体路径、命令、配置、文档或代表性旧功能，避免只写“保持代码优雅”这类空话。

### 安装

使用 npm 安装到 Codex：

```bash
npx generate-agents-md
```

也可以显式指定：

```bash
npx generate-agents-md --target codex
```

或者从 GitHub 安装：

```bash
npx github:yumaocc/generate-agents-md --target codex
```

安装后重启 Codex。

也可以使用 Codex skill installer：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo yumaocc/generate-agents-md \
  --path skills/generate-agents-md
```

### 使用方式

在 Codex 中：

```text
使用 generate-agents-md skill 给这个仓库生成团队共享的 AGENTS.md 和 .agents/rules。

要求：
- 识别哪些目录是前端，哪些目录是后端
- 扫描已有前端和后端开发规则
- 后端规则先保持通用，不要假装熟悉未知框架
- 不要臆造命令、端口、架构
```

前后端是两个独立仓库时，分别在前端仓库和后端仓库各运行一次。

### 仓库结构

```text
.
├── package.json
├── scripts/
│   └── install.mjs
└── skills/
    └── generate-agents-md/
        ├── SKILL.md
        └── agents/
            └── openai.yaml
```

### 许可证

MIT

---

## English

`generate-agents-md` is a Codex skill for generating or updating team-shared Codex coding rules for a repository.

It guides Codex to read your requirements, inspect repository facts, and write rules that can be committed to the project, such as:

```text
AGENTS.md
.agents/rules/common.md
.agents/rules/project-structure.md
.agents/rules/development.md
.agents/rules/validation.md
.agents/rules/api-contract.md
```

Core idea:

```text
User preferences + repository facts + frontend/backend boundaries = actionable team Codex rules
```

### Use Cases

- Generate `AGENTS.md` for an existing project
- Move durable rules into `.agents/rules/*`
- Identify frontend, backend, shared, docs, scripts, and generated-output areas
- Extract existing frontend and backend development conventions
- Support Codex with `AGENTS.md` and `.agents/rules/*`
- Handle single projects, full-stack repos, monorepos, and colocated independent projects

This skill does not try to hard-code every backend framework. For backend code, it should derive generic rules from the repository evidence: layering, API handlers, errors, persistence, tests, and boundaries.

When generating rules, it requires important guidance to be tied to concrete paths, commands, configs, docs, or representative existing files instead of generic advice.

### Install

Install into Codex with npm:

```bash
npx generate-agents-md
```

Or explicitly:

```bash
npx generate-agents-md --target codex
```

Or from GitHub:

```bash
npx github:yumaocc/generate-agents-md --target codex
```

Restart Codex after installing the skill.

You can also use the Codex skill installer:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo yumaocc/generate-agents-md \
  --path skills/generate-agents-md
```

### Usage

In Codex:

```text
Use the generate-agents-md skill to create team-shared AGENTS.md and .agents/rules files for this repository.

Requirements:
- identify which directories are frontend and backend
- scan existing frontend and backend development rules
- keep backend rules generic when framework evidence is limited
- do not invent commands, ports, or architecture
```

For separate frontend and backend repositories, run the skill once in each repository.

### Repository Layout

```text
.
├── package.json
├── scripts/
│   └── install.mjs
└── skills/
    └── generate-agents-md/
        ├── SKILL.md
        └── agents/
            └── openai.yaml
```

### License

MIT
