import * as z from "zod/mini";

const str = z.string();
const num = z.number();
const bool = z.boolean();
export const target = z.object({ optical_sn: str, onu_id: num, binding_generation: str });
export const sourceTarget = z.object({ mqtt_mac: str, binding_generation: str });
const snapshot = z.object({
	mqtt_mac: str,
	optical_sn: z.nullable(str),
	onu_id: z.nullable(num),
	binding_generation: str,
	last_seen: num,
	reason: str,
});
const commandFields = {
	target: str,
	request_id: z.optional(str),
	output: z.optional(str),
	output_truncated: bool,
	error: z.optional(str),
};
export const commandResult = z.discriminatedUnion("status", [
	z.object({ ...commandFields, status: z.literal("executed"), exit_code: z.nullable(num) }),
	z.object({ ...commandFields, status: z.literal("dispatched"), exit_code: z.optional(z.never()) }),
	z.object({ ...commandFields, status: z.literal("timeout"), exit_code: z.optional(z.never()) }),
	z.object({ ...commandFields, status: z.literal("error"), exit_code: z.optional(z.never()) }),
]);
const operation = z.object({ target: snapshot, result: commandResult, binding_current: bool });
const telemetry = z.object({
	schema_version: num,
	compressed_bytes: num,
	decompressed_bytes: num,
	fields: z.record(str, z.object({ value: z.json(), member: str, unit: z.nullable(str) })),
	members: z.array(z.object({ name: str, bytes: num, encoding: str, text: z.nullable(str), text_omitted: bool })),
	errors: z.array(str),
});
const reportState = z.object({
	revision: num,
	last_received: num,
	last_processed_receipt: z.nullable(num),
	last_good: z.nullable(num),
	error: z.nullable(str),
	report: z.nullable(telemetry),
});
const reportFields = { schema_version: z.literal(1), target: snapshot, report: z.nullable(reportState) };
export const reportReply = z.union([
	z.object({ ...reportFields, state: z.enum(["received", "report_unavailable"]) }),
	z.object({ ...reportFields, read_only: z.literal(true) }),
]);
export const deviceList = z.object({
	schema_version: z.literal(1),
	devices: z.array(
		z.object({
			optical_sn: str,
			onu_id: num,
			model: str,
			optical_online: bool,
			can_execute: bool,
			mqtt: z.nullable(snapshot),
			report_revision: z.nullable(num),
		}),
	),
	sources: z.array(snapshot),
});
export const accountReply = z.object({
	schema_version: z.literal(1),
	operation,
	accounts: z.nullable(
		z.array(z.object({ entry: z.union([z.literal(0), z.literal(1), z.literal(2)]), username: str, active: bool })),
	),
	write_status: z.enum(["not_applicable", "accepted_and_saved", "unconfirmed"]),
});
export const execReply = z.object({ schema_version: z.literal(1), operation });
export type Target = z.infer<typeof target>;
export type SourceTarget = z.infer<typeof sourceTarget>;
export type DeviceMeta = z.infer<typeof deviceList>["devices"][number];
