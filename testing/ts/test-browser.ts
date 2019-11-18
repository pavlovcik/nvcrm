import nvCRM from "../../classes/nvCRM";

let ATTACH_POINT = `client`; //	mounts to window object.
const accountId = `./json/account/index.json`;
const projectId = `./json/account/project/index.json`;
const attribute = `data-source`;
let classname = `ready`;
const query = `[${attribute}]`;

(async function() {
	// let accountId = `wami`;
	// let projectId = `q4-2019`;

	// accountId = `//api.inventum.digital/clients/${accountId}`;
	// projectId = `//api.inventum.digital/clients/${accountId}/${projectId}`;

	classname = [` `, classname, ` `].join("");

	let client = new nvCRM(accountId, projectId);
	await client.Ready;

	// client.Ready.then(() => {
	// 	debugger;
	// 	//do stuff that needs foo to be ready, eg apply bindings
	// });

	// debugger;

	window[ATTACH_POINT] = client;

	return render(client);

	function render(client) {
		/**
		 * This renders everything except for dynamic array lengths and their children,
		 * which is a problem for SERVICES and DELIVERABLES:
		 *
		 * *	project.payload.services[0].title
		 * *	project.payload.services[0].description
		 * *	project.payload.services[0].budget
		 * *	project.payload.services[0].duration.weeks
		 * *	project.payload.services[0].duration.track
		 * *	project.payload.services[0].deliverables[0].title
		 *
		 * @TODO: special dynamic length handler
		 *
		 */

		const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

		let pendingTags = document.querySelectorAll(query);
		let x = pendingTags.length;
		while (x--) {
			let propertyName = pendingTags[x].getAttribute(attribute);
			pendingTags[x].className += classname;
			pendingTags[x].className = pendingTags[x].className.trim();

			let exploded = propertyName.split(`.`);
			let result = get(exploded, client.proposal);
			// if (result == null) {
			// debugger;
			// get(exploded, client.proposal);
			// }
			console.log({ exploded, result });

			pendingTags[x].textContent = result; // }.${}`);
		}
	}
})();
