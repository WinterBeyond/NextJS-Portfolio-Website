import { Technology } from "./technology";

export default interface Project {
	id: string;
	name: string;
	link?: string;
	description: string;
	techStack: Technology[];
}
