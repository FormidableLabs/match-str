"use strict";

const isMatch = ({ str, includes = [], excludes = [] }) => {
  if (!str) { throw new Error("Must provide a non-empty string value"); }

  // Need 1+ includes matches if provided.
  if (includes.length && !includes.some((inc) => inc.test(str))) { return false; }

  // Cannot have any excludes matches
  if (excludes.some((exc) => exc.test(str))) { return false; }

  return true;
};

module.exports = {
  isMatch
};
