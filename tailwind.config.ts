import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "media",
	theme: {
		fontFamily: {
			display: ["Inter", "system-ui", "sans-serif"],
			body: ["Inter", "system-ui", "sans-serif"],
		},
		extend: {
			colors: {
				discord: "#5865f2",
				spotify: "#1ed760",
			},
		},
	},
	plugins: [],
};

export default config;
