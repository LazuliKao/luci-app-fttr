# LuCI FTTR Development Notes

- Use pnpm only (`pnpm@10.12.4`); keep `package.json` and `pnpm-lock.yaml` in sync. Do not add npm/yarn lockfiles.
- Build LuCI views as TSX with `@lazulikao/luci-types` automatic JSX runtime. Never create elements with `E()` or React/DOM APIs; use `class`, not `className`.
- The repository root is the frontend project (`src/`, `package.json`, Rsbuild and TypeScript configs). Only `package/luci-app-fttr/` is the OpenWrt package; keep frontend sources outside that package directory.
- Do not edit generated `package/luci-app-fttr/htdocs/` output directly. Use Rsbuild (`pnpm build`) and preserve the single-file LuCI module banner/footer and no-chunk configuration.
- Keep `dev:remote` configuration in the ignored local `.env`; never add live host credentials, passwords, API keys, or private-key material to tracked files. `.env.example` contains placeholders only.
- For `dev:remote`, ensure the local watched output paths and router installation paths remain pairwise aligned. Restart/reload rpcd when changing its executable, ACL, or menu metadata.
- Verify the RPCD method list and ACL whenever adding backend methods. The owner-approved HL202 console may send arbitrary shell strings through the existing authenticated LuCI write ACL to fttrctl for execution on the selected MQTT sub-gateway. Treat scripts as JSON/file data on the router; never evaluate them in the router shell. Do not add a command allowlist, separate login, or generic output redactor to this console.
- Verify OMCI readback, real GEM data, and CWMP RPC independently; they are not interchangeable.
- Do not commit or push unless the user explicitly requests it; do not overwrite live credentials or configuration.
