import { getFttrClient } from "../../api/client";

export { MibSnapshotSchema as mibSnapshot } from "../../api/generated/schemas";
export type { MibDefinition as Definition, MibReport, MibValue as Value } from "../../api/generated/types";

export const startMib = async (onu: number, serial: string, tables: boolean) =>
	getFttrClient().mibStart({ onu_id: onu, optical_sn: serial, tables });
export const getMib = async (job: string, chunk: number) => getFttrClient().mibResult({ job, chunk });
export const releaseMib = async (job: string) => getFttrClient().jobRelease({ job });
