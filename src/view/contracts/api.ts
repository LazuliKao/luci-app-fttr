import type * as z from "zod/mini";
import { getFttrClient } from "../../api/client";
import type { SyncAction } from "../../api/generated/types";
import { waitForJob } from "../../api/jobs";
import {
	applyCalibrationResult,
	type calibrationInfo,
	type npuReply,
	type opticalReply,
	type saveCalibrationResult,
} from "../../api/validators";
import { checked } from "./common";
import { type NpuStatus, networkDevices } from "./status";

export type { SyncAction } from "../../api/generated/types";
export { applyCalibrationResult, calibrationInfo, npuReply, saveCalibrationResult } from "../../api/validators";
export type OpticalReply = z.infer<typeof opticalReply>;
export type NpuReply = z.infer<typeof npuReply>;
export type CalibrationInfo = z.infer<typeof calibrationInfo>;
export type SaveCalibrationResult = z.infer<typeof saveCalibrationResult>;
export type ApplyCalibrationResult = z.infer<typeof applyCalibrationResult>;

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
export const getOpticalStatus = async (): Promise<OpticalReply> => getFttrClient().opticalStatus();
export const setOptical = async (enabled: boolean): Promise<OpticalReply> => getFttrClient().opticalSet({ enabled });
export const getNpuStatus = async (): Promise<NpuStatus> => getFttrClient().npuStatus();
export const setNpu = async (enabled: boolean, bridge = ""): Promise<NpuReply> =>
	getFttrClient().npuSet({ enabled, bridge });
export const sync = async (action: SyncAction, target: string) => getFttrClient().sync({ action, target });
export const getCalibration = async (): Promise<CalibrationInfo> => getFttrClient().getCalibration();
export const saveCalibration = async (data: string): Promise<SaveCalibrationResult> =>
	getFttrClient().saveCalibration({ data });
export const applyCalibration = async (): Promise<ApplyCalibrationResult> =>
	applyCalibrationResult.parse(
		await waitForJob(await getFttrClient().applyCalibration(), (value) => {
			// A valid calibration warning is a business result, not a job failure.
			const result = applyCalibrationResult.safeParse(value);
			return result.success ? result.data : checked(value);
		}),
	);
