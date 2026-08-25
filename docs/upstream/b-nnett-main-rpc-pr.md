# Proposed upstream contribution: b-nnett/grok-bot-0.18-reconstructed — Main-RPC payload evidence

**Status: candidate brief only. Not pushed anywhere without explicit approval.**

## What 0.24 proves that helps 0.18

The shipped Grok Bot 0.24 preload registers the main edge as a flat arg-style table
(`{method:{args:"none"|"object"}}`) and electron-main implements handlers in grouped
tables (`ma("<group>", { method: ({key,…}) => … })`). Both patterns also appear in the
0.18 reconstruction tree (`source/electron-preload/preload.ts`,
`source/electron-main/…`), so the recovery technique is directly reusable:

1. **Arg-style table extraction** — regex-safe scan of the preload bundle for
   `<edgeVar>={…}` method tables (see `grokgrok/scripts/generate-desktop-bridge.mjs`,
   function around `preload.match(/=\w+\("main","events"\)…/)`).
2. **Payload-key recovery** — parse main-process handler groups for destructured
   parameter keys per method (`scripts/analyze-main-rpc.mjs`, generic `helper("group",{…})`
   scanner). Produces `{method, payloadKeys[], takesObjectPayload}`.
3. **Event-name recovery** — `emit("name")` scan filtered against Node's standard
   EventEmitter vocabulary to isolate domain broadcasts.

## What we would contribute (patch sketch)

- A standalone script + fixture pair under `tools/payload-evidence/` in the 0.18 repo:
  input = any minified preload/main pair; output = JSON inventory + drift report.
- Only **0.18-proven** payload types promoted into `source/electron-preload` types;
  anything 0.24-only stays out of runtime code (no behaviour changes).
- Tests: golden-file comparison against a committed fixture inventory.

## Constraints honoured

- No artifact bytes, minified bodies, or 0.24-only strings enter the 0.18 repo;
  the tool consumes bundles supplied locally by the maintainer.
- Raw/generated reports stay ignored upstream; only curated JSON schemas land.
