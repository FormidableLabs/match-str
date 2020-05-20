#!/usr/bin/env node

"use strict";

const pkg = require("../package.json");
const { filter } = require("../lib/index");

const { log, error } = console;

const USAGE = `
Usage: ${pkg.name} [options]

Options:
  --str, -s       String to match on                      [String]
  --include, -i   If provided, must match pattern         [RegExp]
  --exclude, -e   If provided, cannot match pattern       [RegExp]
  --help, -h      Show help                               [boolean]
  --version, -v   Show version number                     [boolean]

  Examples:
  ${pkg.name} -s "$(printf 'one\\ntwo')"              Exits 0. Matches by default.
  ${pkg.name} -i "^tw.+" -s "$(printf 'one\\ntwo')"   Exits 0. Matches "two" at line start.
  ${pkg.name} -e "one" -s "$(printf 'one\\ntwo')"     Exits 0. Still matches "two".
  ${pkg.name} -e ".*" -s "$(printf 'one\\ntwo')"      Exits 1. Everything excluded.
  ${pkg.name} -i "^three" -s "$(printf 'one\\ntwo')"  Exits 1. No include match.
`.trim();

// ============================================================================
// Actions
// ============================================================================
const help = async () => { log(USAGE); };
const version = async () => { log(pkg.version); };

// Matches and then **exits process** for upstream usage.
const matchAndExit = async ({ str, includes, excludes }) => {
  const lines = filter({ str, includes, excludes });
  process.exit(lines.length ? 0 : 1); // eslint-disable-line no-process-exit
};

// ============================================================================
// Configuration
// ============================================================================
// Get action or help / version name
const getAction = (args) => {
  // Return actions in priority order.
  if (args.includes("--help") || args.includes("-h")) { return help; }
  if (args.includes("--version") || args.includes("-v")) { return version; }

  // Default.
  return matchAndExit;
};

// Get RegExp.
const getRegExps = ({ args, flags }) => flags
  .map((flag) => args
    .map((val, i) => args[i - 1] === flag ? new RegExp(val, "gm") : null)
    .filter(Boolean)
  )
  .reduce((m, a) => m.concat(a), []);

// Get options for actions.
const getOptions = (args) => ({
  includes: getRegExps({ args, flags: ["--include", "-i"] }),
  excludes: getRegExps({ args, flags: ["--exclude", "-e"] }),
  str: args.find((val, i) => ["--str", "-s"].includes(args[i - 1]) ? val : null)
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
