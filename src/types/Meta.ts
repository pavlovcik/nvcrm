export default interface Meta {
	type: "proposal" | "project" | "account";
	updated: string | Date;	//	@TODO: verify whether I should have a union type of "string | Date" ???
	// created: string | Date;	//	@TODO: verify whether I should have a union type of "string | Date" ???
	source: string;
	name: string;
}
