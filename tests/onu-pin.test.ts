import assert from "node:assert/strict";
import { test } from "node:test";

// Exercise confirmation and persistence without a router or browser.
class FakeNode {
	disabled = false;
	handlers = new Map<string, () => Promise<void> | void>();
	children: Array<FakeNode | string>;
	private content?: string;
	constructor(
		public tag: string,
		children: unknown,
	) {
		this.children = (Array.isArray(children) ? children : [children]).filter((c) => c != null);
	}
	get textContent(): string {
		return this.content ?? this.children.map((c) => (typeof c === "string" ? c : c.textContent)).join("");
	}
	set textContent(value: string) {
		this.content = value;
	}
	addEventListener(event: string, handler: () => Promise<void> | void) {
		this.handlers.set(event, handler);
	}
	async click() {
		if (!this.disabled) await this.handlers.get("click")?.();
	}
	find(tag: string, text?: string): FakeNode | undefined {
		if (this.tag === tag && (text === undefined || this.textContent === text)) return this;
		for (const child of this.children) {
			if (child instanceof FakeNode) {
				const found = child.find(tag, text);
				if (found) return found;
			}
		}
	}
}

test("ONU pin confirmation protects writes, ONU-ID zero, conflicts and reload failures", async () => {
	let modal: FakeNode | undefined;
	let sections: Record<string, unknown>;
	let pending = false;
	let reloadAvailable = false;
	let refreshed = 0;
	const syncReply = {
		enabled: true,
		mode: "auto",
		method: "diff",
		revision: "test",
		triggers: [],
		interval_minutes: 0,
		error: null,
		devices: [],
		groups: [],
		pending_devices: [],
		omci_management: {},
		management_network: {
			state: "ready",
			error: null,
			inflight: false,
			ready: true,
			desired_version: null,
			applied_version: null,
			next_retry_at: 0,
			attempts: 0,
			desired: null,
			applied: null,
			previous: null,
			plan: [],
		},
	};
	const statusReply = {
		fpga_status: "ready",
		provisioning: null,
		switch_ports: [],
		sub_gateways: [],
		telemetry_gateways: [],
		onu_pinning: {
			desired: { TEST12345678: 0 },
			active: {},
			pending_restart: true,
			allocation_blocked: false,
			startup_error: null,
			config_error: null,
		},
		optical_transceiver: {
			model: "test",
			wavelength_tx_nm: 0,
			wavelength_rx_nm: 0,
			phy_rate_downlink_gbps: 0,
			phy_rate_uplink_gbps: 0,
			tx_power_dbm: null,
			laser_bias_current_ma: null,
			temperature_celsius: null,
			vcc_voltage: null,
			cdr_locked: null,
			tx_enabled: null,
			measurements: {},
		},
	};
	const writes: Array<[string, unknown[]]> = [];
	Object.assign(globalThis, {
		Node: FakeNode,
		_: (text: string) => text,
		E: (tag: string, _props: unknown, children: unknown) => new FakeNode(tag, children),
		L: {
			hasViewPermission: () => true,
			url: (...parts: string[]) => parts.join("/"),
			ui: {
				showModal: (_title: string, node: FakeNode) => {
					modal = node;
				},
				hideModal: () => {
					modal = undefined;
				},
				addNotification: () => {},
			},
			rpc: {
				declare:
					({ object, method }: { object: string; method: string }) =>
					async (...args: unknown[]) => {
						if (object === "uci" && method === "get") return { values: sections };
						if (object === "uci" && method === "changes")
							return { changes: pending ? [["set", "device", "onu_id", "15"]] : [] };
						if (object === "uci") {
							writes.push([method, args]);
							return 0;
						}
						if (reloadAvailable && method === "config_reload") return syncReply;
						if (reloadAvailable && method === "get_status") return statusReply;
						throw new Error("reload unavailable");
					},
			},
		},
	});
	const { confirmOnuPin } = await import("../src/view/components/onu-pin");
	const onu = { serial_number: "TEST12345678", onu_id: 0 } as Parameters<typeof confirmOnuPin>[0];
	const pinning = (desired: Record<string, number>) => ({
		desired,
		active: {},
		pending_restart: false,
		allocation_blocked: false,
		startup_error: null,
		config_error: null,
	});
	const reset = (onu_id?: string) => {
		sections = {
			device: { ".type": "device", optical_sn: onu.serial_number, ...(onu_id === undefined ? {} : { onu_id }) },
		};
		writes.length = 0;
		pending = false;
	};
	const open = (desired = {}) =>
		confirmOnuPin(onu, pinning(desired), () => {
			refreshed++;
		});

	reset();
	await open();
	assert.equal(writes.length, 0, "opening confirmation must not mutate UCI");
	await modal?.find("button", "Cancel")?.click();
	assert.equal(writes.length, 0);
	assert.equal(modal, undefined);

	await open();
	await modal?.find("button", "Confirm")?.click();
	assert.deepEqual(writes, [
		["set", ["fttr", "device", { onu_id: "0" }]],
		["commit", ["fttr"]],
	]);
	assert.match(modal?.textContent ?? "", /Saved, but configuration reload or status refresh failed/);
	assert.equal(refreshed, 0);
	assert.equal(modal?.find("button", "Confirm")?.disabled, true, "committed operations must not be submitted twice");

	reset("0");
	await open({ TEST12345678: 0 });
	await modal?.find("button", "Confirm")?.click();
	assert.deepEqual(writes, [
		["delete", ["fttr", "device", "onu_id"]],
		["commit", ["fttr"]],
	]);

	reset();
	sections.other = { ".type": "device", optical_sn: "TEST99999999", onu_id: "0" };
	await open();
	await modal?.find("button", "Confirm")?.click();
	assert.equal(writes.length, 0);
	assert.match(modal?.textContent ?? "", /already reserved/);

	reset();
	pending = true;
	await open();
	await modal?.find("button", "Confirm")?.click();
	assert.equal(writes.length, 0);
	assert.match(modal?.textContent ?? "", /pending FTTR configuration/);

	reset();
	await open();
	sections.device = { ".type": "device", optical_sn: onu.serial_number, onu_id: "15" };
	await modal?.find("button", "Confirm")?.click();
	assert.equal(writes.length, 0);
	assert.match(modal?.textContent ?? "", /configuration changed/);

	reset();
	sections = {};
	await open();
	assert.equal(writes.length, 0);
	assert.equal(modal?.find("button", "Confirm"), undefined);
	assert.match(modal?.textContent ?? "", /configuration page/);

	reset();
	reloadAvailable = true;
	await open();
	await modal?.find("button", "Confirm")?.click();
	assert.equal(refreshed, 1, "successful save refreshes the overview");
	assert.equal(modal, undefined, "successful save closes the confirmation dialog");
	assert.deepEqual(writes, [
		["set", ["fttr", "device", { onu_id: "0" }]],
		["commit", ["fttr"]],
	]);
});
