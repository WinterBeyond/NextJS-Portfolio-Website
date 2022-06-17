import ExperienceCard from "@/components/experience/ExperienceCard";
import constants from "@/constants/index";

const ExperienceList = () => {
	return (
		<>
			<div className="max-w-6xl mx-auto h-48">
				<h1 className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
					Experience
				</h1>
			</div>
			<div className="-mt-4">
				<div className="grid grid-cols-1 max-w-xl mx-auto pt-20">
					{constants.experience.map((exp, id) => (
						<>
							<ExperienceCard
								key={id}
								position={exp.position}
								description={exp.description}
								timespan={exp.timespan}
								company={exp.company}
								companyLink={exp.companyLink}
							/>
							{id !== constants.experience.length - 1 && (
								<div className="divider-container flex flex-col items-center -mt-2">
									<div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
										<div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping" />
									</div>
									<div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2" />
								</div>
							)}
						</>
					))}
				</div>
			</div>
		</>
	);
};

export default ExperienceList;
