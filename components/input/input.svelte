<script lang="ts">
	import type { Snippet } from "svelte";
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		HTMLInputTypeAttribute,
	} from "svelte/elements";

	type Props = {
		textarea?: boolean;
		regex?: RegExp;
		rows?: number;
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
		regex,
		rows,
		textarea,
		label,
		type,
		disableShrink,
		disableFocusLabel,
		disabled,
		icon,
		...props
	}: Props = $props();

	const handleFileInput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		value = currentTarget.files;
	};

	const handleInput: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({
		currentTarget,
	}) => {
		if (!regex || regex.test(currentTarget.value)) {
			value = currentTarget.value;
		} else {
			currentTarget.value = value;
		}
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

	{#if textarea}
		<textarea
			{rows}
			class:disabled
			class:withIcon={icon}
			oninput={handleInput}
			aria-label={label}
			{value}
			{disabled}
		/>
	{:else if type !== "file"}
		<input
			{...props}
			class:disabled
			class:withIcon={icon}
			oninput={handleInput}
			aria-label={label}
			{value}
			{type}
			{disabled}
		/>
	{:else}
		<label class:disabled class:withIcon={icon}>
			<input {...props} aria-label={label} oninput={handleFileInput} {type} {disabled} />
		</label>
	{/if}

	{#if icon}
		<div class="icon">
			{@render icon()}
		</div>
	{/if}
</div>

<style lang="scss">
	.input {
		display: grid;
		border-bottom: 1px solid;
		transition: all;
		transition-duration: 200ms;
		border-bottom: 1px solid currentColor;
		position: relative;

		&:focus-within {
			border-color: var(--focus-color);
		}
	}

	.icon {
		grid-column-start: 1;
		grid-row-start: 2;
		margin-left: auto;
		align-self: center;
	}

	label {
		cursor: pointer;

		input {
			display: none;
		}
	}

	.withIcon {
		padding-right: 1.5rem;
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

	input,
	textarea {
		all: unset;
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
