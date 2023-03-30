<script lang="ts">
	import { classes } from "$lib/commons/utils/classes";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let icon: string;
</script>

<img class={classes("h-6 w-6", className)} src={`/icons/${icon}.svg`} alt={icon} />
