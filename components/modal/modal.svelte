<script lang="ts">
	import { fade, scale } from "svelte/transition";

	export let open = false;

	const portal = (node: HTMLElement) => {
		document.body.appendChild(node);

		return { destroy: () => node.parentElement && document.body.removeChild(node) };
	};
</script>

{#if open}
	<div
		on:click={() => (open = false)}
		on:keypress
		use:portal
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-80"
	>
		<div
			transition:scale={{ duration: 150 }}
			class="flex max-h-[90vh] max-w-[90vw] overflow-hidden rounded-md bg-neutral-800 shadow-md shadow-black"
		>
			<div class="overflow-y-auto p-4">
				<slot />
			</div>
		</div>
	</div>
{/if}
