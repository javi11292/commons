<script lang="ts">
	export let icon: string;
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon">
	<use href={`/icons/${icon}.svg#svg`} />
</svg>

<style lang="scss">
	.icon {
		height: 1em;
		width: 1em;
	}
</style>
