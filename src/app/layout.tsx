import { ReactNode } from "react";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import { config as fontawesomeConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
fontawesomeConfig.autoAddCss = false;

const title = "Max Wiggedal - Full Stack Web Developer";
const description =
	"Full Stack Web Developer with a passion for innovating and building meaningful applications.";
const url =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://maxwiggedal.dev";

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title,
	applicationName: "Max Wiggedal",
	description,
	keywords: [
		"software engineer",
		"software developer",
		"web developer",
		"developer",
		"fullstack",
		"backend",
	],
	manifest: "/manifest.json",
	openGraph: {
		type: "website",
		url,
		title,
		siteName: "Max Wiggedal",
		description,
		images: [
			{
				url: "/logo192.png",
			},
		],
	},
	twitter: {
		card: "summary",
		title,
	},
};

type RootLayoutProps = {
	children?: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head />
			<GoogleAnalytics />
			<body className="bg-gradient-to-br from-gray-800 to-black">
				<main className="mx-auto my-28 flex max-w-7xl flex-col gap-48 p-5">
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
}
