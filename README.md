# luci-app-fttr

An Apache-2.0 LuCI application for the HM2004-DU FTTR controller.

The application provides Status, Configuration, Synchronization, and Hardware status tabs.
Status and Hardware status read the existing `fttrctl status --json`
interface through the narrowly scoped `luci.fttr.get_status` rpcd method.
Configuration edits the unified `fttr` UCI configuration: ACS, synchronization
policy, device identities, INTERNET/IPTV/TR069 services, device WANs, shared
Wi-Fi profiles, SSIDs, and LAN/WLAN bindings. Optional Wi-Fi keys are masked in
the form; leaving security unset preserves the device's existing security/key.
The ACL grants UCI read/write access only to `fttr` and exposes fixed,
validated provisioning commands rather than generic shell or raw ACS tasks.

## Synchronization workflow

- In **automatic** mode, choose configuration-change, online, CWMP boot and/or
  periodic triggers. Periodic intervals are 30–86400 seconds; 0 disables the
  timer. Automatic operations and their per-item results appear on the
  Synchronization tab, refreshed every five seconds. Manual buttons are hidden.
- In **manual** mode, preview is optional. Apply starts a background operation
  immediately and returns operation IDs; navigating away does not cancel it.
  Both actions inspect the actual device state; Apply does not reuse a cached
  preview. Item-only operations do not prune other WAN/WLAN objects.
- **Save & Apply** commits and reloads provisioning without restarting PON.
  Configuration diagnostics check committed settings and can retry loading if
  an active operation prevented reload. ACS listener/startup settings require
  the explicit FTTR / ACS service restart, which interrupts PON.
- Completed operations may contain blocked or failed items. Inspect reasons,
  revision/freshness indicators and lifecycle results. CWMP `verified` is not
  evidence of radio association or working business traffic.
- WAN allocation and Wi-Fi cleanup use the existing backend ownership rules.
  Deletion of unconfigured WLANs can include factory/mesh WLANs; use preserved
  instance lists when necessary. Arbitrary WLAN slot creation and K155 port
  bindings are limited by the verified device contract, not inferred by the UI.

The backend must include the provisioning implementation and ACS support.
The UI never exposes raw ACS task arguments, which can contain credentials.

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
