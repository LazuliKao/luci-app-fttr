// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

let response: unknown;
Object.assign(globalThis, {
	_: (text: string) => text,
	L: {
		rpc: {
			declare: (spec: { object: string; method: string; reject: boolean }) => {
				assert.equal(spec.object, "luci.fttr");
				assert.equal(spec.method, "get_capabilities");
				assert.equal(spec.reject, true);
				return async () => response;
			},
		},
	},
});
const { getCapabilities, requirePage } = await import("../src/view/contracts/capabilities");

const fixture = (acs: boolean, mqtt: boolean, hl202: boolean) => ({
	schema_version: 1,
	version: "0.1.0",
	features: { acs, mqtt, "device-hl202": hl202, "device-hwtc": false },
	functions: { optical: true, omci_mib: true, mqtt_telemetry: mqtt, hl202_management: hl202 && mqtt, cwmp: acs },
	pages: {
		status: true,
		config: acs,
		sync: acs,
		hl202: hl202 && mqtt,
		hardware: true,
		calibration: true,
		about: true,
	},
});
for (const acs of [false, true]) {
	for (const mqtt of [false, true]) {
		for (const hl202 of [false, true]) {
			const expected = fixture(acs, mqtt, hl202);
			response = expected;
			assert.deepEqual(await getCapabilities(), expected);
			for (const page of ["config", "sync", "hl202"] as const) {
				if (expected.pages[page]) await requirePage(page);
				else await assert.rejects(requirePage(page), /not supported/);
			}
			await requirePage("status");
		}
	}
}
for (const invalid of [{}, { error: "unavailable" }, { ...fixture(true, true, true), schema_version: 2 }]) {
	response = invalid;
	await assert.rejects(getCapabilities());
	await assert.rejects(requirePage("hl202"));
}

const root = new URL("../package/luci-app-fttr/root/", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");
const acl = JSON.parse(read("usr/share/rpcd/acl.d/luci-app-fttr.json"));
assert.ok(acl["luci-app-fttr"].read.ubus["luci.fttr"].includes("get_capabilities"));
const rpc = read("usr/libexec/rpcd/luci.fttr");
assert.match(rpc, /"get_capabilities":\{\}/);
assert.match(rpc, /get_capabilities\)/);
const menu = JSON.parse(read("usr/share/luci/menu.d/luci-app-fttr.json"));
for (const page of ["config", "sync", "hl202"]) {
	assert.equal(menu[`admin/network/fttr/${page}`].depends.fs[`/var/run/fttr-capabilities/${page}`], "file");
}
console.log("Capability contract, page guards, menu dependencies and RPC ACL checks passed.");
