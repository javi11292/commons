<script lang="ts">
	export let icon: string;

	$: component = import(`../../assets/icons/${icon}.svg`);
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon">
	{#await component then href}
		<use href={`${href.default}#svg`} />
	{/await}
</svg>

<style lang="scss">
	.icon {
		height: 1em;
		width: 1em;
	}
</style>
