import Meta from "./Meta";

export interface Deliverable {
	title: string;
	description: string;
}

export interface Service {
	title: string;
	description: string;
	budget: number;
	duration: {
		weeks: number;
		track: number;
	};
	deliverables: Deliverable[];
}

export default interface Project {
	meta: Meta;
	title: string;
	start: Date;
	deposit: number;
	reason: string;
	services: Service[];
}
