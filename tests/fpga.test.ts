import assert from "node:assert/strict";
import test from "node:test";
import { fpgaDiagnostic } from "../src/api/fpga";
import type { FpgaSnapshot } from "../src/api/generated/types";
import { createFpgaSampler, fpgaDelta, type SamplingState, validateSampling } from "../src/fpga-diagnostics";

function snapshot(): FpgaSnapshot {
	const grant = {
		bandwidth_raw: 0x84004bc5,
		control_raw: 0x11000514,
		enabled_bit28: true,
		bandwidth: 19397,
		weight: 4,
	};
	return {
		schema_version: 2,
		source_sha256: "b8036696b34d35f9aee68285f4b7f7b55d7f332a2e8e0b22059637db659ab2da",
		limitations: "fixture",
		started_unix_ms: 1000,
		read_duration_us: 10,
		started_monotonic_ms: 1,
		daemon_instance: "fixture",
		hardware_epoch: "0",
		main_bandwidth_raw: 0x17258,
		main_bandwidth_enabled: true,
		onus: [
			{
				slot: 0,
				generation: "18446744073709551615",
				lob: 65530,
				bip: 65535,
				management: grant,
				business: { ...grant },
			},
		],
		counters: { upstream_bch: 4294967294 },
		raw_registers: { "0x010100b0": 4294967294 },
		counter_descriptors: [
			{
				key: "upstream_bch",
				label: "US BCH error",
				group: "upstream",
				address: "0x010100b0",
				width_bits: 32,
				scope: "global",
			},
		],
	};
}

test("FPGA modulo deltas match Rust rollover vectors and require independent registration continuity", () => {
	const first = snapshot();
	const next = structuredClone(first);
	next.started_unix_ms = 1; // Wall-clock corrections do not alter sampling intervals.
	next.started_monotonic_ms = 1001;
	next.onus[0].lob = 10;
	next.onus[0].bip = 3;
	next.counters.upstream_bch = 3;
	const change = fpgaDelta(first, next);
	assert.equal(change.elapsed_ms, 1000);
	assert.equal(change.onus[0].lob_modulo_65536, 16);
	assert.equal(change.onus[0].bip_modulo_65536, 4);
	assert.equal(change.counters_modulo_4294967296?.upstream_bch, 5);
	next.onus[0].generation = "new-registration";
	assert.equal(fpgaDelta(first, next).onus[0].lob_modulo_65536, null);
	assert.equal(fpgaDelta(first, next).counters_modulo_4294967296?.upstream_bch, 5);
	for (const patch of [
		{ hardware_epoch: "2" },
		{ daemon_instance: "restarted" },
		{ source_sha256: "other" },
		{ started_monotonic_ms: null },
		{ started_monotonic_ms: 1 },
		{ hardware_epoch: null },
	]) {
		assert.equal(fpgaDelta(first, { ...next, ...patch }).counters_modulo_4294967296, null);
	}
});

test("FPGA wire validation preserves full tokens and rejects malformed numeric or metadata values", () => {
	const good = { status: "success", snapshot: snapshot() };
	assert.equal(fpgaDiagnostic.parse(good).snapshot.onus[0].generation, "18446744073709551615");
	for (const value of [-1, 0.5, 4294967296]) {
		const bad = structuredClone(good);
		bad.snapshot.counters.upstream_bch = value;
		assert.throws(() => fpgaDiagnostic.parse(bad));
	}
	const duplicate = structuredClone(good);
	duplicate.snapshot.onus.push(duplicate.snapshot.onus[0]);
	assert.throws(() => fpgaDiagnostic.parse(duplicate));
	assert.throws(() => fpgaDiagnostic.parse({ ...good, error: "mixed" }));
	assert.throws(() => fpgaDiagnostic.parse({ status: "error", error: "read failed" }));
	const metadata = structuredClone(good);
	metadata.snapshot.counter_descriptors[0].address = "0x02010000";
	assert.throws(() => fpgaDiagnostic.parse(metadata));
});

function fixture() {
	let time = 0;
	let available = true;
	let calls = 0;
	let state: SamplingState = { running: false, busy: false, samples: [], error: null };
	let pending: { resolve(value: FpgaSnapshot): void; reject(error: Error): void } | undefined;
	let callback: (() => void) | undefined;
	const sampler = createFpgaSampler({
		read: () => {
			calls++;
			return new Promise<FpgaSnapshot>((resolve, reject) => {
				pending = { resolve, reject };
			});
		},
		available: () => available,
		changed: (value) => {
			state = value;
		},
		now: () => time,
		schedule: (value) => {
			callback = value;
			return 1 as unknown as ReturnType<typeof setTimeout>;
		},
		cancel: () => {
			callback = undefined;
		},
	});
	return {
		sampler,
		get state() {
			return state;
		},
		get calls() {
			return calls;
		},
		async tick(ms: number) {
			time += ms;
			const fn = callback;
			callback = undefined;
			fn?.();
			await this.flush();
		},
		async flush() {
			for (let i = 0; i < 8; i++) await Promise.resolve();
		},
		resolve(value = snapshot()) {
			assert.ok(pending);
			pending.resolve(value);
			pending = undefined;
		},
		reject() {
			assert.ok(pending);
			pending.reject(new Error("read failed"));
			pending = undefined;
		},
		hide() {
			available = false;
		},
	};
}
const options = { request: {}, samples: 2, intervalMs: 100 };

test("sampling is single-flight, bounded by sample count, and computes a fresh baseline", async () => {
	const f = fixture();
	f.sampler.start(options);
	await f.flush();
	await f.tick(500);
	assert.equal(f.calls, 1);
	f.resolve();
	await f.flush();
	await f.tick(100);
	assert.equal(f.calls, 2);
	const next = snapshot();
	next.started_monotonic_ms = 1001;
	f.resolve(next);
	await f.flush();
	assert.equal(f.state.samples.length, 2);
	assert.equal(f.state.running, false);
	assert.equal(f.state.samples[1].delta?.elapsed_ms, 1000);
	f.sampler.start({ ...options, samples: 1 });
	await f.flush();
	f.resolve();
	await f.flush();
	assert.equal(f.state.samples.length, 1);
	assert.equal(f.state.samples[0].delta, null);
});

test("stop discards late replies and prevents overlapping restart", async () => {
	const f = fixture();
	f.sampler.start(options);
	await f.flush();
	f.sampler.stop();
	assert.throws(() => f.sampler.start(options), /busy/);
	f.resolve();
	await f.flush();
	assert.equal(f.state.samples.length, 0);
	assert.equal(f.state.busy, false);
	await f.tick(1000);
	assert.equal(f.calls, 1);
});

test("hidden panels, failures and the real 60-second deadline stop further reads", async () => {
	for (const reason of ["hidden", "deadline", "error"] as const) {
		const f = fixture();
		f.sampler.start(options);
		await f.flush();
		if (reason === "error") {
			f.reject();
			await f.flush();
			assert.match(f.state.error ?? "", /read failed/);
		} else {
			if (reason === "hidden") f.hide();
			await f.tick(reason === "deadline" ? 60001 : 100);
			f.resolve();
			await f.flush();
		}
		assert.equal(f.state.running, false);
		assert.equal(f.state.samples.length, 0);
		await f.tick(1000);
		assert.equal(f.calls, 1);
	}
});

test("invalid sampling requests are rejected before I/O", () => {
	for (const patch of [
		{ samples: 0 },
		{ samples: 121 },
		{ samples: 120, intervalMs: 10000 },
		{ intervalMs: 99 },
		{ samples: 1.5 },
		{ request: { onu_id: 16 } },
	]) {
		assert.throws(() => validateSampling({ ...options, ...patch }));
	}
});
