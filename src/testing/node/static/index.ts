import nvCRM from "../../../classes/nvCRM";
import RenderEngine from "./scripts/render/index";
import { nvCRMi } from "../../../classes/nvCRM/setup";
import loadSpreads from "./loadSpreads";
import Proposal from "../../../types/Proposal";

import global from "./../../../types/global.d";

const ACCOUNT = `kairon-labs`;
const PROJECT = `q2-2020`;
// const ACCOUNT = `wami`;
// const PROJECT = `q4-2019`;

const
	test = {
		proposal: `/clients/proposal.json`,
		account: `/clients/${ACCOUNT}/account.json`,
		project: `/clients/${ACCOUNT}/${PROJECT}/project.json`
	},
	live = {
		account: `//client.inventumdigital.com:8888/joyre/account.json`,
		scope: `//client.inventumdigital.com:8888/joyre/q1-2020/scope.json`,
		project: `//client.inventumdigital.com:8888/joyre/q1-2020/project.json`
	};

const render = { templateId: `[data-template]`, targetId: `[data-source]`, class: `ready` };


(async function () {

	// ( function(){
	let clients = await (await fetch(`/clients/`)).json();
	console.log({ clients });
	// })();


	nvCRM(test.account, test.project).then(callback);

	function callback(nvcrm: nvCRMi) {
		uiSetup(nvcrm);

		loadSpreads(() =>
			new RenderEngine(render.templateId, nvcrm.store.load(), false)
				.render(render.targetId, render.class));

		return (window["app"] = nvcrm);
	}

	function uiSetup(nvcrm: nvCRMi) {
		var editMode = false;

		document.body.addEventListener(`keypress`, e => 13 === e.keyCode && saveChangeHandler());
		document.body.addEventListener(`dblclick`, e => {
			// @ts-ignore
			let tryingToEditThisField = e.path[0].getAttribute(`data-source`) ? e.path[0] : false;
			toggleEditMode();
			if (tryingToEditThisField) tryingToEditThisField.focus();
		});

		document.getElementById(`test_post`).onclick = () => nvcrm.store.upload(`/crm/`);
		document.getElementById(`save_changes`).onclick = saveChangeHandler;
		document.getElementById(`edit_mode`).onclick = toggleEditMode;
		document.getElementById(`undo`).onclick = undoChangeHandler;
		document.getElementById(`download_from_server`).onclick = async () => new RenderEngine(render.templateId, await downloadFromServer(), true).render(render.targetId, render.class);


		function toggleEditMode() {
			editMode = !editMode;
			console.log(`*** quick edit mode toggled ***`);
			let shadowRoots = document.querySelectorAll(`#Spreads>section>article`);
			shadowRoots.forEach(article => {
				let sources = article.shadowRoot.querySelectorAll(render.targetId);
				let x = sources.length;
				while (x--) sources[x].setAttribute(`contenteditable`, editMode.toString());
			});

		}

		function undoChangeHandler() {
			new RenderEngine(render.templateId, nvcrm.store.load(), true).render(render.targetId, render.class);
		}

		function downloadFromServer(...urls: string[]) {
			let downloaded = urls.map(async u => await fetch(u));
			downloaded.map(async o => (await o).json());
			nvCRM(downloaded);
			// let meta = await fetch(test.meta);
			// let account = await fetch(test.account);
			// let project = await fetch(test.project);
			// // let meta = { type: "proposal", updated: "TEST", source: "TEST", name: "TEST" }	// @FIXME: Not sure what to do here or if it matters
			// return {
			// 	meta: await meta.json(),
			// 	account: await account.json(),
			// 	project: await project.json()
			// }
		}

		function saveChangeHandler() {
			/**
			 * For those quick edits!!
			 *  */

			if (editMode) toggleEditMode();

			let changeLog = [];

			let sources = [];

			let shadowRoots = document.querySelectorAll(`#Spreads>section>article`);
			shadowRoots.forEach(article => {
				let singleSourceCollection = article.shadowRoot.querySelectorAll(render.targetId);
				let x = singleSourceCollection.length;

				while (x--) {
					let singleSource = singleSourceCollection[x];
					sources.push(singleSource);	// @FIXME: not sure of behavior of push will it push the entire domstringlist as one element in array?
				}

			});

			let x = sources.length;

			while (x--) {
				let source = sources[x];
				let parsedContent = source.textContent.trim();
				let address = sources[x].getAttribute(`data-source`);
				let before = eval(`app.store._state.${address}`);
				let after = parsedContent;

				if (before != after) {
					//	Caching system required to know if a property value was just changed right now by a user.
					let y = changeLog.length;
					let skipme = false; //	If the property was modified then skip checking all future occurences. @TODO: render and store all instances of property.
					while (y--) {
						if (changeLog[y].address == address) {
							skipme = true;
							break;
						}
					}

					if (skipme) {
						continue;
					}

					let logfile = {
						before,
						after,
						address,
						type: address.split(`.`).shift()
					};

					changeLog.push(logfile);

					console.log(`"${address}" updated from "${before}" to "${after}"!`);
					eval(`app.store._state.${address} = after`); //	update model

					new RenderEngine(render.templateId, app.store._state, true).render(render.targetId, render.class); // @FIXME: check if can use `(nv?)app.store.load()` or must use `app.store._state`
				}
			}
			console.log({ changeLog });
			x = changeLog.length;
			if (x) app.store._state.meta.updated = new Date().toISOString();

			let types = [];
			while (x--) types.push(changeLog[x].type);

			let modifiedCategories = types.filter((item, i, ar) => ar.indexOf(item) === i);

			if (modifiedCategories.includes(`account`)) app.store._state.account.meta.updated = new Date().toISOString();
			if (modifiedCategories.includes(`project`)) app.store._state.project.meta.updated = new Date().toISOString();

			console.log(`*** changes saved ***`);
			console.log({ modifiedCategories });
			app.store.write(app.store._state);
		}
	}
})();
