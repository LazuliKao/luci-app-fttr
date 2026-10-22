// SPDX-License-Identifier: Apache-2.0

import * as z from "zod/mini";
import { checked } from "./common";

const capabilities = z.object({
	schema_version: z.literal(1),
	version: z.string(),
	features: z.object({
		acs: z.boolean(),
		mqtt: z.boolean(),
		"device-hl202": z.boolean(),
		"device-hwtc": z.boolean(),
	}),
	functions: z.object({
		optical: z.boolean(),
		omci_mib: z.boolean(),
		mqtt_telemetry: z.boolean(),
		hl202_management: z.boolean(),
		cwmp: z.boolean(),
	}),
	pages: z.object({
		status: z.boolean(),
		config: z.boolean(),
		sync: z.boolean(),
		hl202: z.boolean(),
		hardware: z.boolean(),
		calibration: z.boolean(),
		about: z.boolean(),
	}),
});

export type Capabilities = z.infer<typeof capabilities>;

const rawCapabilities = L.rpc.declare<unknown>({
	object: "luci.fttr",
	method: "get_capabilities",
	reject: true,
});

export const getCapabilities = async (): Promise<Capabilities> => capabilities.parse(checked(await rawCapabilities()));

// Check before loading UCI, issuing feature RPCs or starting page polling.
// Missing/old capability endpoints remain an error, never inferred as full support.
export async function requirePage(page: keyof Capabilities["pages"]): Promise<void> {
	const support = await getCapabilities();
	if (!support.pages[page]) throw new Error(_("This page is not supported by the installed FTTR build."));
}
