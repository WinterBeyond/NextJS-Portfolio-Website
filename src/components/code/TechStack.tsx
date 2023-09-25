type TechStackProps = {
	tech: string;
};

type Technology = {
	[key: string]: {
		label: string;
		backgroundColor: string;
	};
};

export default function TechStack({ tech }: TechStackProps) {
	const technologies: Technology = {
		typescript: {
			label: "TypeScript",
			backgroundColor: "bg-blue-800",
		},
		javascript: {
			label: "JavaScript",
			backgroundColor: "bg-yellow-600",
		},
		csharp: {
			label: "C#",
			backgroundColor: "bg-purple-800",
		},
		java: {
			label: "Java",
			backgroundColor: "bg-sky-600",
		},
		react: {
			label: "React",
			backgroundColor: "bg-blue-600",
		},
		mongodb: {
			label: "MongoDB",
			backgroundColor: "bg-green-600",
		},
		mysql: {
			label: "MySQL",
			backgroundColor: "bg-orange-400",
		},
		redis: {
			label: "Redis",
			backgroundColor: "bg-red-500",
		},
		tailwind: {
			label: "TailwindCSS",
			backgroundColor: "bg-teal-600",
		},
	};

	return (
		<span
			className={`text-white ${technologies[tech].backgroundColor} rounded-md px-2 py-1 text-xs font-extrabold uppercase`}
			tabIndex={0}
		>
			{technologies[tech].label}
		</span>
	);
}
