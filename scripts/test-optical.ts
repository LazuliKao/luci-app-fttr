// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

let response: unknown;
let transportFailure = false;
const calls: Array<{ method: string; args: unknown[] }> = [];
Object.assign(globalThis, {
	_: (text: string) => text,
	L: {
		rpc: {
			declare:
				(spec: { method: string }) =>
				async (...args: unknown[]) => {
					calls.push({ method: spec.method, args });
					if (transportFailure) throw new Error("transport unavailable");
					return response;
				},
		},
	},
});
const { getOpticalStatus, setOptical } = await import("../src/view/contracts/api");
const partialFailure = {
	schema_version: 1,
	status: "error",
	action: "optical_on",
	desired_enabled: true,
	tx_enabled: false,
	actor_state: "unknown",
	hardware_ready: true,
	discovery_active: false,
	cleanup_pending: true,
	error: { code: "Other", message: "calibration failed; reset reasserted" },
};
response = partialFailure;
assert.deepEqual(await setOptical(true), partialFailure, "structured failure must retain saved and actual state");
assert.deepEqual(calls.at(-1), { method: "optical_set", args: [true] });

response = {
	...partialFailure,
	action: "optical_status",
	desired_enabled: null,
	tx_enabled: null,
	hardware_ready: false,
};
assert.deepEqual(await getOpticalStatus(), response, "early failure uses the same complete contract");
for (const invalid of [
	{},
	{ ...partialFailure, schema_version: 2 },
	{ ...partialFailure, desired_enabled: undefined },
	{ ...partialFailure, tx_enabled: undefined },
	{ ...partialFailure, discovery_active: null },
	{ ...partialFailure, cleanup_pending: undefined },
	{ ...partialFailure, actor_state: "guessed" },
]) {
	response = invalid;
	await assert.rejects(setOptical(false));
}
transportFailure = true;
await assert.rejects(getOpticalStatus(), /transport unavailable/);

const acl = JSON.parse(
	readFileSync(
		new URL("../package/luci-app-fttr/root/usr/share/rpcd/acl.d/luci-app-fttr.json", import.meta.url),
		"utf8",
	),
);
assert.ok(acl["luci-app-fttr"].read.ubus["luci.fttr"].includes("optical_status"));
assert.ok(acl["luci-app-fttr"].write.ubus["luci.fttr"].includes("optical_set"));
console.log("Optical partial-failure contract, transport failures and RPC ACL checks passed.");
