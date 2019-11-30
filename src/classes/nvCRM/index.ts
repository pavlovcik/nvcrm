import Proposal from "../../types/Proposal"
import Project from "../../types/Project";
import Account from "../../types/Account";

import crm, { nvCRMi } from "./setup"

const responders = {
	"browser": async (...urls: string[]): Promise<Proposal> => await crm.sync.pull(...urls),
	"node": async (mystery: any[]): Promise<Proposal> => await crm.sync.convert(mystery),
	"drive": (o): never => {
		throw new Error(`Google Drive environment responder not implemented.`)
	},
	"unknown": (o): never => {
		throw new Error(`Unknown execution environment.`)
	},
};

export default async function nvCRM(...mystery: any): Promise<nvCRMi> {
	let proposal: Proposal = crm.sync.store;
	let x = mystery.length;

	if (x === 1) proposal = await responders[crm.environment](mystery);
	else proposal = await responders[crm.environment].apply(crm, [...mystery]);

	crm.sync.store = proposal;
	return crm
}