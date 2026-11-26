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
	status.optical_transceiver.temperature_celsius = 47.0859375;
	status.optical_transceiver.vcc_voltage = 3.2112998962402344;
	status.optical_transceiver.laser_bias_current_ma = 24.211999893188477;
	status.optical_transceiver.tx_power_dbm = 1.2345;
	const live = (createControllerPanel(status, platform) as unknown as TestNode).textContent;
	assert.match(live, /47\.09 °C/);
	assert.match(live, /3\.2113 V/);
	assert.match(live, /24\.212 mA/);
	assert.match(live, /1\.234 dBm/);
	assert.doesNotMatch(live, /CDR lock/);
});

test("sub-gateway optical RX power > -3 dBm triggers threshold warning", async () => {
	Object.assign(globalThis, {
		_: (value: string) =>
			Object.assign(new String(value), {
				format: (...args: string[]) => value.replace(/%s/g, () => args.shift() ?? ""),
			}),
	});
	const { isSubGatewayRxHigh, formatSubGatewayRxWarning } = await import("../src/view/components/formatters");
	assert.equal(isSubGatewayRxHigh(null), false);
	assert.equal(isSubGatewayRxHigh(undefined), false);
	assert.equal(isSubGatewayRxHigh(-15), false);
	assert.equal(isSubGatewayRxHigh(-3), false);
	assert.equal(isSubGatewayRxHigh(-2.9), true);
	assert.equal(isSubGatewayRxHigh(0), true);

	assert.equal(formatSubGatewayRxWarning([]), null);
	const msg = formatSubGatewayRxWarning([{ label: "ONU 1 (TEST00000001)", rxPower: -1.5 }]);
	assert.ok(msg);
	assert.match(msg, /ONU 1 \(TEST00000001\) \(-1\.50 dBm\)/);
	assert.match(msg, /-8 dBm to -27 dBm/);
});
