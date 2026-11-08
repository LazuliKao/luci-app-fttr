'use strict';
var main,t={};t.d=(r,e,o)=>{var a=(e,o)=>{for(var a in e)t.o(e,a)&&!t.o(r,a)&&Object.defineProperty(r,a,{enumerable:!0,[o]:e[a]})};a(e,"get"),a(o,"value")},t.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r);var r={};(()=>{t.d(r,{main:()=>main});let e=Symbol.for("jsx.fragment");function o(t,r){let{children:o,...a}=null===r||"object"!=typeof r||Array.isArray(r)?{}:r,n=function t(r){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let o of r)null!=o&&"boolean"!=typeof o&&(Array.isArray(o)?t(o,e):e.push(o instanceof Node?o:String(o)));return e}(null==o?[]:Array.isArray(o)?o:[o]);if(t===e){let t=document.createDocumentFragment();return t.append(...n),t}if("function"==typeof t){let r=Reflect.apply(t,void 0,[{...a,children:n}]);if(!(r instanceof Node))throw TypeError("JSX components must return a DOM Node");return r}if("string"!=typeof t)throw TypeError("JSX element types must be tag names or component functions");let i={},c={...a};for(let[t,r]of Object.entries(c))t.startsWith("on")&&"function"==typeof r?(i[t]=r,delete c[t]):"boolean"==typeof r&&(r?c[t]=t:delete c[t]);let l=Object.keys(c).length>0?n.length>1?E(t,c,n):E(t,c,n[0]):n.length>1?E(t,{},n):E(t,{},n[0]);for(let[t,r]of Object.entries(i)){let e=t.slice(2).toLowerCase();l.addEventListener(e,r)}return l}let a=L.view,n=[{category:_("Firmware"),title:_("PONWrt Firmware"),repo:"pbs05/ponwrt",url:"https://github.com/pbs05/ponwrt",description:_("OpenWrt firmware distribution tailored for PON / FTTR gateway devices."),badgeType:"warning"},{category:_("Backend"),title:_("OpenWrt FTTR Daemon"),repo:"LazuliKao/openwrt-fttr",url:"https://github.com/LazuliKao/openwrt-fttr",description:_("FTTR controller daemon, OMCI & CWMP TR-069 provisioning backend service, and fttrctl CLI utility."),badgeType:"info"},{category:_("Frontend"),title:_("LuCI FTTR App"),repo:"LazuliKao/luci-app-fttr",url:"https://github.com/LazuliKao/luci-app-fttr",description:_("LuCI modern web management application for FTTR network monitoring, device configuration, and optical calibration."),badgeType:"success"},{category:_("Factory Tool"),title:_("HM2004-DU Factory Tool"),repo:"qwe-qaq/h3c-hm2004du-factory",url:"https://github.com/qwe-qaq/h3c-hm2004du-factory",description:_("Factory partition extraction and calibration data generation tool for H3C HM2004-DU."),badgeType:"neutral"}],main=a.extend({render:()=>{var t,r,e,a,i;return i={class:"cbi-map fttr-about",children:[o("style",{children:`
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
				`}),o("h2",{children:_("About FTTR")}),o("div",{class:"cbi-map-descr",children:_("Open-source Fiber-To-The-Room (FTTR) solution for OpenWrt, providing unified management, OMCI provisioning, CWMP synchronization, and optical diagnostics for primary gateways and downstream optical sub-gateways.")}),(r={class:"cbi-section",children:[o("h3",{children:_("GitHub Repositories")}),o("div",{class:"cbi-section-descr",children:_("Core components and open-source repositories powering the FTTR system.")}),(t={class:"fttr-repo-grid",children:n.map(t=>{var r,e,a,n;return n={class:"fttr-repo-card",children:[(e={children:[(r={class:"fttr-repo-header",children:[o("h4",{class:"fttr-repo-title",children:t.title}),o("span",{class:`fttr-badge fttr-badge-${t.badgeType}`,children:t.category})]},o("div",r)),o("p",{class:"fttr-repo-desc",children:t.description})]},o("div",e)),(a={class:"fttr-repo-footer",children:[o("span",{class:"fttr-repo-link",children:t.repo}),o("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",class:"cbi-button cbi-button-action",children:[_("GitHub")," ↗"]})]},o("div",a))]},o("div",n)})},o("div",t))]},o("div",r)),(a={class:"cbi-section",children:[o("h3",{children:_("How to Add Sub-Gateways")}),o("div",{class:"cbi-section-descr",children:_("Tutorial and instructions for pairing and configuring downstream FTTR sub-gateways.")}),(e={class:"fttr-tutorial-box",children:[o("div",{class:"fttr-placeholder-title",children:_("Tutorial Coming Soon")}),o("div",{class:"fttr-placeholder-desc",children:_("The tutorial for adding and configuring sub-gateways will be provided here.")})]},o("div",e))]},o("div",a))]},o("div",i)},handleSaveApply:null,handleSave:null,handleReset:null})})(),main=r.main;
return main;