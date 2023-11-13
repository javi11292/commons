export const getData = (id: string) => (window as any).__AstroLoad__[id];

export const getLoading = () => {
	let resolver: any;

	const loading = new Promise((resolve) => (resolver = resolve));

	return { loading, resolve: resolver };
};
