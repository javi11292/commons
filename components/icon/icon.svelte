<script lang="ts">
	import icons from "$lib/commons/assets/icons.svg?url";

	type Props = { icon: string };

	let { icon } = $props<Props>();
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon">
	<use href={`${icons}#${icon}`} />
</svg>

<style lang="scss">
	.icon {
		height: 1em;
		width: 1em;
	}
</style>
