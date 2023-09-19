type TechStackProps = {
	tech: string;
};

export default function TechStack({ tech }: TechStackProps) {
	const technologies: any = {
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
	};

	return (
		<span
			className={`text-white ${technologies[tech].backgroundColor} rounded-md text-xs font-extrabold px-2 py-1 uppercase`}
			tabIndex={0}
		>
			{technologies[tech].label}
		</span>
	);
}
