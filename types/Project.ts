import Meta from "./Meta";

interface Deliverable {
	title: string;
	description: string;
}

interface Service {
	title: string;
	description: string;
	budget: number;
	duration: {
		weeks: number;
		track: number;
	};
	deliverables: Deliverable[];
}

interface Payload {
	type: string;
	title: string;
	start: Date;
	deposit: number;
	reason: string;
	services: Service[];
}

export default interface Project {
	meta: Meta;
	payload: Payload;
}
