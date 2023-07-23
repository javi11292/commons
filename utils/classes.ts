export const classes = (...names: unknown[]) =>
	names.reduce<string>((acc, name) => {
		if (typeof name !== "string") return acc;
		if (name && !acc) return name;
		if (name) return `${acc} ${name}`;
		return acc;
	}, "");
