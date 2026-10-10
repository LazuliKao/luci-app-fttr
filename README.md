# luci-app-fttr

An Apache-2.0 LuCI application for the HM2004-DU FTTR controller.

The application provides Status, Configuration, and Hardware status tabs.
Status and Hardware status read the existing `fttrctl status --json`
interface through the narrowly scoped `luci.fttr.get_status` rpcd method.
Configuration edits the supported `fttr` UCI ACS options. Its ACL grants UCI
read/write access only to the `fttr` configuration and does not expose generic
shell execution or Wi-Fi credential handling.

## Package

Install the package with `h3c-fttr-tools` and LuCI. In an OpenWrt feed, place
this repository as the `luci-app-fttr` package and build it with the normal
`luci.mk` packaging flow.

## TypeScript build

The TSX views are in `src/view/`; the generated LuCI modules are kept in
`htdocs/luci-static/resources/view/fttr/` for direct packaging. The views use
the `@lazulikao/luci-types` automatic JSX runtime (`class`, not `className`)
and Rsbuild emits self-contained LuCI modules with no chunks.

```sh
pnpm install
pnpm build
pnpm typecheck
```

For remote edit/build/upload development, copy `.env.example` to `.env`, set the
SSH key and target, then run `pnpm dev:remote`. This watches the TSX source,
rebuilds with Rsbuild, and uploads changed files to the paired router paths.
The router RPCD/ACL/menu files may require an rpcd/LuCI reload after changes.

The generated JavaScript is committed alongside the TSX source so the OpenWrt
package build does not require Node.js or pnpm.

## License

Apache-2.0. See [LICENSE](LICENSE).
