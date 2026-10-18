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

export type SyncAction = "plan" | "apply" | "management_plan" | "management_apply" | "reset_state";
const actionResult = z.union([
	z.object({ operation_ids: z.array(z.number()), revision: z.string() }),
	z.object({ started: z.literal(true), mode: z.enum(["apply", "plan"]) }),
	z.object({ reset: z.literal(true), device: z.string() }),
]);
export const sync = async (action: SyncAction, target: string) =>
	actionResult.parse(checked(await rawSyncAction(action, target)));
