// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fttrValidators } from "../src/api/client";
import { createFttrClient } from "../src/api/generated/luci-client";
import { TopologyReplySchema, TopologyClientsReplySchema } from "../src/api/generated/schemas";
import type { TopologyClient, TopologyClientsReply, TopologyNode, TopologyNodeReply, TopologyReply } from "../src/api/generated/types";
import { addressSummary, CLIENT_PREVIEW_LIMIT, clientKey, counts, layout, linkFor, measurementAge, nodeAddresses, observedCount } from "../src/view/topology/model";
import { type TopologyApi, TopologyStore } from "../src/view/topology/store";

// Synthetic identities and documentation addresses only.
const ONU = "onu:TEST0000000A";
function gateway(id = ONU, onuId: number | null = 0): TopologyNode {
	return { id, label: "测试子网关", detail: {
		kind: "onu", serial_number: "TEST0000000A", onu_id: onuId, vendor: "TEST", model: "Test-ONU", hardware_version: null, firmware_version: null,
		registration: onuId === null ? null : "o5_operation", business: null, management: null, provisioning: null, services: [], ssids: [], wifi_sync: null,
		identity: null, identity_current: false, identity_age_seconds: null, uptime_seconds: 0, fec: null,
		binding: { active_onu_id: 0, desired_onu_id: 0, state: "effective", pending_restart: false }, extensions: { hl202: null }, measurements: {},
	} };
}
function snapshot(id = "snapshot-1"): TopologyReply {
	return { schema_version: 1, snapshot_id: id, generated_at: 100, snapshot_ttl_seconds: 30,
		nodes: [{ id: "controller", label: "Test controller", detail: { kind: "controller", model: "Test", firmware_version: null, uptime_seconds: 0, fpga_status: "ready", interfaces: [], uplinks: [], optical: {
			model: "Test module", wavelength_tx_nm: 1490, wavelength_rx_nm: 1310, nominal_downlink_gbps: 2.488, nominal_uplink_gbps: 1.244, tx_power_dbm: 0, laser_bias_current_ma: null, temperature_celsius: null, vcc_voltage: null, tx_enabled: false, measurements: {},
		} } }, gateway()],
		links: [{ id: "pon:test", source: "controller", target: ONU, relation: "pon_logical", data_interface: "fttr1", carrier: null, onu_rx_power_dbm: 0, onu_tx_power_dbm: null, equalization_delay_bits: 0, data_path: null, measurements: {} }],
		sources: [{ id: "fttr.status", state: "ok", sampled_at: 98, reason: null }], issues: [] };
}
function client(extra: Partial<TopologyClient> = {}): TopologyClient {
	return { id: "learned:02:00:00:00:00:01", mac: "02:00:00:00:00:01", hostname: "测试终端", addresses: ["192.0.2.2"], relation: "learned_behind", source: "bridge.fdb", interface: "fttr1", ...extra };
}
function clients(nodeId: string, snapshotId = "snapshot-1", values: TopologyClient[] = []): Extract<TopologyClientsReply, {status: "ok"}> {
	return { status: "ok", snapshot_id: snapshotId, parent_node_id: nodeId, clients: values, associated_client_count: null, learned_host_count: null, complete: false, next_cursor: null, sources: [] };
}
function api(overrides: Partial<TopologyApi> = {}): TopologyApi {
	return { getTopology: async () => snapshot(), getTopologyNode: async (r) => ({ status: "ok", snapshot_id: r.snapshot_id!, node: gateway(r.node_id) }), getTopologyClients: async (r) => clients(r.node_id, r.snapshot_id), ...overrides };
}
function deferred<T>() {
	let resolve!: (value: T) => void;
	let reject!: (error: Error) => void;
	const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
	return { promise, resolve, reject };
}

test("generated tagged topology schemas retain both tag and payload, null and zero", () => {
	const data = snapshot();
	assert.deepEqual(TopologyReplySchema.parse(data), data);
	const malformed = structuredClone(data);
	(malformed.nodes[0].detail as {kind: string}).kind = "unknown";
	assert.equal(TopologyReplySchema.safeParse(malformed).success, false);
	const missing = structuredClone(data);
	delete (missing.nodes[0].detail as Partial<typeof missing.nodes[0]["detail"]>).kind;
	assert.equal(TopologyReplySchema.safeParse(missing).success, false);
	assert.equal(TopologyReplySchema.safeParse({ ...data, nodes: [{ id: "bad", label: "bad", detail: {kind: "onu"} }] }).success, false);
	assert.deepEqual(TopologyClientsReplySchema.parse(clients(ONU)), clients(ONU));
	assert.equal(TopologyClientsReplySchema.safeParse({ ...clients(ONU), complete: "false" }).success, false);
});

test("topology SDK maps only the three read methods with exact snapshot and pagination parameters", async () => {
	const calls: Array<{method: string; args: unknown[]}> = [];
	const rpc = { declare: (options: { method: string }) => async (...args: unknown[]) => {
		calls.push({ method: options.method, args });
		return options.method === "get_topology" ? snapshot() : options.method === "get_topology_node" ? { status: "ok", snapshot_id: "snapshot-1", node: gateway() } : clients(ONU);
	} } as unknown as typeof L.rpc;
	const sdk = createFttrClient(rpc, fttrValidators);
	await sdk.getTopology();
	await sdk.getTopologyNode({ node_id: ONU, snapshot_id: "snapshot-1" });
	await sdk.getTopologyClients({ node_id: ONU, snapshot_id: "snapshot-1", cursor: "opaque", limit: 100 });
	assert.deepEqual(calls, [
		{ method: "get_topology", args: [] },
		{ method: "get_topology_node", args: [ONU, "snapshot-1"] },
		{ method: "get_topology_clients", args: [ONU, "snapshot-1", "opaque", 100] },
	]);
	const page = readFileSync(new URL("../src/view/topology.tsx", import.meta.url), "utf8");
	assert.doesNotMatch(page, /getStatus|getNetworkDevices|showOnuDetails|contracts\/api/);
});

test("backend identity and binding-only observations remain authoritative", () => {
	const data = snapshot();
	data.nodes.push(gateway("backend:binding-id", null));
	assert.deepEqual(counts(data), { known: 2, registered: 1, boundOnly: 1 });
	assert.equal(linkFor(data, ONU)?.data_interface, "fttr1");
	assert.equal(linkFor(data, "backend:binding-id"), undefined);
	const bound = layout(data, new Map()).positions.find((p) => p.id === "backend:binding-id");
	assert.equal(bound?.parent, null, "no synthetic link when the backend has not supplied one");
	data.nodes[1] = gateway(ONU, 15);
	assert.equal(layout(data, new Map()).positions[1].id, ONU, "ONU ID changes never rebuild the backend's stable ID");
});

test("three-column layout keeps local AP objects on the controller and bounds previews", () => {
	const data = snapshot();
	const learned = Array.from({length: 12}, (_, i) => client({id: `object-${i}`}));
	const associated = client({relation: "associated_with", interface: "phy0-ap0"});
	const groups = new Map([[ONU, {clients: learned}], ["controller", {clients: [associated]}]]);
	const result = layout(data, groups);
	assert.equal(result.positions.filter((p) => p.parent === ONU).length, CLIENT_PREVIEW_LIMIT);
	assert.equal(result.positions.find((p) => p.id === clientKey("controller", associated))?.parent, "controller");
	assert.notEqual(clientKey("controller", associated), clientKey(ONU, associated));
	for (const node of result.positions) { assert.ok(node.x >= 0); assert.ok(node.y >= 0); assert.ok(node.x + node.width <= result.width); }
});

test("observed count prefers reported totals over the preview page", () => {
	const groups = new Map([[ONU, { clients: [client(), client({ id: "second" })], result: { associated_client_count: 1, learned_host_count: 2 } }]]);
	assert.equal(observedCount(groups.get(ONU)), 3);
	const data = snapshot();
	assert.equal(layout(data, groups).positions.filter((p) => p.parent === ONU).length, CLIENT_PREVIEW_LIMIT);
});

test("measurement age uses the core source timestamp and extensions supply only observed addresses", () => {
	const data = snapshot();
	assert.equal(measurementAge(data, 3, 105), 10);
	assert.equal(measurementAge(data, null, 105), null);
	assert.equal(measurementAge(data, 0, 90), 0);
	assert.deepEqual(nodeAddresses(data.nodes[1]), []);
});

test("address summary prefers the uplink IPv4 and keeps link-local values in the remainder", () => {
	const data = snapshot();
	const controller = data.nodes[0].detail;
	assert.equal(controller.kind, "controller");
	if (controller.kind !== "controller") return;
	controller.interfaces = [
		{ name: "br-lan", mac: null, carrier: true, speed_mbps: null, duplex: null, bridge_members: [], addresses: ["fe80::1", "192.168.1.1"] },
		{ name: "wan", mac: null, carrier: true, speed_mbps: null, duplex: null, bridge_members: [], addresses: ["169.254.0.1"] },
	];
	controller.uplinks = [{ interface: "wan", device: null, protocol: "dhcp", up: true, addresses: ["100.64.0.2"] }];
	assert.deepEqual(addressSummary(data.nodes[0]), {
		primary: "100.64.0.2",
		others: ["fe80::1", "192.168.1.1", "169.254.0.1"],
	});
	assert.deepEqual(addressSummary(gateway("backend:binding-id", null)), { primary: null, others: [] });
});

test("refresh has no reentry and keeps a successful graph and object inventory on RPC failure", async () => {
	const next = deferred<TopologyReply>();
	let calls = 0;
	const store = new TopologyStore(api({ getTopology: () => { calls++; return next.promise; } }), () => {}, snapshot());
	await store.refresh(true);
	const previousClients = store.clients;
	const first = store.refresh();
	assert.equal(store.refresh(), first);
	assert.equal(store.refreshing, true);
	next.reject(new Error("backend unavailable"));
	await first;
	assert.equal(calls, 1);
	assert.equal(store.snapshot?.snapshot_id, "snapshot-1");
	assert.equal(store.clients, previousClients);
	assert.equal(store.error, "backend unavailable");
	assert.equal(store.refreshing, false);
});

test("partial client failure does not reject the snapshot or invent an empty successful inventory", async () => {
	const store = new TopologyStore(api({ getTopologyClients: async (r) => {
		if (r.node_id === ONU) throw new Error("source unavailable");
		return { ...clients(r.node_id), associated_client_count: 0 };
	} }), () => {});
	await store.refresh();
	assert.equal(store.error, null);
	assert.equal(store.clients.get(ONU)?.result, null);
	assert.equal(store.clients.get(ONU)?.error, "source unavailable");
	assert.equal(store.clients.get("controller")?.result?.associated_client_count, 0);
	assert.equal(store.clients.get("controller")?.result?.learned_host_count, null);
});

test("object refreshes are spread across poll cycles", async () => {
	let clientCalls = 0;
	const store = new TopologyStore(api({ getTopologyClients: async (r) => {
		clientCalls++;
		return clients(r.node_id, r.snapshot_id, [client()]);
	} }), () => {}, snapshot());
	await store.refresh();
	assert.equal(clientCalls, 2);
	await store.refresh(true, ONU);
	assert.equal(clientCalls, 3);
	await store.refresh(true);
	assert.equal(clientCalls, 5);
});

test("a client refresh keeps the previous page visible until the new one arrives", async () => {
	const next = deferred<TopologyClientsReply>();
	let calls = 0;
	const store = new TopologyStore(api({ getTopologyClients: async (r) => {
		calls++;
		if (calls === 1) return clients(r.node_id, r.snapshot_id, [client()]);
		return next.promise;
	} }), () => {}, snapshot());
	await store.loadClients(ONU);
	const pending = store.loadClients(ONU);
	assert.equal(store.clients.get(ONU)?.clients.length, 1);
	next.resolve(clients(ONU, "snapshot-1", [client({ hostname: "new" })]));
	await pending;
	assert.equal(store.clients.get(ONU)?.clients[0].hostname, "new");
});

test("pagination carries the same snapshot and cursor, deduplicates pages and retains null counts", async () => {
	const requests: unknown[] = [];
	const store = new TopologyStore(api({ getTopologyClients: async (r) => {
		requests.push(r);
		if (r.cursor) return clients(r.node_id, r.snapshot_id, [client(), client({id: "second"})]);
		return { ...clients(r.node_id, r.snapshot_id, [client()]), next_cursor: "opaque" };
	} }), () => {}, snapshot());
	await store.loadClients(ONU);
	await store.loadClients(ONU, true);
	assert.deepEqual(requests, [{node_id: ONU, snapshot_id: "snapshot-1", limit: 100}, {node_id: ONU, snapshot_id: "snapshot-1", limit: 100, cursor: "opaque"}]);
	assert.equal(store.clients.get(ONU)?.clients.length, 2);
	assert.equal(store.clients.get(ONU)?.result?.learned_host_count, null);
	assert.equal(store.clients.get(ONU)?.result?.complete, false);
});

test("an expired or mismatched page is explicit and never silently creates a new snapshot", async () => {
	let overviewCalls = 0;
	const store = new TopologyStore(api({ getTopology: async () => { overviewCalls++; return snapshot(); }, getTopologyClients: async () => ({ status: "error", code: "snapshot_expired" }) }), () => {}, snapshot());
	await store.loadClients(ONU);
	assert.equal(store.clients.get(ONU)?.error, "snapshot_expired");
	assert.equal(store.clients.get(ONU)?.result, null);
	assert.equal(overviewCalls, 0);
	const mismatched = new TopologyStore(api({getTopologyClients: async () => clients("another-parent")}), () => {}, snapshot());
	await mismatched.loadClients(ONU);
	assert.equal(mismatched.clients.get(ONU)?.error, "snapshot_mismatch");
});

test("late node replies cannot overwrite newer registration snapshots", async () => {
	const oldNode = deferred<TopologyNodeReply>();
	const newer = snapshot("snapshot-2");
	newer.nodes[1].label = "New registration";
	const store = new TopologyStore(api({getTopology: async () => newer, getTopologyNode: () => oldNode.promise}), () => {}, snapshot());
	const detail = store.loadNode(ONU);
	await store.refresh();
	oldNode.resolve({status: "ok", snapshot_id: "snapshot-1", node: {...gateway(), label: "Old registration"}});
	await detail;
	assert.equal(store.snapshot?.nodes[1].label, "New registration");
	assert.equal(store.details.get(ONU), undefined);
});

test("late pagination cannot attach old clients to a refreshed node", async () => {
	const page = deferred<TopologyClientsReply>();
	const store = new TopologyStore(api({getTopology: async () => snapshot("snapshot-2"), getTopologyClients: (r) => r.snapshot_id === "snapshot-1" ? page.promise : Promise.resolve(clients(r.node_id, r.snapshot_id))}), () => {}, snapshot());
	const pending = store.loadClients(ONU);
	await store.refresh();
	page.resolve(clients(ONU, "snapshot-1", [client()]));
	await pending;
	assert.equal(store.clients.get(ONU)?.result?.snapshot_id, "snapshot-2");
	assert.equal(store.clients.get(ONU)?.clients.length, 0);
});

test("detail requests are deduplicated, validate node identity and expose expired snapshots", async () => {
	const response = deferred<TopologyNodeReply>();
	let calls = 0;
	const store = new TopologyStore(api({getTopologyNode: () => {calls++; return response.promise;}}), () => {}, snapshot());
	const first = store.loadNode(ONU);
	assert.equal(store.loadNode(ONU), first);
	response.resolve({status: "error", code: "snapshot_expired"});
	await first;
	assert.equal(calls, 1);
	assert.equal(store.details.get(ONU)?.error, "snapshot_expired");
	assert.equal(store.snapshot?.nodes[1].label, "测试子网关");
});

test("destroyed pages ignore in-flight responses and never emit further renders", async () => {
	const pending = deferred<TopologyReply>();
	let renders = 0;
	const store = new TopologyStore(api({getTopology: () => pending.promise}), () => {renders++;});
	const task = store.refresh();
	store.destroy();
	const before = renders;
	pending.resolve(snapshot());
	await task;
	assert.equal(store.snapshot, null);
	assert.equal(renders, before);
});
