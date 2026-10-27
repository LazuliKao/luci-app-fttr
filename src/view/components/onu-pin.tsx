// SPDX-License-Identifier: Apache-2.0

import { getStatus, reloadConfig } from "../contracts/api";
import type { FttrStatus, SubGateway } from "../contracts/status";

type DeviceSection = { ".type": string; optical_sn?: string; onu_id?: string };
const readConfig = L.rpc.declare<{ values: Record<string, DeviceSection> }, [string, string]>({
	object: "uci",
	method: "get",
	params: ["config", "type"],
	reject: true,
});
const readChanges = L.rpc.declare<{ changes: unknown[] }, [string]>({
	object: "uci",
	method: "changes",
	params: ["config"],
	reject: true,
});
const setOption = L.rpc.declare<unknown, [string, string, Record<string, string>]>({
	object: "uci",
	method: "set",
	params: ["config", "section", "values"],
	reject: true,
});
const deleteOption = L.rpc.declare<unknown, [string, string, string]>({
	object: "uci",
	method: "delete",
	params: ["config", "section", "option"],
	reject: true,
});
const commitConfig = L.rpc.declare<unknown, [string]>({
	object: "uci",
	method: "commit",
	params: ["config"],
	reject: true,
});
let saving = false;

export async function confirmOnuPin(
	onu: SubGateway,
	pinning: FttrStatus["onu_pinning"],
	onSaved: (status: FttrStatus) => void,
): Promise<void> {
	if (!L.hasViewPermission() || !pinning || saving) return;
	const serial = onu.serial_number.toUpperCase();
	const desired = pinning.desired[serial];
	const unpin = desired !== undefined;
	const slot = unpin ? desired : onu.onu_id;
	const title = unpin ? _("Unpin interface") : _("Pin interface");
	try {
		const { values } = await readConfig("fttr", "device");
		const findDevice = (sections: Record<string, DeviceSection>) =>
			Object.entries(sections).find(
				([, section]) => section[".type"] === "device" && section.optical_sn?.toUpperCase() === serial,
			);
		const device = findDevice(values);
		if (!device) {
			L.ui.showModal(
				title,
				<div>
					{[
						<p>{_("Add this device on the configuration page before fixing its interface.")}</p>,
						<p>
							<code>{serial}</code>
						</p>,
						<div class="right">
							<button type="button" class="cbi-button" onclick={() => L.ui.hideModal()}>
								{_("Cancel")}
							</button>{" "}
							<a class="cbi-button cbi-button-action" href={L.url("admin", "network", "fttr", "config")}>
								{_("Configuration")}
							</a>
						</div>,
					]}
				</div>,
			);
			return;
		}
		const errorNode = <p class="error" role="alert" />;
		const cancel = (
			<button type="button" class="cbi-button" onclick={() => L.ui.hideModal()}>
				{_("Cancel")}
			</button>
		) as HTMLButtonElement;
		const confirm = (
			<button
				type="button"
				class="cbi-button cbi-button-action"
				onclick={async () => {
					if (saving) return;
					saving = true;
					confirm.disabled = cancel.disabled = true;
					errorNode.textContent = "";
					let committed = false;
					try {
						const changes = await readChanges("fttr");
						if (changes.changes.length)
							throw new Error(_("Apply or discard pending FTTR configuration changes first."));
						const fresh = (await readConfig("fttr", "device")).values;
						const latest = findDevice(fresh);
						if (
							!latest ||
							latest[0] !== device[0] ||
							latest[1].onu_id !== device[1].onu_id ||
							(latest[1].onu_id == null ? undefined : Number(latest[1].onu_id)) !== desired
						) {
							throw new Error(_("Interface configuration changed. Refresh the page and try again."));
						}
						if (
							!unpin &&
							Object.entries(fresh).some(
								([id, section]) =>
									id !== latest[0] &&
									section[".type"] === "device" &&
									section.onu_id != null &&
									Number(section.onu_id) === slot,
							)
						) {
							throw new Error(_("Interface already reserved by another device."));
						}
						if (unpin) await deleteOption("fttr", latest[0], "onu_id");
						else await setOption("fttr", latest[0], { onu_id: String(slot) });
						await commitConfig("fttr");
						committed = true;
						await reloadConfig();
						onSaved(await getStatus());
						L.ui.hideModal();
						L.ui.addNotification(
							null,
							<p>{_("Interface setting saved. Restart FTTR for it to take effect.")}</p>,
							"info",
						);
					} catch (error) {
						errorNode.textContent = `${committed ? _("Saved, but configuration reload or status refresh failed:") : _("Failed to save interface setting:")} ${String(error)}`;
					} finally {
						saving = false;
						confirm.disabled = committed;
						cancel.disabled = false;
					}
				}}
			>
				{_("Confirm")}
			</button>
		) as HTMLButtonElement;
		L.ui.showModal(
			title,
			<div>
				{[
					<p>
						{unpin
							? _("Cancel the fixed interface for this device?")
							: _("Fix this device to its current interface?")}
					</p>,
					<p>
						<code>{serial}</code>
						{` · fttr${slot + 1} · ONU-ID ${slot}`}
					</p>,
					<p>
						{_(
							"This saves the configuration only. The current allocation stays unchanged until FTTR is restarted.",
						)}
					</p>,
					errorNode,
					<div class="right">
						{cancel} {confirm}
					</div>,
				]}
			</div>,
		);
	} catch (error) {
		L.ui.addNotification(null, <p>{String(error)}</p>, "error");
	}
}
