/** @param {unknown[]} names */
export const classes = (...names) =>
	names.reduce((/** @type {string} */ acc, name) => {
		if (typeof name !== "string") return acc;
		if (name && !acc) return name;
		if (name) return `${acc} ${name}`;
		return acc;
	}, "");
