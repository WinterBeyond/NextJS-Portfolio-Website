import getProjects from "@/lib/getProjects";
import Project from "@/components/code/Project";

export default function ProjectGrid() {
	const projects = getProjects();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
			{projects.map((project) => (
				<Project key={project.id} project={project} />
			))}
		</div>
	);
}
