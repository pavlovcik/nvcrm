import get from "./get";

import Account from "../../types/Account";
import Project from "../../types/Project";
import Proposal from "../../types/Proposal";

import SyncEngine from "./sync";
import compileProposal from "./compileProposal"

let VERSION = require("../../package.json");
VERSION = VERSION.version ? VERSION.version : null;

export default class nvCRM {
	public environment: "browser" | "node" = window ? "browser" : "node"; //	execution context, @TODO: not sure if "drive" is a required environment?
	public version: string | null = VERSION;
	public proposal: Proposal | Promise<Proposal>;
	public sync: SyncEngine = new SyncEngine(this);

	constructor(accountId: string, projectId: string) {
		this.proposal = this.initialize(this, accountId, projectId);
	}

	private async  initialize(app: nvCRM, accountURL: string, scopeURL: string) {
		let account: Account = await get(accountURL);
		let project: Project = await get(scopeURL);
		return app.proposal = compileProposal(app, account, project);
	}
}
