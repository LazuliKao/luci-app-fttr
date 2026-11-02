import * as z from "zod/mini";

export const npuReply = z.discriminatedUnion("status", [
	z.object({ status: z.literal("success"), enabled: z.boolean() }),
	z.object({ status: z.literal("error"), error: z.string() }),
]);
export const calibrationInfo = z.object({
	source: z.enum(["factory", "firmware", "builtin"]),
	active_path: z.string(),
	size: z.number(),
	sha256: z.string(),
	data: z.string(),
	factory: z.object({
		detected: z.boolean(),
		device: z.string(),
		has_data: z.boolean(),
		sha256: z.string(),
		data: z.string(),
	}),
	firmware: z.object({
		exists: z.boolean(),
		path: z.string(),
		size: z.number(),
		sha256: z.string(),
		data: z.string(),
	}),
	error: z.optional(z.string()),
});
export const saveCalibrationResult = z.object({
	success: z.boolean(),
	path: z.string(),
	size: z.number(),
	sha256: z.string(),
	error: z.optional(z.string()),
});
export const applyCalibrationResult = z.object({
	success: z.boolean(),
	output: z.optional(z.string()),
	error: z.optional(z.string()),
});
export const mibResult = z.discriminatedUnion("status", [
	z.object({
		status: z.literal("pending"),
		progress: z.optional(
			z.object({
				phase: z.enum(["starting", "upload", "tables"]),
				received: z.number(),
				expected: z.nullable(z.number()),
			}),
		),
	}),
	z.object({
		status: z.literal("ready"),
		chunk: z.number(),
		chunks: z.number(),
		bytes: z.number(),
		data: z.string(),
	}),
]);
export const releaseReply = z.object({ released: z.boolean() });

export const opticalReply = z.object({
	schema_version: z.literal(1),
	status: z.enum(["success", "error"]),
	action: z.enum([
		"optical_on",
		"optical_off",
		"optical_status",
		"optical_reload",
		"optical_reinitialize",
		"optical_shutdown",
	]),
	desired_enabled: z.nullable(z.boolean()),
	tx_enabled: z.nullable(z.boolean()),
	actor_state: z.enum(["enabled", "disabled", "unknown"]),
	hardware_ready: z.boolean(),
	discovery_active: z.boolean(),
	cleanup_pending: z.boolean(),
	error: z.nullable(z.object({ code: z.string(), message: z.string() })),
});

export const capabilities = z.object({
	schema_version: z.literal(1),
	version: z.string(),
	features: z.record(z.string(), z.boolean()),
	functions: z.object({
		optical: z.boolean(),
		omci_mib: z.boolean(),
		mqtt_telemetry: z.boolean(),
		hl202_management: z.boolean(),
		cwmp: z.boolean(),
	}),
	pages: z.object({
		status: z.boolean(),
		config: z.boolean(),
		sync: z.boolean(),
		hl202: z.boolean(),
		hardware: z.boolean(),
		calibration: z.boolean(),
		about: z.boolean(),
	}),
	adapters: z.array(z.object({ id: z.string(), name: z.string() })),
});
