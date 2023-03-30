<script lang="ts">
	import { classes } from "$lib/commons/utils/classes";

	let className: Maybe<string> = undefined;

	export { className as class };
</script>

<header class={classes(className, "flex items-center justify-between bg-neutral-900 px-2 py-1")}>
	<slot />
	<div class="flex items-center"><slot name="buttons" /></div>
</header>
