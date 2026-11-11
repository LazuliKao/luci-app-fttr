import { getFttrClient } from "../../api/client";
import type {
	CalibrationApplied,
	CalibrationInfo,
	CalibrationMode,
	CalibrationSaved,
	NpuSetReply,
	NpuSetRequest,
	OpticalReply,
	OpticalSettings,
	PlatformInfoReply,
	SyncAction,
} from "../../api/generated/types";
import { waitForJob } from "../../api/jobs";
import { applyCalibrationResult } from "../../api/validators";
import { checked } from "./common";
import { type NpuStatus, networkDevices } from "./status";

export type { CalibrationInfo, OpticalReply, PlatformInfoReply, SyncAction } from "../../api/generated/types";
export { applyCalibrationResult, calibrationInfo, npuReply, saveCalibrationResult } from "../../api/validators";
export type NpuReply = NpuSetReply;
export type SaveCalibrationResult = CalibrationSaved;
export type ApplyCalibrationResult = CalibrationApplied;

export const getStatus = async () => getFttrClient().getStatus();
export const getPlatformInfo = async (): Promise<PlatformInfoReply> => getFttrClient().getPlatformInfo();
export const getSync = async () => getFttrClient().getSync();
export const checkConfig = async () => getFttrClient().configCheck();
export const reloadConfig = async () => getFttrClient().configReload();
export const restartService = async () => getFttrClient().restartService();
export const getNetworkDevices = async () => {
	const rawNetwork = L.rpc.declare<unknown>({
		object: "luci-rpc",
		method: "getNetworkDevices",
		expect: { "": {} },
		reject: true,
	});
	return networkDevices.parse(checked(await rawNetwork()));
};
export const getOpticalStatus = async (): Promise<OpticalReply> => getFttrClient().opticalStatus();
export const setOptical = async (settings: OpticalSettings): Promise<OpticalReply> =>
	getFttrClient().opticalSet(settings);
export const getNpuStatus = async (): Promise<NpuStatus> => getFttrClient().npuStatus();
export const setNpu = async (request: NpuSetRequest): Promise<NpuReply> => getFttrClient().npuSet(request);
export const sync = async (action: SyncAction, target: string) => getFttrClient().sync({ action, target });
export const getCalibration = async (): Promise<CalibrationInfo> => getFttrClient().getCalibration();
export const selectCalibration = async (source: CalibrationMode): Promise<CalibrationInfo> =>
	getFttrClient().selectCalibration({ source });
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
