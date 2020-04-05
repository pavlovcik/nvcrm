import { Environment } from "../setup";
import store from "./store";
import Proposal from "../../../types/Proposal";
export interface Store {
	_state: Proposal
	download: Function;
	upload: Function;
	resolve: Function;
	convert: Function;
	write: Function;
	load: Function;
}

export default function StoreEngine(environment: Environment): Store {
	return store(environment); // Select storage adapter at runtime
}
