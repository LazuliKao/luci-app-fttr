// SPDX-License-Identifier: Apache-2.0

import { addBasic } from "./config/basic";
import { addDevices } from "./config/devices";
import { addServices } from "./config/services";
import { checkConfig, getStatus, reloadConfig, restartService } from "./contracts/api";
import { requirePage } from "./contracts/capabilities";
import type { SubGateway } from "./contracts/status";

const view = L.view;
const uci = L.uci;
const form = L.form;

async function command<T>(
	fn: () => Promise<T>,
	output: HTMLElement,
	onResult?: (result: T | { error: string }) => void,
): Promise<void> {
	try {
		const result = await fn();
		output.textContent = JSON.stringify(result, null, 2);
		onResult?.(result);
	} catch (error) {
		output.textContent = String(error);
		onResult?.({ error: String(error) });
	}
}

type InitialCheck = { error?: string; connectedDevices: SubGateway[] };
const main = view.extend({
	async load(): Promise<InitialCheck> {
		await requirePage("config");
		await uci.load("fttr");
		if (!uci.sections("fttr", "provisioning").length) uci.add("fttr", "provisioning", "provisioning");
		if (!uci.sections("fttr", "management").length) uci.add("fttr", "management", "management");
		const [check, status] = await Promise.all([
			checkConfig().catch((error: unknown) => ({ error: String(error) })),
			getStatus().catch((error: unknown) => ({ error: String(error), sub_gateways: [] })),
		]);
		return {
			error: check.error || ("error" in status ? status.error : undefined),
			connectedDevices: status.sub_gateways,
		};
	},
	render(initialCheck: InitialCheck): Promise<Node> {
		const map = new form.Map("fttr", _("FTTR configuration"));
		const section = map.section(form.NamedSection, "acs", "acs");
		section.addremove = false;
		section.anonymous = false;

		const globalId = uci.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
		addBasic(section, _("Basic"), globalId);
		addDevices(section, initialCheck.connectedDevices ?? []);
		addServices(section);
		const save = map.save;
		map.save = function (cb?: () => void, silent?: boolean) {
			uci.unset("fttr", "acs", "listen");
			uci.unset("fttr", "management", "acs_url");
			return save.call(this, cb, silent);
		};

		const output = <pre style="white-space:pre-wrap;overflow-wrap:anywhere" aria-live="polite" />;
		let checkNotification: Node | null = null;
		const showCheck = (result: { error?: string }): void => {
			checkNotification?.parentNode?.removeChild(checkNotification);
			checkNotification = null;
			if (result?.error) {
				checkNotification = L.ui.addNotification(
					_("FTTR configuration check failed"),
					<p>{String(result.error)}</p>,
					"error",
				);
			}
		};
		showCheck(initialCheck);
		const actions = (
			<div class="cbi-section">
				<p>
					{_(
						"Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only.",
					)}{" "}
					<a href={L.url("admin", "network", "fttr", "sync")}>{_("Open Synchronization")}</a>
				</p>
				<h3>{_("Configuration diagnostics")}</h3>
				<button
					class="cbi-button cbi-button-action"
					type="button"
					onclick={() => command(checkConfig, output, showCheck)}
				>
					{_("Check")}
				</button>{" "}
				<button
					class="cbi-button cbi-button-action"
					type="button"
					disabled={!L.hasViewPermission()}
					onclick={() =>
						command(
							async () => {
								await reloadConfig();
								return await checkConfig();
							},
							output,
							showCheck,
						)
					}
				>
					{_("Reload")}
				</button>{" "}
				<button
					class="cbi-button cbi-button-negative"
					type="button"
					disabled={!L.hasViewPermission()}
					onclick={() => command(restartService, output)}
				>
					{_("Restart")}
				</button>
				{output}
			</div>
		);
		return map.render().then((node: Node) => (
			<div>
				{node}
				{actions}
			</div>
		));
	},
});

export { main };
