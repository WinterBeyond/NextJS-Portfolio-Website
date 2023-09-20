import Project from "@/lib/models/project";

export default function getProjects(): Project[] {
    return [
        {
            id: "theuniverse",
            name: "The Universe Network",
            link: "https://theuniversenetwork.wixsite.com/info",
            description:
                "A Minecraft server of 5k members that focuses on competitive play and building an active social hub where players can interact with each other. I helped develop the infrastructure and network code used to synchronize player data between servers. I also built complex dashboards to visualize player data and logs.",
            techStack: ["java", "typescript", "react", "mongodb", "tailwind"],
        },
        {
            id: "echelon",
            name: "Echelon Service",
            link: "",
            description:
                "A community website that handles user authentication, document storage, and other community related features. I built user-friendly UI and complex data structures to enable engaging community interactions.",
            techStack: ["typescript", "csharp", "react", "mongodb"],
        },
        {
            id: "portfolio",
            name: "Portfolio",
            link: "https://github.com/WinterBeyond/NextJS-Portfolio-Website",
            description:
                "My own personal portfolio website that displays basic information about myself. You are looking at it right now!",
            techStack: ["typescript", "react", "tailwind"],
        },
    ];
}
