import ProjectCard from "@/components/project/project-card";
import { getProjects } from "@/data-layer/project";

export default async function ProjectGrid() {
  const projects = await getProjects();

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
