// SPDX-License-Identifier: Apache-2.0

// Pure topology model: converts FTTR status into stable, render-agnostic nodes
// and edges. Keep this module free of G6, DOM and LuCI globals so it can be
// unit-tested directly.

import type { FttrStatus, NetworkDevices, SubGateway } from "../contracts/status";

export const CONTROLLER_ID = "controller";

/** Optical readings older than this are treated as stale rather than live. */
export const MEASUREMENT_STALE_SECONDS = 60;

export type IdentityIssue = "missing_serial" | "duplicate_serial" | "port_conflict";

/**
 * Binding semantics relative to the fttrctl pinning tables:
 * - effective: active and desired agree (in force now and after restart);
 * - pending_add: desired only, takes effect after FTTR restart;
 * - pending_change: active and desired disagree;
 * - pending_remove: active only, removed after FTTR restart.
 */
export type BindingKind = "none" | "effective" | "pending_add" | "pending_change" | "pending_remove";

export interface TopologyBinding {
	kind: BindingKind;
	/** Port currently in force (from `onu_pinning.active` or a reserved switch port). */
	active: number | null;
	/** Port requested in configuration (from `onu_pinning.desired`). */
	desired: number | null;
}

export interface TopologyMeasurement {
	/** Reading, or null when unavailable. Zero is a legitimate value. */
	value: number | null;
	unit: string;
	/** True when the reading exists but must not be presented as live. */
	stale: boolean;
	source: string | null;
	reason: string | null;
	ageSeconds: number | null;
}

export interface TopologyInterface {
	name: string;
	/** Carrier from switch-port status or luci-rpc; null when unknown. */
	carrier: boolean | null;
}

export interface TopologySubGateway {
	/** Stable node identifier derived from the normalized optical serial. */
	id: string;
	/** Normalized (trimmed, upper-case) optical serial, or null when missing. */
	serial: string | null;
	/** Live ONU record when the device is present in current status. */
	onu: SubGateway | null;
	/** Present in live `sub_gateways`. */
	present: boolean;
	/** Present and in O5 operation state. */
	registered: boolean;
	onuId: number | null;
	label: string | null;
	vendor: string | null;
	registration: SubGateway["state"] | null;
	business: SubGateway["business_status"] | null;
	management: NonNullable<SubGateway["management"]>["state"] | null;
	wifiSync: SubGateway["wifi_sync"] | null;
	dataInterface: TopologyInterface | null;
	/** Port used for deterministic ordering (effective assignment where available). */
	port: number | null;
	binding: TopologyBinding;
	rxPower: TopologyMeasurement;
	distance: TopologyMeasurement;
	issues: IdentityIssue[];
}

export interface TopologyController {
	id: typeof CONTROLLER_ID;
	fpgaStatus: string | null;
	cdrLocked: boolean | null;
	opticalModel: string | null;
	txEnabled: boolean | null;
	txPower: TopologyMeasurement;
	pendingRestart: boolean;
	allocationBlocked: boolean;
	pinningError: string | null;
}

export interface TopologyEdge {
	id: string;
	source: string;
	target: string;
}

export interface TopologyCounts {
	/** Every sub-gateway node shown: live devices plus bound offline placeholders. */
	known: number;
	/** Live devices in O5 operation state. */
	registered: number;
	/** Live devices that are not (yet) in O5 operation state. */
	registering: number;
	/** Bound devices absent from live status. */
	offline: number;
}

export interface TopologyModel {
	controller: TopologyController;
	subGateways: TopologySubGateway[];
	edges: TopologyEdge[];
	counts: TopologyCounts;
	/** Ordered node identifiers; changes only when the structure changes. */
	structureKey: string;
}

export function normalizeSerial(value: string | null | undefined): string | null {
	const serial = value?.trim().toUpperCase();
	return serial ? serial : null;
}

export function edgeId(target: string): string {
	return `edge:${CONTROLLER_ID}:${target}`;
}

export function portFromInterface(name: string | null | undefined): number | null {
	const match = name?.match(/^fttr(\d+)$/);
	return match ? Number(match[1]) : null;
}

function normalizePortMap(map: Record<string, number> | undefined): Map<string, number> {
	const result = new Map<string, number>();
	for (const [key, value] of Object.entries(map ?? {})) {
		const serial = normalizeSerial(key);
		if (serial && Number.isInteger(value)) result.set(serial, value);
	}
	return result;
}

function bindingFor(serial: string | null, active: Map<string, number>, desired: Map<string, number>): TopologyBinding {
	const a = serial ? (active.get(serial) ?? null) : null;
	const d = serial ? (desired.get(serial) ?? null) : null;
	let kind: BindingKind = "none";
	if (a !== null && d !== null) kind = a === d ? "effective" : "pending_change";
	else if (a !== null) kind = "pending_remove";
	else if (d !== null) kind = "pending_add";
	return { kind, active: a, desired: d };
}

function unavailable(unit: string, reason: string | null = null): TopologyMeasurement {
	return { value: null, unit, stale: false, source: null, reason, ageSeconds: null };
}

function measurement(
	value: number | null | undefined,
	evidence: SubGateway["measurements"][string] | undefined,
	unit: string,
	live: boolean,
): TopologyMeasurement {
	const finite = typeof value === "number" && Number.isFinite(value) ? value : null;
	const age = evidence?.age_seconds ?? null;
	return {
		value: finite,
		unit: evidence?.unit || unit,
		stale: finite !== null && (!live || (age !== null && age > MEASUREMENT_STALE_SECONDS)),
		source: evidence?.source ?? null,
		reason: evidence?.reason ?? null,
		ageSeconds: age,
	};
}

function carrierFor(
	name: string,
	ports: FttrStatus["switch_ports"],
	devices: NetworkDevices | null | undefined,
): boolean | null {
	const port = ports.find((item) => item.interface === name);
	if (port) return port.carrier;
	const device = devices?.[name];
	return device?.carrier ?? null;
}

function compareSubGateways(a: TopologySubGateway, b: TopologySubGateway): number {
	if (a.port !== b.port) {
		if (a.port === null) return 1;
		if (b.port === null) return -1;
		return a.port - b.port;
	}
	const sa = a.serial ?? "";
	const sb = b.serial ?? "";
	if (sa !== sb) return sa < sb ? -1 : 1;
	return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/**
 * Build the logical topology. Only controller-to-sub-gateway PON relationships
 * are represented; `fttrN` is treated as a data-interface label, not a
 * physical optical port, and no splitters or cable routes are inferred.
 */
export function buildTopology(status: FttrStatus, devices?: NetworkDevices | null): TopologyModel {
	const ports = status.switch_ports ?? [];
	const pinning = status.onu_pinning;
	const active = normalizePortMap(pinning?.active);
	const desired = normalizePortMap(pinning?.desired);
	// Reserved switch ports describe effective fixed bindings even without pinning tables.
	for (const port of ports) {
		const serial = normalizeSerial(port.reserved_sn);
		if (serial && !active.has(serial)) active.set(serial, port.port);
	}

	const nodes: TopologySubGateway[] = [];
	const bySerial = new Map<string, TopologySubGateway>();

	for (const onu of status.sub_gateways ?? []) {
		const serial = normalizeSerial(onu.serial_number);
		const issues: IdentityIssue[] = [];
		let id: string;
		if (!serial) {
			// No stable identity is available; fall back to the mutable ONU ID explicitly.
			id = `onu:${onu.onu_id}`;
			issues.push("missing_serial");
		} else if (bySerial.has(serial)) {
			// Never merge two live records that claim the same serial.
			id = `sg:${serial}#onu${onu.onu_id}`;
			issues.push("duplicate_serial");
			const first = bySerial.get(serial);
			if (first && !first.issues.includes("duplicate_serial")) first.issues.push("duplicate_serial");
		} else {
			id = `sg:${serial}`;
		}

		const ifname = onu.data_path?.interface || null;
		const switchPort = ports.find((item) => item.onu_id === onu.onu_id);
		const binding = bindingFor(serial, active, desired);
		const registered = onu.state === "o5_operation";
		const port = switchPort?.port ?? portFromInterface(ifname) ?? binding.active;
		const interfaceName = ifname ?? switchPort?.interface ?? null;

		const node: TopologySubGateway = {
			id,
			serial,
			onu,
			present: true,
			registered,
			onuId: onu.onu_id,
			label: onu.identity?.equipment_id || onu.model || null,
			vendor: onu.vendor || null,
			registration: onu.state,
			business: onu.business_status ?? null,
			management: onu.management?.state ?? null,
			wifiSync: onu.wifi_sync ?? null,
			dataInterface: interfaceName
				? { name: interfaceName, carrier: carrierFor(interfaceName, ports, devices) }
				: null,
			port,
			binding,
			rxPower: measurement(onu.optical_rx_power_dbm, onu.measurements?.optical_rx_power_dbm, "dBm", registered),
			distance: measurement(onu.fiber_distance_m, onu.measurements?.fiber_distance_m, "m", registered),
			issues,
		};
		nodes.push(node);
		if (serial && !bySerial.has(serial)) bySerial.set(serial, node);
	}

	// Offline placeholders: devices known only through effective or pending bindings.
	const boundSerials = [...new Set([...active.keys(), ...desired.keys()])].sort();
	for (const serial of boundSerials) {
		if (bySerial.has(serial)) continue;
		const binding = bindingFor(serial, active, desired);
		const port = binding.active ?? binding.desired;
		const reserved = binding.active !== null ? ports.find((item) => item.port === binding.active) : undefined;
		const interfaceName = reserved?.interface ?? (binding.active !== null ? `fttr${binding.active}` : null);
		const node: TopologySubGateway = {
			id: `sg:${serial}`,
			serial,
			onu: null,
			present: false,
			registered: false,
			onuId: null,
			label: null,
			vendor: null,
			registration: null,
			business: null,
			management: null,
			wifiSync: null,
			dataInterface: interfaceName
				? { name: interfaceName, carrier: carrierFor(interfaceName, ports, devices) }
				: null,
			port,
			binding,
			rxPower: unavailable("dBm", "offline"),
			distance: unavailable("m", "offline"),
			issues: [],
		};
		nodes.push(node);
		bySerial.set(serial, node);
	}

	// Flag distinct devices that claim the same effective port.
	const byPort = new Map<number, TopologySubGateway[]>();
	for (const node of nodes) {
		const effective = node.present ? node.port : node.binding.active;
		if (effective === null) continue;
		const list = byPort.get(effective) ?? [];
		list.push(node);
		byPort.set(effective, list);
	}
	for (const list of byPort.values()) {
		if (list.length < 2) continue;
		for (const node of list) if (!node.issues.includes("port_conflict")) node.issues.push("port_conflict");
	}

	nodes.sort(compareSubGateways);

	const optical = status.optical_transceiver;
	const controller: TopologyController = {
		id: CONTROLLER_ID,
		fpgaStatus: status.fpga_status || null,
		cdrLocked: optical?.cdr_locked ?? null,
		opticalModel: optical?.model || null,
		txEnabled: optical?.tx_enabled ?? status.pon_mac?.tx_enabled ?? null,
		txPower: measurement(optical?.tx_power_dbm, optical?.measurements?.tx_power_dbm, "dBm", true),
		pendingRestart: pinning?.pending_restart ?? false,
		allocationBlocked: pinning?.allocation_blocked ?? false,
		pinningError: pinning?.startup_error || pinning?.config_error || null,
	};

	const counts: TopologyCounts = {
		known: nodes.length,
		registered: nodes.filter((node) => node.registered).length,
		registering: nodes.filter((node) => node.present && !node.registered).length,
		offline: nodes.filter((node) => !node.present).length,
	};

	return {
		controller,
		subGateways: nodes,
		edges: nodes.map((node) => ({ id: edgeId(node.id), source: CONTROLLER_ID, target: node.id })),
		counts,
		structureKey: nodes.map((node) => node.id).join("|"),
	};
}

export interface TopologyDiff {
	added: string[];
	removed: string[];
	kept: string[];
}

/** Compare node identities between two models (controller excluded). */
export function diffTopology(previous: TopologyModel | null, next: TopologyModel): TopologyDiff {
	const before = new Set(previous?.subGateways.map((node) => node.id) ?? []);
	const after = new Set(next.subGateways.map((node) => node.id));
	return {
		added: [...after].filter((id) => !before.has(id)),
		removed: [...before].filter((id) => !after.has(id)),
		kept: [...after].filter((id) => before.has(id)),
	};
}

/** Short identifier for node labels; full serial remains in details. */
export function shortSerial(serial: string | null, max = 16): string | null {
	if (!serial) return null;
	if (serial.length <= max) return serial;
	return `${serial.slice(0, 4)}…${serial.slice(-(max - 5))}`;
}

export interface GridPosition {
	row: number;
	column: number;
	columns: number;
}

/** Deterministic layered placement: rows of up to `maxColumns`, centered. */
export function gridPositions(count: number, maxColumns = 8): GridPosition[] {
	const result: GridPosition[] = [];
	for (let index = 0; index < count; index++) {
		const row = Math.floor(index / maxColumns);
		const columns = Math.min(maxColumns, count - row * maxColumns);
		result.push({ row, column: index % maxColumns, columns });
	}
	return result;
}
