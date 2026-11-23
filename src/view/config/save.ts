// SPDX-License-Identifier: Apache-2.0

import type { PlatformInfoReply } from "../contracts/api";
import { snapshot } from "./model";
import { formatIssues, validateConfig } from "./validation";

export function saveConfiguration(map: InstanceType<typeof L.form.Map>, platform: PlatformInfoReply): Promise<void> {
	// Map.save invokes this callback after parsing and before UCI transport.
	// Internal GridSection saves remain native and never run whole-page checks.
	return map.save(() => {
		const data = snapshot();
		const issues = validateConfig(data);
		if (issues.length) throw new Error(formatIssues(data, issues));
		if (platform.platform_id === "fiberhome-an4475-g2") {
			const count = Number(L.uci.get("fttr", "fiberhome", "onu_count") || 128);
			if (
				data.device.some(
					(device) => device.onu_id != null && device.onu_id !== "" && Number(device.onu_id) >= count,
				)
			)
				throw new Error(_("A fixed ONU interface is outside the configured count."));
		}
		L.uci.unset("fttr", "acs", "listen");
		L.uci.unset("fttr", "management", "acs_url");
	});
}
