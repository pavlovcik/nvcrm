import Meta from "./Meta";

export default interface Account {
	meta: Meta;
	type: string;
	client: {
		contact: {
			name: string;
			role: string;
			email: string;
			address: string;
			phone: string;
		};
		entity: {
			dba: string;
			name: string;
		};
	};
	agent: {
		name: string;
		role: string;
		email: string;
	};
}
