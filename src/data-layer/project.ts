"use server";

import { projects } from "@/constants/projects";
import { Project } from "@/entities/project";

import { getTechnologyDetails } from "./technology";

export async function getProjects(): Promise<Readonly<Array<Project>>> {
  const techDetails = await getTechnologyDetails();
  return projects(techDetails);
}
