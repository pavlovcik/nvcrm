import nvCRM from "../../classes/nvCRM";
import Proposal from '../../types/Proposal';

let ATTACH_POINT = `client`; //	mounts to window object.
const accountId = `./json/account/index.json`;
const projectId = `./json/account/project/index.json`;

const attribute = `data-source`;
let classname = `ready`;
const query = `[${attribute}]`;

(async function () {

	classname = [` `, classname, ` `].join("");
	let client = new nvCRM();
	client.sync.pull(accountId, projectId).then(render);	//	@FIXME: lol currently doesn't save it automatically.
	// debugger;
	// await client.proposal;
	console.log({ client });
	window[ATTACH_POINT] = client;
	// return render(<Proposal>client.proposal);	//	coerced into Proposal from Promise<Proposal>

	function render(proposal: Proposal) {
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
			let result = get(exploded, proposal);

			// console.log({ exploded, result, proposal });

			pendingTags[x].textContent = result;
		}
	}
})();
