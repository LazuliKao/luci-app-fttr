// SPDX-License-Identifier: Apache-2.0

const view = L.view;

interface RepoInfo {
	category: string;
	title: string;
	repo: string;
	url: string;
	description: string;
	badgeType: "warning" | "info" | "success" | "neutral";
}

const REPOSITORIES: RepoInfo[] = [
	{
		category: _("Firmware"),
		title: _("PONWrt Firmware"),
		repo: "pbs05/ponwrt",
		url: "https://github.com/pbs05/ponwrt",
		description: _("OpenWrt firmware distribution tailored for PON / FTTR gateway devices."),
		badgeType: "warning",
	},
	{
		category: _("Backend"),
		title: _("OpenWrt FTTR Daemon"),
		repo: "LazuliKao/openwrt-fttr",
		url: "https://github.com/LazuliKao/openwrt-fttr",
		description: _(
			"FTTR controller daemon, OMCI & CWMP TR-069 provisioning backend service, and fttrctl CLI utility.",
		),
		badgeType: "info",
	},
	{
		category: _("Frontend"),
		title: _("LuCI FTTR App"),
		repo: "LazuliKao/luci-app-fttr",
		url: "https://github.com/LazuliKao/luci-app-fttr",
		description: _(
			"LuCI modern web management application for FTTR network monitoring, device configuration, and optical calibration.",
		),
		badgeType: "success",
	},
	{
		category: _("Factory Tool"),
		title: _("HM2004-DU Factory Tool"),
		repo: "qwe-qaq/h3c-hm2004du-factory",
		url: "https://github.com/qwe-qaq/h3c-hm2004du-factory",
		description: _("Factory partition extraction and calibration data generation tool for H3C HM2004-DU."),
		badgeType: "neutral",
	},
];

function renderAboutPage(): HTMLElement {
	return (
		<div class="cbi-map fttr-about">
			<style>
				{`
				.fttr-about {
					--fttr-success-bg: rgba(46, 204, 113, 0.15);
					--fttr-success-color: #27ae60;
					--fttr-success-border: rgba(46, 204, 113, 0.35);

					--fttr-warning-bg: rgba(243, 156, 18, 0.15);
					--fttr-warning-color: #d35400;
					--fttr-warning-border: rgba(243, 156, 18, 0.35);

					--fttr-info-bg: rgba(52, 152, 219, 0.15);
					--fttr-info-color: #2980b9;
					--fttr-info-border: rgba(52, 152, 219, 0.35);

					--fttr-neutral-bg: rgba(127, 140, 141, 0.12);
					--fttr-neutral-color: #7f8c8d;
					--fttr-neutral-border: rgba(127, 140, 141, 0.25);
				}

				@media (prefers-color-scheme: dark) {
					.fttr-about {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-about,
				[data-theme="dark"] .fttr-about {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-about .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-about .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-about .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-about .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-about .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-about .fttr-repo-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
					gap: 16px;
					margin: 12px 0 20px 0;
				}

				.fttr-about .fttr-repo-card {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 16px;
					border: 1px solid rgba(127, 140, 141, 0.25);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-about .fttr-repo-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 8px;
				}

				.fttr-about .fttr-repo-title {
					font-size: 1.1em;
					font-weight: 600;
					margin: 0;
				}

				.fttr-about .fttr-repo-desc {
					font-size: 90%;
					color: #666;
					margin: 8px 0 14px 0;
					flex-grow: 1;
					line-height: 1.5;
				}

				[data-darkmode="true"] .fttr-about .fttr-repo-desc,
				[data-theme="dark"] .fttr-about .fttr-repo-desc {
					color: #aaa;
				}

				.fttr-about .fttr-repo-footer {
					margin-top: auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 8px;
					flex-wrap: wrap;
				}

				.fttr-about .fttr-repo-link {
					font-family: monospace;
					font-size: 90%;
					word-break: break-all;
				}

				.fttr-about .fttr-tutorial-box {
					padding: 24px 20px;
					border: 1px dashed rgba(127, 140, 141, 0.35);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.03);
					text-align: center;
					margin: 12px 0;
				}

				.fttr-about .fttr-placeholder-title {
					font-size: 1.05em;
					font-weight: 600;
					margin: 0 0 6px 0;
				}

				.fttr-about .fttr-placeholder-desc {
					font-size: 90%;
					color: #777;
					margin: 0;
				}

				[data-darkmode="true"] .fttr-about .fttr-placeholder-desc,
				[data-theme="dark"] .fttr-about .fttr-placeholder-desc {
					color: #aaa;
				}
				`}
			</style>

			<h2>{_("About FTTR")}</h2>
			<div class="cbi-map-descr">
				{_(
					"Open-source Fiber-To-The-Room (FTTR) solution for OpenWrt, providing unified management, OMCI provisioning, CWMP synchronization, and optical diagnostics for primary gateways and downstream optical sub-gateways.",
				)}
			</div>

			<div class="cbi-section">
				<h3>{_("GitHub Repositories")}</h3>
				<div class="cbi-section-descr">
					{_("Core components and open-source repositories powering the FTTR system.")}
				</div>
				<div class="fttr-repo-grid">
					{REPOSITORIES.map((repo) => (
						<div class="fttr-repo-card">
							<div>
								<div class="fttr-repo-header">
									<h4 class="fttr-repo-title">{repo.title}</h4>
									<span class={`fttr-badge fttr-badge-${repo.badgeType}`}>{repo.category}</span>
								</div>
								<p class="fttr-repo-desc">{repo.description}</p>
							</div>
							<div class="fttr-repo-footer">
								<span class="fttr-repo-link">{repo.repo}</span>
								<a
									href={repo.url}
									target="_blank"
									rel="noopener noreferrer"
									class="cbi-button cbi-button-action"
								>
									{_("GitHub")} ↗
								</a>
							</div>
						</div>
					))}
				</div>
			</div>

			<div class="cbi-section">
				<h3>{_("How to Add Sub-Gateways")}</h3>
				<div class="cbi-section-descr">
					{_("Tutorial and instructions for pairing and configuring downstream FTTR sub-gateways.")}
				</div>
				<div class="fttr-tutorial-box">
					<div class="fttr-placeholder-title">{_("Tutorial Coming Soon")}</div>
					<div class="fttr-placeholder-desc">
						{_("The tutorial for adding and configuring sub-gateways will be provided here.")}
					</div>
				</div>
			</div>
		</div>
	);
}

const main = view.extend({
	render(): HTMLElement {
		return renderAboutPage();
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});

export { main };
