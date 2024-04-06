<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicInOut } from "svelte/easing";

	let { children, tooltip }: { show?: boolean; children: Snippet; tooltip: Snippet } = $props();

	const appear = (_node: HTMLDivElement) => ({
		duration: 150,
		easing: cubicInOut,
		css: (t: number) => `
      scale: ${t / 2 + 0.5};
      opacity: ${t};
    `,
	});

	let show = $state(false);
</script>

<span
	class="container"
	onmouseenter={() => (show = true)}
	onmouseleave={() => (show = false)}
	role="tooltip"
>
	{@render children()}

	{#if show}
		<div transition:appear class="tooltip">
			{@render tooltip()}
		</div>
	{/if}
</span>

<style lang="scss">
	.container {
		position: relative;
	}

	.tooltip {
		position: absolute;
		width: 100%;
	}
</style>
