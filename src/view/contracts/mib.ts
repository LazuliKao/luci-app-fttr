import * as z from "zod/mini";
import { checked, jobStart } from "./common";

const str = z.string();
const num = z.number();
const bool = z.boolean();
const reference = z.object({ id: str, url: str });
const definition = z.object({
	name: str,
	kind: z.enum([
		"unknown",
		"octets",
		"string",
		"unsigned_integer",
		"table",
		"signed_integer",
		"pointer",
		"bit_field",
		"enumeration",
		"counter",
	]),
	index: num,
	mask: num,
	size: num,
	read: bool,
	write: bool,
	set_by_create: bool,
	avc: bool,
	optional: bool,
	deprecated: bool,
	default_hex: z.nullable(str),
	reference,
});
const value = z.discriminatedUnion("type", [
	z.object({ type: z.literal("unsigned"), value: num }),
	z.object({ type: z.literal("signed"), value: num }),
	z.object({ type: z.literal("decimal"), value: str }),
	z.object({ type: z.literal("text"), value: z.nullable(str) }),
	z.object({ type: z.literal("octets"), hex: str }),
	z.object({ type: z.literal("table_length"), bytes: num }),
]);
const diagnostic = z.object({ code: str, message: str, offset: num, mask: num });
const support = z.enum(["layout", "name_only", "unknown"]);
const vlanRule = z.object({
	raw_hex: str,
	filter_outer_priority: num,
	filter_outer_vid: num,
	filter_outer_tpid_dei: num,
	filter_inner_priority: num,
	filter_inner_vid: num,
	filter_inner_tpid_dei: num,
	filter_ethertype: num,
	tags_to_remove: num,
	treatment_outer_priority: num,
	treatment_outer_vid: num,
	treatment_outer_tpid_dei: num,
	treatment_inner_priority: num,
	treatment_inner_vid: num,
	treatment_inner_tpid_dei: num,
	delete_entry: bool,
});
const report = z.object({
	schema_version: z.literal(1),
	reference_version: str,
	onu_id: z.nullable(num),
	uploaded_complete: bool,
	expected_records: num,
	received_records: num,
	decoded_records: num,
	partial_records: num,
	basic_records: num,
	tables_requested: bool,
	tables_collected: bool,
	classes: z.array(z.object({ class_id: num, name: z.nullable(str), entities: num, records: num, support })),
	entities: z.array(
		z.object({
			class_id: num,
			entity_id: num,
			name: z.nullable(str),
			support,
			reference: z.nullable(reference),
			sequences: z.array(num),
			attributes: z.array(
				z.object({
					definition,
					value: z.nullable(value),
					observations: z.array(z.object({ raw_hex: str, value, sequences: z.array(num) })),
				}),
			),
			diagnostics: z.array(diagnostic),
		}),
	),
	records: z.array(
		z.object({
			class_id: num,
			entity_id: num,
			sequence: num,
			attribute_mask: num,
			raw_hex: str,
			consumed: num,
			remaining_hex: str,
			undecoded_mask: num,
		}),
	),
	tables: z.array(
		z.object({
			class_id: num,
			entity_id: num,
			attribute: definition,
			collected: bool,
			error: z.nullable(str),
			raw_hex: str,
			rows: z.array(str),
			vlan_rules: z.array(vlanRule),
		}),
	),
	diagnostics: z.array(diagnostic),
});
export const mibSnapshot = z.object({ status: z.literal("ready"), report });
const progress = z.object({
	phase: z.enum(["starting", "upload", "tables"]),
	received: num,
	expected: z.nullable(num),
});
const mibResult = z.discriminatedUnion("status", [
	z.object({ status: z.literal("pending"), progress: z.optional(progress) }),
	z.object({
		status: z.literal("ready"),
		chunk: num,
		chunks: num,
		bytes: num,
		data: str,
	}),
]);
export type Definition = z.infer<typeof definition>;
export type Value = z.infer<typeof value>;
export type MibReport = z.infer<typeof report>;
const rawStart = L.rpc.declare<unknown, [number, string, boolean]>({
	object: "luci.fttr",
	method: "mib_start",
	params: ["onu_id", "optical_sn", "tables"],
	reject: true,
});
const rawResult = L.rpc.declare<unknown, [string, number]>({
	object: "luci.fttr",
	method: "mib_result",
	params: ["job", "chunk"],
	reject: true,
});
const rawRelease = L.rpc.declare<unknown, [string]>({
	object: "luci.fttr",
	method: "mib_release",
	params: ["job"],
	reject: true,
});
export const startMib = async (onu: number, serial: string, tables: boolean) =>
	jobStart.parse(checked(await rawStart(onu, serial, tables)));
export const getMib = async (job: string, chunk: number) => mibResult.parse(checked(await rawResult(job, chunk)));
export const releaseMib = async (job: string) => z.object({ released: bool }).parse(checked(await rawRelease(job)));
