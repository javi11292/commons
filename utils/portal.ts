export const portal = (node: HTMLElement, target?: Element | null) => {
	const targetElement = target || document.body;

	targetElement.appendChild(node);
	node.hidden = false;

	return { destroy: () => node.parentNode && node.parentNode.removeChild(node) };
};
