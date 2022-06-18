import constants from "@/constants/index";
import Image from "next/image";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";

const CurrentProjects = () => {
	const currentProjects = constants.projects.filter(
		(project) => project.current
	);

	return (
		<section className="max-w-6xl mx-auto px-4 py-5 my-44 rounded-lg bg-white dark:bg-transparent">
			<div className="flex flex-col md:flex-row justify-between items-center md:pt-20 mx-10">
				<h1 className="text-3xl md:text-6xl lg:text-9xl max-w-lg font-bold my-6 md:my-8 text-gray-400 md:text-gray-200 dark:text-gray-700 text-center lg:text-left">
					Current Projects
				</h1>
				<ArrowUpIcon href="/projects">
					<p>View Projects</p>
				</ArrowUpIcon>
			</div>

			<div className="grid md:grid-cols-3 gap-8 lg:-mt-8 pb-40">
				{currentProjects.map((project, id) => {
					return (
						<a
							href={project.href}
							className={`w-full block col-span-3 h-min shadow-2xl ${project.current.classes}`}
							target={`${project.href !== "#" ? "_blank" : "_self"}`}
							rel="noopener noreferrer"
							key={project.title}
						>
							<div className="relative overflow-hidden">
								<Image
									src={project.image}
									alt={project.title}
									width={project.current.image.width}
									height={project.current.image.height}
									className="transform hover:scale-125 transition duration-1000 ease-out"
								/>
								<h2 className="absolute top-5 left-5 text-gray-200 font-bold text-sm lg:text-xl bg-blue-500 rounded-md px-2">
									{project.title}
								</h2>
								<h2 className="absolute bottom-5 left-5 text-gray-200 font-bold text-xl">
									0{id + 1}
								</h2>
							</div>
						</a>
					);
				})}
			</div>
		</section>
	);
};

export default CurrentProjects;
