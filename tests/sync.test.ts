// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";
import type { DeviceSync } from "../src/view/contracts/provisioning";

class TestNode {
	children: Array<TestNode | string>;
	onclick?: () => unknown;
	constructor(
		public tag: string,
		public attrs: Record<string, any> = {},
		children: any = [],
	) {
		this.onclick = attrs?.onclick;
		this.children = (Array.isArray(children) ? children : [children])
			.flat(Infinity)
			.filter((v) => v != null && typeof v !== "boolean");
	}
	get textContent(): string {
		return this.children.map((v) => (v instanceof TestNode ? v.textContent : String(v))).join(" ");
	}
	addEventListener(type: string, fn: any) {
		(this as any)["on" + type] = fn;
	}
	all(tag: string): TestNode[] {
		return [this, ...this.children.flatMap((v) => (v instanceof TestNode ? v.all(tag) : []))].filter(
			(v) => v.tag === tag,
		);
	}
}

let modal: TestNode | undefined;

if (!("format" in String.prototype)) {
	Object.defineProperty(String.prototype, "format", {
		value: function (...values: unknown[]) {
			let index = 0;
			return String(this).replace(/%[sd]/g, () => String(values[index++]));
		},
		configurable: true,
	});
}

Object.assign(globalThis, {
	_: (value: string) => value,
	Node: TestNode,
	E: (tag: string, attrs: any, children: any) => new TestNode(tag, attrs, children),
	L: {
		view: { extend: (value: unknown) => value },
		rpc: { declare: () => async () => ({}) },
		hasViewPermission: () => true,
		ui: {
			showModal: (_title: string, node: TestNode) => {
				modal = node;
			},
			hideModal: () => {
				modal = undefined;
			},
		},
	},
});

test("bootstrap remains visible with disabled or MQTT business delivery and transport observations stay separate", async () => {
	const { deviceCard } = await import("../src/view/sync");
	for (const adapter of ["none", "hl202-mqtt", "hl202-cu"]) {
		const device = {
			device: "onu_a",
			optical_sn: "H3CT1234ABCD",
			omci_adapter: "generic",
			bootstrap_adapter: "manual-acs",
			provisioning_adapter: adapter,
			management: { state: "waiting_inform" },
			mqtt: { state: "online" },
			acs_bootstrap: { state: "pending", reason: "Independent bootstrap observation" },
			provisioning: {
				state: adapter === "none" ? "disabled" : "not_started",
				items: [],
				backend: { effective: adapter === "hl202-mqtt" ? "command" : "acs" },
			},
			wifi_sync: adapter === "none" ? "disabled" : "pending",
		} as unknown as DeviceSync;
		const noop = async () => {};
		const root = deviceCard(device, false, noop, noop, noop, noop, false, true, false) as unknown as TestNode;
		const sections = root.all("section");
		assert.equal(sections[0].attrs["aria-label"], "Transport observations");
		assert.equal(sections[1].attrs["aria-label"], "ACS bootstrap");
		assert.match(sections[1].textContent, /Independent bootstrap observation/);
		assert.equal(sections[2].attrs["aria-label"], "Business provisioning");
		assert.match(root.textContent, /CWMP:.*Waiting Inform.*MQTT:.*Online/);
		const sync = root.all("button").find((b) => b.textContent === "Sync now");
		assert.equal(Boolean(sync?.attrs.disabled), adapter === "none");
		assert.doesNotMatch(root.textContent, /OMCI ACS association/);
	}
});

test("reset synchronization state opens LuCI confirmation modal and triggers reset on confirm", async () => {
	const { deviceCard } = await import("../src/view/sync");
	const device = {
		device: "onu_a",
		optical_sn: "H3CT1234ABCD",
		omci_adapter: "generic",
		bootstrap_adapter: "manual-acs",
		provisioning_adapter: "hl202-mqtt",
		management: { state: "waiting_inform" },
		provisioning: { state: "completed", items: [] },
	} as unknown as DeviceSync;
	let resetCalled = false;
	const noop = async () => {};
	const reset = async () => {
		resetCalled = true;
	};
	const root = deviceCard(device, false, reset, noop, noop, noop, false, true, false) as unknown as TestNode;
	const resetBtn = root.all("button").find((b) => b.textContent === "Reset synchronization state");
	assert.ok(resetBtn, "Reset synchronization state button must exist");

	// Trigger reset button -> should open modal
	resetBtn.onclick?.();
	assert.ok(modal, "modal must be displayed");
	assert.match(modal.textContent, /Are you sure you want to reset the synchronization state/);

	// Test Cancel
	const cancelBtn = modal.all("button").find((b) => b.textContent === "Cancel");
	assert.ok(cancelBtn, "Cancel button must exist in modal");
	cancelBtn.onclick?.();
	assert.equal(modal, undefined, "Cancel must hide the modal");
	assert.equal(resetCalled, false, "Cancel must not call reset");

	// Trigger reset again -> confirm
	resetBtn.onclick?.();
	assert.ok(modal, "modal must be displayed again");
	const confirmBtn = modal.all("button").find((b) => b.textContent === "Confirm");
	assert.ok(confirmBtn, "Confirm button must exist in modal");
	await confirmBtn.onclick?.();
	assert.equal(modal, undefined, "Confirm must hide the modal");
	assert.equal(resetCalled, true, "Confirm must trigger reset");
});

test("getCwmpBadgeSpec and sync card render disabled badge when CWMP is disabled", async () => {
	const { getCwmpBadgeSpec } = await import("../src/view/components/badge");
	const spec = getCwmpBadgeSpec({
		state: "disabled",
		cwmp_id: "test",
		optical_online: true,
		last_inform: null,
		age_seconds: null,
	});
	assert.equal(spec.tone, "neutral");
	assert.equal(spec.label, "Disabled");
	assert.equal(spec.title, undefined);

	const { deviceCard } = await import("../src/view/sync");
	const device = {
		device: "onu_disabled",
		optical_sn: "H3CT1234ABCD",
		omci_adapter: "hl202",
		bootstrap_adapter: "none",
		provisioning_adapter: "hl202-mqtt",
		management: { state: "disabled" },
		mqtt: { state: "online" },
		provisioning: { state: "completed", items: [] },
	} as unknown as DeviceSync;
	const noop = async () => {};
	const root = deviceCard(device, false, noop, noop, noop, noop, false, true, false) as unknown as TestNode;
	assert.match(root.textContent, /CWMP:.*Disabled.*MQTT:.*Online/);
});

test("bridge-mode MQTT access card distinguishes rule_installed from telemetry_verified", async () => {
	const { deviceCard } = await import("../src/view/sync");
	const device = {
		device: "onu_bridge",
		optical_sn: "H3CT1234ABCD",
		omci_adapter: "hl202",
		bootstrap_adapter: "none",
		provisioning_adapter: "hl202-mqtt",
		management: { state: "disabled" },
		mqtt: { state: "waiting_transport" },
		mqtt_bridge: {
			state: "redirected",
			address_origin: "upstream",
			mode: "redirected",
			rule_installed: true,
			telemetry_verified: false,
			interface: "fttr127",
			client_mac: "1c:94:68:5d:f9:98",
			client_ip: "192.0.2.244",
			target_broker: "192.0.2.1:1883 -> 192.0.2.44:1883",
			binding_source: "verified_report",
			evidence_source: "dhcp_ack",
			reason: "Redirect rule installed; waiting for HL202 MQTT reconnect",
		},
		acs_bootstrap: { state: "not_required", reason: "disabled" },
		provisioning: { state: "not_started", items: [] },
	} as unknown as DeviceSync;
	const noop = async () => {};
	const root = deviceCard(device, false, noop, noop, noop, noop, false, true, false) as unknown as TestNode;
	assert.match(root.textContent, /Bridge-mode MQTT access.*Redirect installed.*Rule installed.*Telemetry unverified/);
	assert.match(root.textContent, /Upstream DHCP \(Bridge\).*fttr127.*1c:94:68:5d:f9:98/);
});

test("global bridge-mode MQTT panel renders active redirect rules and nftables expressions", async () => {
	const { mqttBridgeGlobalCard } = await import("../src/view/sync");
	const card = mqttBridgeGlobalCard(
		{
			enabled: true,
			state: "active",
			lan_origin: "upstream",
			broker_listen: "192.0.2.44:1883",
			upstream_gateway: "192.0.2.1",
			active_rules: 1,
			rules: [
				{
					interface: "fttr127",
					client_mac: "1c:94:68:5d:f9:98",
					client_ip: "192.0.2.244",
					target_gw: "192.0.2.1",
					broker_ip: "192.0.2.44",
					bridge_mac: "d4:a0:29:03:20:94",
					device: "onu_1",
					optical_sn: "H3CT1234ABCD",
					state: "verified",
					binding_source: "verified_report",
					evidence_source: "dhcp_ack",
					bridge_rule:
						'iifname "fttr127" ether saddr 1c:94:68:5d:f9:98 ip saddr 192.0.2.244 ip daddr 192.0.2.1 tcp dport 1883 meta pkttype set host ether daddr set d4:a0:29:03:20:94 counter',
					ip_rule: "ip saddr 192.0.2.244 ip daddr 192.0.2.1 tcp dport 1883 counter dnat to 192.0.2.44:1883",
				},
			],
		},
		[
			{
				device: "onu_1",
				name: "Living Room HL202",
				optical_sn: "H3CT1234ABCD",
			} as DeviceSync,
		],
	) as unknown as TestNode;

	assert.match(card.textContent, /Active rules\s*:.*1/);
	assert.match(card.textContent, /Living Room HL202.*H3CT1234ABCD.*fttr127/);
	assert.match(card.textContent, /192\.0\.2\.244.*1c:94:68:5d:f9:98/);
	assert.match(card.textContent, /192\.0\.2\.1:1883 -> 192\.0\.2\.44:1883.*d4:a0:29:03:20:94/);
	assert.match(card.textContent, /table bridge fttr_mqtt_redirect.*table ip fttr_mqtt_redirect/s);
});
