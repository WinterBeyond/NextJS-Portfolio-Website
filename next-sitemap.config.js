/** @type {import("next-sitemap").IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000",
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
	},
};
