<script lang="ts">
	import add from "$lib/commons/assets/icons/add.svg?url";

	const icons = {
		add,
	};

	export let icon: keyof typeof icons;
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon">
	<use href={`${icons[icon]}#svg`} />
</svg>

<style lang="scss">
	.icon {
		height: 1em;
		width: 1em;
	}
</style>
