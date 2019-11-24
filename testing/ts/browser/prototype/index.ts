import nvCRM from "../../../classes/nvCRM";
import renderTemplates from "./renderTemplates";
import render from "./render";

(async function () {


	let ATTACH_POINT = `client`; //	mounts to window object.
	const attribute = `data-source`;
	const query = `[${attribute}]`;
	let classname = `ready`;
	classname = [` `, classname, ` `].join("");
	const TEMPLATE = `[data-template]`;


	let crm = new nvCRM();

	crm.sync
		.pull(
			`./json/account/index.json`,
			`./json/account/project/index.json`
		)	//	@FIXME: lol currently doesn't save it automatically.
		.then(renderTemplates)
		.then(render);

	window[ATTACH_POINT] = crm;
})();
