export const classes = (...names: unknown[]) => {
	return names.reduce<unknown>((acc, name) => {
		if (name && !acc) return name;
		if (name) return `${acc} ${name}`;
		return acc;
	}, "");
};
