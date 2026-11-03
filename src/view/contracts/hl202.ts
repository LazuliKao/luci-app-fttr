import {
	HlAccountReplySchema,
	HlExecReplySchema,
	HlListReplySchema,
	HlReportReplySchema,
} from "../../api/generated/schemas";
import type { HlTarget } from "../../api/generated/types";
import { checked } from "./common";

export { HlCommandResultSchema as commandResult } from "../../api/generated/schemas";
export type Target = Extract<HlTarget, { optical_sn: string }>;
export type SourceTarget = Extract<HlTarget, { mqtt_mac: string }>;
export type { HlDevice as DeviceMeta } from "../../api/generated/types";

// Strip transport error variants after the common error handler; success data is
// always validated by the generated schema, including asynchronous final replies.
function success<T>(schema: { parse(value: unknown): T }) {
	return {
		parse(value: unknown): Exclude<T, { error: unknown }> {
			const result = schema.parse(checked(value));
			if (typeof result === "object" && result !== null && "error" in result) {
				checked(result);
				throw new Error("Unexpected RPC error");
			}
			return result as Exclude<T, { error: unknown }>;
		},
	};
}
export const deviceList = success(HlListReplySchema);
export const reportReply = success(HlReportReplySchema);
export const accountReply = success(HlAccountReplySchema);
export const execReply = success(HlExecReplySchema);
