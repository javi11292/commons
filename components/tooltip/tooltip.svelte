<script lang="ts">
	import { cubicInOut } from "svelte/easing";

	import { classes } from "$lib/commons/utils/classes";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let show = false;

	const appear = (_: HTMLDivElement) => ({
		duration: 300,
		easing: cubicInOut,
		css: (t: number) => `
      scale: ${t / 2 + 0.5};
      opacity: ${t};
    `,
	});
</script>

<span class={classes(className, "relative")}>
	<slot />

	{#if show}
		<div transition:appear class="absolute z-10 w-full rounded bg-zinc-900 pb-4 pt-4 shadow">
			<slot name="tooltip" />
		</div>
	{/if}
</span>
