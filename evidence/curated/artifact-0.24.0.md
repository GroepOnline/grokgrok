# Artifact provenance — Grok Bot 0.24.0 linux x64

- **File:** `Grok_Bot_0.24.0_linux_x64.zip` (local copy; not in Git)
- **SHA-256:** `8d14c2bcecafe2f4dac4a90d9842bd94642851ee60de778ca614bfb11af53177`
- **Verified by:** `npm run ingest` (fails hard on mismatch)
- **Inner layout:** Electron app; `resources/app.asar` (95 MB) + `resources/app.asar.unpacked/`
  (native deps: better-sqlite3, tree-sitter, sand-webauthn-signer.exe, elevate.exe)

## Asar top-level inventory (from generated inventory, 759 entries)

| Bundle | Bytes | Role |
| --- | --- | --- |
| `dist/deps/*` | 43.7 MB | vendored node deps (better-sqlite3, tree-sitter, tar-stream, …) |
| `dist/renderer/*` | 24.3 MB | Vite-built React renderer (201 asset chunks) |
| `dist/host/*` | 13.7 MB | `host-main.cjs` + agent-isolation workers (transcript-mirror, agent-store) |
| `dist/electron-main/main.cjs` | 8.7 MB | Electron main process |
| `dist/local-exec-daemon/main.cjs` | 4.0 MB | local execution daemon |
| `dist/node-agent-coordinator/main.cjs` | 89 KB | agent coordinator entry |
| `dist/electron-preload/*.cjs` | 51 KB | 4 preloads: app, VNC, webview, dev-controls |
| `dist/electron-dev-controls/main.cjs` | 82 KB | dev controls process |

Reproduce with: `GROK_BOT_ZIP=<path> npm run ingest`.
Outputs land in `.cache/artifact/<version>/` and `evidence/generated/ingest.json`
(both gitignored; nothing proprietary is committed).
