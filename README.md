match-str 🧵
============

[![npm version][npm_img]][npm_site]
[![Travis Status][trav_img]][trav_site]

Small, no dependency tool to match strings against regular expressions.

## Usage

```sh
$ match-str -h
Usage: match-str [options]

Options:
  --str, -s       String to match on                      [String]
  --include, -i   If provided, must match pattern         [RegExp]
  --exclude, -e   If provided, cannot match pattern       [RegExp]
  --help, -h      Show help                               [boolean]
  --version, -v   Show version number                     [boolean]

  Examples:
  match-str -s "$(printf 'one\ntwo')"              Exits 0. Matches by default.
  match-str -i "^tw.+" -s "$(printf 'one\ntwo')"   Exits 0. Matches "two" at line start.
  match-str -e "one" -s "$(printf 'one\ntwo')"     Exits 0. Still matches "two".
  match-str -e ".*" -s "$(printf 'one\ntwo')"      Exits 1. Everything excluded.
  match-str -i "^three" -s "$(printf 'one\ntwo')"  Exits 1. No include match.
```

## Notes

* Provides no stdout, just exit process with `0` for match or `1` for no match.
* Matching logic is:
    0. Split lines at newline. Then, for each line:
    1. If `-i` flags are provided, files are filtered to at least one match.
    2. If `-e` flags are provided, files are excluded.
    3. If any files remain, process exits `0` else `1`.
* Can have multiple `-i` and `-e` options.

[npm_img]: https://badge.fury.io/js/match-str.svg
[npm_site]: http://badge.fury.io/js/match-str
[trav_img]: https://api.travis-ci.com/FormidableLabs/match-str.svg
[trav_site]: https://travis-ci.com/FormidableLabs/match-str
