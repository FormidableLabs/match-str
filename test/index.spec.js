"use strict";

const { filter } = require("../lib/index");

describe("#filter", () => {
  it("handles empty cases", () => {
    expect(() => filter()).to.throw("Must provide a non-empty string value");
    expect(() => filter({ str: "" })).to.throw("Must provide a non-empty string value");
  });

  it("handles base cases", () => {
    expect(filter({ str: "hi" })).to.eql(["hi"]);
    expect(filter({ str: "one\ntwo" })).to.eql(["one", "two"]);
    expect(filter({ str: "one\ntwo", includes: [], excludes: [] })).to.eql(["one", "two"]);
  });

  it("filters to includes", () => {
    expect(filter({ str: "one\ntwo", includes: [/one/] })).to.eql(["one"]);
    expect(filter({ str: "one\ntwo", includes: [/^tw.+/] })).to.eql(["two"]);
    expect(filter({ str: "one\ntwo", includes: [/^t/, /^o/] })).to.eql(["one", "two"]);
    expect(filter({ str: "one\ntwo", includes: [/.*/] })).to.eql(["one", "two"]);
  });

  it("filters out excludes", () => {
    expect(filter({ str: "one\ntwo", excludes: [/two/] })).to.eql(["one"]);
    expect(filter({ str: "one\ntwo", excludes: [/.*/] })).to.eql([]);
  });

  it("filters with both includes and excludes", () => {
    expect(filter({ str: "one\ntwo\nthree", includes: [/^t/], excludes: [/two/] }))
      .to.eql(["three"]);
    expect(filter({ str: "one\ntwo\nthree", includes: [/^t/], excludes: [/.*/] })).to.eql([]);
  });
});
