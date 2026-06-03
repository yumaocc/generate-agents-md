#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const skillName = 'generate-agents-md';
const sourceDir = join(rootDir, 'skills', skillName);
const codexHome = process.env.CODEX_HOME || join(homedir(), '.codex');
const skillsDir = join(codexHome, 'skills');
const targetDir = join(skillsDir, skillName);

if (!existsSync(sourceDir)) {
  console.error(`Skill source not found: ${sourceDir}`);
  process.exit(1);
}

mkdirSync(skillsDir, { recursive: true });
rmSync(targetDir, { recursive: true, force: true });
cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Installed ${skillName} to ${targetDir}`);
console.log('Restart Codex to pick up the new skill.');
