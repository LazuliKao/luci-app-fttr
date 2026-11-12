// SPDX-License-Identifier: Apache-2.0

import type { HlTarget } from "../../api/generated/types";

export { HlCommandResultSchema as commandResult } from "../../api/generated/schemas";
export { accountReply, deviceList, execReply, reportReply } from "../../api/validators";
export type Target = Extract<HlTarget, { optical_sn: string }>;
export type SourceTarget = Extract<HlTarget, { mqtt_mac: string }>;
export type { HlDevice as DeviceMeta } from "../../api/generated/types";
