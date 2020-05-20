#!/usr/bin/env node

"use strict";

const pkg = require("../package.json");

const { log, error } = console;

const USAGE = `
Usage: ${pkg.name} [options]

TODO: USAGE
`.trim();

// ============================================================================
// Actions
// ============================================================================
const help = async () => { log(USAGE); };
const version = async () => { log(pkg.version); };

// ============================================================================
// Configuration
// ============================================================================
// Get action or help / version name
const getAction = (args, opts) => {
  // Return actions in priority order.
  if (args.includes("--help") || args.includes("-h")) { return help; }
  if (args.includes("--version") || args.includes("-v")) { return version; }
  // TODO NORMAL ACTION

  // Default.
  return help;
};

// Get options for actions.
const getOptions = (args) => ({
});

// ============================================================================
// Script
// ============================================================================
const main = async () => {
  const args = process.argv.slice(2); // eslint-disable-line no-magic-numbers
  const opts = getOptions(args);
  const action = getAction(args, opts);
  await action(opts);
};

if (require.main === module) {
  main().catch((err) => {
    error(err);
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
