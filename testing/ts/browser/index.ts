import nvCRM from "../../../classes/nvCRM";
import RenderEngine from "./render/index";

(function () {
	let test = {
		proposal: `json/0086-proposal.json`,
		account: `json/0086-account.json`,
		project: `json/0086-project.json`
	};

	let live = {
		account: `//client.inventumdigital.com:8888/joyre/account.json`,
		scope: `//client.inventumdigital.com:8888/joyre/q1-2020/scope.json`,
		project: `//client.inventumdigital.com:8888/joyre/q1-2020/project.json`,
	};

	nvCRM(test.account, test.project).then(crm => {
		// @TODO: Destructured args
		new RenderEngine(`[data-template]`, crm.proposal).render(`[data-source]`, `ready`);
		window["testFunction"] = testFunction;
		return (window["crm"] = crm);
	});
})();

function testFunction() {
	// @ts-ignore
	crm.sync.push(`api.inventumdigital.com:8888/crm`)
	return this
}