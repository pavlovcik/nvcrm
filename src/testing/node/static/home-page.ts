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


		function toggleEditMode() {
			editMode = !editMode;
			console.log(`*** quick edit mode toggled ***`);
			let sources = document.querySelectorAll(`[data-source]`);
			let x = sources.length;
			while (x--) {
				sources[x].setAttribute(`contenteditable`, editMode.toString());
			}
		}

		function saveChangeHandler() {

			if(editMode){
				toggleEditMode();
			}

			/**
			 * For those quick edits!!
			 *  */

			let sources = document.querySelectorAll(`[data-source]`);
			let x = sources.length;
			while (x--) {
				let source = sources[x];
				let parsedContent = source.textContent.trim();
				let address = sources[x].getAttribute(`data-source`);
				let before = eval(`crm.sync.store.${address}`);
				let after = parsedContent;
				if (before != after) {
					console.log(`"${address}" updated from "${before}" to "${after}"!`);
					before = after;
				}
			}
			console.log(`*** changes saved? ***`);
		}
	}
})();
