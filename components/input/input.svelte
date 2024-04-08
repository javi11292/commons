<script lang="ts">
	import type { Snippet } from "svelte";
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		HTMLInputTypeAttribute,
	} from "svelte/elements";

	type Props = {
		icon?: Snippet;
		label?: string;
		type?: HTMLInputTypeAttribute;
		value?: unknown;
		disableShrink?: boolean;
		disableFocusLabel?: boolean;
		disabled?: boolean;
	} & HTMLInputAttributes;

	let {
		// eslint-disable-next-line no-undef
		value = $bindable(),
		label,
		type,
		disableShrink,
		disableFocusLabel,
		disabled,
		icon,
		...props
	}: Props = $props();

	const handleInput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		value = currentTarget.files;
	};
</script>

<div class:disabled class:focusLabel={!disableFocusLabel} class="input">
	{#if label}
		<div class="labelSpace" />
	{/if}

	<div class:withIcon={icon} class="labelContainer">
		{#if label}
			<div class:disableShrink={value || type === "file" || disableShrink} class="label">
				{label}
			</div>
		{/if}
	</div>

	{#if type !== "file"}
		<input
			{...props}
			class:disabled
			class:withIcon={icon}
			aria-label={label}
			bind:value
			{type}
			{disabled}
		/>
	{:else}
		<label class:disabled class:withIcon={icon}>
			<input
				{...props}
				aria-label={label}
				oninput={handleInput}
				{type}
				{disabled}
				accept="image/webp"
			/>

			{#if value}
				{#each value as file, index}
					{#if index < value.length - 1}
						{file.name}, &nbsp;
					{:else}
						{file.name}
					{/if}
				{/each}
			{:else}
				&nbsp;
			{/if}
		</label>
	{/if}

	{#if icon}
		{@render icon()}
	{/if}
</div>

<style lang="scss">
	.input {
		display: grid;
		border-bottom: 1px solid;
		transition: all;
		transition-duration: 200ms;
		border-bottom: 1px solid currentColor;

		&:focus-within {
			border-color: var(--focus-color);
		}
	}

	label {
		cursor: pointer;

		input {
			display: none;
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
				color: var(--focus-color);
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

	input {
		grid-column-start: 1;
		grid-row-start: 2;
		padding: 0.25rem 0;
		box-sizing: border-box;
		width: 100%;
		transition: all;
		transition-duration: 200ms;
	}

	.disabled {
		color: var(--disabled-color);
	}
</style>
