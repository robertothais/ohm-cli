#!/usr/bin/env node

const process = require("process");
const path = require("path");
const fs = require("fs");
const ohm = require("ohm-js");

const command = process.argv[2];
const usage = `Ohm is parser generator.

Usage:

  ohm check <grammar>
  ohm parse <grammar> <input> [--trace]
  ohm version
`;

function check(src) {
  try {
    return ohm.grammar(src);
  } catch (err) {
    console.log(fail());
    console.log(err.message);
    process.exit(1);
  }
}

function parse(grammar, input) {
  const match = grammar.match(input);
  if (match.succeeded()) {
    return grammar.trace(input);
  } else {
    console.log(fail());
    console.log(match.message);
    process.exit(1);
  }
}

function read(filepath) {
  if (filepath === undefined) {
    console.log(usage);
    process.exit(1);
  }
  return fs.readFileSync(path.resolve(process.cwd(), filepath), "utf8");
}

function ok() {
  return "[ \u001b[32m OK \u001b[0m ]";
}

function fail() {
  return "[ \u001b[31m FAIL \u001b[0m ]\n";
}

switch (command) {
  case "check": {
    check(read(process.argv[3], command));
    console.log(ok());
    break;
  }
  case "parse": {
    const grammar = check(read(process.argv[3], command));
    const trace = parse(grammar, read(process.argv[4], command));
    console.log(ok());
    if (process.argv[5] === "--trace") {
      console.log("\n" + trace.toString());
    }
    break;
  }
  case "version":
    console.log(require("./package.json").version);
    break;
  default:
    console.log(usage);
    break;
}
