const path = require("path");
const tempWrite = require("temp-write");
const execa = require("execa");
const bin = path.join(__dirname, "cli.js");

const grammars = {
  good: "G { S = digit }",
  bad: "𝔊"
};

const inputs = {
  good: "1",
  bad: "𝖝"
};

test("valid grammar", async () => {
  const grammar = await tempWrite(grammars.good);
  const result = await execa(bin, ["check", grammar]);
  expect(result.stdout).toContain("OK");
});

test("valid grammar and input", async () => {
  const grammar = await tempWrite(grammars.good);
  const input = await tempWrite(inputs.good);
  const result = await execa(bin, ["parse", grammar, input]);
  expect(result.stdout).toContain("OK");
});

test("valid grammar and input wih trace", async () => {
  const grammar = await tempWrite(grammars.good);
  const input = await tempWrite(inputs.good);
  const result = await execa(bin, ["parse", grammar, input, "--trace"]);
  expect(result.stdout).toContain('digit ⇒  "1"');
});

test("invalid grammar", async () => {
  const grammar = await tempWrite(grammars.bad);
  await expect(execa(bin, ["check", grammar])).rejects.toThrow(/FAIL/);
});

test("valid grammar and invalid input", async () => {
  const grammar = await tempWrite(grammars.good);
  const input = await tempWrite(inputs.bad);
  await expect(execa(bin, ["parse", grammar, input])).rejects.toThrow(/FAIL/);
});
