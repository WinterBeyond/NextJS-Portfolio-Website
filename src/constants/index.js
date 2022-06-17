const constants = {
	username: "WinterBeyond",
	realname: "Max Wiggedal",
	email: "winterexodius@gmail.com",
	position: "Full Stack Web Developer",
	avatar: "/logo512.png",
	about: {
		title:
			"Full Stack Web Developer with a passion for innovating and building meaningful applications",
		description: (
			<>
				I am a full stack developer focusing on back end development. I have a
				passion for innovating and building meaningful applications.
			</>
		),
	},
	projects: [
		{
			title: "NextJS Portfolio Website",
			image: "/logo512.png",
			href: "https://maxwiggedal.dev/",
			description: "",
			current: {
				image: {
					path: "/logo512.png",
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
			description: "",
			current: {
				image: {
					path: "/logo512.png",
					width: 1200,
					height: 600,
				},
				classes: "shadow-2xl sm:col-span-2",
			},
		},
		{
			title: "1st For Dogs",
			image: "/logo512.png",
			href: "#",
			description: "",
		},
		{
			title: "Echelon Service SSO",
			image: "/logo512.png",
			href: "https://sso.echelonservice.net/",
			description: "",
			current: {
				image: {
					path: "/logo512.png",
					width: 1200,
					height: 600,
				},
				classes: "object-cover sm:col-span-1",
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
			href: "",
		},
	],
	techStack: [
		{
			label: "JavaScript",
			image: "/javascript.png",
		},
		{
			label: "TypeScript",
			image: "/typescript.png",
		},
		{
			label: "NodeJS",
			image: "/nodejs.png",
		},
		{
			label: "React",
			image: "/react.png",
		},
		{
			label: "C#",
			image: "/csharp.png",
		},
		{
			label: "Git",
			image: "/git.png",
		},
		{
			label: "MySQL",
			image: "/mysql.png",
		},
		{
			label: "MongoDB",
			image: "/mongodb.png",
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
