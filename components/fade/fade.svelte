<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	export let disabled = false;

	let render = false;

	onMount(() => (render = true));
</script>

{#if disabled}
	<slot />
{:else if render === true}
	<div in:fade on:introend={() => (disabled = true)}>
		<slot />
	</div>
{/if}
