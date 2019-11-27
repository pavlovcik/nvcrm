import Meta from "./Meta";
import Account from "./Account";
import Project from "./Project";

export default interface Proposal {
	meta: Meta;
	account: Account;
	project: Project;
}
