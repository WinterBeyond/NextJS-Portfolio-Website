"use server";

import { Experience } from "@/entities/experience";

const experiences: Array<Experience> = [
  {
    id: "cypoint",
    description:
      "Creating automated workflows, building ecommerce websites and integrating with product information management systems. Building fullstack applications with React/NextJS.",
    company: "Cypoint Inspire",
    position: "Software Engineer",
    startDate: new Date(2022, 9),
  },
  {
    id: "moonvive-entertainment",
    description:
      "Made important decisions on and deployed server infrastructure. I was also in-charge of the development of base functionality in the codebase.",
    company: "Moonvive Entertainment",
    position: "Backend Engineer",
    startDate: new Date(2023, 1),
    endDate: new Date(2023, 10),
  },
  {
    id: "northwood",
    description:
      "Worked with internal tools, RESTful APIs, maintenance of Linux servers, and database operations.",
    company: "Northwood Studios",
    position: "System Administrator",
    startDate: new Date(2019, 2),
    endDate: new Date(2022, 7),
  },
];

export async function getExperiences(): Promise<Array<Experience>> {
  return experiences;
}
