<script lang="ts">
	import type { FormEventHandler, HTMLInputTypeAttribute } from "svelte/elements";

	import { classes } from "$lib/commons/utils/classes";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let inputClass: Maybe<string> = undefined;
	export let label: Maybe<string> = undefined;
	export let type: Maybe<HTMLInputTypeAttribute> = undefined;
	export let readonly = false;
	export let value = "";

	const handleChange: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		value = currentTarget?.value;
	};
</script>

<div
	class={classes(
		"group grid border-b border-solid border-neutral-400 pb-1 transition-all duration-200 focus-within:border-lime-500",
		className
	)}
>
	{#if label}
		<div class="col-start-1 row-start-1 h-4" />
	{/if}

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
		on:input={handleChange}
		on:click
		on:focus
		on:blur
		class={classes(
			"col-start-1 row-start-2 box-border w-full",
			$$slots.icon && "pr-6",
			inputClass,
			type === "date" && "cursor-pointer focus:text-inherit",
			type === "date" && !value && "text-transparent"
		)}
		{readonly}
		{type}
		{value}
	/>

	<slot name="icon" class="pointer-events-none col-start-1 row-start-2 justify-self-end" />
</div>