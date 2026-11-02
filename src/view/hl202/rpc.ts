import { getFttrClient } from "../../api/client";
import { waitForJob } from "../../api/jobs";
import { accountReply, execReply, reportReply, type SourceTarget, type Target } from "../contracts/hl202";

export type { SourceTarget, Target } from "../contracts/hl202";

export const list = async () => getFttrClient().hl202List();
export const readReport = async (target: Target | SourceTarget) =>
	reportReply.parse(await waitForJob(await getFttrClient().hl202Report({ target })));
export const readAccounts = async (target: Target) =>
	accountReply.parse(await waitForJob(await getFttrClient().hl202AccountsStart({ target })));
export const setAccount = async (
	target: Target,
	change: {
		readonly entry: number;
		readonly kind: "password" | "active";
		readonly password: string;
		readonly active: boolean;
	},
) =>
	accountReply.parse(
		await waitForJob(
			await getFttrClient().hl202AccountUpdate({
				target,
				kind: change.kind === "password" ? "account_set_password" : "account_set_active",
				entry: change.entry,
				password: change.password,
				active: change.active,
			}),
		),
	);
export const execute = async (target: Target, script: string, timeout: number) =>
	execReply.parse(
		await waitForJob(await getFttrClient().hl202ExecStart({ target, script, timeout_seconds: timeout })),
	);
