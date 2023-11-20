<script lang="ts">
	import { fade } from "svelte/transition";

	let render = $state(false);

	$effect(() => {
		render = true;
	});
</script>

{#if render === true}
	<div in:fade>
		<slot />
	</div>
{/if}
