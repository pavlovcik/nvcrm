import nvCRM from "../../classes/nvCRM";
import Proposal from '../../types/Proposal';
import { Deliverable, Service } from '../../types/Project';



const getSafe = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

let ATTACH_POINT = `client`; //	mounts to window object.
const accountId = `./json/account/index.json`;
const projectId = `./json/account/project/index.json`;


const TEMPLATE = `[data-template]`;
const attribute = `data-source`;
let classname = `ready`;
const query = `[${attribute}]`;

(async function () {

	classname = [` `, classname, ` `].join("");
	let crm = new nvCRM();

	crm.sync.pull(accountId, projectId)	//	@FIXME: lol currently doesn't save it automatically.
		.then(renderTemplates)
		.then(render);

	window[ATTACH_POINT] = crm;


	function renderTemplates(proposal: Proposal) {
		let templates = document.querySelectorAll(TEMPLATE);
		// let dfg = document.createDocumentFragment();

		const templateHandler = {
			deliverables: function deliverablesHandler(proposal: Proposal, template: HTMLElement) {
				// console.log(this);
			},
			services: function servicesHandler(proposal: Proposal, template: HTMLElement) {
				// console.log(this);
				const TAG = "project.payload.services";
				let services: Service[] = getSafe(TAG.split(`.`), proposal);
				let x = services.length;
				let templateRenderBuffer = copyTemplateThisManyTimes(x, template);
				return templateRenderBuffer
				// dfg.appendChild(ol);
				function copyTemplateThisManyTimes(amount: number, template: HTMLElement) {
					let dfg = document.createDocumentFragment();
					let index = 0;
					while (amount--) {
						let cloned = <HTMLElement>template.cloneNode(true);
						cloned.innerHTML = template.innerHTML.replace(/\[\]/igm, `[${index++}]`);
						dfg.appendChild(cloned)
					}
					return dfg
				}
				// let ol = document.createElement(`OL`);
				// let _serviceTemplate = document.createElement(`LI`);
				// let y = 0;
				// let tags = [];

				// while (x--) {
				// 	tags.push(`${TAG}[${y++}]`);
				// 	// let serviceTemplate = _serviceTemplate.cloneNode();
				// 	// serviceTemplate.textContent = JSON.stringify(services[x]);
				// 	// serviceTemplate.textContent = services[x];
				// 	// ol.appendChild(serviceTemplate);
				// }
			}
		};

		let attributeNameOfTemplate = TEMPLATE.replace(`[`, ``).replace(`]`, ``);
		let x = templates.length;
		let output = {};
		while (x--) {
			let selection = templates[x].getAttribute(attributeNameOfTemplate);
			output[selection] = templateHandler[selection](proposal, templates[x]);
			if ("services" === selection) {
				console.log({
					output: output[selection],
					template: templates[x]
				});
				// debugger;
				const serializer = new XMLSerializer();
				const outputHTML = serializer.serializeToString(output[selection]);
				// let outputHTML = output[selection].innerHTML;
				// debugger;
				templates[x].outerHTML = outputHTML
				// console.log({
				// 	targetHTML,
				// 	outputHTML
				// });
				// targetHTML = outputHTML
				// document.insertBefore(
				// output[selection], templates[x]
				// );
			}
		}
		// console.log(output);

		return proposal
	}

	function scoutProposalShape(proposal: Proposal) {

		let pendingTags = document.querySelectorAll(query);
		let x = pendingTags.length;
		let renderBuffer = [];
		let dfg = document.createDocumentFragment();

		while (x--) {
			let propertyName = pendingTags[x].getAttribute(attribute);

			if (propertyName.includes(`[`)) {	//	Gotta loop through the array
				renderBuffer.push(dynamicHtmlCreationForArrays(propertyName))
			}
		}
		console.log(renderBuffer);
		return renderBuffer;

		function dynamicHtmlCreationForArrays(propertyName: string) {

			interface ServiceAndTag { service: Service; tagName: string; }

			let taggedServices: ServiceAndTag[] = [];
			let tagged = false;

			if (!tagged) {
				tagged = true;	//	only tag once.
				const TAG = "project.payload.services";

				let services = getSafe(TAG.split(`.`), proposal);
				taggedServices = tagServices(services, TAG);
			}

			return { propertyName, taggedServices }

			function tagServices(services: Service[], tagName: string): any[] {
				/**
				 * This will open up the services object
				 * project.payload.services[x]
				 */



				let servicesAndTags: ServiceAndTag[] = [];

				let x = services.length;
				let tagIndex = 0;
				// let taggedServices: Service[] = [];
				while (x--) {

					servicesAndTags.push({
						service: services[x],
						tagName: tagName.concat(`[${tagIndex++}]`)
					});
					// let deliverables: Deliverable[] = services[x].deliverables;
					// taggedServices.push(tagDeliverables(deliverables, index, x));
				}
				return servicesAndTags
			}

			function tagDeliverables(deliverables: Deliverable[], masterIndex: number, servicesIndex: number): Service {
				/**
				 * This will open up the deliverables object
				 * project.payload.services[x].deliverables[y]
				 */
				let x = deliverables.length;
				while (x--) {
					let deliverable = deliverables[x];
					console.log(masterIndex, servicesIndex, deliverable);
				}
			}

		}
	}

	function render(proposal: Proposal) {

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

	}
})();
