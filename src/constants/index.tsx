const constants = {
	username: "WinterBeyond",
	realname: "Max Wiggedal",
	email: "contact@maxwiggedal.dev",
	position: "Full Stack Web Developer",
	avatar: "/logo512.png",
	about: {
		title:
			"Full Stack Web Developer with a passion for innovating and building meaningful applications",
		description: (
			<>
				Well-qualified Full Stack Developer familiar with a wide range of
				programming utilities and languages. Knowledgeable of backend and
				frontend development requirements. Handles any part of the process with
				ease. Collaborative team player with excellent technical abilities.
			</>
		),
	},
	projects: [
		{
			title: "NextJS Portfolio Website",
			image: "/projects/portfolio.png",
			href: "https://maxwiggedal.dev/",
			current: {
				image: {
					width: 1200,
					height: 600,
				},
				classes: "",
			},
		},
		{
			title: "MongoDB Web Dashboard",
			image: "/logo512.png",
			href: "#",
			current: {
				image: {
					width: 1200,
					height: 600,
				},
				classes: "sm:col-span-2",
			},
		},
		{
			title: "1st For Dogs",
			image: "/projects/1stfordogs.png",
			href: "https://1stfordogs.co.uk/",
		},
		{
			title: "Echelon Service SSO",
			image: "/projects/echelonsso.png",
			href: "https://sso.echelonservice.net/",
			current: {
				image: {
					width: 1200,
					height: 600,
				},
				classes: "sm:col-span-1",
			},
		},
	],
	experience: [
		{
			position: "System Administrator",
			company: "Northwood Studios",
			companyLink: "http://northwoodstudios.org/",
			timespan: "2019 - Present",
			description: "I am working on internal tools, APIs, and systems.",
		},
	],
	links: [
		{
			label: "LinkedIn",
			href: "https://linkedin.com/in/max-wiggedal",
		},
		{
			label: "GitHub",
			href: "https://github.com/WinterBeyond",
		},
		{
			label: "CV",
			href: "/cv.pdf",
		},
	],
	techStack: [
		{
			label: "JavaScript",
			image: "/languages/javascript.png",
		},
		{
			label: "TypeScript",
			image: "/languages/typescript.png",
		},
		{
			label: "NodeJS",
			image: "/languages/nodejs.svg",
		},
		{
			label: "React",
			image: "/languages/react.png",
		},
		{
			label: "NextJS",
			image: "/languages/nextjs-black.svg",
			darkImage: "/languages/nextjs-white.svg",
		},
		{
			label: "C#",
			image: "/languages/csharp.png",
		},
		{
			label: "Git",
			image: "/languages/git.png",
		},
		{
			label: "MongoDB",
			image: "/languages/mongodb.png",
		},
		{
			label: "MySQL",
			image: "/languages/mysql.png",
		},
	],
	meta: {
		siteName: "Max Wiggedal",
		title: "Max Wiggedal - Full Stack Web Developer",
		description:
			"Full Stack Web Developer with a passion for innovating and building meaningful applications.",
		themeColor: "#3456c7",
		image: "/logo512.png",
	},
};

export default constants;
