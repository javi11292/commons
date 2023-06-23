<script>
	import { classes } from "$lib/commons/utils/classes";
	import Icon from "../icon";
	import LoadingIcon from "../loading-icon";

	/** @type {Maybe<string>} */
	let className = undefined;

	export { className as class };
	/** @type {Maybe<string>} */
	export let href = undefined;
	/** @type {Maybe<string>} */
	export let icon = undefined;
	/** @type {Maybe<boolean>} */
	export let disabled = undefined;
	/** @type {Maybe<HTMLElement>} */
	export let element = undefined;
	/** @type {"contained" | "outlined" | "text"} */
	export let variant = "text";
	/** @type {keyof colorClass} */
	export let color = "primary";
	export let loading = false;
	export let disableUpperCase = false;
	export let withoutScale = false;
	export let withoutBorder = false;

	const colorClass = {
		neutral: {
			contained: "bg-white text-black",
			outlined: "text-white",
		},
		primary: {
			contained: "bg-lime-500 text-black",
			outlined: "text-lime-500",
		},
	};

	$: variantClass = {
		contained: disabled ? "bg-neutral-700" : colorClass[color].contained,
		outlined: classes(
			!disabled && colorClass[color].outlined,
			"border border-solid border-current"
		),
		text: null,
	};
</script>

<svelte:element
	this={href ? "a" : "button"}
	role="button"
	tabindex="0"
	bind:this={element}
	on:click
	class={classes(
		"relative inline-block overflow-hidden outline-none",
		disabled ? "pointer-events-none text-neutral-300" : "cursor-pointer",
		!disabled && (withoutScale ? "hover-opacity" : "active-scale"),
		loading && "pointer-events-none",
		icon ? "rounded-full p-2" : "px-4 py-2 font-bold",
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

	{#if loading}
		<LoadingIcon class="absolute inset-0 left-2/4 top-2/4 [translate:-50%_-50%]" />
	{/if}
</svelte:element>
