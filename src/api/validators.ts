import * as z from "zod/mini";

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
