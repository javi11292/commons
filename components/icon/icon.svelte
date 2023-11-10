<script lang="ts">
	export let icon: string;

	$: image = `/icons/${icon}.svg#svg`;
</script>

<svelte:head>
	<link rel="preload" as="image" href={image} />
</svelte:head>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon">
	<use href={image} />
</svg>

<style lang="scss">
	.icon {
		height: 1em;
		width: 1em;
	}
</style>
