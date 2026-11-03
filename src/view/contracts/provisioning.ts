export {
	AcsBootstrapSchema as acsBootstrap,
	DeviceSyncSchema as deviceSync,
	ManagementStatusSchema as management,
	OperationPhaseSchema as operationPhase,
	ProvisioningStatusSchema as provisioning,
	RestartReplySchema as restartReply,
	SyncItemSchema as syncItem,
	SyncStatusReplySchema as syncStatus,
	WifiSyncSchema as wifiSync,
} from "../../api/generated/schemas";

import { ConfigCheckReplySchema, SyncReplySchema } from "../../api/generated/schemas";
import { checked } from "./common";

export const configCheck = {
	parse(value: unknown) {
		// Rust rejects mixed success/error envelopes via deny_unknown_fields.
		// Preserve that invariant before Zod strips unrecognized object fields.
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
export type {
	AcsBootstrap,
	ConfigCheckReply as ConfigCheck,
	DeviceSync,
	Lifecycle,
	SyncItem,
	SyncStatusReply as SyncStatus,
} from "../../api/generated/types";
