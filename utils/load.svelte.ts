type Args<T, R, P> = {
	id: string;
	load: (args: { data: T; args: P }) => R;
	fetch?: (args: P) => Promise<T> | T;
};

export const getData = <T, R, P>({ id, load, fetch }: Args<T, R, P>) => {
	class Data {
		response = $state<R | null>(null);
		loading = $state(true);

		fetch =
			fetch &&
			(async (args: Parameters<typeof fetch>["0"]) => {
				try {
					const response = fetch(args);

					if (!(response instanceof Promise)) {
						this.load({ data: response, args });
						return;
					}

					this.response = null;
					this.loading = true;
					this.load({ data: await response, args });
				} catch {}
			});

		load = (args: Parameters<typeof load>["0"]) => {
			this.response = load(args);

			if (this.loading) {
				this.loading = false;
			}
		};
	}

	if (import.meta.env.SSR) {
		return new Data();
	}

	const { resolve } = initialize(id);
	const data = new Data();

	resolve(data);

	return data;
};

export const initialize = (id: string) => {
	let resolve;
	const astroLoad = (window as any).__AstroLoad__ || ((window as any).__AstroLoad__ = {});
	const ready = new Promise((resolver) => (resolve = resolver));

	return astroLoad[id] || (astroLoad[id] = { ready, resolve });
};
