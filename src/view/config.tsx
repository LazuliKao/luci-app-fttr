// SPDX-License-Identifier: Apache-2.0

import { addBasic } from "./config/basic";
import { addDevices } from "./config/devices";
import { openRecovery } from "./config/recovery";
import { saveConfiguration } from "./config/save";
import { addServices } from "./config/services";
import { checkConfig, getStatus, reloadConfig, restartService } from "./contracts/api";
import { type Capabilities, getCapabilities } from "./contracts/capabilities";
import type { FttrStatus, SubGateway } from "./contracts/status";

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

type InitialCheck = {
	error?: string;
	connectedDevices: SubGateway[];
	pinning?: FttrStatus["onu_pinning"];
	capabilities?: Capabilities;
};
const main = view.extend({
	async load(): Promise<InitialCheck> {
		const capabilities = await getCapabilities().catch(() => undefined);
		if (capabilities && !capabilities.pages.config) {
			throw new Error(_("This page is not supported by the installed FTTR build."));
		}
		await uci.load("fttr");
		if (!uci.sections("fttr", "provisioning").length) uci.add("fttr", "provisioning", "provisioning");
		if (!uci.sections("fttr", "management").length) uci.add("fttr", "management", "management");
		if (!uci.sections("fttr", "offload").length) uci.add("fttr", "offload", "offload");
		const [check, status] = await Promise.all([
			checkConfig().catch((error: unknown) => ({ error: String(error) })),
			getStatus().catch((error: unknown) => ({ error: String(error), sub_gateways: [] })),
		]);
		return {
			error: check.error || ("error" in status ? status.error : undefined),
			connectedDevices: status.sub_gateways,
			pinning: "onu_pinning" in status ? status.onu_pinning : undefined,
			capabilities,
		};
	},
	render(initialCheck: InitialCheck): Promise<Node> {
		const map = new form.Map("fttr", _("FTTR configuration"));
		const section = map.section(form.NamedSection, "acs", "acs");
		section.addremove = false;
		section.anonymous = false;

		const globalId = uci.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
		addBasic(section, _("Basic"), globalId);
		addDevices(section, initialCheck.connectedDevices ?? [], initialCheck.pinning, initialCheck.capabilities);
		addServices(section);
		// The inherited Save & Apply handler calls this explicit page-save entry.
		this.handleSave = () => saveConfiguration(map);

		const output = <pre style="white-space:pre-wrap;overflow-wrap:anywhere" aria-live="polite" />;
		let checkNotification: Node | null = null;
		let backendError: string | undefined;
		const showCheck = (result: { error?: string }): void => {
			backendError = result?.error;
			checkNotification?.parentNode?.removeChild(checkNotification);
			checkNotification = null;
			if (result?.error) {
				checkNotification = L.ui.addNotification(
					_("FTTR configuration check failed"),
					<div>
						<p>{String(result.error)}</p>
						<button
							class="cbi-button cbi-button-action"
							type="button"
							onclick={() => openRecovery(section, backendError)}
						>
							{_("Review and repair configuration")}
						</button>
					</div>,
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
					onclick={() => openRecovery(section, backendError)}
				>
					{_("Review and repair configuration")}
				</button>{" "}
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
		section.tab("diagnostics", _("Configuration diagnostics"));
		const diagnostics = section.taboption("diagnostics", form.DummyValue, "_diagnostics", "");
		diagnostics.render = () => Promise.resolve(actions);
		return map.render();
	},
});

export { main };
