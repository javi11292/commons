export const getLoad = (callback: () => unknown) => {
	let load = typeof window !== "undefined";

	return async () => {
		if (!load) {
			return;
		}

		load = false;
		callback();
	};
};
