# LuCI FTTR Development Notes

- Use pnpm only (`pnpm@10.12.4`); keep `package.json` and `pnpm-lock.yaml` in sync. Do not add npm/yarn lockfiles.
- Build LuCI views as TSX with `@lazulikao/luci-types` automatic JSX runtime. Never create elements with `E()` or React/DOM APIs; use `class`, not `className`.
- Do not edit generated `htdocs/` output directly. Use Rsbuild (`pnpm build`) and preserve the single-file LuCI module banner/footer and no-chunk configuration.
- Keep `dev:remote` configuration in the ignored local `.env`; never add live host credentials, passwords, API keys, or private-key material to tracked files. `.env.example` contains placeholders only.
- For `dev:remote`, ensure the local watched output paths and router installation paths remain pairwise aligned. Restart/reload rpcd when changing its executable, ACL, or menu metadata.
- Verify the RPCD allowlist and ACL whenever adding backend methods. Never expose a generic shell execution method to LuCI.
- Verify OMCI readback, real GEM data, and CWMP RPC independently; they are not interchangeable.
- Do not commit or push unless the user explicitly requests it; do not overwrite live credentials or configuration.
