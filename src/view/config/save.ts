// SPDX-License-Identifier: Apache-2.0
import { snapshot } from "./model";
import { formatIssues, validateConfig } from "./validation";

export function saveConfiguration(map: InstanceType<typeof L.form.Map>): Promise<void> {
	// Map.save invokes this callback after parsing and before UCI transport.
	// Internal GridSection saves remain native and never run whole-page checks.
	return map.save(() => {
		const data = snapshot();
		const issues = validateConfig(data);
		if (issues.length) throw new Error(formatIssues(data, issues));
		L.uci.unset("fttr", "acs", "listen");
		L.uci.unset("fttr", "management", "acs_url");
	});
}
