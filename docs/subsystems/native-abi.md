# Native ABI inventory (0.24.0 linux x64)

**Evidence:** `resources/app.asar.unpacked/dist/{deps,native}` walked directly; exported
symbols checked with `nm -D`. Generated atlas: `evidence/generated/native-abi.json` →
`src/wire/subsystems.generated.ts`.

## Summary

10 binary payloads: **9 N-API `.node` modules + 1 Windows helper executable**.
All active modules register through the stable N-API entrypoint
(`napi_register_module_v1`, verified via exported symbols) — no NAN/internal-API modules.

## Linux-active modules

| Module | Role | Wrapper surface |
| --- | --- | --- |
| `deps/better-sqlite3/build/Release/better_sqlite3.node` | SQLite store engine | JS wrapper: `.prepare()` ×59, `.transaction()` ×2, `.pragma()` ×3 call sites in host-main |
| `deps/tree-sitter/prebuilds/linux-x64/tree-sitter.node` | parser core | `require("tree-sitter")` |
| `deps/tree-sitter-bash/prebuilds/linux-x64/tree-sitter-bash.node` | bash grammar | `require("tree-sitter-bash")` |
| `deps/whichlang-node/whichlang-node.linux-x64-gnu.node` | language detection | `require("whichlang-node")` |
| `deps/@anysphere/tree-chunk-napi/tree-chunk-napi.linux-x64-gnu.node` | tree-chunking helper | `require("@anysphere/tree-chunk-napi")`; binding consumed via a minified alias — exported fn names not recoverable from this bundle |
| `deps/cursor-proclist/build/Release/cursor_proclist.node` | process listing | `cursor_proclist_scan_async(...)` → `{ok,rows}[]`, guarded by a typeof check with graceful null fallback |

## Win32-only payloads — quarantined as inert on this port

- `deps/@anysphere/tree-chunk-napi/tree-chunk-napi.win32-x64-msvc.node`
- `deps/whichlang-node-win32-x64-msvc/whichlang-node.win32-x64-msvc.node`
- `deps/tree-sitter-bash/prebuilds/win32-x64/tree-sitter-bash.node`
- `dist/native/sand-webauthn-signer.exe` — WebAuthn signing helper; on linux the
  equivalent flow is served by the WebAuthn proxy (`get/setWebauthnProxyEnabled`,
  `/webauthn/requests` + `/webauthn/responses`) rather than this binary.

`runtime-deps-manifest.json` in the unpacked tree declares `"platform": "win32"` — it is
the Windows dependency manifest shipped along for cross-platform builds and does not
describe the linux runtime layout.

## Unknown / not claimed

- Exported wrapper-level function names inside `tree-chunk-napi` (minified access path).
- Any ABI details of `sand-webauthn-signer.exe` (PE payload, quarantined).
