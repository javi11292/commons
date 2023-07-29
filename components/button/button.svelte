<script lang="ts">
	import type { Maybe } from "$lib/commons/types";
	import { classes } from "$lib/commons/utils/classes";
	import type { ComponentProps } from "svelte";
	import Icon from "../icon";
	import LoadingIcon from "../loading-icon";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let href: Maybe<string> = undefined;
	export let icon: Maybe<ComponentProps<Icon>["icon"]> = undefined;
	export let disabled: Maybe<boolean> = undefined;
	export let element: Maybe<HTMLElement> = undefined;
	export let variant: "contained" | "outlined" | "text" = "text";
	export let color: "neutral" | "primary" = "primary";
	export let loading = false;
	export let disableUpperCase = false;
	export let disableActive = false;
	export let disableBorder = false;
</script>

<svelte:element
	this={href ? "a" : "button"}
	role="button"
	tabindex="0"
	bind:this={element}
	on:click
	class={classes("button", color, variant, className)}
	class:disabled
	class:icon
	class:loading
	class:active={!disabled && !disableActive}
	class:hover={!disabled && disableActive}
	class:border={!disableBorder}
	class:upperCase={!disableUpperCase && !icon}
	{href}
	{disabled}
>
	<span class="overflowHidden">
		<span class="content">
			{#if icon}
				<Icon {icon} />
			{:else}
				<slot />
			{/if}
		</span>
	</span>

	{#if loading}
		<LoadingIcon class="loadingIcon" />
	{/if}
</svelte:element>

<style lang="scss">
	@use "$lib/commons/theme";
	@use "$lib/commons/classes";

	.button {
		position: relative;
		display: inline-block;
		overflow: hidden;
		outline: none;
		cursor: pointer;
		padding: 1rem 0.5rem;
		font-weight: bold;

		:global(.loadingIcon) {
			position: absolute;
			inset: 0;
			left: 50%;
			top: 50%;
			translate: -50% -50%;
		}
	}

	.overflowHidden {
		overflow: hidden;
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
		border-radius: 0.25rem;
	}

	.icon {
		border-radius: 100%;
		padding: 0.5rem;
	}

	.loading {
		pointer-events: none;

		.content {
			opacity: 0;
		}
	}

	.disabled {
		@extend .loading;
		color: theme.$colorNeutral;

		&.contained {
			background: theme.$colorNeutralDark;
			color: white;
		}

		&.outlined {
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
