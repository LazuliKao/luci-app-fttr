import assert from "node:assert/strict";
import test from "node:test";
import type { PlatformInfoReply, StatusReply } from "../src/api/generated/types";

class TestNode {
	children: Array<TestNode | string>;
	constructor(
		public tag: string,
		_attrs: unknown,
		children: unknown = [],
	) {
		this.children = (Array.isArray(children) ? children : [children])
			.flat(Infinity)
			.filter((v) => v != null && v !== false) as Array<TestNode | string>;
	}
	get textContent(): string {
		return this.children.map((v) => (v instanceof TestNode ? v.textContent : String(v))).join(" ");
	}
}

test("controller identity and optical PHY survive unsupported advanced diagnostic capabilities", async () => {
	Object.assign(globalThis, {
		_: (value: string) => value,
		Node: TestNode,
		E: (tag: string, attrs: unknown, children: unknown[]) => new TestNode(tag, attrs, children),
		L: { view: { extend: (value: unknown) => value }, rpc: { declare: () => () => undefined } },
	});
	const { createControllerPanel } = await import("../src/view/hardware");
	const platform = {
		selection: "selected",
		model: "AN4475-G2",
		operations: { fpga_diagnostics: false, transceiver_telemetry: false },
	} as PlatformInfoReply;
	const status = {
		fpga_status: "ready",
		pon_mac: { register: 0x80, tx_enabled: true, fec_enabled: false, error: null },
		optical_transceiver: {
			model: "UX3326S1",
			wavelength_tx_nm: 1490,
			wavelength_rx_nm: 1310,
			phy_rate_downlink_gbps: 2.4879999160766602,
			phy_rate_uplink_gbps: 1.2439999580383301,
			calibration_applied: true,
			cdr_locked: null,
		},
	} as StatusReply;
	const content = (createControllerPanel(status, platform) as unknown as TestNode).textContent;
	assert.match(content, /AN4475-G2/);
	assert.match(content, /UX3326S1/);
	assert.match(content, /2\.488 Gbps/);
	assert.match(content, /1\.244 Gbps/);
	assert.match(content, /Applied by hardware owner/);
	assert.match(content, /Live transceiver measurements are not supported/);
	assert.doesNotMatch(content, /No controller diagnostics|0x01000004/);
});
