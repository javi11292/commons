export const portal = (node: HTMLElement, target: null | Element = document.body) => {
	if (target) {
		target.appendChild(node);
		node.hidden = false;
	} else {
		node.hidden = true;
	}

	return {
		update: (nextTarget: typeof target = document.body) => {
			if (nextTarget) {
				nextTarget.appendChild(node);
				node.hidden = false;
			} else {
				node.hidden = true;
			}
		},
		destroy: () => node.parentNode && node.parentNode.removeChild(node),
	};
};
