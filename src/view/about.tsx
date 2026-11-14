// SPDX-License-Identifier: Apache-2.0

import aboutCss from "./about.css?inline";
import badgeCss from "./components/badge.css?inline";
import { ViewStyle } from "./components/view-style";
import tokensCss from "./styles/tokens.css?inline";

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
			<ViewStyle styles={[tokensCss, badgeCss, aboutCss]} />

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
