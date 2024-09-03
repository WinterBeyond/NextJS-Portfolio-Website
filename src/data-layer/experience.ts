"use server";

import { Experience } from "@/entities/experience";

const experiences: Array<Experience> = [
  {
    id: "cypoint",
    description:
      "Working on a product information management system called Inriver, I create extensions and templates to allow the customer to more easily enrich their products. I also perform various other web development tasks with the help of React.",
    company: "Cypoint Inspire",
    position: "Software Engineer",
    startDate: new Date(2022, 9),
  },
  {
    id: "northwood",
    description:
      "Worked on internal tools, APIs, and server infrastructure. While working here I gained experience using C#, PHP, Redis and MySQL. I also gained experience in deploying to a production environment using continuous integration and continuous deployment practices.",
    company: "Northwood Studios",
    position: "System Administrator",
    startDate: new Date(2019, 2),
    endDate: new Date(2022, 7),
  },
];

export async function getExperiences(): Promise<Array<Experience>> {
  return experiences;
}
