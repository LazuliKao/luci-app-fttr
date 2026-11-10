// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";
import type { DeviceSync } from "../src/view/contracts/provisioning";

class TestNode {
	children: Array<TestNode | string>;
	constructor(
		public tag: string,
		public attrs: Record<string, any> = {},
		children: any = [],
	) {
		this.children = (Array.isArray(children) ? children : [children])
			.flat(Infinity)
			.filter((v) => v != null && typeof v !== "boolean");
	}
	get textContent(): string {
		return this.children.map((v) => (v instanceof TestNode ? v.textContent : String(v))).join(" ");
	}
	addEventListener() {}
	all(tag: string): TestNode[] {
		return [this, ...this.children.flatMap((v) => (v instanceof TestNode ? v.all(tag) : []))].filter(
			(v) => v.tag === tag,
		);
	}
}

Object.assign(globalThis, {
	_: (value: string) => value,
	Node: TestNode,
	E: (tag: string, attrs: any, children: any) => new TestNode(tag, attrs, children),
	L: {
		view: { extend: (value: unknown) => value },
		rpc: { declare: () => async () => ({}) },
		hasViewPermission: () => true,
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
