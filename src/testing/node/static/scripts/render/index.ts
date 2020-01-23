import Proposal from "../../../../../types/Proposal";
import templatesGenerator from "./templates";

/**
 * First render the templates,
 * then render the proposal.
 */

export default class RenderEngine {

	public render = renderDocument;
	readonly proposal: Proposal = null;

	constructor(query: string, proposal: Proposal, skipTemplates: boolean) {

		// console.trace(this);

		if (!query) throw new Error(`DOM template target query required.`);
		if (!proposal) throw new Error(`Proposal required to render DOM templates.`);

		if (!skipTemplates) templatesGenerator(query, proposal);
		this.proposal = proposal;
	}
}

function renderDocument(query: string, classname: string) {
	const proposal = this.proposal;
	const attribute = query.replace(/[\[|\]]/gim, ``);
	let pendingTags = document.querySelectorAll(query);
	let y = pendingTags.length;

	const get = (p, o) =>
		p.reduce((xs, x) => {
			if (xs) {
				if (xs[x] === 0) return 0;
				if (xs[x]) return xs[x];
				else return "";
			}
		}, o);

	const leftBracketRegEx = new RegExp(/\[/gim);
	const rightBracketRegEx = new RegExp(/\]/gim);

	while (y--) {
		let curry = (function(x: number) {
			return function() {
				let propertyName = pendingTags[x].getAttribute(attribute);
				pendingTags[x].classList.add(classname);

				let replaced = propertyName.replace(leftBracketRegEx, `.`).replace(rightBracketRegEx, ``);

				let parsedPropertyPath = replaced.split(`.`);
				let result = get(parsedPropertyPath, proposal);

				pendingTags[x].textContent = result;

			};
		})(y);

		requestAnimationFrame(curry);
	}
}
