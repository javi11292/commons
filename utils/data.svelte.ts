export const getData = <T>(callback: (data: T) => void) => {
	class Data {
		response = $state<T | null>(null);
		loading = $state(false);

		load = (id: string) => {
			if (typeof window === "undefined") {
				return;
			}

			const astroLoad = (window as any).__AstroLoad__ || ((window as any).__AstroLoad__ = {});
			const info = astroLoad[id] || (astroLoad[id] = {});

			this.loading = true;
			this.response = null;

			if (!("data" in info)) {
				info.load = this.load;
				return;
			}

			delete info.load;

			callback(info.data);

			this.response = info.data;
			this.loading = false;
		};
	}

	return new Data();
};
