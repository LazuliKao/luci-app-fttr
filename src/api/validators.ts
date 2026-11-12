// SPDX-License-Identifier: Apache-2.0

import { checked } from "./common";
// Validators needed by api/client.ts live here so api/* never has to import
// from view/contracts/*. Contracts modules re-export these for view code.
import {
	ConfigCheckReplySchema,
	HlAccountReplySchema,
	HlExecReplySchema,
	HlListReplySchema,
	HlReportReplySchema,
	SyncReplySchema,
} from "./generated/schemas";

export {
	CalibrationAppliedSchema as applyCalibrationResult,
	CalibrationInfoSchema as calibrationInfo,
	CalibrationSavedSchema as saveCalibrationResult,
	CapabilitiesSchema as capabilities,
	JobChunkSchema as jobChunk,
	JobChunkSchema as mibResult,
	JobPendingSchema as jobStart,
	JobReleaseReplySchema as releaseReply,
	NpuSetReplySchema as npuReply,
	NpuStatusSchema as nativeNpuStatus,
	OpticalReplySchema as opticalReply,
	PlatformInfoReplySchema as platformInfo,
	RestartReplySchema as restartReply,
	StatusReplySchema as status,
	SyncStatusReplySchema as syncStatus,
} from "./generated/schemas";

// Rust rejects mixed success/error envelopes via deny_unknown_fields.
// Preserve that invariant before Zod strips unrecognized object fields.
export const configCheck = {
	parse(value: unknown) {
		if (
			typeof value === "object" &&
			value !== null &&
			"error" in value &&
			("valid" in value || "revision" in value || "devices" in value)
		) {
			throw new Error("Mixed configuration check result");
		}
		return ConfigCheckReplySchema.parse(value);
	},
};

export const actionResult = {
	parse(value: unknown) {
		const result = SyncReplySchema.parse(checked(value));
		if ("error" in result) throw new Error(result.error);
		return result;
	},
};

// Strip transport error variants after the common error handler; success data
// is always validated by the generated schema, including asynchronous replies.
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
