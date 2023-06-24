<script>
	import { classes } from "$lib/commons/utils/classes";

	/** @type {Maybe<string>} */
	let className = undefined;

	export { className as class };
	/** @type {Maybe<string>} */
	export let inputClass = undefined;
	/** @type {Maybe<string>} */
	export let label = undefined;
	/** @type {Maybe<import("svelte/elements").HTMLInputTypeAttribute>} */
	export let type = undefined;
	/** @type {Maybe<boolean>} */
	export let readonly = undefined;
	/** @type {unknown} */
	export let value = undefined;
	export let disableShrink = false;
	export let disableFocusLabel = false;
	export let disabled = false;

	/** @type {import("svelte/elements").FormEventHandler<HTMLInputElement>} */
	const handleChange = ({ currentTarget }) => {
		if (type === "file") {
			value = currentTarget.files?.[0];
		} else {
			value = currentTarget.value;
		}
	};
</script>

<div
	class={classes(
		"grid border-b border-solid pb-1 transition-all duration-200 focus-within:border-lime-500",
		!disableFocusLabel && "group",
		className,
		disabled ? "border-neutral-500" : "border-neutral-400"
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
					"absolute top-4 origin-left whitespace-nowrap transition-all duration-200 group-focus-within:-translate-y-full group-focus-within:text-xs group-focus-within:text-lime-500",
					(value || type === "file" || disableShrink) && "-translate-y-full text-xs",
					disabled ? "text-neutral-500" : "text-neutral-400 "
				)}
			>
				{label}
			</div>
		{/if}
	</div>

	<input
		autocomplete="off"
		on:input={handleChange}
		on:click
		on:focus
		on:blur
		class={classes(
			"col-start-1 row-start-2 box-border w-full transition-all duration-200",
			$$slots.icon && "pr-6",
			inputClass,
			disabled && "text-neutral-500"
		)}
		value={(type !== "file" ? value : null) || null}
		aria-label={label}
		{readonly}
		{type}
		{disabled}
	/>

	<slot name="icon" class="pointer-events-none col-start-1 row-start-2 justify-self-end" />
</div>
