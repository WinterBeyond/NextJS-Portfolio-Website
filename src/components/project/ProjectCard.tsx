import Image from "next/image";

type ProjectCardProps = {
	title: string;
	link: string;
	image: string;
	number: number;
}

const ProjectCard = ({ title, link, image, number }: ProjectCardProps) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="w-full block shadow-2xl"
		>
			<div className="relative overflow-hidden">
				<div className="relative mx-1 h-72 shadow-2xl">
					<Image
						src={image}
						alt={title}
						layout="fill"
						className="transform hover:scale-125 transition duration-1000 ease-out object-cover h-full w-full"
					/>
				</div>
				<h2 className="absolute top-5 left-5 text-gray-200 font-bold text-xl bg-blue-500 rounded-md px-2">
					{title}
				</h2>
				<h2 className="absolute bottom-5 left-5 text-gray-200 font-bold text-xl">
					0{number}
				</h2>
			</div>
		</a>
	);
};

export default ProjectCard;
