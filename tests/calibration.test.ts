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
