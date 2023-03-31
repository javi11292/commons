<script lang="ts" context="module">
	export type Option = { label?: string; value: string };
</script>

<script lang="ts">
	import Button from "$lib/commons/components/button";
	import Input from "$lib/commons/components/input";
	import Tooltip from "$lib/commons/components/tooltip";
	import { classes } from "$lib/commons/utils/classes";

	let className: Maybe<string> = undefined;

	export { className as class };
	export let options: Option[] = [];
	export let label: Maybe<string> = undefined;
	export let selected: Maybe<Option> = undefined;
	export let disableShrink = false;

	let show = false;

	const handleBlur = () => {
		show = false;
	};

	const handleSelect = (option: Option) => () => {
		selected = option;
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

	<svelte:fragment slot="tooltip">
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
	</svelte:fragment>
</Tooltip>
