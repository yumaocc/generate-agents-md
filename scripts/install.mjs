#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const skillName = 'generate-agents-md';
const sourceDir = join(rootDir, 'skills', skillName);
const args = process.argv.slice(2);

function readTarget() {
  const targetIndex = args.findIndex((arg) => arg === '--target' || arg === '-t');
  if (targetIndex !== -1) {
    return args[targetIndex + 1];
  }

  const inlineTarget = args.find((arg) => arg.startsWith('--target='));
  if (inlineTarget) {
    return inlineTarget.split('=')[1];
  }

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  return 'codex';
}

function printHelp() {
  console.log(`Usage:
  generate-agents-md [--target codex]

Targets:
  codex        Install to $CODEX_HOME/skills or ~/.codex/skills
`);
}

function installTo(targetDir) {
  const skillsDir = dirname(targetDir);
  mkdirSync(skillsDir, { recursive: true });
  rmSync(targetDir, { recursive: true, force: true });
  cpSync(sourceDir, targetDir, { recursive: true });
  console.log(`Installed ${skillName} to ${targetDir}`);
}

if (!existsSync(sourceDir)) {
  console.error(`Skill source not found: ${sourceDir}`);
  process.exit(1);
}

const target = readTarget();
const codexHome = process.env.CODEX_HOME || join(homedir(), '.codex');
const codexTarget = join(codexHome, 'skills', skillName);

if (target !== 'codex') {
  console.error(`Unknown target: ${target}`);
  printHelp();
  process.exit(1);
}

installTo(codexTarget);

console.log('Restart Codex to pick up the new skill.');
