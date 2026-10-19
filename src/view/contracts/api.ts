import * as z from "zod/mini";
import { checked } from "./common";
import { configCheck, syncStatus } from "./provisioning";
import { networkDevices, status } from "./status";

const rawStatus = L.rpc.declare<unknown>({ object: "luci.fttr", method: "get_status", reject: true });
const rawSync = L.rpc.declare<unknown>({ object: "luci.fttr", method: "get_sync", reject: true });
const rawCheck = L.rpc.declare<unknown>({ object: "luci.fttr", method: "config_check", reject: true });
const rawReload = L.rpc.declare<unknown>({ object: "luci.fttr", method: "config_reload", reject: true });
const rawRestart = L.rpc.declare<unknown>({ object: "luci.fttr", method: "restart_service", reject: true });
const rawNetwork = L.rpc.declare<unknown>({
	object: "luci-rpc",
	method: "getNetworkDevices",
	expect: { "": {} },
	reject: true,
});
const rawSyncAction = L.rpc.declare<unknown, [string, string]>({
	object: "luci.fttr",
	method: "sync",
	params: ["action", "target"],
	reject: true,
});
export const getStatus = async () => status.parse(checked(await rawStatus()));
export const getSync = async () => syncStatus.parse(checked(await rawSync()));
export const checkConfig = async () => configCheck.parse(await rawCheck());
export const reloadConfig = async () => syncStatus.parse(checked(await rawReload()));
export const restartService = async () => z.object({ restarting: z.literal(true) }).parse(checked(await rawRestart()));
export const getNetworkDevices = async () => networkDevices.parse(checked(await rawNetwork()));

export type SyncAction =
	| "plan"
	| "apply"
	| "management_plan"
	| "management_apply"
	| "reset_state"
	| "reconcile"
	| "retry";
const actionResult = z.union([
	z.object({ operation_ids: z.array(z.number()), revision: z.string() }),
	z.object({ started: z.literal(true), mode: z.enum(["apply", "plan"]) }),
	z.object({ reset: z.literal(true), device: z.string() }),
	z.object({
		operation_ids: z.array(z.number()),
		mode: z.enum(["apply", "plan"]),
		reconcile: z.optional(z.boolean()),
		retry: z.optional(z.boolean()),
	}),
]);
export const sync = async (action: SyncAction, target: string) =>
	actionResult.parse(checked(await rawSyncAction(action, target)));

const rawGetCalibration = L.rpc.declare<unknown>({
	object: "luci.fttr",
	method: "get_calibration",
	reject: true,
});

const rawSaveCalibration = L.rpc.declare<unknown, [string, string]>({
	object: "luci.fttr",
	method: "save_calibration",
	params: ["path", "data"],
	reject: true,
});

const rawApplyCalibration = L.rpc.declare<unknown>({
	object: "luci.fttr",
	method: "apply_calibration",
	reject: true,
});

export const calibrationInfo = z.object({
	source: z.enum(["factory", "firmware", "builtin"]),
	active_path: z.string(),
	size: z.number(),
	sha256: z.string(),
	data: z.optional(z.string()),
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
export type CalibrationInfo = z.infer<typeof calibrationInfo>;

export const saveCalibrationResult = z.object({
	success: z.boolean(),
	path: z.string(),
	size: z.number(),
	sha256: z.string(),
	error: z.optional(z.string()),
});
export type SaveCalibrationResult = z.infer<typeof saveCalibrationResult>;

export const applyCalibrationResult = z.object({
	success: z.boolean(),
	output: z.optional(z.string()),
	error: z.optional(z.string()),
});
export type ApplyCalibrationResult = z.infer<typeof applyCalibrationResult>;

export const getCalibration = async (): Promise<CalibrationInfo> =>
	calibrationInfo.parse(checked(await rawGetCalibration()));

export const saveCalibration = async (data: string): Promise<SaveCalibrationResult> =>
	saveCalibrationResult.parse(checked(await rawSaveCalibration("/lib/firmware/modified_UX3326.bin", data)));

export const applyCalibration = async (): Promise<ApplyCalibrationResult> =>
	applyCalibrationResult.parse(checked(await rawApplyCalibration()));
