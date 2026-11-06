// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";
import type { FttrStatus, SubGateway } from "../src/view/contracts/status";
import {
	buildTopology,
	CONTROLLER_ID,
	diffTopology,
	edgeId,
	gridPositions,
	MEASUREMENT_STALE_SECONDS,
	normalizeSerial,
	shortSerial,
} from "../src/view/topology/model";

// Placeholder serials only; never use real device serial numbers in tests.
const SN_A = "TEST0000000A";
const SN_B = "TEST0000000B";
const SN_C = "TEST0000000C";

function onu(onuId: number, serial: string, extra: Partial<SubGateway> = {}): SubGateway {
	return {
		onu_id: onuId,
		vendor: "TEST",
		model: "Model-X",
		serial_number: serial,
		state: "o5_operation",
		business_status: { phase: "verified", generation: 1, error: null },
		management: null,
		provisioning: null,
		services: [],
		ssids: [],
		wifi_sync: "not_configured",
		identity: null,
		identity_age_seconds: null,
		identity_current: true,
		fiber_distance_m: null,
		ranging_delay_rtd_ns: null,
		equalization_delay_bits: null,
		optical_rx_power_dbm: null,
		optical_tx_power_dbm: null,
		firmware_version: "",
		hardware_version: "",
		uptime_seconds: null,
		data_path: { interface: `fttr${onuId}`, measurements: {} } as unknown as SubGateway["data_path"],
		wifi_mesh: {} as SubGateway["wifi_mesh"],
		connected_clients: null,
		measurements: {},
		...extra,
	};
}

function status(subGateways: SubGateway[], extra: Partial<FttrStatus> = {}): FttrStatus {
	return {
		fpga_status: "ready",
		provisioning: null,
		optical_transceiver: {
			model: "TEST-OPT",
			wavelength_tx_nm: 1577,
			wavelength_rx_nm: 1270,
			phy_rate_downlink_gbps: 10,
			phy_rate_uplink_gbps: 10,
			tx_power_dbm: null,
			laser_bias_current_ma: null,
			temperature_celsius: null,
			vcc_voltage: null,
			cdr_locked: true,
			measurements: {},
		},
		switch_ports: [],
		sub_gateways: subGateways,
		telemetry_gateways: [],
		...extra,
	};
}

function pinning(active: Record<string, number>, desired: Record<string, number>): FttrStatus["onu_pinning"] {
	return {
		active,
		desired,
		pending_restart: JSON.stringify(active) !== JSON.stringify(desired),
		allocation_blocked: false,
		startup_error: null,
		config_error: null,
	};
}

test("node IDs stay stable when ONU IDs and interfaces change", () => {
	const first = buildTopology(status([onu(1, SN_A), onu(2, SN_B)]));
	const second = buildTopology(status([onu(7, SN_B), onu(3, SN_A)]));
	const ids = (model: typeof first) => model.subGateways.map((node) => node.id).sort();
	assert.deepEqual(ids(first), ids(second));
	assert.deepEqual(ids(first), [`sg:${SN_A}`, `sg:${SN_B}`]);
	assert.equal(second.subGateways.find((node) => node.serial === SN_A)?.onuId, 3);
	assert.deepEqual(diffTopology(first, second), { added: [], removed: [], kept: [`sg:${SN_A}`, `sg:${SN_B}`] });
});

test("serials are case-normalized across live status and bindings", () => {
	assert.equal(normalizeSerial("  test0000000a "), SN_A);
	assert.equal(normalizeSerial("   "), null);
	const model = buildTopology(
		status([onu(1, SN_A.toLowerCase())], { onu_pinning: pinning({ [SN_A]: 1 }, { [SN_A.toLowerCase()]: 1 }) }),
	);
	assert.equal(model.subGateways.length, 1);
	assert.equal(model.subGateways[0].id, `sg:${SN_A}`);
	assert.equal(model.subGateways[0].binding.kind, "effective");
});

test("bound devices absent from live status become offline placeholders", () => {
	const model = buildTopology(
		status([onu(1, SN_A)], {
			onu_pinning: pinning({ [SN_B]: 4 }, { [SN_B]: 4 }),
			switch_ports: [
				{ port: 4, interface: "fttr4", carrier: false, status: "down", link_state: "down", reserved_sn: SN_B },
			],
		}),
	);
	const offline = model.subGateways.find((node) => node.serial === SN_B);
	assert.ok(offline);
	assert.equal(offline.present, false);
	assert.equal(offline.registered, false);
	assert.equal(offline.onu, null);
	assert.equal(offline.dataInterface?.name, "fttr4");
	assert.equal(offline.dataInterface?.carrier, false);
	assert.equal(offline.rxPower.value, null);
	assert.deepEqual(model.counts, { known: 2, registered: 1, registering: 0, offline: 1 });
	assert.deepEqual(
		model.edges.map((edge) => edge.id),
		model.subGateways.map((node) => edgeId(node.id)),
	);
	assert.ok(model.edges.every((edge) => edge.source === CONTROLLER_ID));
});

test("pending bindings are distinguished from effective bindings", () => {
	const model = buildTopology(
		status([], {
			onu_pinning: pinning({ [SN_A]: 1, [SN_B]: 2, [SN_C]: 3 }, { [SN_A]: 1, [SN_B]: 5, "TEST0000000D": 6 }),
		}),
	);
	const kind = (serial: string) => model.subGateways.find((node) => node.serial === serial)?.binding.kind;
	assert.equal(kind(SN_A), "effective");
	assert.equal(kind(SN_B), "pending_change");
	assert.equal(kind(SN_C), "pending_remove");
	assert.equal(kind("TEST0000000D"), "pending_add");
	// A desired-only binding is not yet in force, so it has no data interface.
	assert.equal(model.subGateways.find((node) => node.serial === "TEST0000000D")?.dataInterface, null);
	assert.equal(model.controller.pendingRestart, true);
});

test("missing measurements stay unavailable while zero values are preserved", () => {
	const model = buildTopology(
		status([
			onu(1, SN_A, {
				optical_rx_power_dbm: 0,
				fiber_distance_m: 0,
				measurements: { optical_rx_power_dbm: { source: "omci", unit: "dBm", reason: null, raw: null, age_seconds: 2 } },
			}),
			onu(2, SN_B),
			onu(3, SN_C, {
				optical_rx_power_dbm: -18.5,
				measurements: {
					optical_rx_power_dbm: {
						source: "omci",
						unit: "dBm",
						reason: null,
						raw: null,
						age_seconds: MEASUREMENT_STALE_SECONDS + 1,
					},
				},
			}),
		]),
	);
	const [a, b, c] = model.subGateways;
	assert.equal(a.rxPower.value, 0);
	assert.equal(a.rxPower.stale, false);
	assert.equal(a.distance.value, 0);
	assert.equal(b.rxPower.value, null);
	assert.equal(b.rxPower.stale, false);
	assert.equal(c.rxPower.value, -18.5);
	assert.equal(c.rxPower.stale, true);
});

test("readings from devices not in operation state are not presented as live", () => {
	const model = buildTopology(status([onu(1, SN_A, { state: "o6_intermittent_lods", optical_rx_power_dbm: -20 })]));
	const [node] = model.subGateways;
	assert.equal(node.registered, false);
	assert.equal(node.rxPower.stale, true);
	assert.deepEqual(model.counts, { known: 1, registered: 0, registering: 1, offline: 0 });
});

test("node and edge additions/removals change the structure key", () => {
	const before = buildTopology(status([onu(1, SN_A), onu(2, SN_B)]));
	const same = buildTopology(status([onu(1, SN_A, { optical_rx_power_dbm: -17 }), onu(2, SN_B)]));
	const after = buildTopology(status([onu(2, SN_B), onu(3, SN_C)]));
	assert.equal(before.structureKey, same.structureKey);
	assert.notEqual(before.structureKey, after.structureKey);
	assert.deepEqual(diffTopology(before, after), { added: [`sg:${SN_C}`], removed: [`sg:${SN_A}`], kept: [`sg:${SN_B}`] });
	assert.deepEqual(diffTopology(null, after).added, [`sg:${SN_B}`, `sg:${SN_C}`]);
});

test("conflicting identities are flagged instead of merged", () => {
	const model = buildTopology(
		status([onu(1, SN_A), onu(2, SN_A.toLowerCase()), onu(3, ""), onu(4, SN_B, { data_path: { interface: "fttr1" } as SubGateway["data_path"] })]),
	);
	assert.equal(model.subGateways.length, 4);
	assert.equal(new Set(model.subGateways.map((node) => node.id)).size, 4);
	const duplicates = model.subGateways.filter((node) => node.issues.includes("duplicate_serial"));
	assert.equal(duplicates.length, 2);
	const missing = model.subGateways.find((node) => node.issues.includes("missing_serial"));
	assert.equal(missing?.id, "onu:3");
	assert.equal(missing?.serial, null);
	const portConflicts = model.subGateways.filter((node) => node.issues.includes("port_conflict"));
	assert.deepEqual(portConflicts.map((node) => node.onuId).sort(), [1, 4]);
});

test("ordering follows effective port assignment with serial fallback", () => {
	const model = buildTopology(
		status([
			onu(1, SN_C, { data_path: { interface: "fttr9" } as SubGateway["data_path"] }),
			onu(2, SN_B, { data_path: { interface: "" } as SubGateway["data_path"] }),
			onu(3, SN_A, { data_path: { interface: "" } as SubGateway["data_path"] }),
			onu(4, "TEST0000000D", { data_path: { interface: "fttr2" } as SubGateway["data_path"] }),
		]),
	);
	assert.deepEqual(
		model.subGateways.map((node) => node.serial),
		["TEST0000000D", SN_C, SN_A, SN_B],
	);
});

test("layout helpers are deterministic", () => {
	assert.deepEqual(
		gridPositions(10, 8).map(({ row, column, columns }) => [row, column, columns]),
		[
			[0, 0, 8], [0, 1, 8], [0, 2, 8], [0, 3, 8], [0, 4, 8], [0, 5, 8], [0, 6, 8], [0, 7, 8],
			[1, 0, 2], [1, 1, 2],
		],
	);
	assert.equal(shortSerial(SN_A), SN_A);
	assert.equal(shortSerial("ABCDEFGHIJKLMNOPQRST"), "ABCD…JKLMNOPQRST");
	assert.equal(shortSerial(null), null);
});
