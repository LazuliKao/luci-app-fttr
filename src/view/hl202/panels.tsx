// SPDX-License-Identifier: Apache-2.0

import { date, formatUptime, renderBadge, text, tr } from "./dom";
import { check, execute, object, readAccounts, readReport, type SourceTarget, setAccount, type Target } from "./rpc";

let busy = false;
export const isBusy = (): boolean => busy;

export interface ReportController {
	readonly element: HTMLElement;
	setTarget(target: Target | SourceTarget | null): void;
	refresh(explicitTarget?: Target | SourceTarget): Promise<void>;
}

export interface AccountsController {
	readonly element: HTMLElement;
	setTarget(target: Target | null): void;
	refresh(): Promise<void>;
}

export interface ConsoleController {
	readonly element: HTMLElement;
	setTarget(target: Target | null): void;
}

export function createReportPanel(): ReportController {
	let currentTarget: Target | SourceTarget | null = null;
	const outputSummary = <div style="margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px" />;
	const outputTable = <div style="overflow-x:auto;margin:8px 0" />;
	const outputMembers = <div style="margin-top:10px" />;
	const statusMsg = <div style="font-size:88%;color:#888;margin:6px 0" aria-live="polite" />;

	const readBtn = (
		<button type="button" class="cbi-button cbi-button-action">
			{tr("Read MQTT report")}
		</button>
	) as HTMLButtonElement;

	const doRead = async (targetToRead?: Target | SourceTarget) => {
		const target = targetToRead || currentTarget;
		if (!target) {
			statusMsg.textContent = tr(
				"This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.",
			);
			return;
		}
		if (busy) {
			statusMsg.textContent = tr("Another operation is in progress.");
			return;
		}
		busy = true;
		readBtn.disabled = true;
		statusMsg.textContent = tr("Waiting for device result…");
		try {
			const response = await readReport(target);
			if (!response.report) {
				outputSummary.replaceChildren();
				outputTable.replaceChildren();
				outputMembers.replaceChildren();
				statusMsg.textContent = tr("No MQTT report has been parsed yet.");
				return;
			}
			const state = object(response.report);
			outputSummary.replaceChildren(
				<span>
					<span style="color:#888;margin-right:4px">{tr("Revision")}:</span>
					{renderBadge("info", `#${String(state.revision)}`)}
				</span>,
				<span>
					<span style="color:#888;margin-right:4px">{tr("Last received")}:</span>
					<strong>{date(typeof state.last_received === "number" ? state.last_received : undefined)}</strong>
				</span>,
				<span>
					<span style="color:#888;margin-right:4px">{tr("Last good report")}:</span>
					<strong>{date(typeof state.last_good === "number" ? state.last_good : undefined)}</strong>
				</span>,
			);
			if (typeof state.error === "string") {
				outputSummary.append(
					<div class="alert-message warning" style="width:100%;margin-top:6px">
						{tr("Latest report error")}: {state.error}
					</div>,
				);
			}

			if (state.report) {
				const rep = object(state.report);
				const fields = object(rep.fields);
				outputTable.replaceChildren(
					<table class="table" style="font-size:90%">
						<thead>
							<tr>
								<th>{tr("Field")}</th>
								<th>{tr("Value")}</th>
								<th>{tr("Source member")}</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(fields).map(([name, val]) => {
								const field = object(val);
								const rawVal = field.value;
								let displayVal = `${String(rawVal)}${typeof field.unit === "string" ? ` ${field.unit}` : ""}`;
								if (name === "uptime_seconds" && typeof rawVal === "number") {
									displayVal = formatUptime(rawVal);
								}
								return (
									<tr>
										<td>
											<code>{name}</code>
										</td>
										<td>
											<strong>{displayVal}</strong>
										</td>
										<td>
											<span class="hl202-badge hl202-badge-neutral">{text(field.member)}</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>,
				);

				const membersList: HTMLElement[] = [];
				if (Array.isArray(rep.members)) {
					for (const val of rep.members) {
						const member = object(val);
						const copyBtn = (
							<button
								type="button"
								class="fttr-btn-subtle"
								style="margin-left:8px"
								onclick={(e: MouseEvent) => {
									e.stopPropagation();
									if (typeof member.text === "string") {
										void navigator.clipboard?.writeText(member.text);
										copyBtn.textContent = tr("Copied to clipboard");
										setTimeout(() => {
											copyBtn.textContent = tr("Copy member text");
										}, 1500);
									}
								}}
							>
								{tr("Copy member text")}
							</button>
						) as HTMLButtonElement;

						membersList.push(
							<details style="margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px">
								<summary style="cursor:pointer;user-select:none;font-weight:600;font-size:90%">
									{text(
										`${String(member.name)} (${String(member.bytes)} bytes, ${String(member.encoding)})`,
									)}
									{typeof member.text === "string" ? copyBtn : null}
								</summary>
								<div style="margin-top:6px">
									{typeof member.text === "string" ? (
										<pre class="hl202-terminal-output" style="max-height:16rem">
											{member.text}
										</pre>
									) : (
										<p style="font-size:85%;color:#888;margin:4px 0">
											{member.text_omitted
												? tr("Text omitted at the shared byte limit.")
												: tr("Binary member; text is unavailable.")}
										</p>
									)}
								</div>
							</details>,
						);
					}
				}
				outputMembers.replaceChildren(...membersList);
			}
			statusMsg.textContent = "";
		} catch (cause: unknown) {
			statusMsg.textContent = cause instanceof Error ? cause.message : tr("Request failed");
		} finally {
			busy = false;
			readBtn.disabled = !currentTarget;
		}
	};

	readBtn.addEventListener("click", () => {
		void doRead();
	});

	const element = (
		<div class="cbi-section hl202-panel-report">
			<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
				<h3 style="margin:0">{tr("MQTT report")}</h3>
				{readBtn}
			</div>
			{statusMsg}
			{outputSummary}
			{outputTable}
			{outputMembers}
		</div>
	);

	return {
		element,
		setTarget(target: Target | SourceTarget | null) {
			currentTarget = target;
			readBtn.disabled = !target;
		},
		refresh(explicitTarget?: Target | SourceTarget) {
			return doRead(explicitTarget);
		},
	};
}

export function createAccountsPanel(): AccountsController {
	let currentTarget: Target | null = null;
	const statusMsg = <div style="font-size:88%;color:#888;margin:6px 0" aria-live="polite" />;
	const usersContainer = <div style="margin-top:10px;display:flex;flex-direction:column;gap:10px" />;

	const readBtn = (
		<button type="button" class="cbi-button cbi-button-action">
			{tr("Read users")}
		</button>
	) as HTMLButtonElement;

	readBtn.disabled = !L.hasViewPermission();

	const doRead = async () => {
		if (!currentTarget) {
			statusMsg.textContent = tr(
				"This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.",
			);
			return;
		}
		if (busy) {
			statusMsg.textContent = tr("Another operation is in progress.");
			return;
		}
		busy = true;
		readBtn.disabled = true;
		statusMsg.textContent = tr("Waiting for device result…");
		try {
			const response = check(await readAccounts(currentTarget));
			const op = object(response.operation);
			const res = object(op.result);
			if (res.status === "timeout") {
				statusMsg.textContent = tr(
					"Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.",
				);
			} else {
				statusMsg.textContent = "";
			}

			if (Array.isArray(response.accounts)) {
				const userNodes: HTMLElement[] = [];
				for (const item of response.accounts) {
					const account = object(item);
					if (
						typeof account.entry !== "number" ||
						typeof account.username !== "string" ||
						typeof account.active !== "boolean"
					) {
						throw new Error(tr("Invalid account metadata"));
					}
					const entry = account.entry;
					let active = account.active;

					const activeBadge = (
						<span
							class={`hl202-badge ${active ? "hl202-badge-success" : "hl202-badge-neutral"}`}
							style="font-size:80%"
						>
							{active ? tr("Enabled") : tr("Disabled")}
						</span>
					);

					const pwdInput = (
						<input
							type="password"
							class="cbi-input-text"
							placeholder={tr("New password")}
							autocomplete="new-password"
							style="width:180px"
						/>
					) as HTMLInputElement;

					const saveBtn = (
						<button type="button" class="cbi-button cbi-button-action">
							{tr("Set password")}
						</button>
					) as HTMLButtonElement;

					const toggleBtn = (
						<button
							type="button"
							class={`cbi-button ${active ? "cbi-button-neutral" : "cbi-button-apply"}`}
						>
							{active ? tr("Disable") : tr("Enable")}
						</button>
					) as HTMLButtonElement;

					saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
					const userActionStatus = <div style="font-size:82%;margin-top:4px" aria-live="polite" />;

					saveBtn.addEventListener("click", async () => {
						if (!currentTarget || busy) return;
						const val = pwdInput.value;
						if (!val) {
							userActionStatus.textContent = tr(
								"Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.",
							);
							return;
						}
						pwdInput.value = "";
						busy = true;
						saveBtn.disabled = toggleBtn.disabled = true;
						userActionStatus.textContent = tr("Waiting for device result…");
						try {
							const result = await setAccount(currentTarget, {
								entry,
								kind: "password",
								password: val,
								active,
							});
							const setOp = object(result.operation);
							const setRes = object(setOp.result);
							if (setRes.status === "success" || result.write_status === "committed") {
								userActionStatus.innerHTML = `<span style="color:#27ae60">${tr("Password updated successfully")}</span>`;
							} else {
								userActionStatus.textContent = String(
									result.write_status || setRes.status || tr("Request failed"),
								);
							}
						} catch (e: unknown) {
							userActionStatus.textContent = e instanceof Error ? e.message : tr("Request failed");
						} finally {
							busy = false;
							saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
						}
					});

					toggleBtn.addEventListener("click", async () => {
						if (!currentTarget || busy) return;
						busy = true;
						saveBtn.disabled = toggleBtn.disabled = true;
						userActionStatus.textContent = tr("Waiting for device result…");
						try {
							const nextActive = !active;
							const result = await setAccount(currentTarget, {
								entry,
								kind: "active",
								password: "",
								active: nextActive,
							});
							active = nextActive;
							activeBadge.className = `hl202-badge ${active ? "hl202-badge-success" : "hl202-badge-neutral"}`;
							activeBadge.textContent = active ? tr("Enabled") : tr("Disabled");
							toggleBtn.className = `cbi-button ${active ? "cbi-button-neutral" : "cbi-button-apply"}`;
							toggleBtn.textContent = active ? tr("Disable") : tr("Enable");
							userActionStatus.textContent = `${String(result.write_status)}; ${tr("Refresh users to read the current state.")}`;
						} catch (e: unknown) {
							userActionStatus.textContent = e instanceof Error ? e.message : tr("Request failed");
						} finally {
							busy = false;
							saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
						}
					});

					userNodes.push(
						<div
							class="cbi-section"
							style="margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px"
						>
							<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
								<div style="display:flex;align-items:center;gap:8px">
									<strong style="font-size:105%">{account.username}</strong>
									<span style="font-size:80%;color:#888">(Entry {entry})</span>
									{activeBadge}
								</div>
								<div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px">
									{pwdInput}
									{saveBtn}
									{toggleBtn}
								</div>
							</div>
							{userActionStatus}
						</div>,
					);
				}
				usersContainer.replaceChildren(...userNodes);
			}
		} catch (cause: unknown) {
			statusMsg.textContent = cause instanceof Error ? cause.message : tr("Request failed");
		} finally {
			busy = false;
			readBtn.disabled = !currentTarget || !L.hasViewPermission();
		}
	};

	readBtn.addEventListener("click", () => {
		void doRead();
	});

	const element = (
		<div class="cbi-section hl202-panel-accounts">
			<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px">
				<h3 style="margin:0">{tr("User management")}</h3>
				{readBtn}
			</div>
			<p style="font-size:85%;color:#888;margin:4px 0">
				{tr(
					"Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.",
				)}
			</p>
			{statusMsg}
			{usersContainer}
		</div>
	);

	return {
		element,
		setTarget(target: Target | null) {
			currentTarget = target;
			readBtn.disabled = !target || !L.hasViewPermission();
		},
		refresh() {
			return doRead();
		},
	};
}

export function createConsolePanel(): ConsoleController {
	let currentTarget: Target | null = null;
	const targetLine = <div style="font-size:88%;color:#666;margin:4px 0" />;

	const script = (
		<textarea
			id="hl202-script"
			rows={8}
			class="hl202-terminal-textarea"
			spellcheck={false}
			aria-label={tr("Remote shell command")}
			placeholder="# 输入在所选子网关上执行的 Shell 命令 (支持 Ctrl + Enter 快捷执行)..."
		/>
	) as HTMLTextAreaElement;

	const timeout = (
		<input
			type="number"
			id="hl202-timeout"
			min="1"
			max="300"
			value="20"
			class="cbi-input-text"
			style="width:70px;text-align:center"
			aria-label={tr("Timeout in seconds")}
		/>
	) as HTMLInputElement;

	const execBtn = (
		<button type="button" class="cbi-button cbi-button-apply" style="font-weight:600">
			{tr("Execute on selected HL202")}
		</button>
	) as HTMLButtonElement;

	execBtn.disabled = !L.hasViewPermission();

	const outputStatus = <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px" />;
	const outputBody = (
		<pre class="hl202-terminal-output" style="min-height:4rem;display:none">
			{"# 等待执行指令..."}
		</pre>
	) as HTMLPreElement;

	const copyBtn = (
		<button
			type="button"
			class="fttr-btn-subtle"
			onclick={() => {
				if (outputBody.textContent) {
					void navigator.clipboard?.writeText(outputBody.textContent);
					copyBtn.textContent = tr("Copied to clipboard");
					setTimeout(() => {
						copyBtn.textContent = tr("Copy output");
					}, 1500);
				}
			}}
		>
			{tr("Copy output")}
		</button>
	) as HTMLButtonElement;

	const clearBtn = (
		<button
			type="button"
			class="fttr-btn-subtle"
			onclick={() => {
				outputBody.textContent = "";
				outputBody.style.display = "none";
				outputStatus.replaceChildren();
			}}
		>
			{tr("Clear output")}
		</button>
	) as HTMLButtonElement;

	const doExecute = async () => {
		if (!currentTarget) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">
					{tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")}
				</div>,
			);
			return;
		}
		if (busy) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">{tr("Another operation is in progress.")}</div>,
			);
			return;
		}
		const seconds = Number(timeout.value);
		if (!Number.isInteger(seconds) || seconds < 1 || seconds > 300) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">{tr("Timeout must be 1–300 seconds.")}</div>,
			);
			return;
		}
		const cmd = script.value.trim();
		if (!cmd || cmd.includes("\0") || new TextEncoder().encode(cmd).length > 65536) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">
					{tr("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")}
				</div>,
			);
			return;
		}

		busy = true;
		execBtn.disabled = true;
		outputBody.style.display = "block";
		outputBody.textContent = `# [${new Date().toLocaleTimeString()}] 正在下发至 ${currentTarget.optical_sn} (超时: ${seconds}s)...\n`;
		outputStatus.replaceChildren(renderBadge("info", tr("Waiting for device result…")));

		const startTime = Date.now();
		try {
			const res = await execute(currentTarget, script.value, seconds);
			const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
			const op = object(res.operation);
			const result = object(op.result);
			const status = typeof result.status === "string" ? result.status : tr("Unknown");
			const exitCode = result.exit_code;
			const isSuccess = status === "success" && exitCode === 0;

			const statusBadge = renderBadge(
				isSuccess ? "success" : status === "timeout" ? "warning" : "danger",
				isSuccess
					? tr("Success")
					: status === "timeout"
						? tr("Timeout")
						: `${tr("Exit code")} ${String(exitCode ?? status)}`,
			);

			outputStatus.replaceChildren(
				statusBadge,
				<span>
					<span style="color:#888">{tr("Exit code")}:</span> <code>{String(exitCode ?? "—")}</code>
				</span>,
				<span>
					<span style="color:#888">{tr("Duration")}:</span> <strong>{elapsed} s</strong>
				</span>,
				<span>
					<span style="color:#888">{tr("Request ID")}:</span> <code>{String(result.request_id ?? "—")}</code>
				</span>,
				<div style="margin-left:auto;display:flex;gap:6px">
					{copyBtn}
					{clearBtn}
				</div>,
			);

			const outputLines: string[] = [];
			if (typeof result.output === "string" && result.output.length) {
				outputLines.push(result.output);
			}
			if (typeof result.error === "string" && result.error.length) {
				outputLines.push(`[STDERR]\n${result.error}`);
			}
			if (result.output_truncated === true) {
				outputLines.push(`\n[!] ${tr("Output was truncated at the byte limit.")}`);
			}
			if (outputLines.length === 0) {
				outputLines.push("(命令已执行完毕，无标准输出返回)");
			}
			outputBody.textContent = outputLines.join("\n");
		} catch (cause: unknown) {
			const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
			outputStatus.replaceChildren(
				renderBadge("danger", tr("Failed")),
				<span>
					<span style="color:#888">{tr("Duration")}:</span> {elapsed} s
				</span>,
				<div style="margin-left:auto;display:flex;gap:6px">
					{copyBtn}
					{clearBtn}
				</div>,
			);
			outputBody.textContent = `[ERROR] ${cause instanceof Error ? cause.message : tr("Request failed")}`;
		} finally {
			busy = false;
			execBtn.disabled = !currentTarget || !L.hasViewPermission();
		}
	};

	execBtn.addEventListener("click", () => {
		void doExecute();
	});

	script.addEventListener("keydown", (e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
			e.preventDefault();
			void doExecute();
		}
	});

	// Quick snippets
	const snippets = [
		{ label: "uptime (负载)", cmd: "uptime" },
		{ label: "meminfo (内存)", cmd: "cat /proc/meminfo | head -n 10" },
		{ label: "cpuinfo (CPU)", cmd: "cat /proc/cpuinfo | grep 'model name\\|processor'" },
		{ label: "ifconfig (网络)", cmd: "ifconfig" },
		{ label: "ps (进程)", cmd: "ps" },
		{ label: "dmesg (内核日志)", cmd: "dmesg | tail -n 25" },
	];

	const snippetsBar = (
		<div class="hl202-snippets">
			<span style="font-size:80%;color:#888;margin-right:2px">{tr("Quick diagnostic commands")}:</span>
			{snippets.map((snip) => (
				<button
					type="button"
					class="hl202-snippet-tag"
					onclick={() => {
						script.value = snip.cmd;
						script.focus();
					}}
				>
					{snip.label}
				</button>
			))}
		</div>
	);

	const element = (
		<div class="cbi-section hl202-panel-console">
			<h3 style="margin-bottom:4px">{tr("Raw command console")}</h3>
			<p style="font-size:85%;color:#888;margin-top:0;margin-bottom:6px">
				{tr(
					"Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.",
				)}
			</p>
			{targetLine}
			{snippetsBar}
			<div class="hl202-terminal" style="margin-bottom:8px">
				{script}
			</div>
			<div style="display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px">
				<label htmlFor="hl202-timeout" style="display:flex;align-items:center;gap:6px;font-size:90%">
					<span>{tr("Timeout in seconds")}:</span>
					{timeout}
				</label>
				<span style="font-size:82%;color:#888">(快捷键: Ctrl + Enter)</span>
				<div style="margin-left:auto">{execBtn}</div>
			</div>
			<div style="margin-top:10px">
				{outputStatus}
				{outputBody}
			</div>
		</div>
	);

	return {
		element,
		setTarget(target: Target | null) {
			currentTarget = target;
			execBtn.disabled = !target || !L.hasViewPermission();
			if (target) {
				targetLine.replaceChildren(
					<span>
						<span style="color:#888">{tr("Target")}:</span> <strong>{target.optical_sn}</strong> (ONU{" "}
						{target.onu_id}) · <code>gen: {target.binding_generation}</code>
					</span>,
				);
			} else {
				targetLine.replaceChildren(
					<span style="color:#e74c3c">
						{tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")}
					</span>,
				);
			}
		},
	};
}

// Keep legacy wrappers for compatibility
export function reportPanel(target: Target | SourceTarget): HTMLElement {
	const ctrl = createReportPanel();
	ctrl.setTarget(target);
	return ctrl.element;
}

export function accountsPanel(target: Target): HTMLElement {
	const ctrl = createAccountsPanel();
	ctrl.setTarget(target);
	return ctrl.element;
}

export function consolePanel(target: Target): HTMLElement {
	const ctrl = createConsolePanel();
	ctrl.setTarget(target);
	return ctrl.element;
}
