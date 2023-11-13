import { writable } from "svelte/store";

export const getData = <T>(callback: (data: T) => void) => {
	const loading = writable(true);
	const state = writable<T | null>(null);

	const load = (id: string) => {
		if (typeof window === "undefined") {
			return;
		}

		const astroLoad = (window as any).__AstroLoad__ || ((window as any).__AstroLoad__ = {});
		const info = astroLoad[id] || (astroLoad[id] = {});

		info.load = load;

		loading.set(true);
		state.set(null);

		if (!("data" in info)) {
			return;
		}

		callback(info.data);

		state.set(info.data);
		loading.set(false);
	};

	return { data: state, load, loading };
};
