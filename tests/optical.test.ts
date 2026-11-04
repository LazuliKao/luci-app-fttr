// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";

class TestNode {
	children: Array<TestNode | string>;
	disabled: boolean;
	checked = false;
	onclick?: () => Promise<void>;
	onchange?: () => void;
	constructor(public tag: string, attrs: any = {}, children: any = []) {
		this.disabled = Boolean(attrs?.disabled);
		this.children = (Array.isArray(children) ? children : [children]).flat(Infinity).filter(v => v != null);
	}
	replaceChildren(...nodes: TestNode[]) { this.children = nodes; }
	set textContent(value: string) { this.children = [value]; }
	get textContent(): string { return this.children.map(v => v instanceof TestNode ? v.textContent : v).join(" "); }
	all(tag: string): TestNode[] { return [this, ...this.children.flatMap(v => v instanceof TestNode ? v.all(tag) : [])].filter(v => v.tag === tag); }
}

test("optical controls submit all flags atomically, preserve edits, reject stale polls and respect permissions", async () => {
	const snapshot = {
		schema_version: 1, action: "optical_status", desired_enabled: true,
		actor_state: "enabled", hardware_ready: true, discovery_active: true, error: null,
		status: "success", tx_enabled: true, cleanup_pending: false,
		settings: { enabled: true, downstream_tx_enabled: true, fec_enabled: false },
		pon_mac: { desired_tx_enabled: true, desired_fec_enabled: false, register: 1, tx_enabled: true, fec_enabled: false, error: null },
	};
	let get: () => Promise<any> = async () => snapshot;
	let set: (...args: any[]) => Promise<any> = async () => snapshot;
	let writable = true;
	Object.assign(globalThis, {
		_: (value: string) => value, Node: TestNode,
		E: (tag: string, attrs: any, children: any) => new TestNode(tag, attrs, children),
		window: { confirm: () => true },
		L: {
			hasViewPermission: () => writable,
			rpc: { declare: ({ method }: { method: string }) => (...args: any[]) => method === "optical_status" ? get() : set(...args) },
		},
	});
	const { createOpticalControl } = await import("../src/view/components/optical-control");
	const panel = createOpticalControl();
	const root = panel.element as unknown as TestNode;
	await panel.refresh();
	assert.equal(root.all("h3").length, 0);
	assert.doesNotMatch(root.textContent, /Configuration applied|independently of FEC|upstream FEC/);
	const [master, downstream, fec] = root.all("input");
	const [save] = root.all("button");
	fec.checked = true; fec.onchange!();
	await panel.refresh();
	assert.equal(fec.checked, true);
	let resolveOld!: (value: unknown) => void;
	get = () => new Promise(resolve => { resolveOld = resolve; });
	const oldPoll = panel.refresh();
	downstream.checked = false; downstream.onchange!();
	let resolveSet!: (value: unknown) => void;
	set = (enabled, tx, coding) => {
		assert.deepEqual([enabled, tx, coding], [true, false, true]);
		return new Promise(resolve => { resolveSet = resolve; });
	};
	const saving = save.onclick!();
	assert.equal(master.disabled, true);
	resolveOld(snapshot);
	await oldPoll;
	assert.equal(downstream.checked, false);
	assert.equal(fec.checked, true);
	resolveSet({ ...snapshot, settings: { enabled: true, downstream_tx_enabled: false, fec_enabled: true }, pon_mac: { ...snapshot.pon_mac, desired_tx_enabled: false, desired_fec_enabled: true, tx_enabled: false, fec_enabled: true } });
	await saving;
	assert.doesNotMatch(root.textContent, /Configuration applied/);
	get = async () => { throw new Error("RPC disconnected"); };
	await panel.refresh();
	assert.equal(save.disabled, true);
	assert.equal(fec.disabled, true);
	get = async () => snapshot;
	writable = false;
	await panel.refresh();
	assert.equal(master.disabled, true);
	assert.equal(save.disabled, true);
	set = () => { assert.fail("read-only view must not write"); };
	await save.onclick!();
});
