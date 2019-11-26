import Proposal from "../../../types/Proposal";
import { Deliverable, Service } from "../../../types/Project";

export default function renderTemplates(proposal: Proposal) {

	const serializer = new XMLSerializer();
	let foundTemplates = document.querySelectorAll(TEMPLATE);
	let templateType = TEMPLATE.replace(`[`, ``).replace(`]`, ``);
	let x = foundTemplates.length;

	window.deliverablesRenderBuffer = [];	//	index represents which service it is under

	while (x--) {
		let selectedTemplateType = foundTemplates[x].getAttribute(templateType);

		if ("services" === selectedTemplateType) {
			let servicesRenderBuffer = servicesHandler(proposal, foundTemplates, x);

			foundTemplates[x].outerHTML = serializer.serializeToString(servicesRenderBuffer);
			console.log({ deliverablesRenderBuffer: window.deliverablesRenderBuffer });

			// @FIXME: super jank again
			if (window.deliverablesRenderBuffer.length) {

				//	now generate the templates...
				// project.services[x].deliverables[y]

				let deliverablesTemplatized = template(window.deliverablesRenderBuffer);


				function template(array: Deliverable[][]) {
					let dfg = document.createDocumentFragment();
					let x = array.length;
					let y = -1;//	this is the service ID

					let totalDeliverablesCount = 0;
					let a = array.length;
					while (a--) totalDeliverablesCount += array[a].length

					let templateRenderBuffer;
					while (++y < x) {
						let deliverables = array[y];
						let deliverablesLength = deliverables.length;
						let z = -1;

						while (++z < deliverablesLength) {
							// let deliverable = deliverables[z];
							templateRenderBuffer = delivsTemplate(totalDeliverablesCount, foundTemplates[1], y, z);	//	@TODO: lol this is so bad make this right.
							// @FIXME: delivsTemplate is running based on the 6 services over and over again, this loop should not be nested???
							dfg.appendChild(templateRenderBuffer);
						}
					}
					console.log({ dfg })
					return dfg;

					function delivsTemplate(loopCount: number, template: Element, serviceIndex: number, deliverableIndex: number): DocumentFragment {

						let dfg = document.createDocumentFragment();

						while (loopCount--) {
							let cloned = <HTMLElement>template.cloneNode(true);
							cloned.innerHTML = template.innerHTML.replace(/\.services\[\]/igm, `.services[${serviceIndex}]`).trim();
							cloned.innerHTML = cloned.innerHTML.replace(/\.deliverables\[\]/igm, `.deliverables[${deliverableIndex}]`).trim();
							// debugger;
							console.log(cloned.innerHTML);
							dfg.appendChild(cloned)
						}
						return dfg
					}

				}
				debugger;
				if (1 === x) foundTemplates[0].outerHTML = serializer.serializeToString(deliverablesTemplatized);
				else if (0 === x) foundTemplates[1].outerHTML = serializer.serializeToString(deliverablesTemplatized);
			}

		}
	}


	return proposal

	function deliverablesHandler(proposal: Proposal, template: Element, serviceIndex: number) {
		/**
		 * @TODO: make this work
		 * Go through every service and then pull out the deliverables
		 * and render their templates
		 * return array, each index of array is associated with the service the deliverables are under
		 * [
		 * 	[],	//	deliverables for service 0
		 * 	[],	//	deliverables for service 1
		 * 	[],	//	deliverables for service 2
		 * ]
		 */

		let x = serviceIndex;
		let deliverablesInOrderOfService = new Array(x);

		while (x--) {
			let service: Service = proposal.project.services[x];//.deliverables[]
			let deliverables: Deliverable[] = service.deliverables;
			deliverablesInOrderOfService[x] = deliverables
		}


		return deliverablesInOrderOfService
	}

	function servicesHandler(proposal: Proposal, templates: NodeListOf<Element>, index: number) {
		const TAG = "project.services";
		let services: Service[] = getSafe(TAG.split(`.`), proposal);

		let x = services.length;
		let templateRenderBuffer = copyTemplateThisManyTimes(x, templates[index]);

		//
		// @FIXME: JANK
		if (1 === index) {
			window.deliverablesRenderBuffer = deliverablesHandler(proposal, templates[0], x);
		}
		else if (0 === index) {
			window.deliverablesRenderBuffer = deliverablesHandler(proposal, templates[1], x);
			console.log({ deliverablesRenderBuffer: window.deliverablesRenderBuffer });

		}


		// console.log({ deliverablesRenderBuffer });

		return templateRenderBuffer

	}

	function copyTemplateThisManyTimes(amount: number, template: Element): DocumentFragment {
		let dfg = document.createDocumentFragment();
		let index = 0;
		while (amount--) {
			let cloned = <HTMLElement>template.cloneNode(true);
			cloned.innerHTML = template.innerHTML.replace(/\[\]/igm, `[${index++}]`).trim();
			// console.log(cloned.innerHTML);
			dfg.appendChild(cloned)
		}
		return dfg
	}
}

function getSafe(p, o) { p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o) }
