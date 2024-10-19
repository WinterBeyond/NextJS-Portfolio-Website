import Link from "next/link";

import CodeIcon from "@/components/icons/code-icon";
import { Project } from "@/entities/project";

import TechDetails from "./tech-details";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <>
      {project.link ? (
        <Link
          className="group/project flex gap-x-5 rounded-xl border border-neutral-700 bg-neutral-900/30 bg-clip-padding p-3 backdrop-blur-lg hover:border-indigo-500"
          href={project.link}
          target="_blank"
          prefetch={false}
        >
          <ProjectCardContent project={project} />
        </Link>
      ) : (
        <div
          className="group/project flex gap-x-5 rounded-xl border border-neutral-700 bg-neutral-900/30 bg-clip-padding p-3 backdrop-blur-lg hover:border-indigo-500"
          tabIndex={0}
        >
          <ProjectCardContent project={project} />
        </div>
      )}
    </>
  );
}

function ProjectCardContent({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <h5 className="text-xl font-bold text-white">
        <CodeIcon />
        <span className="group-hover/project:text-indigo-500">
          {project.name}
        </span>
      </h5>
      <div className="flex flex-wrap gap-3">
        {project.techStack.map((techDetails) => (
          <TechDetails
            key={`${project.id}-${techDetails.tech}`}
            techDetails={techDetails}
          />
        ))}
      </div>
      <span className="text-justify text-sm font-semibold text-gray-200">
        {project.description}
      </span>
    </div>
  );
}
