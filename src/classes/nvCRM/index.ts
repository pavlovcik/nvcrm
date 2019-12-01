import Proposal from "../../types/Proposal";
import crm, { nvCRMi } from "./setup";
import resolver from "./SyncEngine/converter/resolver";


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
	// debugger;
	// let stored: Proposal = crm.sync.store;
	let x = mystery.length;

	let downloaded: Proposal;

	if (x === 1) {
		downloaded = await responders[crm.environment](mystery);
		crm.sync.store = downloaded;
	}
	else downloaded = await responders[crm.environment].apply(crm, [...mystery]);

	// debugger;
	// await crm.sync.convert([stored, downloaded]);
	// crm.sync.store = [stored, downloaded].sort(resolver).pop();   //  @TODO: fix resolver syntax

	return crm
}