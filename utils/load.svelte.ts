type Args<T, R, P> = {
	id: string;
	load: (args: { data: T; args: P }) => R;
	fetch?: (args: P) => Promise<T> | T;
};

class Data<T extends (args: { data: any; args: any }) => any, R extends (args: any) => any> {
	response = $state<ReturnType<T> | null>(null);
	loading = $state(true);

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

		try {
			const response = this.#fetch(args);

			if (!(response instanceof Promise)) {
				this.load({ data: response, args });
				return;
			}

			this.response = null;
			this.loading = true;
			this.load({ data: await response, args });
		} catch {}
	};

	load = (args: Parameters<T>["0"]) => {
		this.response = this.#load(args);

		if (this.loading) {
			this.loading = false;
		}
	};
}

export const getData = <T, R, P>({ id, load, fetch }: Args<T, R, P>) => {
	if (import.meta.env.SSR) {
		return new Data(load, fetch);
	}

	const { resolve } = initialize(id);
	const data = new Data(load, fetch);

	resolve(data);

	return data;
};

export const initialize = (id: string) => {
	let resolve;
	const astroLoad = (window as any).__AstroLoad__ || ((window as any).__AstroLoad__ = {});
	const ready = new Promise((resolver) => (resolve = resolver));

	return astroLoad[id] || (astroLoad[id] = { ready, resolve });
};
