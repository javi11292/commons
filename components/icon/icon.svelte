<script>
	import { classes } from "$lib/commons/utils/classes";

	/** @type {Maybe<string>} */
	let className = undefined;

	export { className as class };
	/** @type {string} */
	export let icon;
</script>

<img class={classes("h-6 w-6 max-w-none", className)} src={`/icons/${icon}.svg`} alt={icon} />
