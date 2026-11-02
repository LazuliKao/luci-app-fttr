import { checked } from "../view/contracts/common";
import { configCheck, syncStatus } from "../view/contracts/provisioning";
import { nativeNpuStatus, status } from "../view/contracts/status";
import { createFttrClient } from "./generated/luci-client";
import { capabilities, opticalReply } from "./validators";

function createClient() {
	return createFttrClient(L.rpc, {
		getCapabilities: { parse: (value: unknown) => capabilities.parse(checked(value)) },
		opticalStatus: opticalReply,
		opticalSet: opticalReply,
		getStatus: { parse: (value: unknown) => status.parse(checked(value)) },
		getSync: { parse: (value: unknown) => syncStatus.parse(checked(value)) },
		configCheck,
		npuStatus: nativeNpuStatus,
	});
}

let client: ReturnType<typeof createClient> | undefined;

// Importing schemas or page helpers must not require the LuCI global yet.
export function getFttrClient() {
	client ??= createClient();
	return client;
}
