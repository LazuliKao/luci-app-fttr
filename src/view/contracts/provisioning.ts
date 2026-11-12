// SPDX-License-Identifier: Apache-2.0

// Wire validators are defined in api/validators.ts; re-exported here so views
// keep their existing import paths and api/* never imports view/contracts/*.
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
export type {
	AcsBootstrap,
	ConfigCheckReply as ConfigCheck,
	DeviceSync,
	Lifecycle,
	SyncItem,
	SyncStatusReply as SyncStatus,
} from "../../api/generated/types";
export { actionResult, configCheck } from "../../api/validators";
