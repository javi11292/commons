<script lang="ts">
	import { portal } from "$lib/commons/utils/portal";
	import { fly } from "svelte/transition";
	import { messages, types } from "./store.svelte";

	const DELAY = 3000;

	let message = $derived(messages.value[0]);
	let error = $derived(message?.type === types.ERROR);
	let show = $state(true);

	const introend = () => {
		setTimeout(() => {
			show = false;
		}, DELAY);
	};

	const outroend = () => {
		messages.value.shift();
		messages.value = [...messages.value];
		show = true;
	};
</script>

{#if message && show}
	<div use:portal class="container">
		<div
			class="message"
			class:error
			on:introend={introend}
			on:outroend={outroend}
			transition:fly={{ y: "100%" }}
		>
			{message.text}
		</div>
	</div>
{/if}

<style lang="scss">
	@use "$lib/commons/theme";

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
