<script lang="ts">
	import { classes } from "$lib/commons/utils/classes";
	import Icon from "../icon";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let href: Maybe<string> = undefined;
	export let icon: Maybe<string> = undefined;
	export let variant: "contained" | "outlined" | "text" = "text";
	export let loading = false;
	export let disabled = false;
	export let disableUpperCase = false;
	export let withoutScale = false;
	export let withoutBorder = false;

	$: variantClass = {
		contained: disabled ? "bg-neutral-700" : "bg-lime-500 text-black",
		outlined: classes(!disabled && "text-lime-500", "border border-solid border-current"),
		text: null,
	};
</script>

<svelte:element
	this={href ? "a" : "button"}
	on:click
	class={classes(
		"relative inline-block overflow-hidden outline-none",
		disabled ? "pointer-events-none text-neutral-300" : "cursor-pointer",
		!disabled && (withoutScale ? "hover-opacity" : "active-scale"),
		loading && "pointer-events-none",
		icon ? "rounded-full p-2" : "py-2 px-4 font-bold",
		!withoutBorder && !icon && "rounded",
		!disableUpperCase && !icon && "text-sm uppercase",
		variantClass[variant],
		className
	)}
	{href}
	{disabled}
>
	<span class="overflow-hidden">
		<span class={classes("transition-opacity duration-500", loading ? "opacity-0" : "opacity-100")}>
			{#if icon}
				<Icon {icon} />
			{:else}
				<slot />
			{/if}
		</span>
	</span>
</svelte:element>
