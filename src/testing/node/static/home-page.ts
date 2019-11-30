import nvCRM from "../../../classes/nvCRM";
import RenderEngine from "./render/index";
import { nvCRMi } from '../../../classes/nvCRM/setup';

(function () {
	const
		test = {
			proposal: `json/0086-proposal.json`,
			account: `json/0086-account.json`,
			project: `json/0086-project.json`
		},
		live = {
			account: `//client.inventumdigital.com:8888/joyre/account.json`,
			scope: `//client.inventumdigital.com:8888/joyre/q1-2020/scope.json`,
			project: `//client.inventumdigital.com:8888/joyre/q1-2020/project.json`,
		};

	nvCRM(
		test.account,
		test.project
	).then(callback)

	function callback(nvcrm: nvCRMi) {

		new RenderEngine(
			`[data-template]`,
			nvcrm.sync.store
		).render(
			`[data-source]`,
			`ready`
		);

		uiSetup(nvcrm);

		return window["crm"] = nvcrm;
	}


	function uiSetup(nvcrm: nvCRMi) {

		var editMode = false;

		document.getElementById(`test_post`).onclick = () => nvcrm.sync.push(`/crm/`)
		document.getElementById(`save_changes`).onclick = saveChangeHandler;
		document.getElementById(`edit_mode`).onclick = toggleEditMode;
		document.getElementById(`undo`).onclick = undoChangeHandler;


		function toggleEditMode() {
			editMode = !editMode;
			console.log(`*** quick edit mode toggled ***`);
			let sources = document.querySelectorAll(`[data-source]`);
			let x = sources.length;
			while (x--) {
				sources[x].setAttribute(`contenteditable`, editMode.toString());
			}
		}

		function undoChangeHandler(){

			new RenderEngine(
				`[data-template]`,
				nvcrm.sync.store,
				true
			).render(
				`[data-source]`,
				`ready`
			);

			// crm.sync.store = crm.sync.adapter._proposal
		}

		function saveChangeHandler() {

			if (editMode) {
				toggleEditMode();
			}

			/**
			 * For those quick edits!!
			 *  */

			let changeLog = [];

			let sources = document.querySelectorAll(`[data-source]`);
			let x = sources.length;
			while (x--) {
				let source = sources[x];
				let parsedContent = source.textContent.trim();
				let address = sources[x].getAttribute(`data-source`);
				let before = eval(`crm.sync.store.${address}`);
				let after = parsedContent;
				if (before != after) {
					changeLog.push({
						before,
						after,
						address,
						type: address.split(`.`).shift()
					});
					console.log(`"${address}" updated from "${before}" to "${after}"!`);
					before = after;
					eval(`crm.sync.store.${address} = after`);
				}
			}
			console.log({ changeLog });
			x = changeLog.length;
			if (x) crm.sync.store.meta.updated = new Date().toISOString();

			let types = [];
			while (x--) {
				types.push(changeLog[x].type)
			}


			let modifiedCategories = types.filter((item, i, ar) => ar.indexOf(item) === i);

			if (modifiedCategories.includes(`account`)) crm.sync.store.account.meta.updated = new Date().toISOString();
			if (modifiedCategories.includes(`project`)) crm.sync.store.project.meta.updated = new Date().toISOString();

			console.log(`*** changes saved ***`);
			console.log({ modifiedCategories });
			crm.sync.store = crm.sync.adapter._proposal
		}
	}
})();
