"use server";

import { Project } from "@/entities/project";
import { getTechnologyDetails } from "./technology";
import { projects } from "@/constants/projects";

export async function getProjects(): Promise<Readonly<Array<Project>>> {
  const techDetails = await getTechnologyDetails();
  return projects(techDetails);
}
