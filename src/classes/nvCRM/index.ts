import Proposal from "../../types/Proposal";
import self, { nvCRMi } from "./setup"

export default async function nvCRM(...urls: any[]): Promise<nvCRMi> {	//	string[] | Proposal[] | Project[] | Account[]

	// @FIXME: quite an ugly implementation to make it work on node and browser.
	// Currently can handle URLs passed in (browser) and direct object passed in (node)

	let unidentified = [...urls];	//	wrangle spreads operator

	switch (self.environment) {
		case "browser":
			self.proposal = await self.sync.pull(...urls);
			break;
		case "node":
			if (unidentified.length === 1 && typeof unidentified[0] == "object") {
				// directly passed in ?
				let prop: Proposal = unidentified.shift();
				self.proposal = await self.sync.connect(prop);
			}
			break;
		default:
	}

	return self
}