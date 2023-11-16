<script lang="ts">
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		HTMLInputTypeAttribute,
	} from "svelte/elements";

	type Props = {
		icon?: any;
		label?: string;
		type?: HTMLInputTypeAttribute;
		value?: unknown;
		disableShrink?: boolean;
		disableFocusLabel?: boolean;
		disabled?: boolean;
		element?: HTMLElement;
	} & HTMLInputAttributes;

	let { label, type, value, disableShrink, disableFocusLabel, disabled, element, icon, ...props } =
		$props<Props>();

	const oninput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		if (type === "file") {
			value = currentTarget.files?.[0];
		} else {
			value = currentTarget.value;
		}
	};

	const bind = (node: HTMLInputElement) => {
		element = node;

		return { destroy: () => (element = undefined) };
	};
</script>

<div class:disabled class:focusLabel={!disableFocusLabel} class="container">
	{#if label}
		<div class="labelSpace" />
	{/if}

	<div class:withIcon={!!icon} class="labelContainer">
		{#if label}
			<div class:disableShrink={value || type === "file" || disableShrink} class="label">
				{label}
			</div>
		{/if}
	</div>

	<input
		{...props}
		use:bind
		class:disabled
		class:withIcon={!!icon}
		class="input"
		value={(type !== "file" ? value : null) || null}
		aria-label={label}
		{type}
		{disabled}
		{oninput}
	/>

	{#if icon}
		{@render icon({ class: "pointer-events-none col-start-1 row-start-2 justify-self-end" })}
	{/if}
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
