import Project from "@/lib/models/project";

export default function getProjects(): Project[] {
	return [
		{
			id: "theuniverse",
			name: "The Universe Network",
			link: "https://theuniversenetwork.wixsite.com/info",
			description:
				"A Minecraft server of 5k members that focuses on competitive play and building an active social hub where players can interact with each other, while also pushing the boundaries of Minecraft itself.",
			techStack: ["java", "react", "mongodb"],
		},
		{
			id: "echelon",
			name: "Echelon Service",
			link: "",
			description:
				"A community website that handles user authentication, document storage, and other community related features.",
			techStack: ["typescript", "csharp", "react", "mongodb"],
		},
	];
}
