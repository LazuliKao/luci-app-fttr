// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";

class TestNode {
	children: Array<TestNode | string>;
	hidden = false;
	constructor(public tag: string, _attrs: any = {}, children: any = []) {
		this.children = (Array.isArray(children) ? children : [children]).flat(Infinity).filter(v => v != null);
	}
	replaceChildren(...nodes: TestNode[]) { this.children = nodes; }
	set textContent(value: string) { this.children = [value]; }
	get textContent(): string { return this.children.map(v => v instanceof TestNode ? v.textContent : v).join(" "); }
	all(tag: string): TestNode[] { return [this, ...this.children.flatMap(v => v instanceof TestNode ? v.all(tag) : [])].filter(v => v.tag === tag); }
}

test("FEC monitor tab distinguishes prepared PM data from unsupported or offline ONUs", async () => {
	Object.assign(globalThis, { _: (value: string) => value, Node: TestNode, E: (tag: string, attrs: any, children: any) => new TestNode(tag, attrs, children) });
	const { createFecMonitor } = await import("../src/view/components/fec-monitor");
	const status = {
		pon_mac: { desired_fec_enabled: true, fec_enabled: true },
		sub_gateways: [
			{ onu_id: 1, model: "ONU-A", vendor: "V", state: "o5_operation", fec: { downstream_pm: { interval_end_time: 3, corrected_bytes: 10, corrected_code_words: 2, uncorrectable_code_words: 0, total_code_words: 90, fec_seconds: 4 }, measurement: { reason: null } } },
			{ onu_id: 2, model: "ONU-B", vendor: "V", state: "o5_operation", fec: { downstream_pm: null, measurement: { reason: "unsupported" } } },
			{ onu_id: 3, model: "ONU-C", vendor: "V", state: "offline", fec: { downstream_pm: null, measurement: { reason: "onu_not_operational" } } },
		],
	} as any;
	const panel = createFecMonitor(status);
	const root = panel.element as unknown as TestNode;
	assert.match(root.textContent, /OMCI FEC monitoring ready: 1\/3/);
	assert.match(root.textContent, /10 2 0 90 4/);
	assert.match(root.textContent, /unsupported/);
	assert.match(root.textContent, /Offline/);
	panel.update({ ...status, pon_mac: { desired_fec_enabled: false, fec_enabled: false } });
	assert.match(root.textContent, /OMCI FEC monitoring paused/);
});
