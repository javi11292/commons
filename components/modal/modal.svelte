<script lang="ts">
	import { portal } from "$lib/commons/utils/portal";
	import { fade, scale } from "svelte/transition";

	export let open = false;
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
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@use "$lib/commons/theme";

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
		background: theme.$colorNeutralDark;
		box-shadow: 0 4px 6px black;
	}

	.content {
		overflow-y: auto;
		padding: 1rem;
	}
</style>
