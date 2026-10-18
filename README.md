# luci-app-fttr

A LuCI application for managing the HM2004-DU FTTR controller and its downstream
devices. It adds an **FTTR** section under **Network** with status, configuration,
synchronization, hardware status, and HL202 management views.

## Features

- **Status and hardware:** View controller and ONU status, including hardware and
  optical/MIB information.
- **Configuration:** Edit the unified `fttr` UCI configuration, including ACS,
  synchronization policy, device identities, WAN services, Wi-Fi profiles,
  SSIDs, and LAN/WLAN bindings.
- **Synchronization:** Preview or apply provisioning manually, or configure
  automatic triggers and review operation results.
- **HL202 management:** Inspect MQTT reports, manage supported device accounts,
  and run scripts on a selected sub-gateway.

The package depends on LuCI, rpcd, ucode, and `h3c-fttr-tools`. HL202 management
requires a backend build that includes `device-hl202` support.

## Build the OpenWrt package

Add `package/luci-app-fttr/` to an OpenWrt source tree or SDK as
`package/luci-app-fttr/`. Ensure the build tree provides the package dependencies,
then select **LuCI → Applications → luci-app-fttr** in `menuconfig` and compile:

```sh
make menuconfig
make package/luci-app-fttr/compile V=s
```

These commands build the package; deploy the resulting package to a router using
your normal OpenWrt package installation process. The backend package
`h3c-fttr-tools` must also be installed on the router.

## Use the application

After installing the package, open **Network → FTTR** in LuCI.

### Synchronization

In automatic mode, choose configuration-change, online, CWMP boot, and/or periodic
triggers. Periodic intervals are 30–86400 seconds; `0` disables the timer. In
manual mode, preview is optional; **Apply** starts a background operation, which
continues if you leave the page. Review item-level results and any blocked or
failed reasons rather than treating a completed operation as proof that every
device change succeeded.

**Save & Apply** commits the configuration and reloads provisioning without
restarting PON. Changes to ACS listener or startup settings require an explicit
FTTR / ACS service restart, which interrupts PON. A CWMP `verified` result does
not by itself confirm radio association or working service traffic.

Wi-Fi cleanup can include unconfigured factory or mesh WLANs. Review the
preserved instance lists before deleting WLANs. Available WLAN slots and K155
port bindings are constrained by the verified device contract.

### HL202 management

The page uses current MQTT and optical-device information to identify a target;
ambiguous or stale bindings cannot be used to execute commands. It does not
depend on CWMP Inform or ACS readiness.

The console accepts shell scripts for execution on the selected sub-gateway.
Scripts are passed to `fttrctl` as request data and are not evaluated by the
router shell. This capability uses the existing authenticated LuCI write
permission; it has no separate login or command allowlist. Review scripts before
running them. Output is unfiltered and may contain secrets. A timeout can leave
the execution outcome unknown; leaving the page stops polling but does not cancel
the remote command. Commands are not automatically replayed.

Reports distinguish receipt time from the last successful parse. If a new report
is corrupt or empty, the page may retain an explicitly older successfully parsed
report. Account updates preserve permission masks; passwords are never read back,
and a saved password does not prove that web login is permitted.

## Develop

The repository root is the frontend project. TSX sources are under `src/view/`;
the OpenWrt package recipe and install payload are under `package/luci-app-fttr/`.
Generated LuCI JavaScript is committed in the package so building the OpenWrt
package does not require Node.js or pnpm.

Requirements: Node.js 18 or later and pnpm 10.12.4.

```sh
pnpm install
pnpm build
pnpm typecheck
```

`pnpm build` writes the self-contained LuCI modules to
`package/luci-app-fttr/htdocs/luci-static/resources/view/fttr/`. Edit the TSX
sources, not the generated JavaScript. To check formatting and lint rules, run
`pnpm lint`.

### Remote development

For router-based development, copy `.env.example` to the ignored local `.env`,
configure the SSH connection and key path, then run:

```sh
pnpm dev:remote
```

Install the package on the router before starting the watcher; uploaded files do
not receive executable permissions automatically. If bootstrapping by upload,
set permissions on the helper scripts before reloading rpcd:

```sh
chmod 0755 /usr/libexec/fttr-hl202 /usr/libexec/rpcd/luci.fttr
```

Reload rpcd or LuCI when changing the router-side RPCD, ACL, or menu files. Keep
SSH credentials and other secrets in `.env`; do not add them to tracked files.

To refresh translation catalogs from the source strings, run
`pnpm i18n:extract`. This does not request AI translation.

## License

Apache-2.0. See [LICENSE](LICENSE).
