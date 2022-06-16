const constants = {
	username: "WinterBeyond",
	realname: "Max Wiggedal",
	email: "winterexodius@gmail.com",
	position: "Full Stack Web Developer",
	avatar: "/logo512.png",
	projects: [
		{
			title: "NextJS Portfolio Website",
			timeStart: new Date("2022-06-14"),
			timeEnd: new Date("2022-07-14"),
			description: "",
			current: {
				image: {
					path: "/logo512.png",
					width: 1200,
					height: 600,
				},
				classes: "",
				href: "http://localhost:3000/",
			},
		},
		{
			title: "MongoDB Web Dashboard",
			timeStart: new Date("2022-07-31"),
			timeEnd: new Date("2022-08-31"),
			description: "",
			current: {
				image: {
					path: "/logo512.png",
					width: 1200,
					height: 600,
				},
				classes: "shadow-2xl sm:col-span-2",
				href: "#",
			},
		},
		{
			title: "1st For Dogs",
			timeStart: new Date("2022-05-01"),
			timeEnd: new Date("2022-07-10"),
			description: "",
		},
		{
			title: "Echelon Service SSO",
			timeStart: new Date("2017-01-01"),
			timeEnd: new Date("2021-12-04"),
			description: "",
			current: {
				image: {
					path: "/logo512.png",
					width: 1200,
					height: 600,
				},
				classes: "object-cover sm:col-span-1",
				href: "https://sso.echelonservice.net/",
			},
		},
	],
	experience: [
		{
			position: "System Administrator",
			company: "Northwood Studios",
			companyLink: "http://northwoodstudios.org/",
			timespan: "2019 - Present",
			description: "",
		},
	],
	about: {
		title: "",
		description: ``,
	},
	links: {
		linkedin: "https://linkedin.com/in/max-wiggedal",
		github: "https://github.com/WinterBeyond",
		cv: "",
	},
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
