import Meta from "./Meta";
import Service from "./Service";

export default interface Project {
	meta: Meta;
	start: string | Date;
	deposit: number;
	reason: string;
	services: Service[];
}
