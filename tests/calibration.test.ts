import assert from "node:assert/strict";
import test from "node:test";
import {
	calibratedAdc,
	calibratedTemperature,
	calibratedTx,
	temperatureTarget,
	calibrationApplyOutcome,
} from "../src/view/components/calibration-model";
import { CalibrationAppliedSchema, CalibrationStateSchema } from "../src/api/generated/schemas";
import { createFttrClient, fttrMethods } from "../src/api/generated/luci-client";
import { fttrValidators } from "../src/api/client";

const primary = { n: 7142, d: 4096, o: -24780 };
const alternate = { n: 7372, d: 4096, o: -26735 };
const state = {
	selected: "firmware",
	candidate: null,
	candidate_error: null,
	active: null,
	hardware_applied: false,
	pending: true,
	temperature_compensation: {
		enabled: false,
		reason: "optical_disabled",
		calibration_sha256: null,
		raw_temperature: null,
		table_index: null,
		target_code: null,
		last_check_unix: null,
		last_write_unix: null,
		error: null,
	},
};

test("calibration preview preserves stock fractional quotients and reports invalid channels as unavailable", () => {
	assert.equal(calibratedTemperature(0x5980, primary, alternate, 35), 59.260009765625);
	assert.equal(calibratedTemperature(0x3000, primary, alternate, 35), -18.04296875);
	assert.ok(Math.abs(calibratedTx(0x2441, { n: 227, d: 256, o: 1 })! - -0.845665693283081) < 1e-7);
	assert.equal(calibratedAdc(1, { n: 1, d: 0, o: 0 }), null);
	assert.equal(calibratedAdc(65535, { n: 65535, d: 1, o: 0 }), null);
	assert.equal(calibratedTx(1, { n: 0, d: 1, o: -1 }), null);
});

test("temperature targets use integer primary calibration, signed offset and bounded 10-bit table entries", () => {
	const table = Array(84).fill(231);
	table[49] = 266;
	assert.deepEqual(temperatureTarget(0x5980, primary, table), { index: 49, code: 266 });
	assert.equal(temperatureTarget(0, primary, table), null);
	assert.deepEqual(temperatureTarget(0, { n: 1, d: 1, o: 100 }, table), { index: 20, code: 231 });
	assert.equal(temperatureTarget(0x5980, primary, table.slice(1)), null);
	table[49] = 1024;
	assert.equal(temperatureTarget(0x5980, primary, table), null);
});

test("apply failure, off/deferred state and legacy replies never become hardware success", () => {
	const checked = CalibrationStateSchema.parse(state);
	assert.equal(calibrationApplyOutcome(CalibrationAppliedSchema.parse({ success: false, state: checked })), "failed");
	assert.equal(calibrationApplyOutcome({ success: true, state: checked }), "deferred");
	assert.equal(
		calibrationApplyOutcome({ success: true, state: { ...checked, hardware_applied: true, pending: true } }),
		"deferred",
	);
	assert.equal(
		calibrationApplyOutcome({ success: true, state: { ...checked, hardware_applied: true, pending: false } }),
		"applied",
	);
	assert.equal(calibrationApplyOutcome({ success: true }), "unknown");
	assert.equal(CalibrationStateSchema.safeParse({ ...state, selected: "unknown" }).success, false);
});

test("source selection has a typed write method and sends only the explicit source", async () => {
	const calls: unknown[] = [];
	const client = createFttrClient(
		{
			declare:
				(options: any) =>
				async (...args: unknown[]) => {
					calls.push([options.method, options.params, args]);
					return { error: "Factory calibration not found" };
				},
		} as unknown as typeof L.rpc,
		fttrValidators,
	);
	await assert.rejects(client.selectCalibration({ source: "factory" }), /Factory calibration not found/);
	assert.deepEqual(calls, [["select_calibration", ["source"], ["factory"]]]);
	assert.equal(fttrMethods.find((method) => method.method === "select_calibration")?.access, "write");
});

const native = {
	profile: "ux3326s_factory" as const,
	factory_table: {
		source: "/dev/factory-test",
		offset: 0x1a5000,
		size: 2048,
		payload_bytes: 1920,
		chip_id: 0x27,
		sha256: "a".repeat(64),
		valid: true,
		error: null,
	},
	application: {
		applied: true,
		sha256: "a".repeat(64),
		applied_unix: 1700000000,
		register_writes: 802,
		live_signature_verified: true,
		error: null,
	},
	can_apply: true,
	can_upload: false,
	can_select: false,
};

class CalibrationNode {
	children: unknown[];
	onclick?: () => Promise<void>;
	constructor(
		public tag: string,
		public attrs: Record<string, unknown>,
		children: unknown,
	) {
		this.children = (Array.isArray(children) ? children : [children])
			.flat(Infinity)
			.filter((v) => v != null && v !== false);
	}
	replaceChildren(...children: unknown[]) {
		this.children = children;
	}
	addEventListener(type: string, handler: () => Promise<void>) {
		if (type === "click") this.onclick = handler;
	}
	all(tag: string): CalibrationNode[] {
		return [
			this,
			...this.children.flatMap((child) => (child instanceof CalibrationNode ? child.all(tag) : [])),
		].filter((node) => node.tag === tag);
	}
	get textContent(): string {
		return this.children
			.map((child) => (child instanceof CalibrationNode ? child.textContent : String(child)))
			.join(" ");
	}
}

test("factory calibration renders native metadata without HM2004 editors and preserves validation failures", async () => {
	Object.assign(globalThis, {
		_: (text: string) => text,
		Node: CalibrationNode,
		L: { hasViewPermission: () => true },
		E: (tag: string, attrs: Record<string, unknown>, children: unknown) =>
			new CalibrationNode(tag, attrs, children),
	});
	const { renderFactoryCalibration } = await import("../src/view/components/factory-calibration");
	const valid = (renderFactoryCalibration(native) as unknown as CalibrationNode).textContent;
	assert.match(valid, /AN4475-G2 factory optical calibration/);
	assert.match(valid, /2048.*1920/);
	assert.match(valid, /802/);
	assert.match(valid, /Reapply factory calibration/);
	assert.doesNotMatch(valid, /modified_UX3326.bin|Temperature simulation|Upload file/);
	const invalid = renderFactoryCalibration({
		...native,
		can_apply: false,
		factory_table: { ...native.factory_table, valid: false, error: "optical table payload CRC mismatch" },
		application: { ...native.application, applied: false },
	}) as unknown as CalibrationNode;
	assert.match(invalid.textContent, /payload CRC mismatch/);
	assert.doesNotMatch(invalid.textContent, /Reapply factory calibration/);
});

test("calibration profile dispatch and native reapply respect completion, busy state and permissions", async () => {
	let profile: string | null = "ux3326s_factory";
	let writable = true;
	let details: any = native;
	let outcome: any = { success: true };
	let start = async (): Promise<unknown> => ({ status: "pending", job: "native-calibration" });
	const calls: string[] = [];
	Object.assign(globalThis, {
		window: { location: { pathname: "/calibration" }, setTimeout },
		L: {
			hasViewPermission: () => writable,
			view: { extend: (value: unknown) => value },
			rpc: {
				declare:
					({ method }: { method: string }) =>
					async () => {
						calls.push(method);
						if (method === "get_platform_info")
							return {
								schema_version: 1,
								selection: "selected",
								platform_id: "fiberhome-an4475-g2",
								vendor: "FiberHome",
								model: "AN4475-G2",
								onus: [],
								operations: {
									optical_control: true,
									transceiver_telemetry: false,
									fpga_diagnostics: false,
									bosa_diagnostics: true,
									calibration_profile: profile,
									npu_offload: false,
									omci_mib: true,
									downstream_fec: true,
								},
							};
						if (method === "get_calibration") return details;
						if (method === "apply_calibration") return start();
						if (method === "job_release") return { released: true };
						if (method === "job_result") {
							const bytes = Buffer.from(JSON.stringify(outcome));
							return {
								status: "ready",
								chunk: 0,
								chunks: 1,
								bytes: bytes.length,
								data: bytes.toString("base64"),
							};
						}
						throw new Error(`Unexpected RPC: ${method}`);
					},
			},
		},
	});
	const { loadCalibrationPage } = await import("../src/view/calibration");
	assert.deepEqual(await loadCalibrationPage(), native);
	assert.deepEqual(calls, ["get_platform_info", "get_calibration"]);
	profile = null;
	calls.length = 0;
	assert.equal(await loadCalibrationPage(), null);
	assert.deepEqual(calls, ["get_platform_info"]);
	profile = "ux3326";
	await assert.rejects(loadCalibrationPage(), /calibration profile changed/);
	profile = "ux3326s_factory";
	const { renderFactoryCalibration } = await import("../src/view/components/factory-calibration");
	const root = renderFactoryCalibration(native) as unknown as CalibrationNode;
	const apply = () => root.all("button").find((node) => node.textContent.includes("Reapply"))!;
	assert.equal(apply().attrs.type, "button");
	let finish!: (value: unknown) => void;
	start = () =>
		new Promise((resolve) => {
			finish = resolve;
		});
	calls.length = 0;
	const staleButton = apply();
	const running = staleButton.onclick!();
	assert.ok(root.all("button").every((node) => node.attrs.disabled));
	await staleButton.onclick!();
	assert.deepEqual(calls, ["apply_calibration"]);
	finish({ status: "pending", job: "native-calibration" });
	await running;
	assert.deepEqual(calls, ["apply_calibration", "job_result", "job_release", "get_calibration"]);
	assert.match(root.textContent, /Factory calibration applied through checked I2C transactions/);
	assert.ok(root.all("button").every((node) => !node.attrs.disabled));
	start = async () => ({ status: "pending", job: "native-calibration" });
	outcome = { success: false, error: "I2C write failed" };
	details = { ...native, application: { ...native.application, applied: false, error: "I2C write failed" } };
	await apply().onclick!();
	assert.match(root.textContent, /I2C write failed/);
	assert.doesNotMatch(root.textContent, /Factory calibration applied through/);
	outcome = { success: true };
	details = { ...native, application: { ...native.application, applied: false, error: null } };
	await apply().onclick!();
	assert.match(root.textContent, /Factory calibration was not applied/);
	start = async () => { throw new Error("RPC outcome unknown"); };
	details = { ...native, application: { ...native.application, applied: false, error: "cancelled after last write" } };
	calls.length = 0;
	await apply().onclick!();
	assert.deepEqual(calls, ["apply_calibration", "get_calibration"]);
	assert.match(root.textContent, /RPC outcome unknown/);
	assert.match(root.textContent, /Not applied/);
	assert.match(root.textContent, /cancelled after last write/);
	calls.length = 0;
	writable = false;
	await apply().onclick!();
	assert.deepEqual(calls, []);
	await root.all("button")[0].onclick!();
	assert.deepEqual(calls, ["get_calibration"]);
	assert.ok(apply().attrs.disabled);
});
