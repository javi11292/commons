<script lang="ts">
	import type { Maybe } from "$lib/commons/types";
	import type { FormEventHandler, HTMLInputTypeAttribute } from "svelte/elements";

	export let label: Maybe<string> = undefined;
	export let type: Maybe<HTMLInputTypeAttribute> = undefined;
	export let readonly: Maybe<boolean> = undefined;
	export let value: unknown = undefined;
	export let disableShrink = false;
	export let disableFocusLabel = false;
	export let disabled = false;
	export let element: Maybe<HTMLInputElement> = null;

	const handleChange: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		if (type === "file") {
			value = currentTarget.files?.[0];
		} else {
			value = currentTarget.value;
		}
	};
</script>

<div class:disabled class:focusLabel={!disableFocusLabel} class="container">
	{#if label}
		<div class="labelSpace" />
	{/if}

	<div class:withIcon={$$slots.icon} class="labelContainer">
		{#if label}
			<div class:disableShrink={value || type === "file" || disableShrink} class="label">
				{label}
			</div>
		{/if}
	</div>

	<input
		on:input={handleChange}
		on:click
		on:focus
		on:blur
		on:paste
		on:keypress
		bind:this={element}
		class:disabled
		class:withIcon={$$slots.icon}
		class="input"
		value={(type !== "file" ? value : null) || null}
		aria-label={label}
		{readonly}
		{type}
		{disabled}
	/>

	<slot name="icon" class="pointer-events-none col-start-1 row-start-2 justify-self-end" />
</div>

<style lang="scss">
	@use "$lib/commons/theme";

	.container {
		color: theme.$colorNeutralLight;
		display: grid;
		border-bottom: 1px solid;
		transition: all;
		transition-duration: 200ms;
		border-bottom: 1px solid currentColor;

		&:focus-within {
			border-color: theme.$colorPrimary;
		}
	}

	.withIcon {
		margin-right: 1.5rem;
	}

	.labelSpace {
		height: 1rem;
		grid-column-start: 1;
		grid-row-start: 1;
	}

	.labelContainer {
		pointer-events: none;
		position: relative;
		grid-column-start: 1;
		grid-row-start: 1;
		grid-row-end: 3;
		overflow: hidden;
	}

	.focusLabel {
		&:focus-within {
			.label {
				@extend .disableShrink;
				color: theme.$colorPrimary;
			}
		}
	}

	.label {
		position: absolute;
		top: 1rem;
		transform-origin: left;
		white-space: nowrap;
		transition: all;
		transition-duration: 200ms;
	}

	.disableShrink {
		translate: 0 -100%;
		font-size: 0.75rem;
		line-height: 1rem;
	}

	.input {
		grid-column-start: 1;
		grid-row-start: 2;
		padding: 0.25rem 0;
		box-sizing: border-box;
		width: 100%;
		transition: all;
		transition-duration: 200ms;
		color: white;
	}

	.disabled {
		color: theme.$colorNeutral;
	}
</style>
