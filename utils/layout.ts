import { browser, dev } from "$app/environment";
import { onNavigate } from "$app/navigation";
import "$lib/commons/assets/global.scss";

export const layout = () => {
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
};
