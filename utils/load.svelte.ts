type Args<T, R, P> = {
	id: string;
	load: (args: { data: T; args: P }) => R;
	fetch?: (args: P) => Promise<T> | void;
};

class Data<T extends (args: { data: any; args: any }) => any, R extends (args: any) => any> {
	response = $state<ReturnType<T> | null>(null);
	loading = $state(true);

	#timestamp?: number;
	#load: T;
	#fetch?: R;

	constructor(load: T, fetch?: R) {
		this.#load = load;
		this.#fetch = fetch;
	}

	fetch = async (args: Parameters<R>["0"]) => {
		if (!this.#fetch) {
			return;
		}

		const timestamp = Date.now();
		const response = this.#fetch(args);
		this.#timestamp = timestamp;

		if (!response) {
			return;
		}

		this.response = null;
		this.loading = true;

		const data = await response;
		this.load({ data, args }, timestamp);
	};

	load = (args: Parameters<T>["0"], timestamp?: number) => {
		const response = this.#load(args);

		if (timestamp && this.#timestamp !== timestamp) {
			return;
		}

		this.response = response;
		this.loading = false;
	};
}

export const getData = <T, R, P>({ id, load, fetch }: Args<T, R, P>) => {
	const data = new Data(load, fetch);

	if (import.meta.env.SSR) {
		return data;
	}

	const { resolve } = initialize(id);

	resolve(data);

	return data;
};

export const initialize = (id: string) => {
	let resolve;
	const astroLoad = (window as any).__AstroLoad__ || ((window as any).__AstroLoad__ = {});
	const ready = new Promise((resolver) => (resolve = resolver));

	return astroLoad[id] || (astroLoad[id] = { ready, resolve });
};
