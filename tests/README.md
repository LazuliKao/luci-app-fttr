# Configuration editing regressions

- `pnpm test`: offline data-validation, reference-operation and save-boundary tests.
- `pnpm test:luci`: contract tests against the pinned upstream LuCI revision in
  `luci-form.test.ts`. This command downloads `luci.js` and `form.js` from GitHub.
  The actual class inheritance, option cloning, add/cancel/remove and save
  lifecycle run unchanged. DOM widgets and UCI transport use in-memory adapters.
  The editor's validation preflight is tested against native parsing to ensure
  an invalid field prevents partial writes to other fields.
  Recovery tests cover the deleted-group case, routing to the affected device,
  targeted cleanup via native removal, and read-only access.

The contract tests do not replace browser checks on the installed router. When
updating the supported LuCI runtime, update the pinned revision and rerun both
suites. Browser acceptance: create/cancel each item, edit/cancel an existing
network, attempt an invalid confirmation and then cancel, switch its template,
delete a referenced SSID, and Save & Apply a valid
wired-only network. Check that cancellation leaves no new UCI sections.
