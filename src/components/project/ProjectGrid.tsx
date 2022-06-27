import constants from "@/constants/index";
import ProjectCard from "@/components/project/ProjectCard";

const ProjectGrid = () => {
	return (
		<section className="max-w-6xl mx-auto">
			<h1 className="text-5xl md:text-9xl font-bold my-10 md:my-20 text-center md:text-left">
				Projects
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20 pb-40">
				{constants.projects.map((project, id) => (
					<ProjectCard
						key={`project-${id}`}
						title={project.title}
						link={project.href}
						image={project.image}
						number={id + 1}
					/>
				))}
			</div>
		</section>
	);
};

export default ProjectGrid;
