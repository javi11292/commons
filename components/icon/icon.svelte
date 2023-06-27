<script>
	import { classes } from "$lib/commons/utils/classes";
	import add from "./add.svg";
	import arrowDown from "./arrow-down.svg";
	import arrowRight from "./arrow-right.svg";
	import remove from "./remove.svg";

	const icons = { add, remove, arrowDown, arrowRight };

	/** @type {Maybe<string>} */
	let className = undefined;

	export { className as class };
	/** @type {keyof icons} */
	export let icon;
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class={classes("h-6 w-6 max-w-none", className)}>
	<use href={`${icons[icon]}#svg`} />
</svg>
