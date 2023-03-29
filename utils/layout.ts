import { browser, dev } from "$app/environment";

import "$lib/commons/assets/global.css";

if (browser && !dev) {
	navigator.serviceWorker.register("/service-worker.js");
}
