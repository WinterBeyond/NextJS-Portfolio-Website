"use server";

import { experiences } from "@/constants/experiences";
import { Experience } from "@/entities/experience";

export async function getExperiences(): Promise<Readonly<Array<Experience>>> {
  return experiences;
}
