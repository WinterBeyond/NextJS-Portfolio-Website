import constants from "@/constants/index";
import Image from "next/image";
import { useTheme } from "next-themes";

const TechStack = () => {
	const { theme } = useTheme();

	return (
		<>
			<h2 className="bg-blue-500 text-3xl rounded-md px-2 py-1 my-6 inline-block font-bold text-gray-50">
				Tech Stack
			</h2>
			<div className="flex flex-row flex-wrap">
				{constants.techStack.map((tech) => {
					return (
						<div className="mx-4 my-4" key={`tech-${tech.label}`}>
							<Image
								src={
									theme === "light" ? tech.image : tech.darkImage ?? tech.image
								}
								alt={tech.label}
								width={80}
								height={80}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default TechStack;
