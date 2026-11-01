// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { type ConfigRow, type ConfigSnapshot, list, snapshot, wifiChoices } from "../src/view/config/model";
import { canMoveWifi, removeGroup, removeTemplate, removeWifi } from "../src/view/config/operations";
import { recoveryEntries } from "../src/view/config/recovery";
import { saveConfiguration } from "../src/view/config/save";
import { formatIssues, validateConfig, validateServiceList } from "../src/view/config/validation";

let data: ConfigSnapshot;
const row = (id: string, values: Record<string, unknown> = {}): ConfigRow => ({ ".name": id, ...values });
const find = (id: string): ConfigRow | undefined =>
	Object.values(data)
		.flat()
		.find((item) => item[".name"] === id);

Object.assign(globalThis, {
	_: (text: string) => text,
	L: {
		uci: {
			sections: (_config: string, kind: keyof ConfigSnapshot) => data[kind],
			get: (_config: string, id: string, field: string) => find(id)?.[field],
			set: (_config: string, id: string, field: string, value: unknown) => {
				find(id)![field] = value;
			},
			unset: (_config: string, id: string, field: string) => {
				if (find(id)) delete find(id)![field];
			},
			remove: (_config: string, id: string) => {
				for (const kind of Object.keys(data) as Array<keyof ConfigSnapshot>)
					data[kind] = data[kind].filter((item) => item[".name"] !== id);
			},
		},
	},
});

beforeEach(() => {
	data = {
		template: [row("t1", { name: "Home" }), row("t2", { name: "Guest" })],
		wifi: [
			row("w1", { template: "t1", ssid: "Home WiFi", radio: "2g" }),
			row("w2", { template: "t2", ssid: "Guest WiFi", radio: "5g" }),
		],
		network: [
			row("n1", {
				template: "t1",
				name: "Internet",
				vlan: "100",
				priority: "0",
				service_list: ["INTERNET"],
				ssid: ["w1"],
			}),
		],
		group: [row("g1", { template: "t1", name: "Main" })],
		device: [row("d1", { group: "g1" })],
	};
});

test("valid configuration, including wired-only networks and empty SSID collections", () => {
	assert.deepEqual(validateConfig(data), []);
	delete data.network[0].ssid;
	data.wifi = [];
	assert.deepEqual(validateConfig(data), []);
	assert.deepEqual(wifiChoices(data, "t1"), []);
});

test("validation is deterministic and does not mutate its input", () => {
	data.network[0].service_list = [];
	const original = structuredClone(data);
	assert.deepEqual(validateConfig(data), validateConfig(data));
	assert.deepEqual(data, original);
	assert.match(formatIssues(data, validateConfig(data)), /Home \/ Internet \[n1.service_list\]/);
});

test("recovery identifies the device pointing to a deleted group without changing data", () => {
	data.device[0].group = "sg631_probe_group";
	const before = structuredClone(data);
	const entries = recoveryEntries(data);
	assert.equal(entries.length, 1);
	assert.equal(entries[0].kind, "device");
	assert.equal(entries[0].sectionId, "d1");
	assert.equal(entries[0].row.group, "sg631_probe_group");
	assert.equal(entries[0].issues[0].field, "group");
	assert.deepEqual(data, before);
});

test("recovery groups multiple errors into a single actionable configuration item", () => {
	data.network[0].name = "";
	data.network[0].service_list = [];
	data.network[0].ssid = ["missing", "also-missing"];
	const entries = recoveryEntries(data);
	assert.equal(entries.length, 1);
	assert.equal(entries[0].sectionId, "n1");
	assert.deepEqual(
		entries[0].issues.map((issue) => issue.field),
		["name", "service_list", "ssid"],
	);
});

test("legacy scalar and list UCI values are normalized without losing references", () => {
	assert.deepEqual(list(" w1  w2\n"), ["w1", "w2"]);
	assert.deepEqual(list(["w1", "w2"]), ["w1", "w2"]);
	assert.deepEqual(list(undefined), []);
	for (const value of ["INTERNET IPTV", ["INTERNET", "IPTV"]]) assert.equal(validateServiceList(value), true);
	for (const value of [undefined, [], "", "TR069", ["INTERNET", "TR069"]])
		assert.notEqual(validateServiceList(value), true);
});

test("snapshots detach list values from mutable UCI state", () => {
	const copy = snapshot();
	(copy.network[0].ssid as string[]).push("w2");
	assert.deepEqual(data.network[0].ssid, ["w1"]);
});

test("dangling and cross-template SSID bindings are rejected", () => {
	for (const binding of ["w2", "missing"]) {
		data.network[0].ssid = [binding];
		assert.ok(validateConfig(data).some((issue) => issue.sectionId === "n1" && issue.field === "ssid"));
	}
	data.network[0].ssid = ["w1"];
	assert.equal(canMoveWifi("w1", "t2"), false);
	assert.equal(canMoveWifi("w1", "t1"), true);
	assert.equal(canMoveWifi("w2", "t1"), true);
});

test("missing template/group references are reported with concrete section IDs", () => {
	data.wifi[0].template = "missing";
	data.group[0].template = "missing";
	data.device[0].group = "missing";
	const issues = validateConfig(data);
	assert.ok(issues.some((issue) => issue.sectionId === "w1" && issue.field === "template"));
	assert.ok(issues.some((issue) => issue.sectionId === "g1" && issue.field === "template"));
	assert.ok(issues.some((issue) => issue.sectionId === "d1" && issue.field === "group"));
});

test("global validation catches hidden modal fields, numeric bounds, UTF-8 SSID/key length", () => {
	data.network[0].name = "";
	data.network[0].vlan = "4095";
	data.network[0].priority = "-1";
	data.wifi[0].ssid = "中".repeat(11);
	data.wifi[0].security = "wpa2-psk";
	data.wifi[0].key = "short";
	const fields = validateConfig(data).map((issue) => `${issue.sectionId}.${issue.field}`);
	for (const expected of ["n1.name", "n1.vlan", "n1.priority", "w1.ssid", "w1.key"])
		assert.ok(fields.includes(expected));
});

test("SSID choices refresh after edits and remain scoped to their template", () => {
	assert.deepEqual(wifiChoices(snapshot(), "t1"), [["w1", "Home WiFi"]]);
	data.wifi[0].ssid = "Renamed";
	data.wifi.push(row("w3", { template: "t1", ssid: "New" }));
	assert.deepEqual(wifiChoices(snapshot(), "t1"), [
		["w1", "Renamed"],
		["w3", "New"],
	]);
});

test("deleting an SSID cleans scalar and list references in every network", () => {
	data.network.push(row("n2", { ssid: "w1 w2" }));
	removeWifi("w1");
	assert.equal(data.network[0].ssid, undefined);
	assert.deepEqual(data.network[1].ssid, ["w2"]);
	assert.equal(canMoveWifi("w1", "t2"), true);
});

test("referenced template and group deletion is refused before any mutation", () => {
	const original = structuredClone(data);
	assert.throws(() => removeTemplate("t1"), /Template is in use/);
	assert.throws(() => removeGroup("g1"), /Group is used by devices/);
	assert.deepEqual(data, original);
});

test("deleting an unused template removes its owned rows only", () => {
	data.group[0].template = "t2";
	removeTemplate("t1");
	assert.deepEqual(data.network, []);
	assert.deepEqual(
		data.wifi.map((item) => item[".name"]),
		["w2"],
	);
	assert.equal(data.group[0].template, "t2");
});

test("template deletion also cleans already-invalid references from surviving networks", () => {
	data.group[0].template = "t2";
	data.network.push(row("n2", { template: "t2", ssid: ["w1", "w2"] }));
	removeTemplate("t1");
	assert.deepEqual(data.network[0].ssid, ["w2"]);
});

// This small Map adapter exposes the documented parse -> callback -> transport
// boundary. Native GridSection add/cancel behaviour is verified separately.
function mapAdapter(parse: () => void = () => {}) {
	const calls: string[] = [];
	return {
		calls,
		async save(callback?: () => void) {
			calls.push("parse");
			parse();
			callback?.();
			calls.push("transport");
		},
	};
}
const asMap = (map: ReturnType<typeof mapAdapter>) => map as unknown as Parameters<typeof saveConfiguration>[0];

test("page save validates the parsed result before transport", async () => {
	data.network[0].service_list = [];
	const map = mapAdapter(() => {
		data.network[0].service_list = ["INTERNET"];
	});
	await saveConfiguration(asMap(map));
	assert.deepEqual(map.calls, ["parse", "transport"]);
});

test("failed global validation stops transport; subsequent internal saves remain native", async () => {
	data.network[0].service_list = [];
	const map = mapAdapter();
	const nativeSave = map.save;
	await assert.rejects(saveConfiguration(asMap(map)), /n1.service_list/);
	assert.deepEqual(map.calls, ["parse"]);
	assert.equal(map.save, nativeSave);
	await map.save();
	assert.deepEqual(map.calls, ["parse", "parse", "transport"]);
});

test("an unrelated invalid network does not prevent group removal", async () => {
	data.network[0].service_list = [];
	data.device = [];
	removeGroup("g1");
	L.uci.remove("fttr", "g1");
	const map = mapAdapter();
	await map.save();
	assert.deepEqual(data.group, []);
	assert.deepEqual(map.calls, ["parse", "transport"]);
	await assert.rejects(saveConfiguration(asMap(map)), /n1.service_list/);
});
