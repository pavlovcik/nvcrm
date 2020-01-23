import { Environment } from "../setup";
// import converter from "./converter/";
// import resolver from "./converter/resolver";
// import puller from "./network/puller";
// import pusher from "./network/pusher";
import store from "./store/";

export default function SyncEngine(environment: Environment) {
	// public pull = puller;
	// public push = pusher;
	// public resolve = resolver;
	// public convert = converter;
	// private adapter: Function;

	this.get = () => {
		return this.get();
	};
	this.set = proposal => {
		this.set(proposal);
	};

	// constructor{

	return store(environment); // Select storage adapter at runtime
	// }
}
