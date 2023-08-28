export const portal = (node: HTMLElement) => {
	document.body.appendChild(node);
	node.hidden = false;

	return { destroy: () => node.parentNode && node.parentNode.removeChild(node) };
};
