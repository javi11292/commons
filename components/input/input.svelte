<script lang="ts">
	import { classes } from "$lib/commons/utils/classes";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let inputClass: Maybe<string> = undefined;
	export let label: Maybe<string> = undefined;
	export let value: Maybe<string> = undefined;
	export let readonly = false;
</script>

<div
	class={classes(
		"group grid border-b border-solid border-neutral-400 transition-all duration-200 focus-within:border-lime-500",
		className
	)}
>
	<div class="col-start-1 row-start-1 h-4" />

	<div
		class={classes(
			"pointer-events-none relative col-start-1 row-start-1 row-end-3 overflow-hidden",
			$$slots.icon && "mr-6"
		)}
	>
		{#if label}
			<div
				class={classes(
					"absolute top-4 origin-left whitespace-nowrap text-neutral-400 transition-all duration-200 group-focus-within:-translate-y-full group-focus-within:text-xs group-focus-within:text-lime-500",
					value && "-translate-y-full text-xs"
				)}
			>
				{label}
			</div>
		{/if}
	</div>

	<input
		bind:value
		on:focus
		on:blur
		on:click
		class={classes("col-start-1 row-start-2 box-border w-full", $$slots.icon && "pr-6", inputClass)}
		{readonly}
	/>

	<slot name="icon" class="pointer-events-none col-start-1 row-start-2 justify-self-end" />
</div>
