<script lang="ts">
	import type { Maybe } from "$lib/commons/types";
	import { classes } from "$lib/commons/utils/classes";
	import add from "./icons/add.svg";
	import arrowDown from "./icons/arrow-down.svg";
	import arrowRight from "./icons/arrow-right.svg";
	import remove from "./icons/remove.svg";

	const icons = { add, remove, arrowDown, arrowRight };

	let className: Maybe<string> = undefined;

	export { className as class };
	export let icon: keyof typeof icons;
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class={classes("icon", className)}>
	<use href={`${icons[icon]}#svg`} />
</svg>

<style lang="scss">
	.icon {
		height: 1.5rem;
		width: 1.5rem;
	}
</style>
