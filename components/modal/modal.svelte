<script lang="ts">
	import { portal } from "$lib/commons/utils/portal";
	import type { Snippet } from "svelte";
	import { fade, scale } from "svelte/transition";

	let { open, children }: { open?: boolean; children: Snippet } = $props();
</script>

{#if open}
	<div
		on:click={() => (open = false)}
		on:keypress
		use:portal
		hidden
		tabindex="0"
		role="button"
		class="backdrop"
		transition:fade
	>
		<div transition:scale class="modal">
			<div class="content">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.8);
	}

	.modal {
		display: flex;
		max-height: 90vh;
		max-width: 90vw;
		overflow: hidden;
		border-radius: 0.25rem;
		background: var(--background);
		box-shadow: 0 4px 6px black;
	}

	.content {
		overflow-y: auto;
		padding: 1rem;
	}
</style>
