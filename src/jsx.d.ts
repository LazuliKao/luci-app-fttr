// Additional HTML elements supported by the existing LuCI JSX runtime.
declare global {
	namespace JSX {
		interface IntrinsicElements {
			details: JSXElement<HTMLDetailsElement>;
			summary: JSXElement<HTMLElement>;
		}
	}
}

export {};
