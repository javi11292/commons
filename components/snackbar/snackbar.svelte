<script lang="ts">
	import { portal } from "$lib/commons/utils/portal";
	import { fly } from "svelte/transition";
	import { store, types } from "./store";

	const DELAY = 3000;

	$: message = $store[0];

	$: error = message?.type === types.ERROR;

	let show = true;

	const handleIn = () => {
		setTimeout(() => {
			show = false;
		}, DELAY);
	};

	const handleOut = () => {
		$store.shift();
		$store = $store;
		show = true;
	};
</script>

{#if message && show}
	<div use:portal class="container">
		<div
			class="message"
			class:error
			on:introend={handleIn}
			on:outroend={handleOut}
			transition:fly={{ y: "100%" }}
		>
			{message.text}
		</div>
	</div>
{/if}

<style lang="scss">
	@use "src/lib/commons/theme";

	.container {
		pointer-events: none;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.message {
		pointer-events: all;
		position: absolute;
		bottom: 1rem;
		left: 50%;
		translate: -50%;
		border-radius: 0.25rem;
		background: theme.$colorPrimary;
		padding: 1rem;
		color: black;
	}

	.error {
		background: theme.$colorError;
		color: white;
	}
</style>
