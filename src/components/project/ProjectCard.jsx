import Image from "next/image";

const ProjectCard = ({ title, link, image, number }) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="w-full block shadow-2xl"
		>
			<div className="relative overflow-hidden">
				<div className="h-72 object-cover">
					<Image
						src={image}
						alt={title}
						layout="fill"
						className="transform hover:scale-125 transition duration-1000 ease-out object-cover h-full w-full"
					/>
				</div>
				<h1 className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-red-500 rounded-md px-2">
					{title}
				</h1>
				<h1 className="absolute bottom-10 left-10 text-gray-50 font-bold text-xl">
					0{number}
				</h1>
			</div>
		</a>
	);
};

export default ProjectCard;
