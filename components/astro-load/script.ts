import { initialize } from "$lib/commons/utils/load.svelte";

class AstroLoad extends HTMLElement {
	constructor() {
		super();

		const id = this.getAttribute("id") as string;
		const navigate = JSON.parse(this.getAttribute("navigate") as string);
		const props = JSON.parse(this.getAttribute("props") as string);
		const initialData = JSON.parse(this.getAttribute("data") as string);

		const { ready } = initialize(id);

		ready.then((data: any) => {
			if (navigate) {
				data.load({ props, data: initialData });
			} else if (data.fetch) {
				data.fetch(props);
			}
		});
	}
}

customElements.define("astro-load", AstroLoad);
