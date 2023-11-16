export const createStore = <T extends {}>(store: T) => {
	return Object.entries(store).reduce<T>((acc, [key, initial]) => {
		let state = $state(initial);

		Object.defineProperty(acc, key, {
			get: () => state,
			set: (value: T) => (state = value),
			enumerable: true,
		});

		return acc;
	}, store);
};

export const createState = <T>(initial: T) => {
	let state = $state(initial);

	return {
		get value() {
			return state;
		},
		set value(value: T) {
			state = value;
		},
	};
};
