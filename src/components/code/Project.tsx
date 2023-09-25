import ProjectInterface from "@/lib/models/project";
import CodeIcon from "@/components/icons/CodeIcon";
import Link from "next/link";
import TechStack from "./TechStack";

type ProjectProps = {
	project: ProjectInterface;
};

export default function Project({ project }: ProjectProps) {
	return (
		<>
			{project.link ? (
				<Link
					className="group/project flex gap-x-5 rounded-xl border border-neutral-700 bg-neutral-900 bg-opacity-30 bg-clip-padding p-3 backdrop-blur-lg backdrop-filter hover:border-indigo-500"
					href={project.link}
					target="_blank"
				>
					<div className="flex flex-col gap-y-1">
						<h5 className="text-xl font-bold text-white">
							<CodeIcon />
							<span className="group-hover/project:text-indigo-500">
								{project.name}
							</span>
						</h5>
						<div className="flex flex-wrap gap-3">
							{project.techStack.map((tech) => (
								<TechStack
									key={`${project.id}-${tech}`}
									tech={tech}
								/>
							))}
						</div>
						<span className="text-justify text-sm font-semibold text-gray-200">
							{project.description}
						</span>
					</div>
				</Link>
			) : (
				<div
					className="group/project flex gap-x-5 rounded-xl border border-neutral-700 bg-neutral-900 bg-opacity-30 bg-clip-padding p-3 backdrop-blur-lg backdrop-filter hover:border-indigo-500"
					tabIndex={0}
				>
					<div className="flex flex-col gap-y-1">
						<h5 className="text-xl font-bold text-white">
							<CodeIcon />
							<span className="group-hover/project:text-indigo-500">
								{project.name}
							</span>
						</h5>
						<div className="flex flex-wrap gap-3">
							{project.techStack.map((tech) => (
								<TechStack
									key={`${project.id}-${tech}`}
									tech={tech}
								/>
							))}
						</div>
						<span className="text-justify text-sm font-semibold text-gray-200">
							{project.description}
						</span>
					</div>
				</div>
			)}
		</>
	);
}
