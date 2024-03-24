<script lang="ts">
	import { browser, dev } from "$app/environment";
	import { onNavigate } from "$app/navigation";
	import "$lib/commons/assets/global.scss";
	import type { Snippet } from "svelte";

	if (browser && !dev && navigator.serviceWorker) {
		navigator.serviceWorker.register("/service-worker.js");
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
