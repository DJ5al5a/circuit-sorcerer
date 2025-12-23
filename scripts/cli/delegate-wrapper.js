#!/usr/bin/env node

/**
 * Global Delegation CLI Wrapper
 * This wrapper allows the delegation CLI to work globally
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Find the project root (where package.json with circuit-sorcerer name is located)
const scriptPath = fs.realpathSync(__filename);
const projectRoot = path.resolve(path.dirname(scriptPath), '../..');

// Check if tsx exists in project's node_modules
const tsxPath = path.join(projectRoot, 'node_modules', '.bin', 'tsx');
const delegateScript = path.join(projectRoot, 'scripts', 'cli', 'delegate.ts');

if (!fs.existsSync(tsxPath)) {
  console.error('❌ Error: tsx not found in project dependencies');
  console.error(`Expected at: ${tsxPath}`);
  console.error('Run: npm install tsx --save-dev');
  process.exit(1);
}

if (!fs.existsSync(delegateScript)) {
  console.error('❌ Error: delegate.ts script not found');
  console.error(`Expected at: ${delegateScript}`);
  process.exit(1)
}

// Pass all arguments to the TypeScript script
const args = process.argv.slice(2);
const command = `"${tsxPath}" "${delegateScript}" ${args.map(arg => `"${arg}"`).join(' ')}`;

try {
  execSync(command, {
    stdio: 'inherit',
    cwd: projectRoot
  });
} catch (error) {
  process.exit(error.status || 1);
}
