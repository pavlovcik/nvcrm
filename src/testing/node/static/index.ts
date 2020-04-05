import RenderEngine from "./scripts/render/index";
import { nvCRMi } from "../../../classes/nvCRM/setup";
import loadSpreads from "./loadSpreads";
import Proposal from "../../../types/Proposal";
import uiSetup, { downloadFromServer } from "./uiSetup";
import { MetaDataTypesAsInterfaces } from "../../../types/Meta";
const CLIENTS_API = `/clients/`;
const render = { templateId: `[data-template]`, targetId: `[data-source]`, class: `ready` };



async function omfg() {
	// const jokeContainer = document.querySelector('.joke-container')


	// }
	// })
}





(async function () {


	async function fetchFileList() {
		return [...await (await fetch(CLIENTS_API)).json()];
	}


	async function fetchFiles(fileURLs = fetchFileList()) {
		const list = await fileURLs;
		  const functionWithPromise = async (URL) : Promise<any>=> { //a function that returns a promise

			// console.log({ URL });

			return Promise.resolve(await (await fetch(URL)).json())

			return Promise.resolve(URL)
		}
		const anAsyncFunction = async item => {
			return functionWithPromise(item)
		}
		const getData = async () => {
			return Promise.all(list.map(item => anAsyncFunction(item)))
		}
		return await getData()
	}


	const files = await fetchFiles();

	// .then(data => {

	uiSetup(CLIENTS_API, render, files);
	// })








	function callback(nvcrm: nvCRMi) {
		// uiSetup(nvcrm);

		loadSpreads(() =>
			new RenderEngine(render.templateId, nvcrm.store.load(), false)
				.render(render.targetId, render.class));

		return (window["app"] = nvcrm);
	}


})();

// function grabClientFiles(urls: string[]) {
// 	// debugger;
// 	const proposal = downloadFromServer(urls);
// 	console.log({ proposal });
// 	debugger;

// 	// new RenderEngine(render.templateId, proposal, true)
// 	//     .render(render.targetId, render.class);
// }