"use server";

import { Technology, TechnologyDetails } from "@/entities/technology";

const technologies: Array<TechnologyDetails> = [
  {
    tech: "typescript",
    label: "TypeScript",
    backgroundColor: "bg-blue-800",
  },
  {
    tech: "javascript",
    label: "JavaScript",
    backgroundColor: "bg-yellow-600",
  },
  {
    tech: "csharp",
    label: "C#",
    backgroundColor: "bg-purple-800",
  },
  {
    tech: "java",
    label: "Java",
    backgroundColor: "bg-sky-600",
  },
  {
    tech: "react",
    label: "React",
    backgroundColor: "bg-blue-600",
  },
  {
    tech: "mongodb",
    label: "MongoDB",
    backgroundColor: "bg-green-600",
  },
  {
    tech: "mysql",
    label: "MySQL",
    backgroundColor: "bg-orange-400",
  },
  {
    tech: "redis",
    label: "Redis",
    backgroundColor: "bg-red-500",
  },
  {
    tech: "tailwind",
    label: "TailwindCSS",
    backgroundColor: "bg-teal-600",
  },
];

export async function getTechnologyDetails(
  techs?: Array<Technology>,
): Promise<Array<TechnologyDetails>> {
  return technologies.filter((tech) => techs?.includes(tech.tech) ?? true);
}
