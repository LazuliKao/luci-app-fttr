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

The generated `package` branch contains a complete OpenWrt package at its root:
`Makefile`, built `htdocs/`, menu/ACL `root/`, and real `po/` catalogs. Clone it
directly into an OpenWrt tree or SDK; Node.js and pnpm are not needed there:

```sh
git clone --single-branch --branch package https://github.com/LazuliKao/luci-app-fttr.git package/luci-app-fttr
make menuconfig
make package/luci-app-fttr/compile V=s
```

Select **LuCI → Applications → luci-app-fttr** and optionally the Simplified Chinese
translation. The backend `h3c-fttr-tools` comes from
[openwrt-fttr](https://github.com/LazuliKao/openwrt-fttr) and must be available in
the build tree and installed on the router. Translations use native `luci.mk`
rules and remain independent `luci-i18n-fttr-*` packages.

For reproducible firmware builds, pin a commit from the `package` branch.
Deploy the resulting packages using the normal OpenWrt installation process.

### Package publication

`main` keeps frontend sources and the Makefile template. On a `main` push, CI runs
the checks/build, generates `dist/package/`, then commits those files to `package`.
The package commit and README identify the source commit. Rolling versions use
that source commit's UTC timestamp (`YYYY.MM.DD.HHMMSS`); translation and main
package versions match. Publication preserves history, skips unchanged output,
removes obsolete files, and skips stale builds when `main` has advanced.

PRs validate/generate the package without publishing. Manual runs publish only
from current `main`. Version tags (`v1.2.3`) produce a complete, versioned package
archive in GitHub Releases without moving the rolling `package` branch. Nightly
tarballs, download hashes, and cross-repository translation synchronization are
no longer used. Ensure `package` has been published before switching firmware
imports away from the old backend feed package.

For local generation after editing the frontend:

```sh
pnpm check
pnpm package:generate
# Optional explicit version: pnpm package:generate 1.2.3
```

Copy `dist/package/` into the build tree as `package/luci-app-fttr/`. Generation
does not rebuild: it uses the assets just verified by `pnpm check`. Do not copy
the source Makefile template alone (its development version is `0.0.0`).
`pnpm test:package` covers package generation and completeness and is included
in `pnpm check`.

## Use the application

After installing the package, open **Network → FTTR** in LuCI.

### Configuration editing

Templates, SSIDs and networks have separate tabs and single-item editors. Create
a template, confirm it, add its SSIDs, then select those SSIDs when creating its
networks. SSID and network lists show the owning template. Wired-only networks
may have no SSID bindings. Each custom network requires at least one WAN Service
List label.

Confirming an editor stages its changes in LuCI; cancelling a new item removes
its provisional section. **Save** validates the page after parsing its fields;
**Save & Apply** then applies the staged configuration. Invalid existing rows can
still be deleted or repaired without unrelated whole-page checks blocking the
operation.

Deleting an SSID removes its network bindings. A bound SSID cannot move to a
different template until its bindings are removed. A template used by a group,
or a group used by a device, must be unreferenced before deletion. Deleting an
unused template also deletes its SSIDs and networks.

The **Configuration diagnostics** tab contains Check, repair, Reload and Restart
actions. **Review and repair configuration** lists locally detectable errors by
item, including devices referring to a deleted group. Open the affected item's
editor to select a valid reference, or explicitly delete an unwanted entry.
Deletion shows the affected item before using the normal reference checks and
cleanup rules. After repairs, use **Save & Apply**, then **Check**; the backend
result reflects applied configuration, not uncommitted editor changes.

### Synchronization

In automatic mode, choose configuration-change, device-online, CWMP boot,
program-start, and/or periodic triggers. Program-start synchronization waits
until a configured device is online and its CWMP state is fresh. Periodic
intervals are 1–1440 minutes (default 30); `0` disables the timer. In
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

### NPU configuration

The NPU page edits all five `fttr.offload` settings: `enabled`, `bridge`,
`wan_upstream`, `wan_downstream` and `onu_bridge`. All five are saved together and
verified by configuration readback. WAN directions are experimental and default
to disabled; ONU bridge offload defaults to enabled. When offload is enabled,
WAN directions and ONU bridge offload require mutually exclusive port modes.
The page does not change the global firewall software/hardware flow-offloading
settings required for admission. Admission and valid counters alone do not prove
that live traffic is hardware-forwarded.

## Develop

The repository root on `main` is the frontend project. TSX sources are under
`src/view/`; the Makefile template, menu/ACL and translations live under
`package/luci-app-fttr/`. Generated JavaScript is ignored on `main` and committed
only to the generated `package` branch.

Requirements: Node.js 18 or later and pnpm 10.12.4.

### Generated native FTTR client

`src/api/generated/` is generated from the backend's `fttr-api` crate. From this
frontend checkout, use the complete pipeline:

```sh
pnpm sdk:generate
pnpm check
```

Set `FTTR_BACKEND_DIR` for a non-sibling backend. `sdk:generate` emits Rust-owned
wire types, client and ACL, then derives Zod mini schemas from those types.
`sdk:check` checks all four artifacts without writing; `check` also runs the
typecheck, tests and production build. The schema compiler rejects unsupported
syntax and checks assignability in both directions during TypeScript compilation.
Status, provisioning, MIB reports and HL202 job results use shared Rust models
and generated runtime schemas. Only device-defined telemetry field values remain
explicit `unknown` JSON; their enclosing metadata is typed.

Backend status, HL202 protocol/telemetry and calibration producers use the same
`fttr-api` structs directly. Add fixed wire fields there, then regenerate; import
types from `src/api/generated/types` and validators from `src/api/generated/schemas`
instead of creating another frontend model. UI-only form and display models stay local.

Both repositories run the API contract pipeline in CI. Package publication uses
the freshly built JavaScript from the same checked source revision.
Use `FTTR_BACKEND_REF` / `FTTR_FRONTEND_REF` repository variables (or manual workflow
inputs) to select the paired repository revision; pin a commit SHA for repeatable CI.

After `pnpm check`, run `FTTR_SSH_TARGET=root@router pnpm test:device` against an
installed router (PowerShell: set `$env:FTTR_SSH_TARGET` first). This read-only
check validates live query replies with the frontend's actual validators and
compares native methods, the installed ACL and built page hashes. Live replies
stay in memory; failures report schema paths without device identifiers. It does
not exercise write actions or browser rendering.

```sh
pnpm install
pnpm build
pnpm typecheck
```

`pnpm build` writes the self-contained LuCI modules to
`package/luci-app-fttr/htdocs/luci-static/resources/view/fttr/`. Edit the TSX
sources, not the generated JavaScript. To check formatting and lint rules, run
`pnpm lint`.

Run `pnpm test` for offline configuration regressions and `pnpm test:luci` for
contract tests against pinned upstream LuCI form classes (requires GitHub
access). See [tests/README.md](tests/README.md) for test scope and browser checks.

The configuration editor separates UCI snapshots (`config/model.ts`), data-only
validation (`config/validation.ts`), reference operations (`config/operations.ts`),
and the explicit page-save boundary (`config/save.ts`). Native grid/modal saves
are not overridden; `config/form.tsx` contains the shared UI adapters.

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
