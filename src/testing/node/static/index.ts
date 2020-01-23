import nvCRM from "../../../classes/nvCRM";
import RenderEngine from "./scripts/render/index";
import { nvCRMi } from "../../../classes/nvCRM/setup";
import loadSpreads from "./loadSpreads";
import Proposal from "../../../types/Proposal";

(function () {
	const test = { proposal: `/client/proposal.json`, account: `/client/wami/account.json`, project: `/client/wami/q4-2019/project.json` },
		live = { account: `//client.inventumdigital.com:8888/joyre/account.json`, scope: `//client.inventumdigital.com:8888/joyre/q1-2020/scope.json`, project: `//client.inventumdigital.com:8888/joyre/q1-2020/project.json` };

	nvCRM(test.account, test.project).then(callback);

	function callback(nvcrm: nvCRMi) {
		uiSetup(nvcrm);
		loadSpreads(() => new RenderEngine(`[data-template]`, nvcrm.store.load(), false).render(`[data-source]`, `ready`));
		return (window["crm"] = nvcrm);
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
		document.getElementById(`download_from_server`).onclick = async () => {
			let proposal = await downloadFromServer();
			console.log(JSON.stringify(proposal, null, "\t"));
			new RenderEngine(`[data-template]`, proposal, true).render(`[data-source]`, `ready`);
		};

		function toggleEditMode() {
			editMode = !editMode;
			console.log(`*** quick edit mode toggled ***`);
			let sources = document.querySelectorAll(`[data-source]`);
			let x = sources.length;
			while (x--) sources[x].setAttribute(`contenteditable`, editMode.toString());
		}

		function undoChangeHandler() {
			new RenderEngine(`[data-template]`, nvcrm.store.load(), true).render(`[data-source]`, `ready`);
		}

		async function downloadFromServer() {
			let account = await fetch(test.account);
			let project = await fetch(test.project);
			let proposal = { meta: { type: "TEST", updated: "TEST", source: "TEST", name: "TEST" }, account: await account.json(), project: await project.json() };
			return proposal;
		}

		function saveChangeHandler() {
			/**
			 * For those quick edits!!
			 *  */

			if (editMode) toggleEditMode();

			let changeLog = [];
			let sources = document.querySelectorAll(`[data-source]`);
			let x = sources.length;

			while (x--) {
				let source = sources[x];
				let parsedContent = source.textContent.trim();
				let address = sources[x].getAttribute(`data-source`);
				let before = eval(`crm.store._state.${address}`);
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
					eval(`crm.store._state.${address} = after`); //	update model

					new RenderEngine(`[data-template]`, crm.store._state, true).render(`[data-source]`, `ready`); // @FIXME: check if can use `(nv?)crm.store.load()` or must use `crm.store._state`
				}
			}
			console.log({ changeLog });
			x = changeLog.length;
			if (x) crm.store._state.meta.updated = new Date().toISOString();

			let types = [];
			while (x--) types.push(changeLog[x].type);

			let modifiedCategories = types.filter((item, i, ar) => ar.indexOf(item) === i);

			if (modifiedCategories.includes(`account`)) crm.store._state.account.meta.updated = new Date().toISOString();
			if (modifiedCategories.includes(`project`)) crm.store._state.project.meta.updated = new Date().toISOString();

			console.log(`*** changes saved ***`);
			console.log({ modifiedCategories });
			crm.store.write(crm.store._state);
		}
	}
})();
