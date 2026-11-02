// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";
import { exactCounter, maskText } from "../src/view/npu-data";

test("u64 counters remain exact; unknowns and L2B placeholders never become measured zero", () => {
	assert.equal(exactCounter("9007199254740993", true), BigInt("9007199254740993").toLocaleString());
	assert.equal(exactCounter("18446744073709551615", true), BigInt("18446744073709551615").toLocaleString());
	assert.equal(exactCounter("0", true), "0");
	for (const value of [undefined, "", "oops", "1.5", "-1"]) assert.equal(exactCounter(value, true), "—");
	assert.equal(exactCounter("0", false), "—");
	assert.equal(exactCounter("42", undefined), "—");
	assert.equal(maskText(14, true), "0x000e (14)");
	assert.equal(maskText(0, false), "—");
});

class TestNode {
	children: Array<TestNode | string>;
	listeners: Record<string, () => void> = {};
	disabled: boolean;
	checked = false;
	value = "";
	isConnected = true;
	onclick?: () => Promise<void> | void;
	constructor(public tag: string, public attrs: Record<string, any> = {}, children: any = []) {
		this.children = (Array.isArray(children) ? children : [children]).filter(v => v != null);
		this.disabled = Boolean(attrs.disabled);
	}
	addEventListener(name: string, handler: () => void) { this.listeners[name] = handler; }
	replaceChildren(...nodes: TestNode[]) { this.children = nodes; }
	set textContent(value: string) { this.children = [value]; }
	get textContent(): string { return this.children.map(v => v instanceof TestNode ? v.textContent : v).join(" "); }
	all(tag: string): TestNode[] { return [this, ...this.children.flatMap(v => v instanceof TestNode ? v.all(tag) : [])].filter(v => v.tag === tag); }
}

test("NPU page preserves edits, invalidates pre-save polls, rejects failed operations and hides stale status", async () => {
	const snapshot = {
		supported: true, sampled_at_ms: Date.now(), errors: [], config_valid: true, engine_valid: true,
		mask_valid: true, routed_mask_valid: true, debug_valid: true, flows_valid: true, entries_valid: true,
		counters_valid: true, hooks_valid: true, total_packets_exact: "9007199254740993", total_bytes_exact: "1000",
		engine_attached: true, bridge_offload_enabled: true, bridge: "br-lan", bridge_offload_mask: 14,
		routed_offload_mask: 0, bridge_offload_debug: false, active_ports: ["fttr2", "fttr3", "fttr4"],
		fw4_hooks_ready: true, total_entries: 3, bound_entries: 0, bound_ipv4_entries: 0, bound_ipv6_entries: 0,
		total_packets: 9007199254740992, total_bytes: 1000, bound_flows: [],
	};
	let get: () => Promise<unknown> = async () => snapshot;
	let set: (...args: any[]) => Promise<unknown> = async () => ({ status: "success", enabled: true });
	let poll: () => Promise<void> = async () => {};
	let writable = true;
	Object.assign(globalThis, {
		_: (value: string) => value, Node: TestNode,
		E: (tag: string, attrs: any, children: any) => new TestNode(tag, attrs, children),
		L: {
			view: { extend: (value: unknown) => value },
			rpc: { declare: ({ method }: { method: string }) => (...args: any[]) => method === "npu_status" ? get() : set(...args) },
			Poll: { add: (callback: () => Promise<void>) => { poll = callback; } },
			hasViewPermission: () => writable,
		},
	});
	const { main } = await import("../src/view/npu");
	const root = (main as any).render() as TestNode;
	const tick = () => new Promise(resolve => setImmediate(resolve));
	await tick();
	const [enabled, bridge] = root.all("input");
	const [save] = root.all("button");
	assert.equal(bridge.value, "br-lan");
	assert.match(root.textContent, /9,007,199,254,740,993/);
	bridge.value = "br-fttr";
	bridge.listeners.input();
	await poll();
	assert.equal(bridge.value, "br-fttr");
	let resolveOld!: (value: unknown) => void;
	get = () => new Promise(resolve => { resolveOld = resolve; });
	const oldPoll = poll();
	let resolveSet!: (value: unknown) => void;
	set = async (on, name) => {
		assert.equal(on, true); assert.equal(name, "br-fttr");
		return new Promise(resolve => { resolveSet = resolve; });
	};
	const saving = save.onclick!();
	resolveOld({ ...snapshot, bridge: "br-obsolete" });
	await oldPoll;
	assert.equal(bridge.value, "br-fttr");
	get = async () => ({ ...snapshot, bridge: "br-fttr" });
	resolveSet({ status: "success", enabled: true });
	await saving;
	assert.equal(bridge.value, "br-fttr");
	assert.match(root.textContent, /Configuration saved/);
	set = async () => ({ status: "error", enabled: false, error: "commit failed" });
	enabled.checked = false; enabled.listeners.change();
	await save.onclick!();
	assert.match(root.textContent, /commit failed/);
	assert.equal(enabled.checked, false); // Preserve the edit; never accept error.enabled as state.
	get = async () => { throw new Error("RPC disconnected"); };
	await poll();
	assert.match(root.textContent, /Previous readings are stale/);
	assert.doesNotMatch(root.textContent, /9,007,199,254,740,993/);
	assert.equal(save.disabled, true);
	get = async () => snapshot;
	writable = false;
	await poll();
	assert.equal(save.disabled, true);
});
