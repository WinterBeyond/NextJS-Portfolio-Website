/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/constants/**/*.{js,ts,jsx,tsx}",
		"./src/hooks/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			minHeight: {
				300: "300px",
			},
			backgroundImage: {
				"gradient-white":
					"linear-gradient(transparent, transparent), linear-gradient(#fff, #fff)",
				"gradient-black":
					"linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
			},
		},
	},
	plugins: [],
};
