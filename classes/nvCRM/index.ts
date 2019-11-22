
import Account from '../../types/Account';
import Project from "../../types/Project";
import Proposal from "../../types/Proposal";

import SyncEngine from "./sync";

import get from "./get";
import downloadAll from "./getParallel";

import compileProposal from "./compileProposal"
import validateDatatype from "./validateDatatype"
import Meta from '../../types/Meta';

let VERSION = require("../../package.json");
VERSION = VERSION.version ? VERSION.version : null;

export default class nvCRM {
	public environment: "browser" | "node" = window ? "browser" : "node"; //	execution context, @TODO: not sure if "drive" is a required environment?
	public version: string | null = VERSION;
	public proposal: Proposal | Promise<Proposal>;
	public sync: SyncEngine = new SyncEngine(this);

	constructor() {



		// proposalId: string, accountId: string, projectId: string


		// debugger;

		// initialize(this);	//	@FIXME: antipattern, but better that it handles pulling data behind the scenes I think.

		// async function initialize(nvCRM: nvCRM) {
		// 	nvCRM.proposal = await downloadAll(...urls)
		// 		.then(identify)
		// 		.then(organize);
		// }



	}

}
