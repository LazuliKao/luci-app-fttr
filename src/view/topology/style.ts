// SPDX-License-Identifier: Apache-2.0
export const TOPOLOGY_CSS = `
.fttr-topology { --topo-bg: Canvas; --topo-text: CanvasText; --topo-border: color-mix(in srgb, var(--topo-text) 18%, transparent); --topo-muted: color-mix(in srgb, var(--topo-text) 65%, var(--topo-bg)); --topo-card: color-mix(in srgb, var(--topo-bg) 97%, var(--topo-text)); --topo-blue: #2876df; --topo-green: #158353; --topo-amber: #a96908; --topo-red: #b42318; color: var(--topo-text); }
.fttr-topology[data-dark="true"] { --topo-blue: #75adff; --topo-green: #51d9a2; --topo-amber: #eab969; --topo-red: #ff8078; }
.fttr-topology *, .fttr-topology *::before, .fttr-topology *::after { box-sizing: border-box; }
.fttr-topology [hidden] { display: none !important; }
.fttr-topology button { font: inherit; }
.fttr-topology button:focus-visible, .fttr-topology summary:focus-visible, .fttr-topology .topo-viewport:focus-visible { outline: 3px solid var(--topo-blue); outline-offset: 3px; }
.fttr-topology .topo-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 18px; }
.fttr-topology .topo-header h2 { margin: 0 0 6px; }
.fttr-topology .topo-subtitle { margin: 0; font-size: 12px; color: var(--topo-muted); }
.fttr-topology .topo-counts, .fttr-topology .topo-toolbar, .fttr-topology .topo-client-counts { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.fttr-topology .topo-count { border: 1px solid var(--topo-border); border-radius: 8px; padding: 8px 14px; background: var(--topo-card); font-size: 12px; color: var(--topo-muted); }
.fttr-topology .topo-count strong { color: var(--topo-text); font-size: 20px; margin-right: 8px; }
.fttr-topology .topo-notices:empty { display: none; }
.fttr-topology .topo-notices { border-left: 3px solid var(--topo-amber); padding: 8px 12px; margin-bottom: 12px; background: color-mix(in srgb, var(--topo-amber) 7%, var(--topo-bg)); }
.fttr-topology .topo-notices p { margin: 4px 0; }
.fttr-topology .topo-workspace { --topo-stage-h: clamp(420px, calc(100vh - 300px), 920px); display: grid; grid-template-columns: minmax(0, 1fr) 350px; height: var(--topo-stage-h); border: 1px solid var(--topo-border); border-radius: 12px; overflow: hidden; background: var(--topo-bg); }
.fttr-topology .topo-stage { min-width: 0; display: flex; flex-direction: column; }
.fttr-topology .topo-stage-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; border-bottom: 1px solid var(--topo-border); flex-wrap: wrap; }
.fttr-topology .topo-stage-heading { font-size: 13px; font-weight: 600; }
.fttr-topology .topo-sampled { margin-left: 10px; font-size: 11px; font-weight: normal; color: var(--topo-muted); }
.fttr-topology .topo-sampled[data-stale="true"] { color: var(--topo-amber); }
.fttr-topology .topo-zoom { min-width: 38px; text-align: right; font: 11px ui-monospace, monospace; color: var(--topo-muted); }
.fttr-topology .topo-toolbar .cbi-button { min-width: 32px; margin: 0; }
.fttr-topology .topo-viewport-wrap { position: relative; flex: 1; min-height: 0; }
.fttr-topology .topo-viewport { position: absolute; inset: 0; overflow: hidden; cursor: grab; touch-action: none; background-color: color-mix(in srgb, var(--topo-bg) 96%, var(--topo-text)); background-image: radial-gradient(var(--topo-border) 1px, transparent 1px); background-size: 24px 24px; }
.fttr-topology .topo-viewport.is-panning { cursor: grabbing; user-select: none; }
.fttr-topology .topo-world { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
.fttr-topology .topo-wire { --wire-color: color-mix(in srgb, var(--topo-blue) 65%, var(--topo-border)); pointer-events: none; }
.fttr-topology .topo-wire.is-learned { --wire-color: var(--topo-muted); }
.fttr-topology .topo-wire.is-associated { --wire-color: var(--topo-green); }
.fttr-topology .topo-wire.is-selected { --wire-color: var(--topo-blue); }
.fttr-topology .topo-wire-hit { position: absolute; display: block; padding: 0; margin: 0; border: 0; background: transparent; color: var(--wire-color); pointer-events: none; border-radius: 6px; }
.fttr-topology .topo-wire-hit.is-hit { pointer-events: auto; cursor: pointer; }
.fttr-topology .topo-wire-hit.is-horizontal { height: 16px; transform: translateY(-8px); }
.fttr-topology .topo-wire-hit.is-vertical { width: 16px; transform: translateX(-8px); }
.fttr-topology .topo-wire-hit::after { content: ''; position: absolute; border-color: currentColor; border-style: solid; border-width: 0; opacity: .7; transition: opacity .15s, filter .15s; }
.fttr-topology .topo-wire-hit.is-horizontal::after { left: 0; right: 0; top: 7px; border-top-width: 2px; }
.fttr-topology .topo-wire-hit.is-vertical::after { top: 0; bottom: 0; left: 7px; border-left-width: 2px; }
.fttr-topology .is-learned .topo-wire-hit::after { border-style: dashed; }
.fttr-topology .is-associated .topo-wire-hit::after { border-style: dotted; }
.fttr-topology .topo-wire:has(.topo-wire-hit:hover), .fttr-topology .topo-wire:focus-within, .fttr-topology .topo-wire.is-hovered { --wire-color: var(--topo-blue); }
.fttr-topology .topo-wire:has(.topo-wire-hit:hover) .topo-wire-hit::after, .fttr-topology .topo-wire:focus-within .topo-wire-hit::after, .fttr-topology .topo-wire.is-hovered .topo-wire-hit::after, .fttr-topology .topo-wire.is-selected .topo-wire-hit::after { opacity: 1; filter: drop-shadow(0 0 3px color-mix(in srgb, var(--topo-blue) 35%, transparent)); }
.fttr-topology .topo-wire-h, .fttr-topology .topo-wire-v { position: absolute; border-color: var(--wire-color); border-style: solid; border-width: 0; }
.fttr-topology .topo-wire-h { border-top-width: 2px; }
.fttr-topology .topo-wire-v { border-left-width: 2px; }
.fttr-topology .is-learned .topo-wire-h, .fttr-topology .is-learned .topo-wire-v { border-style: dashed; }
.fttr-topology .is-associated .topo-wire-h, .fttr-topology .is-associated .topo-wire-v { border-style: dotted; }
.fttr-topology .topo-graph-card { position: absolute; display: block; text-align: left; padding: 0; border: 1px solid var(--topo-border); border-radius: 12px; background: var(--topo-card); color: var(--topo-text); box-shadow: 0 4px 14px #0000000b; cursor: pointer; overflow: hidden; transition: border-color .12s, box-shadow .12s; }
.fttr-topology .topo-graph-card:hover { border-color: var(--topo-blue); box-shadow: 0 8px 22px #00000018; }
.fttr-topology .topo-graph-card.is-selected { border: 2px solid var(--topo-blue); box-shadow: 0 0 0 3px color-mix(in srgb, var(--topo-blue) 20%, transparent); }
.fttr-topology .topo-graph-card.is-controller { border-top: 3px solid var(--topo-blue); }
.fttr-topology .topo-graph-card.is-onu.topo-neutral { border-style: dashed; }
.fttr-topology .topo-card-content { padding: 14px; width: 100%; height: 100%; }
.fttr-topology .topo-graph-card::after { content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit; background: linear-gradient(135deg, color-mix(in srgb, var(--topo-blue) 4%, transparent), transparent 55%); }
.fttr-topology .topo-card-head { display: flex; align-items: center; gap: 10px; }
.fttr-topology .topo-device-icon { display: inline-flex; flex: 0 0 38px; height: 38px; align-items: center; justify-content: center; border-radius: 9px; border: 1px solid color-mix(in srgb, var(--topo-blue) 28%, transparent); color: var(--topo-blue); background: color-mix(in srgb, var(--topo-blue) 9%, var(--topo-bg)); }
.fttr-topology .topo-device-icon svg { width: 22px; height: 22px; display: block; }
.fttr-topology .topo-card-title { min-width: 0; flex: 1; }
.fttr-topology .topo-card-title strong { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 14px; line-height: 21px; }
.fttr-topology .topo-card-title small { display: block; font-size: 12px; line-height: 18px; color: var(--topo-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fttr-topology .topo-dot { width: 8px; height: 8px; flex: 0 0 8px; border-radius: 50%; background: var(--topo-muted); }
.fttr-topology .topo-dot.topo-success { background: var(--topo-green); }
.fttr-topology .topo-dot.topo-info { background: var(--topo-blue); }
.fttr-topology .topo-dot.topo-warning { background: var(--topo-amber); }
.fttr-topology .topo-dot.topo-danger { background: var(--topo-red); }
.fttr-topology .topo-card-address { font: 11px/20px ui-monospace, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 3px 0 5px; color: var(--topo-muted); }
.fttr-topology .topo-card-metric { border-top: 1px solid var(--topo-border); padding-top: 7px; display: flex; align-items: center; gap: 7px; font-size: 12px; }
.fttr-topology .topo-card-metric strong { color: var(--topo-blue); font: 600 14px ui-monospace, monospace; white-space: nowrap; }
.fttr-topology .topo-card-metric .topo-chip { margin-left: auto; max-width: 120px; overflow: hidden; text-overflow: ellipsis; }
.fttr-topology .topo-card-foot { display: flex; justify-content: space-between; gap: 8px; color: var(--topo-muted); font-size: 11px; margin-top: 6px; }
.fttr-topology .topo-card-foot span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fttr-topology .topo-card-note { font-size: 11px; color: var(--topo-muted); display: block; margin-top: 6px; }
.fttr-topology .topo-client-content { display: flex; align-items: center; gap: 10px; padding: 8px 12px; }
.fttr-topology .topo-client-content .topo-device-icon { height: 34px; flex-basis: 34px; }
.fttr-topology .topo-client-content .topo-device-icon svg { width: 18px; height: 18px; }
.fttr-topology .topo-client-content .topo-card-title small { line-height: 16px; }
.fttr-topology .topo-graph-more, .fttr-topology .topo-graph-note { position: absolute; font-size: 11px; text-align: right; color: var(--topo-blue); background: none; border: 0; padding: 3px 0; }
.fttr-topology .topo-graph-more { cursor: pointer; text-decoration: underline; }
.fttr-topology .topo-overlay { position: absolute; inset: 0; display: grid; place-content: center; padding: 32px; text-align: center; gap: 12px; background: var(--topo-bg); }
.fttr-topology .topo-pan-toggle { display: none; position: absolute; left: 10px; top: 10px; z-index: 2; width: 40px; height: 40px; min-width: 0; margin: 0; padding: 0; align-items: center; justify-content: center; border-radius: 50%; font-size: 18px; line-height: 1; box-shadow: 0 2px 8px #00000026; }
.fttr-topology .topo-pan-toggle[aria-pressed="true"] { border-color: var(--topo-blue); color: var(--topo-blue); }
.fttr-topology .topo-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; padding: 12px 16px; font-size: 11px; color: var(--topo-muted); border-top: 1px solid var(--topo-border); }
.fttr-topology .topo-legend i { width: 22px; display: inline-block; vertical-align: middle; border-top: 2px solid var(--topo-blue); margin-right: 6px; }
.fttr-topology .topo-legend i.is-learned { border-top-style: dashed; border-color: var(--topo-muted); }
.fttr-topology .topo-legend i.is-associated { border-top-style: dotted; border-color: var(--topo-green); }
.fttr-topology .topo-panel { border-left: 1px solid var(--topo-border); height: 100%; overflow-y: auto; overscroll-behavior: contain; background: var(--topo-card); scrollbar-gutter: stable; }
.fttr-topology .topo-panel-title { padding: 20px; display: flex; align-items: flex-start; gap: 8px; justify-content: space-between; border-bottom: 1px solid var(--topo-border); }
.fttr-topology .topo-panel-title h3 { margin: 5px 0 0; font-size: 16px; overflow-wrap: anywhere; }
.fttr-topology .topo-panel-title small { color: var(--topo-muted); font-size: 11px; }
.fttr-topology .topo-chip { display: inline-block; border: 1px solid var(--topo-border); border-radius: 5px; padding: 2px 6px; font-size: 11px; line-height: 16px; white-space: nowrap; font-weight: 500; }
.fttr-topology .topo-chip.topo-info { color: var(--topo-blue); border-color: color-mix(in srgb, var(--topo-blue) 30%, transparent); background: color-mix(in srgb, var(--topo-blue) 7%, transparent); }
.fttr-topology .topo-chip.topo-success { color: var(--topo-green); border-color: color-mix(in srgb, var(--topo-green) 30%, transparent); background: color-mix(in srgb, var(--topo-green) 7%, transparent); }
.fttr-topology .topo-chip.topo-warning { color: var(--topo-amber); border-color: color-mix(in srgb, var(--topo-amber) 30%, transparent); background: color-mix(in srgb, var(--topo-amber) 7%, transparent); }
.fttr-topology .topo-chip.topo-danger { color: var(--topo-red); border-color: color-mix(in srgb, var(--topo-red) 30%, transparent); background: color-mix(in srgb, var(--topo-red) 7%, transparent); }
.fttr-topology .topo-detail-section { padding: 17px 20px; border-bottom: 1px solid var(--topo-border); }
.fttr-topology .topo-detail-section h4 { font-size: 12px; margin: 0 0 13px; font-weight: 650; }
.fttr-topology dl { margin: 0; }
.fttr-topology .topo-detail-row { display: grid; grid-template-columns: minmax(90px, .9fr) minmax(0, 1.1fr); gap: 10px; font-size: 12px; line-height: 20px; margin: 7px 0; align-items: start; }
.fttr-topology .topo-detail-row dt { color: var(--topo-muted); font-weight: normal; }
.fttr-topology .topo-detail-row dd { margin: 0; text-align: right; overflow-wrap: anywhere; }
.fttr-topology .topo-address-more { margin-top: 5px; }
.fttr-topology .topo-address-more summary { color: var(--topo-blue); font-size: 10px; line-height: 16px; }
.fttr-topology .topo-address-list { margin-top: 6px; text-align: left; font: 11px/17px ui-monospace, monospace; overflow-wrap: anywhere; }
.fttr-topology .topo-detail-row .topo-chip { white-space: normal; }
.fttr-topology .topo-measure { font-family: ui-monospace, monospace; }
.fttr-topology .topo-measure small { display: block; color: var(--topo-muted); font: 9px/14px inherit; overflow-wrap: anywhere; }
.fttr-topology .topo-muted { font-size: 12px; line-height: 19px; color: var(--topo-muted); }
.fttr-topology .topo-inset { padding: 10px; border: 1px solid var(--topo-border); border-radius: 7px; margin: 8px 0; font-size: 12px; overflow-wrap: anywhere; }
.fttr-topology .topo-inset p { margin: 4px 0; }
.fttr-topology .topo-list-client { width: 100%; padding: 10px 12px; margin: 8px 0; border: 1px solid var(--topo-border); border-radius: 7px; text-align: left; background: var(--topo-bg); color: var(--topo-text); cursor: pointer; }
.fttr-topology .topo-list-client.is-selected { border-color: var(--topo-blue); }
.fttr-topology .topo-list-client strong, .fttr-topology .topo-list-client small, .fttr-topology .topo-list-client span { display: block; overflow-wrap: anywhere; font-size: 12px; line-height: 19px; }
.fttr-topology .topo-list-client small, .fttr-topology .topo-list-client span { color: var(--topo-muted); font-size: 11px; }
.fttr-topology .topo-error, .fttr-topology .topo-panel-status { color: var(--topo-amber); padding: 0 20px; font-size: 12px; overflow-wrap: anywhere; }
.fttr-topology .topo-detail-section .topo-error { padding: 0; }
.fttr-topology .topo-back { border: 0; background: none; color: var(--topo-blue); padding: 16px 20px 0; cursor: pointer; text-align: left; }
.fttr-topology .topo-empty { padding: 32px 20px; color: var(--topo-muted); }
.fttr-topology .topo-sources { margin: 16px 20px; font-size: 11px; }
.fttr-topology .topo-source { padding: 10px 0; border-bottom: 1px solid var(--topo-border); overflow-wrap: anywhere; }
.fttr-topology .topo-source .topo-chip { float: right; }
.fttr-topology .topo-source small { display: block; color: var(--topo-muted); margin-top: 4px; }
.fttr-topology summary { cursor: pointer; line-height: 22px; }
.fttr-topology pre { max-width: 100%; max-height: 300px; overflow: auto; font-size: 10px; background: var(--topo-bg); color: var(--topo-text); padding: 8px; }
.fttr-topology .topo-footer { padding: 10px 0; color: var(--topo-muted); font-size: 11px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px; }
.fttr-topology .topo-device-picker { display: flex; gap: 8px; align-items: center; font-size: 12px; margin-bottom: 12px; }
.fttr-topology .topo-device-picker select { max-width: 100%; min-width: 0; }
@media (min-width: 1700px) { .fttr-topology .topo-workspace { grid-template-columns: minmax(0, 1fr) 390px; } }
@media (max-width: 1100px) { .fttr-topology .topo-workspace { grid-template-columns: minmax(0, 1fr) 310px; } .fttr-topology .topo-detail-section, .fttr-topology .topo-panel-title { padding: 16px; } }
@media (max-width: 850px) { .fttr-topology .topo-workspace { grid-template-columns: minmax(0, 1fr); height: auto; } .fttr-topology .topo-panel { height: auto; max-height: none; overflow: visible; scrollbar-gutter: auto; border-left: 0; border-top: 1px solid var(--topo-border); } .fttr-topology .topo-viewport-wrap { min-height: 460px; } }
@media (max-width: 480px) { .fttr-topology .topo-count { padding: 6px 9px; } .fttr-topology .topo-count strong { font-size: 17px; } .fttr-topology .topo-viewport-wrap { min-height: 380px; } .fttr-topology .topo-toolbar { gap: 4px; } }
@media (pointer: coarse) { .fttr-topology .topo-pan-toggle { display: inline-flex; } .fttr-topology .topo-viewport { touch-action: pan-y; } .fttr-topology .topo-viewport.is-pan-mode { touch-action: none; } .fttr-topology pre { max-height: none; } }
@media (prefers-reduced-motion: reduce) { .fttr-topology * { transition: none !important; } }
`;
