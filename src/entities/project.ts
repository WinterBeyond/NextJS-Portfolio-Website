import { TechnologyDetails } from "./technology";

export type Project = {
  id: string;
  name: string;
  link?: string;
  description: string;
  techStack: Readonly<Array<TechnologyDetails>>;
};
