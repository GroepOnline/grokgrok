#!/usr/bin/env node
// Validate the generated protobuf atlas: internal consistency + reference resolution.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const atlas = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "proto-atlas.json"), "utf8"));

let fail = 0;
const assert = (ok, msg) => { if (!ok) { console.error("FAIL:", msg); fail = 1; } };

// counts match content
assert(atlas.counts.messages === atlas.messages.length, "message count mismatch");
assert(atlas.counts.enums === atlas.enums.length, "enum count mismatch");
assert(atlas.counts.services === atlas.services.length, "service count mismatch");
assert(atlas.counts.fields === atlas.messages.reduce((a, m) => a + m.fields.length, 0), "field count mismatch");

// every message has fields; every field number is a positive int; wire type consistent
for (const m of atlas.messages) {
  assert(m.fields.length > 0, `${m.fullName} has no fields`);
  const nums = new Set();
  for (const f of m.fields) {
    assert(Number.isInteger(f.number) && f.number > 0, `${m.fullName}.${f.name} bad field number`);
    assert(!nums.has(f.number), `${m.fullName} duplicate field number ${f.number}`);
    nums.add(f.number);
    assert(f.wireType === (f.number & 7), `${m.fullName}.${f.name} wire type mismatch`);
  }
}

// enum values unique numbers
for (const e of atlas.enums) {
  const nums = new Set(e.values.map((v) => v.number));
  assert(nums.size === e.values.length, `${e.fullName} duplicate enum numbers`);
}

// every message-typed field resolves to a known type
const names = new Set([...atlas.messages.map((m) => m.fullName), ...atlas.enums.map((e) => e.fullName)]);
for (const m of atlas.messages) {
  for (const f of m.fields) {
    if (f.unresolvedRef) { console.error("FAIL: unresolved ref", m.fullName, f.name); fail = 1; }
    if (f.resolvedType) assert(names.has(f.resolvedType), `${m.fullName}.${f.name} resolvedType missing`);
  }
}

// services reference existing types
for (const s of atlas.services) {
  for (const meth of s.methods) {
    assert(names.has("proto." + meth.inputType), `${s.fullName}.${meth.name} input type missing`);
    assert(names.has("proto." + meth.outputType), `${s.fullName}.${meth.name} output type missing`);
  }
}

if (fail) process.exit(1);
console.log(`proto-atlas ok: ${atlas.counts.messages} messages, ${atlas.counts.enums} enums, ${atlas.counts.services} services, ${atlas.counts.fields} fields`);
