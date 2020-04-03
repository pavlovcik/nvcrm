import Meta from "./Meta";

export default interface Service {
	meta: Meta;
	title: string;
	description: string;
	budget: number;
	duration: {
		weeks: number;
		track: number;
	};
	deliverables: Deliverable[];
}
export interface Deliverable {
	title: string;
	description: string;
}