"use strict";

const filter = ({ str, includes = [], excludes = [] } = {}) => {
  if (!str) { throw new Error("Must provide a non-empty string value"); }
  let lines = str.split("\n");

  // Need 1+ includes matches if provided.
  if (includes.length) {
    lines = lines.filter((line) => includes.some((inc) => inc.test(line)));
  }

  // Cannot have any excludes matches
  if (excludes.length) {
    lines = lines.filter((line) => !excludes.some((exc) => {
      const tmp = exc.test(line);
      return tmp;
    }));
  }

  return lines;
};

module.exports = {
  filter
};
