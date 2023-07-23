import { browser, dev } from "$app/environment";
import "$lib/commons/assets/global.scss";

if (browser && !dev && navigator.serviceWorker) {
	navigator.serviceWorker.register("/service-worker.js");
}
