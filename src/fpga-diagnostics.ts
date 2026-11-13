// SPDX-License-Identifier: Apache-2.0
import type { FpgaDelta, FpgaDiagnosticRequest, FpgaSnapshot } from "./api/generated/types";

// Keep parity with the Rust CLI: modulo differences require a common daemon,
// hardware context, source layout and an increasing daemon monotonic clock.
export function fpgaDelta(first: FpgaSnapshot, second: FpgaSnapshot): FpgaDelta {
	const sameDaemon = first.daemon_instance !== null && first.daemon_instance === second.daemon_instance;
	const a = first.started_monotonic_ms;
	const b = second.started_monotonic_ms;
	const clock = a !== null && b !== null && b > a;
	const continuous =
		sameDaemon &&
		clock &&
		first.schema_version === second.schema_version &&
		first.source_sha256 === second.source_sha256 &&
		first.hardware_epoch !== null &&
		first.hardware_epoch === second.hardware_epoch;
	const modulo = (old: number, value: number, bits: number) => (value - old + 2 ** bits) % 2 ** bits;
	return {
		elapsed_ms: clock ? b - a : 0,
		same_daemon: sameDaemon,
		hardware_continuity_verified: continuous,
		onus: second.onus.map((onu) => {
			const old = first.onus.find((item) => item.slot === onu.slot);
			const verified = continuous && onu.generation !== null && old?.generation === onu.generation;
			return {
				slot: onu.slot,
				registration_continuity_verified: verified,
				lob_modulo_65536: verified && old ? modulo(old.lob, onu.lob, 16) : null,
				bip_modulo_65536: verified && old ? modulo(old.bip, onu.bip, 16) : null,
			};
		}),
		counters_modulo_4294967296: continuous
			? Object.fromEntries(
					Object.entries(second.counters)
						.filter(([key]) => Object.keys(first.counters).includes(key))
						.map(([key, value]) => [key, modulo(first.counters[key], value, 32)]),
				)
			: null,
	};
}

export interface FpgaSample {
	snapshot: FpgaSnapshot;
	delta: FpgaDelta | null;
}
export interface SamplingOptions {
	request: FpgaDiagnosticRequest;
	samples: number;
	intervalMs: number;
}
export function validateSampling(options: SamplingOptions): void {
	const { samples, intervalMs, request } = options;
	if (
		!Number.isInteger(samples) ||
		samples < 1 ||
		samples > 120 ||
		!Number.isInteger(intervalMs) ||
		intervalMs < 100 ||
		intervalMs > 10000 ||
		(samples - 1) * intervalMs > 60000 ||
		(request.onu_id !== undefined &&
			(!Number.isInteger(request.onu_id) || request.onu_id < 0 || request.onu_id > 15))
	) {
		throw new Error("Invalid sampling window (1–120 samples, 100–10000 ms, at most 60 seconds)");
	}
}

export interface SamplingState {
	running: boolean;
	busy: boolean;
	samples: readonly FpgaSample[];
	error: string | null;
}

/** Bounded, single-flight sampler. Late replies after stop are discarded. */
export function createFpgaSampler(deps: {
	read(request: FpgaDiagnosticRequest): Promise<FpgaSnapshot>;
	available(): boolean;
	changed(state: SamplingState): void;
	now?: () => number;
	schedule?: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>;
	cancel?: (timer: ReturnType<typeof setTimeout>) => void;
}) {
	const now = deps.now ?? (() => performance.now());
	const schedule = deps.schedule ?? setTimeout;
	const cancel = deps.cancel ?? clearTimeout;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let token = 0;
	let state: SamplingState = { running: false, busy: false, samples: [], error: null };
	const notify = () => deps.changed({ ...state, samples: [...state.samples] });
	function stop() {
		token++;
		if (timer !== undefined) cancel(timer);
		timer = undefined;
		state.running = false;
		notify();
	}
	function start(options: SamplingOptions) {
		validateSampling(options);
		if (state.busy || state.running) throw new Error("FPGA diagnostic reader busy");
		if (!deps.available()) throw new Error("FPGA diagnostic panel is inactive");
		const request = { ...options.request };
		const current = ++token;
		const started = now();
		let due = started;
		state = { running: true, busy: false, samples: [], error: null };
		const tick = () => {
			if (token !== current || !state.running) return;
			if (!deps.available() || now() - started > 60000) {
				stop();
				return;
			}
			if (!state.busy && now() >= due) {
				state.busy = true;
				due = now() + options.intervalMs;
				notify();
				Promise.resolve()
					.then(() => deps.read(request))
					.then(
						(snapshot) => {
							if (token !== current || !state.running || !deps.available()) return;
							const previous = state.samples[state.samples.length - 1]?.snapshot;
							state.samples = [
								...state.samples,
								{ snapshot, delta: previous ? fpgaDelta(previous, snapshot) : null },
							];
						},
						(error: unknown) => {
							if (token !== current) return;
							state.error = error instanceof Error ? error.message : String(error);
							stop();
						},
					)
					.finally(() => {
						state.busy = false;
						if (token === current && (!deps.available() || state.samples.length >= options.samples)) stop();
						else notify();
					});
			}
			timer = schedule(tick, 100);
		};
		tick();
	}
	return { start, stop };
}
