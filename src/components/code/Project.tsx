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
                    className="flex group/project bg-neutral-900 hover:border-indigo-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-neutral-700 rounded-xl p-3 gap-x-5"
                    href={project.link}
                    target="_blank"
                >
                    <div className="flex flex-col gap-y-1">
                        <h5 className="text-white text-xl font-bold">
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
                        <span className="text-gray-200 text-sm text-justify font-semibold">
                            {project.description}
                        </span>
                    </div>
                </Link>
            ) : (
                <div
                    className="flex group/project bg-neutral-900 hover:border-indigo-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-neutral-700 rounded-xl p-3 gap-x-5"
                    tabIndex={0}
                >
                    <div className="flex flex-col gap-y-1">
                        <h5 className="text-white text-xl font-bold">
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
                        <span className="text-gray-200 text-sm text-justify font-semibold">
                            {project.description}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
