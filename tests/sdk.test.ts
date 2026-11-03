import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { fttrValidators } from "../src/api/client";
import { createFttrClient, fttrMethods } from "../src/api/generated/luci-client";
import { CalibrationAppliedSchema, CapabilitiesSchema, JobChunkSchema } from "../src/api/generated/schemas";

const optical = {
	schema_version: 1,
	status: "error",
	action: "optical_off",
	desired_enabled: false,
	tx_enabled: null,
	actor_state: "unknown",
	hardware_ready: false,
	discovery_active: false,
	cleanup_pending: false,
	error: { code: "NotConnected", message: "hardware initialization incomplete" },
};

test("generated wire validation retains required false flags, nullable progress and calibration warnings", () => {
	const flags = {
		schema_version: 1,
		version: "test",
		features: {
			acs: false,
			mqtt: false,
			npu: false,
			"device-hl202": false,
			"device-hwtc": false,
			"device-star": false,
			"device-zte": false,
		},
		functions: {
			optical: false,
			bridge_offload: false,
			omci_mib: false,
			mqtt_telemetry: false,
			hl202_management: false,
			cwmp: false,
			command_provisioning: false,
		},
		pages: {
			status: false,
			config: false,
			sync: false,
			hardware: false,
			calibration: false,
			hl202: false,
			about: false,
		},
		adapters: [],
	};
	assert.deepEqual(CapabilitiesSchema.parse(flags), flags);
	assert.equal(CapabilitiesSchema.safeParse({ ...flags, features: {} }).success, false);
	assert.equal(CapabilitiesSchema.safeParse({ ...flags, pages: { ...flags.pages, sync: "false" } }).success, false);
	assert.deepEqual(
		JobChunkSchema.parse({ status: "pending", progress: { phase: "tables", received: 2, expected: null } }),
		{ status: "pending", progress: { phase: "tables", received: 2, expected: null } },
	);
	assert.equal(
		JobChunkSchema.safeParse({ status: "pending", progress: { phase: "future", received: 2, expected: null } })
			.success,
		false,
	);
	assert.equal(JobChunkSchema.safeParse({ status: "pending", progress: null }).success, false);
	const warning = { success: false, error: "calibration warning" };
	assert.deepEqual(CalibrationAppliedSchema.parse(warning), warning);
	assert.equal(CalibrationAppliedSchema.safeParse({ error: "worker failure" }).success, false);
});

function setup(response: unknown, failure?: Error) {
	const declarations: Array<{ object: string; method: string; params?: string[]; reject: boolean }> = [];
	const calls: Array<{ method: string; args: unknown[] }> = [];
	const rpc = {
		declare(options: (typeof declarations)[number]) {
			declarations.push(options);
			return async (...args: unknown[]) => {
				calls.push({ method: options.method, args });
				if (failure) throw failure;
				return response;
			};
		},
	} as unknown as typeof L.rpc;
	return {
		client: createFttrClient(rpc, fttrValidators),
		declarations,
		calls,
	};
}

test("SDK declares native methods and maps false to the enabled positional parameter", async () => {
	const { client, declarations, calls } = setup(optical);
	assert.ok(declarations.every((item) => item.object === "fttr" && item.reject));
	assert.deepEqual(declarations.find((item) => item.method === "optical_set")?.params, ["enabled"]);
	assert.equal((await client.opticalSet({ enabled: false })).status, "error");
	assert.deepEqual(calls, [{ method: "optical_set", args: [false] }]);
	assert.equal(fttrMethods.find((item) => item.method === "optical_set")?.access, "write");
});

test("optical business errors remain structured, null is accepted, malformed replies fail", async () => {
	assert.deepEqual(await setup(optical).client.opticalStatus(), optical);
	await assert.rejects(setup({ ...optical, tx_enabled: "false" }).client.opticalStatus());
	await assert.rejects(setup({ ...optical, schema_version: 2 }).client.opticalStatus());
});

test("transport rejection is propagated once without retrying a write", async () => {
	const error = new Error("transport unavailable");
	const { client, calls } = setup(undefined, error);
	await assert.rejects(client.opticalSet({ enabled: true }), (actual) => actual === error);
	assert.equal(calls.length, 1);
});

test("capabilities retain checked RPC error handling", async () => {
	await assert.rejects(
		setup({ error: { code: "unavailable", message: "not ready" } }).client.getCapabilities(),
		/not ready/,
	);
});

test("read queries use native declarations and retain per-method error semantics", async () => {
	const error = { error: "invalid configuration" };
	const { client, declarations, calls } = setup(error);
	for (const method of ["get_status", "get_sync", "config_check", "npu_status"]) {
		assert.ok(declarations.some((item) => item.object === "fttr" && item.method === method && !item.params));
	}
	assert.deepEqual(await client.configCheck(), error);
	await assert.rejects(client.getStatus(), /invalid configuration/);
	await assert.rejects(client.getSync(), /invalid configuration/);
	await assert.rejects(client.npuStatus());
	assert.deepEqual(
		calls.map((call) => call.method),
		["config_check", "get_status", "get_sync", "npu_status"],
	);
	assert.equal(fttrMethods.find((method) => method.method === "npu_status")?.feature, "npu");
});

test("capability helpers import without a LuCI global", async () => {
	assert.equal("L" in globalThis, false);
	const helpers = await import("../src/view/contracts/capabilities");
	assert.deepEqual(helpers.adaptersFromCapabilities(), []);
});

test("generated nested contracts reject drift and preserve unknown measurements and sparse outcomes", async () => {
	const schemas = await import("../src/api/generated/schemas");
	const optical = {
		model: "test",
		wavelength_tx_nm: 1490,
		wavelength_rx_nm: 1310,
		phy_rate_downlink_gbps: 2.488,
		phy_rate_uplink_gbps: 1.244,
		tx_power_dbm: null,
		laser_bias_current_ma: null,
		temperature_celsius: null,
		vcc_voltage: null,
		cdr_locked: null,
		measurements: {},
	};
	assert.deepEqual(schemas.OpticalTransceiverStatusSchema.parse(optical), optical);
	assert.throws(() => schemas.OpticalTransceiverStatusSchema.parse({ ...optical, tx_power_dbm: "unknown" }));
	assert.deepEqual(schemas.AcsBootstrapSchema.parse({ state: "pending", reason: "not observed" }), {
		state: "pending",
		reason: "not observed",
	});
	assert.throws(() => schemas.AcsBootstrapSchema.parse({ state: "ready", reason: "missing snapshot" }));
	assert.deepEqual(schemas.ProvisioningStatusSchema.parse({ state: "not_started", items: [] }), {
		state: "not_started",
		items: [],
	});
	assert.throws(() => schemas.ProvisioningStatusSchema.parse({ state: "not_started", items: [{ id: "test" }] }));
	const failed = { target: "REDACTED", status: "timeout", output_truncated: false, error: "outcome unknown" };
	assert.deepEqual(schemas.HlCommandResultSchema.parse(failed), failed);
	assert.throws(() => schemas.HlCommandResultSchema.parse({ ...failed, status: "typo" }));
	assert.throws(() => schemas.HlAccountSchema.parse({ entry: 3, username: "test", active: false }));
	assert.throws(() => schemas.ConfigCheckReplySchema.parse({ valid: false, revision: "test", devices: 0 }));
	const { configCheck } = await import("../src/view/contracts/provisioning");
	assert.throws(() => configCheck.parse({ valid: true, revision: "test", devices: 0, error: "invalid" }));
});

test("native writes preserve synchronization selectors, errors and single-attempt transport", async () => {
	const { client, declarations, calls } = setup({ operation_ids: [1], revision: "revision_a" });
	assert.deepEqual(declarations.find((item) => item.method === "sync")?.params, [
		"action",
		"target",
		"management",
		"item",
	]);
	await client.sync({ action: "apply", target: "group:group_a", management: false, item: "ssid_a" });
	assert.deepEqual(calls, [{ method: "sync", args: ["apply", "group:group_a", false, "ssid_a"] }]);
	const defaults = setup({ operation_ids: [], revision: "revision_a" });
	await defaults.client.sync({ action: "plan", target: "all" });
	assert.deepEqual(defaults.calls[0].args, ["plan", "all", undefined, undefined]);
	assert.deepEqual(await setup({ restarting: true }).client.restartService(), { restarting: true });
	await assert.rejects(setup({ restarting: false }).client.restartService());
	for (const method of ["configReload", "restartService"] as const) {
		await assert.rejects(setup({ error: "configuration rejected" }).client[method](), /configuration rejected/);
		const transport = new Error("connection lost; outcome unknown");
		const failed = setup(undefined, transport);
		await assert.rejects(failed.client[method](), (error) => error === transport);
		assert.equal(failed.calls.length, 1);
	}
	await assert.rejects(
		setup({ error: "unknown device" }).client.sync({ action: "retry", target: "device_a" }),
		/unknown device/,
	);
});

test("migrated native methods have no legacy RPCD declarations or ACL grants", () => {
	for (const path of ["usr/libexec/rpcd/luci.fttr", "usr/libexec/fttr-hl202", "usr/share/fttr/hl202-request.uc"]) {
		assert.equal(existsSync(new URL(`../package/luci-app-fttr/root/${path}`, import.meta.url)), false);
	}
	const acl = JSON.parse(
		readFileSync(
			new URL("../package/luci-app-fttr/root/usr/share/rpcd/acl.d/luci-app-fttr.json", import.meta.url),
			"utf8",
		),
	)["luci-app-fttr"];
	assert.equal(acl.read.ubus["luci.fttr"], undefined);
	assert.equal(acl.write.ubus["luci.fttr"], undefined);
});

test("task, calibration and NPU calls preserve selectors and structured business results", async () => {
	const start = setup({ status: "pending", job: "test-job" });
	await start.client.mibStart({ onu_id: 0, optical_sn: "TEST00000000", tables: false });
	await start.client.hl202AccountUpdate({
		target: { optical_sn: "TEST00000000", onu_id: 0, binding_generation: "test-generation" },
		kind: "account_set_active",
		entry: 0,
		password: "",
		active: false,
	});
	assert.deepEqual(start.calls[0], { method: "mib_start", args: [0, "TEST00000000", false] });
	assert.equal(start.calls[1]?.args[4], false);
	assert.deepEqual(
		await setup({ status: "error", error: "not admitted" }).client.npuSet({ enabled: false, bridge: "br-test" }),
		{ status: "error", error: "not admitted" },
	);
	await assert.rejects(
		setup({ error: "invalid calibration" }).client.saveCalibration({ data: "invalid" }),
		/invalid calibration/,
	);
	await assert.rejects(setup({ error: "expired" }).client.jobResult({ job: "test-job", chunk: 0 }), /expired/);
});

test("all generated methods have matching native rpcd ACL access", () => {
	const acl = JSON.parse(
		readFileSync(
			new URL("../package/luci-app-fttr/root/usr/share/rpcd/acl.d/luci-app-fttr.json", import.meta.url),
			"utf8",
		),
	)["luci-app-fttr"];
	for (const method of fttrMethods) {
		assert.ok(acl[method.access].ubus.fttr.includes(method.method), `${method.access}: fttr.${method.method}`);
	}
	for (const access of ["read", "write"] as const) {
		assert.deepEqual(
			[...acl[access].ubus.fttr].sort(),
			fttrMethods
				.filter((method) => method.access === access)
				.map((method) => method.method)
				.sort(),
		);
	}
});

test("job polling assembles UTF-8 chunks, rejects changed metadata and never replays work", async () => {
	let results: unknown[] = [];
	const calls: string[] = [];
	Object.defineProperty(globalThis, "_", { configurable: true, value: (text: string) => text });
	Object.defineProperty(globalThis, "window", {
		configurable: true,
		value: { location: { pathname: "/jobs" }, setTimeout: (callback: () => void) => setTimeout(callback, 0) },
	});
	Object.defineProperty(globalThis, "L", {
		configurable: true,
		value: {
			rpc: {
				declare: (options: { method: string }) => async () => {
					calls.push(options.method);
					return options.method === "job_release" ? { released: true } : results.shift();
				},
			},
		},
	});
	const { waitForJob } = await import("../src/api/jobs");
	const payload = { text: `${"x".repeat(32750)}😀中文` };
	const bytes = Buffer.from(JSON.stringify(payload));
	const chunk = (index: number, total = bytes.length) => ({
		status: "ready",
		chunk: index,
		chunks: 2,
		bytes: total,
		data: bytes.subarray(index * 32768, (index + 1) * 32768).toString("base64"),
	});
	results = [{ status: "pending" }, chunk(0), chunk(1)];
	assert.deepEqual(await waitForJob({ status: "pending", job: "test-job" }), payload);
	assert.deepEqual(calls, ["job_result", "job_result", "job_result", "job_release"]);
	results = [chunk(0), chunk(1, bytes.length + 1)];
	await assert.rejects(waitForJob({ status: "pending", job: "test-job" }), /Inconsistent/);
	assert.equal(calls.at(-1), "job_release");
	results = [{ status: "ready", chunk: 0, chunks: 1, bytes: 1, data: "/w==" }];
	await assert.rejects(waitForJob({ status: "pending", job: "test-job" }));
	assert.equal(calls.at(-1), "job_release");
	assert.ok(calls.every((method) => method === "job_result" || method === "job_release"));
	const ready = (value: unknown) => {
		const data = Buffer.from(JSON.stringify(value));
		return { status: "ready", chunk: 0, chunks: 1, bytes: data.length, data: data.toString("base64") };
	};
	// The public calibration wrapper must preserve warning results for the page,
	// while actual worker/transport failures still reject and release the job.
	const { applyCalibration } = await import("../src/view/contracts/api");
	for (const outcome of [
		{ success: true, output: "Applied" },
		{ success: false, error: "Hardware initialization warning" },
	]) {
		calls.length = 0;
		results = [{ status: "pending", job: "calibration-job" }, ready(outcome)];
		assert.deepEqual(await applyCalibration(), outcome);
		assert.deepEqual(calls, ["apply_calibration", "job_result", "job_release"]);
	}
	results = [{ status: "pending", job: "calibration-job" }, ready({ error: "Worker outcome unknown" })];
	await assert.rejects(applyCalibration(), /Worker outcome unknown/);
	assert.equal(calls.at(-1), "job_release");
	results = [ready({ success: false, error: "Generic job failure" })];
	await assert.rejects(waitForJob({ status: "pending", job: "test-job" }), /Generic job failure/);
	assert.equal(calls.at(-1), "job_release");
});
