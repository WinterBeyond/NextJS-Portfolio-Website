"use server";

import { technologies } from "@/constants/technologies";
import { Technology, TechnologyDetails } from "@/entities/technology";

export async function getTechnologyDetails(
  techs?: Array<Technology>,
): Promise<Readonly<Array<TechnologyDetails>>> {
  return technologies.filter((tech) => techs?.includes(tech.tech) ?? true);
}
