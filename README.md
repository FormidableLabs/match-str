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
  match-str "one\ntwo"             Exits 0. Matches by default
  match-str -i "^tw.+" "one\ntwo"  Exits 0. Matches "two" at line start
  match-str -e "one" "one\ntwo"    Exits 1 because of "one" exclusion
```

## Notes

* Provides no stdout, just exit process with `0` for match or `1` for no match.
* Matching logic is:
    1. If `-i` flags are provided at least one pattern must match.
    2. If `-e` flags are provided, any match is a failure.
* Runs regular expressions with `gm` flags.
* Can have multiple `-i` and `-e` options.

[npm_img]: https://badge.fury.io/js/match-str.svg
[npm_site]: http://badge.fury.io/js/match-str
[trav_img]: https://api.travis-ci.com/FormidableLabs/match-str.svg
[trav_site]: https://travis-ci.com/FormidableLabs/match-str
