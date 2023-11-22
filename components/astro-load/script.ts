import { initialize } from "$lib/commons/utils/load.svelte";

class AstroLoad extends HTMLElement {
	constructor() {
		super();

		const id = this.getAttribute("id") as string;
		const navigate = JSON.parse(this.getAttribute("navigate") as string);
		const args = JSON.parse(this.getAttribute("args") as string);
		const initialData = JSON.parse(this.getAttribute("data") as string);

		const { ready } = initialize(id);

		ready.then((data: any) => {
			if (navigate) {
				data.load({ args, data: initialData });
			} else if (data.fetch) {
				data.fetch(args);
			}
		});
	}
}

customElements.define("astro-load", AstroLoad);
