import Client from "./Client";
import Meta from "./Meta";

export default interface Account {
	meta: Meta;
	client: Client;
	agent: {
		name: string;
		role: string;
		email: string;
	};
}
