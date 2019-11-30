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

		let button = document.getElementById(`test_post`);
		button.onclick = () => nvcrm.sync.push(`/crm/`)

		return window["crm"] = nvcrm;
	}

})();
