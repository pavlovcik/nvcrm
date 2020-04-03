import Client from "./Client";
import Proposal from "./Proposal";
import Project from "./Project";
import Service from "./Service";
import Account from "./Account";

export type MetaDataTypesAsStrings = "client" | "proposal" | "account" | "project" | "service" | "meta";
export type MetaDataTypesAsInterfaces = Client | Proposal | Account | Project | Service | Meta;

export default interface Meta {
	type: MetaDataTypesAsStrings;
	updated: string | Date;	//	@TODO: verify whether I should have a union type of "string | Date" ???
	// created: string | Date;	//	@TODO: verify whether I should have a union type of "string | Date" ???
	source: string;
	name: string;
}
