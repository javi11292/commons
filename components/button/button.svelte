<script lang="ts">
	import { classes } from "$lib/commons/utils/classes";
	import type { ComponentProps } from "svelte";
	import Icon from "../icon";
	import LoadingIcon from "../loading-icon";

	type Props = {
		children?: () => any;
		onclick?: () => void;
		href?: string;
		icon?: ComponentProps<Icon>["icon"];
		disabled?: boolean;
		element?: HTMLElement;
		loading?: boolean;
		disableUpperCase?: boolean;
		disableActive?: boolean;
		disableBorder?: boolean;
		mirror?: boolean;
		variant?: "contained" | "outlined" | "text";
		color?: "neutral" | "primary";
		size?: "lg" | "sm" | "md";
	};

	let {
		href,
		icon,
		disabled,
		element,
		loading,
		disableUpperCase,
		disableActive,
		disableBorder,
		mirror,
		onclick,
		variant = "text",
		color = "primary",
		size = "md",
	} = $props<Props>();
</script>

<svelte:element
	this={href ? "a" : "button"}
	role="button"
	tabindex="0"
	bind:this={element}
	{onclick}
	{href}
	{disabled}
>
	<div
		class={classes("button", color, variant, size)}
		class:disabled={disabled || loading}
		class:icon
		class:loading
		class:active={!disabled && !disableActive}
		class:hover={!disabled && disableActive}
		class:border={!disableBorder}
		class:upperCase={!disableUpperCase && !icon}
	>
		<span class="overflowHidden">
			<span class="content">
				{#if icon}
					<div class:mirror>
						<Icon {icon} />
					</div>
				{:else}
					<slot />
				{/if}
			</span>
		</span>

		{#if loading}
			<div class="loadingIcon">
				<LoadingIcon />
			</div>
		{/if}
	</div>
</svelte:element>

<style lang="scss">
	@use "$lib/commons/theme";
	@use "$lib/commons/hover";

	a {
		all: unset;
	}

	.button {
		position: relative;
		overflow: hidden;
		outline: none;
		cursor: pointer;
		padding: 1rem;
		font-weight: bold;
		text-align: center;
	}

	.sm {
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
	}

	.loadingIcon {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
	}

	.overflowHidden {
		overflow: hidden;
	}

	.mirror {
		scale: -1 1;
	}

	.content {
		transition: opacity;
		transition-duration: 500ms;
		opacity: 1;
	}

	.upperCase {
		text-transform: uppercase;
	}

	.border {
		border-radius: 9999px;
	}

	.icon {
		border-radius: 50%;
		padding: 0.5rem;
		font-size: 1.5rem;

		&.lg {
			font-size: 2.5rem;
		}
	}

	.loading {
		pointer-events: none;

		.content {
			opacity: 0;
		}
	}

	.disabled {
		pointer-events: none;
		color: theme.$colorNeutral;
		opacity: 0.5;

		&#{&}.contained {
			background: theme.$colorNeutralDark;
			color: white;
		}

		&#{&}.outlined {
			color: white;
		}
	}

	.active {
		@extend %active;
	}

	.hover {
		@extend %hover;
	}

	.neutral {
		&.contained {
			background: white;
			color: black;
		}

		&.outlined {
			color: white;
		}
	}

	.primary {
		&.contained {
			background: theme.$colorPrimary;
			color: black;
		}

		&.outlined {
			color: theme.$colorPrimary;
		}
	}

	.outlined {
		border: 1px solid currentColor;
	}
</style>
