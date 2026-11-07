import { checked, jobChunk, jobStart } from "../view/contracts/common";
import { deviceList } from "../view/contracts/hl202";
import { actionResult, configCheck, restartReply, syncStatus } from "../view/contracts/provisioning";
import { nativeNpuStatus, status } from "../view/contracts/status";
import { createFttrClient } from "./generated/luci-client";
import { TopologyClientsReplySchema, TopologyNodeReplySchema, TopologyReplySchema } from "./generated/schemas";
import {
	calibrationInfo,
	capabilities,
	mibResult,
	npuReply,
	opticalReply,
	releaseReply,
	saveCalibrationResult,
} from "./validators";

export const fttrValidators = {
	getCapabilities: { parse: (value: unknown) => capabilities.parse(checked(value)) },
	opticalStatus: opticalReply,
	opticalSet: opticalReply,
	getStatus: { parse: (value: unknown) => status.parse(checked(value)) },
	getTopology: { parse: (value: unknown) => TopologyReplySchema.parse(checked(value)) },
	getTopologyNode: { parse: (value: unknown) => TopologyNodeReplySchema.parse(checked(value)) },
	getTopologyClients: { parse: (value: unknown) => TopologyClientsReplySchema.parse(checked(value)) },
	getSync: { parse: (value: unknown) => syncStatus.parse(checked(value)) },
	configCheck,
	npuStatus: nativeNpuStatus,
	configReload: { parse: (value: unknown) => syncStatus.parse(checked(value)) },
	restartService: { parse: (value: unknown) => restartReply.parse(checked(value)) },
	sync: { parse: (value: unknown) => actionResult.parse(checked(value)) },
	npuSet: npuReply,
	mibStart: { parse: (value: unknown) => jobStart.parse(checked(value)) },
	mibResult: { parse: (value: unknown) => mibResult.parse(checked(value)) },
	jobRelease: { parse: (value: unknown) => releaseReply.parse(checked(value)) },
	hl202List: { parse: (value: unknown) => deviceList.parse(checked(value)) },
	hl202Report: { parse: (value: unknown) => jobStart.parse(checked(value)) },
	hl202AccountsStart: { parse: (value: unknown) => jobStart.parse(checked(value)) },
	hl202AccountUpdate: { parse: (value: unknown) => jobStart.parse(checked(value)) },
	hl202ExecStart: { parse: (value: unknown) => jobStart.parse(checked(value)) },
	jobResult: { parse: (value: unknown) => jobChunk.parse(checked(value)) },
	getCalibration: { parse: (value: unknown) => calibrationInfo.parse(checked(value)) },
	saveCalibration: { parse: (value: unknown) => saveCalibrationResult.parse(checked(value)) },
	applyCalibration: { parse: (value: unknown) => jobStart.parse(checked(value)) },
};

function createClient() {
	return createFttrClient(L.rpc, fttrValidators);
}

let client: ReturnType<typeof createClient> | undefined;

// Importing schemas or page helpers must not require the LuCI global yet.
export function getFttrClient() {
	client ??= createClient();
	return client;
}
