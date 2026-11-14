/**
 * Renders view-scoped CSS inside the view's root element so styles mount and
 * unmount with the LuCI view lifecycle instead of leaking into document.head.
 */
export function ViewStyle(props: { styles: string | readonly string[] }): HTMLElement {
	const css = typeof props.styles === "string" ? props.styles : props.styles.join("\n");
	return <style>{css}</style>;
}
