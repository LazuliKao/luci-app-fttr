// SPDX-License-Identifier: Apache-2.0

export interface TabItem<T extends string> {
	id: T;
	label: string;
}

/**
 * Build the standard LuCI tab strip. `tabItems` receives each <li> so callers
 * can toggle the active class from their own switchTab handler.
 */
export function createTabMenu<T extends string>(
	tabs: readonly TabItem<T>[],
	activeId: T,
	onSelect: (id: T) => void,
	tabItems: Map<T, HTMLElement>,
	style = "margin-top:14px;margin-bottom:0",
): HTMLElement {
	return (
		<ul class="cbi-tabmenu" style={style}>
			{tabs.map((tab) => {
				const li = (
					<li class={activeId === tab.id ? "cbi-tab" : "cbi-tab-disabled"} data-tab={tab.id}>
						<a
							href={`#tab-${tab.id}`}
							onclick={(e: MouseEvent) => {
								e.preventDefault();
								onSelect(tab.id);
							}}
						>
							{tab.label}
						</a>
					</li>
				) as HTMLElement;
				tabItems.set(tab.id, li);
				return li;
			})}
		</ul>
	);
}
