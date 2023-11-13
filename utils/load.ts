export const getData = (id: string): any | null => {
	const element = document.querySelector(`astro-load#${id}`);

	if (element && element instanceof HTMLElement && element.dataset.load) {
		return JSON.parse(element.dataset.load);
	}

	return null;
};

export const getLoading = () => {
	let resolver: any;

	const loading = new Promise((resolve) => (resolver = resolve));

	return { loading, resolve: resolver };
};
