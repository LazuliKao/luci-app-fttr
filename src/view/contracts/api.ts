import * as z from "zod/mini";
import { getFttrClient } from "../../api/client";
import type { SyncAction } from "../../api/generated/types";
import type { opticalReply } from "../../api/validators";
import { checked } from "./common";
import { type NpuStatus, networkDevices } from "./status";

const rawNetwork = L.rpc.declare<unknown>({
	object: "luci-rpc",
	method: "getNetworkDevices",
	expect: { "": {} },
	reject: true,
});
export const getStatus = async () => getFttrClient().getStatus();
export const getSync = async () => getFttrClient().getSync();
export const checkConfig = async () => getFttrClient().configCheck();
export const reloadConfig = async () => getFttrClient().configReload();
export const restartService = async () => getFttrClient().restartService();
export const getNetworkDevices = async () => networkDevices.parse(checked(await rawNetwork()));

// Native optical TX control; fttrd owns persistence, quiesce, FPGA reset and readback.
export type OpticalReply = z.infer<typeof opticalReply>;

export const getOpticalStatus = async (): Promise<OpticalReply> => getFttrClient().opticalStatus();

export const setOptical = async (enabled: boolean): Promise<OpticalReply> => getFttrClient().opticalSet({ enabled });

// NPU / PPE Hardware Offload control.
export const npuReply = z.object({
	status: z.enum(["success", "error"]),
	enabled: z.optional(z.boolean()),
	error: z.optional(z.string()),
});
export type NpuReply = z.infer<typeof npuReply>;

const rawNpuSet = L.rpc.declare<unknown, [boolean, string]>({
	object: "luci.fttr",
	method: "npu_set",
	params: ["enabled", "bridge"],
	reject: true,
});

export const getNpuStatus = async (): Promise<NpuStatus> => getFttrClient().npuStatus();

export const setNpu = async (enabled: boolean, bridge = ""): Promise<NpuReply> =>
	npuReply.parse(await rawNpuSet(enabled, bridge));

export type { SyncAction } from "../../api/generated/types";
export const sync = async (action: SyncAction, target: string) => getFttrClient().sync({ action, target });

const rawGetCalibration = L.rpc.declare<unknown>({
	object: "luci.fttr",
	method: "get_calibration",
	reject: true,
});

const rawSaveCalibration = L.rpc.declare<unknown, [string]>({
	object: "luci.fttr",
	method: "save_calibration",
	params: ["data"],
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
	saveCalibrationResult.parse(checked(await rawSaveCalibration(data)));

export const applyCalibration = async (): Promise<ApplyCalibrationResult> =>
	applyCalibrationResult.parse(checked(await rawApplyCalibration()));
