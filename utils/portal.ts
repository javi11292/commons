const getTarget = (target?: Element | null) => target || document.body;

export const portal = (node: HTMLElement, target?: Element | null) => {
	const targetElement = getTarget(target);

	targetElement.appendChild(node);
	node.hidden = false;

	return {
		update: (nextTarget: typeof target) => getTarget(nextTarget).appendChild(node),
		destroy: () => node.parentNode && node.parentNode.removeChild(node),
	};
};
