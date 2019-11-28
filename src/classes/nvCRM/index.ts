import Proposal from "../../types/Proposal";
import self, { nvCRMi } from "./setup"

const responders = {
	"drive": (o): never => {
		throw new Error(`Google Drive environment responder not implemented.`)
	},
	"unknown": (o): never => {
		throw new Error(`Unknown execution environment.`)
	},
	"browser": async (...urls: string[]): Promise<nvCRMi> => {
		self.proposal = await self.sync.pull(...urls);
		return self
	},
	"node": async (o: any): Promise<nvCRMi> => {
		// directly passed in ?
		if (o.length === 1 && typeof o[0] == "object") {
			let prop: Proposal = o.shift();
			self.proposal = await self.sync.connect(prop);
			return self
		} else throw new Error(`Unexpected object type passed in.`);
	}
};

export default async function nvCRM(...mystery: any): Promise<nvCRMi> {
	let x = mystery.length;
	if (x === 1) {
		return responders[self.environment](mystery)
	} else {
		let flattened = [...mystery];
		return responders[self.environment].apply(self, flattened);
	}
}