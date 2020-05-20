"use strict";

const match = ({ str, include, exclude }) => {
  if (include && !include.test(str)) { return false; }
  if (exclude && exclude.test(str)) { return false; }
  return true;
};

module.exports = {
  match
};
