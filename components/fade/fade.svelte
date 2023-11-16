<script lang="ts">
	import { fade } from "svelte/transition";

	type Props = { disabled?: boolean };

	let { disabled } = $props<Props>();

	let render = $state(false);

	$effect(() => {
		render = true;
	});
</script>

{#if disabled}
	<slot />
{:else if render === true}
	<div in:fade on:introend={() => (disabled = true)}>
		<slot />
	</div>
{/if}
