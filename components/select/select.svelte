<script lang="ts" context="module">
	export type Option = { label?: string; value: string };
</script>

<script lang="ts">
	import Button from "$lib/commons/components/button";
	import Input from "$lib/commons/components/input";
	import Tooltip from "$lib/commons/components/tooltip";
	import type { Maybe } from "$lib/commons/types";
	import { classes } from "$lib/commons/utils/classes";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let options: Option[] = [];
	export let label: Maybe<string> = undefined;
	export let selected: Maybe<Option> = undefined;
	export let disableShrink = false;

	let show = false;
	let buttons: HTMLElement;

	const handleBlur = ({ relatedTarget }: FocusEvent) => {
		if ((relatedTarget as HTMLElement)?.parentElement !== buttons) {
			show = false;
		}
	};

	const handleSelect = (option: Option) => () => {
		selected = option;
		show = false;
	};

	const handleClick = ({ currentTarget }: MouseEvent) => {
		show = !show;
		if (!show) {
			(currentTarget as HTMLElement).blur();
		}
	};
</script>

<Tooltip class={className} {show}>
	<Input
		readonly
		disableFocusLabel
		inputClass="cursor-pointer"
		value={selected?.label}
		on:blur={handleBlur}
		on:click={handleClick}
		{label}
		{disableShrink}
	/>

	<div bind:this={buttons} slot="tooltip">
		{#each options as option}
			<Button
				withoutScale
				withoutBorder
				disableUpperCase
				class={classes("w-full", option === selected && "bg-lime-700")}
				on:click={handleSelect(option)}
			>
				{option.label}
			</Button>
		{/each}
	</div>
</Tooltip>
