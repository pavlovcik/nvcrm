import Proposal from "../../../types/Proposal";

export default function render(proposal: Proposal) {

	/**
	 * First this should check the proposal data for any arrays.
	 * If arrays are found (which they will be for services and deliverables then
	 * First the render function should set HTML with the proper attribute names
	 * in the document, and then proceed as normal.
	 */

	let pendingTags = document.querySelectorAll(query);
	let x = pendingTags.length;

	while (x--) {
		let propertyName = pendingTags[x].getAttribute(attribute);

		pendingTags[x].className += classname;
		pendingTags[x].className = pendingTags[x].className.trim();

		console.log(propertyName);

		let result: string | number;

		if (propertyName.includes(`[`)) {

			if (!propertyName.includes(`[]`)) {	//	@TODO: super jank but spending too long on this already
				result = eval(`proposal.${propertyName}`)
				console.log({ result });
			} else continue

		} else {
			let exploded = propertyName.split(`.`);
			result = getSafe(exploded, proposal);
		}
		pendingTags[x].textContent = result.toString();
	}





	/**
	 * This renders everything except for dynamic array lengths and their children,
	 * which is a problem for SERVICES and DELIVERABLES:
	 *
	 * *	project.services[0].title
	 * *	project.services[0].description
	 * *	project.services[0].budget
	 * *	project.services[0].duration.weeks
	 * *	project.services[0].duration.track
	 * *	project.services[0].deliverables[0].title
	 *
	 * @TODO: special dynamic length handler
	 *
	 */

}

function getSafe(p, o) { p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o) }
