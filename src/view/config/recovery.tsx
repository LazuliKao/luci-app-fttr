// SPDX-License-Identifier: Apache-2.0
import { type ConfigKind, type ConfigRow, type ConfigSnapshot, label, list, snapshot } from "./model";
import { type ConfigIssue, validateConfig } from "./validation";

export interface RecoveryEntry {
	kind: ConfigKind;
	sectionId: string;
	row: ConfigRow;
	issues: ConfigIssue[];
}

export function recoveryEntries(data: ConfigSnapshot): RecoveryEntry[] {
	const entries = new Map<string, RecoveryEntry>();
	for (const issue of validateConfig(data)) {
		const key = `${issue.kind}/${issue.sectionId}`;
		let entry = entries.get(key);
		if (!entry) {
			const row = data[issue.kind].find((item) => item[".name"] === issue.sectionId);
			if (!row) continue;
			entry = { kind: issue.kind, sectionId: issue.sectionId, row, issues: [] };
			entries.set(key, entry);
		}
		if (!entry.issues.some((item) => item.field === issue.field && item.message === issue.message))
			entry.issues.push(issue);
	}
	return [...entries.values()];
}

export function recoveryEditor(root: any, kind: ConfigKind): any {
	return root.children.find((option: any) => option.subsection?.sectiontype === kind)?.subsection;
}

function kindTitle(kind: ConfigKind): string {
	return { device: _("Device"), group: _("Group"), template: _("Template"), wifi: _("SSID"), network: _("Network") }[
		kind
	];
}

function fieldTitle(field: string): string {
	return (
		{
			name: _("Name"),
			template: _("Template"),
			group: _("Group"),
			ssid: _("SSID"),
			radio: _("Band"),
			key: _("Password"),
			service_list: _("WAN Service List (multi-select)"),
			vlan: _("VLAN"),
			priority: _("Priority"),
		}[field] || field
	);
}

async function perform(event: Event, action: () => Promise<unknown>): Promise<void> {
	const button = event.currentTarget as HTMLButtonElement;
	button.disabled = true;
	try {
		await action();
	} catch (error) {
		L.ui.addNotification(null, <p>{String(error instanceof Error ? error.message : error)}</p>, "error");
	} finally {
		button.disabled = !L.hasViewPermission();
	}
}

function confirmRemoval(root: any, entry: RecoveryEntry, backendError?: string): void {
	L.ui.showModal(
		_("Delete this configuration?"),
		<div>
			{[
				<p>
					<strong>
						{kindTitle(entry.kind)}: {label(entry.row)}
					</strong>{" "}
					<code>{entry.sectionId}</code>
				</p>,
				<p>
					{entry.kind === "template"
						? _(
								"This also deletes the template's SSIDs and networks. Templates used by groups cannot be deleted.",
							)
						: entry.kind === "device"
							? _(
									"This removes the device's FTTR configuration and stops managing it. It does not delete the physical device.",
								)
							: _(
									"This removes the selected configuration entry. Existing reference checks and binding cleanup still apply.",
								)}
				</p>,
				<div class="right">
					<button class="cbi-button" type="button" onclick={() => openRecovery(root, backendError)}>
						{_("Cancel")}
					</button>{" "}
					<button
						class="cbi-button cbi-button-negative"
						type="button"
						disabled={!L.hasViewPermission()}
						onclick={(event: Event) =>
							perform(event, async () => {
								if (!L.hasViewPermission()) return;
								const editor = recoveryEditor(root, entry.kind);
								if (!editor) throw new Error(_("Configuration editor is unavailable."));
								await editor.handleRemove(entry.sectionId, event);
								openRecovery(root, backendError);
							})
						}
					>
						{_("Delete this configuration")}
					</button>
				</div>,
			]}
		</div>,
	);
}

export function openRecovery(root: any, backendError?: string): void {
	const entries = recoveryEntries(snapshot());
	L.ui.showModal(
		_("Review and repair configuration"),
		<div>
			{[
				<p>
					{_(
						"Each item below identifies a configuration problem. Choose Edit to keep the item and correct its fields, or delete it if it is no longer needed.",
					)}
				</p>,
				<p>
					{_(
						"A missing group means a device points to a deleted group. Edit the device and select an existing group. If no suitable group exists, close this dialog and create a group first.",
					)}
				</p>,
				<p>
					{_(
						"Repairs are staged in LuCI. Close this dialog, use Save & Apply, then run Check again to verify the applied configuration.",
					)}
				</p>,
				...(entries.length
					? entries.map((entry) => (
							<div class="cbi-section">
								<h4>
									{kindTitle(entry.kind)}: {label(entry.row)}{" "}
									<small>
										<code>{entry.sectionId}</code>
									</small>
								</h4>
								<ul>
									{entry.issues.map((issue) => (
										<li>
											<strong>{fieldTitle(issue.field)}: </strong>
											{issue.message}
											{["group", "template", "ssid"].includes(issue.field) &&
											list(entry.row[issue.field]).length ? (
												<>
													{" "}
													<code>{list(entry.row[issue.field]).join(", ")}</code>
												</>
											) : null}
										</li>
									))}
								</ul>
								<button
									class="cbi-button cbi-button-action"
									type="button"
									disabled={!L.hasViewPermission()}
									onclick={(event: Event) =>
										perform(event, async () => {
											if (!L.hasViewPermission()) return;
											const editor = recoveryEditor(root, entry.kind);
											if (!editor) throw new Error(_("Configuration editor is unavailable."));
											L.ui.hideModal();
											await editor.renderMoreOptionsModal(entry.sectionId);
										})
									}
								>
									{_("Edit to repair")}
								</button>{" "}
								<button
									class="cbi-button cbi-button-negative"
									type="button"
									disabled={!L.hasViewPermission()}
									onclick={() => confirmRemoval(root, entry, backendError)}
								>
									{_("Delete this configuration")}
								</button>
							</div>
						))
					: [
							<p>
								{_(
									"No problems were found by the local configuration checks. Use Check to see the backend result after Save & Apply.",
								)}
							</p>,
						]),
				...(backendError
					? [
							<details>
								<summary>{_("Last backend check result")}</summary>
								<pre style="white-space:pre-wrap;overflow-wrap:anywhere">{backendError}</pre>
							</details>,
						]
					: []),
				<div class="right">
					<button class="cbi-button" type="button" onclick={() => L.ui.hideModal()}>
						{_("Close")}
					</button>
				</div>,
			]}
		</div>,
	);
}
