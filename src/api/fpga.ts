// SPDX-License-Identifier: Apache-2.0
import { checked } from "./common";
import { FpgaDiagnosticReplySchema } from "./generated/schemas";

export const fpgaDiagnostic = {
	parse(value: unknown) {
		const reply = FpgaDiagnosticReplySchema.parse(checked(value));
		if (reply.status !== "success") throw new Error(reply.error);
		const snap = reply.snapshot;
		const uint = (value: number, max = Number.MAX_SAFE_INTEGER) => {
			if (!Number.isSafeInteger(value) || value < 0 || value > max)
				throw new Error("Invalid FPGA unsigned value");
		};
		uint(snap.started_unix_ms);
		uint(snap.read_duration_us);
		if (snap.started_monotonic_ms !== null) uint(snap.started_monotonic_ms);
		uint(snap.main_bandwidth_raw, 0xffffffff);
		if (!/^[a-f0-9]{64}$/.test(snap.source_sha256)) throw new Error("Invalid FPGA source hash");
		const slots = new Set<number>();
		for (const onu of snap.onus) {
			uint(onu.slot, 15);
			if (slots.has(onu.slot)) throw new Error("Duplicate FPGA ONU slot");
			slots.add(onu.slot);
			uint(onu.lob, 65535);
			uint(onu.bip, 65535);
			for (const grant of [onu.management, onu.business]) {
				uint(grant.bandwidth_raw, 0xffffffff);
				uint(grant.control_raw, 0xffffffff);
				uint(grant.bandwidth, 0xfffff);
				uint(grant.weight, 127);
			}
		}
		for (const count of [...Object.values(snap.counters), ...Object.values(snap.raw_registers)])
			uint(count, 0xffffffff);
		const keys = new Set<string>();
		for (const descriptor of snap.counter_descriptors) {
			if (
				descriptor.width_bits !== 32 ||
				descriptor.scope !== "global" ||
				keys.has(descriptor.key) ||
				!Object.keys(snap.counters).includes(descriptor.key) ||
				!/^0x[0-9a-f]{8}$/.test(descriptor.address) ||
				snap.raw_registers[descriptor.address] !== snap.counters[descriptor.key]
			)
				throw new Error("Invalid FPGA counter metadata");
			keys.add(descriptor.key);
		}
		if (keys.size !== Object.keys(snap.counters).length) throw new Error("Incomplete FPGA counter metadata");
		return reply;
	},
};
