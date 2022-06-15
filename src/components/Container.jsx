import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import NavOverlay from "./navigation/NavOverlay";
import constants from "@/constants/index";

const Container = ({ children, ...metaData }) => {
	const router = useRouter();
	const [navOverlayOpen, setNavOverlayOpen] = useState(false);
	const url = `${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`;

	const links = [
		{ href: "/", label: "Home" },
		{ href: "/about", label: "About" },
		{ href: "/projects", label: "Projects" },
		{ href: "/experience", label: "Experience" },
		{ href: "/blog", label: "Blog" },
		{ href: "/contact", label: "Contact" },
	];

	const meta = {
		siteName: constants.meta.siteName,
		title: constants.meta.title,
		description: constants.meta.description,
		themeColor: constants.meta.themeColor,
		image: constants.meta.image,
		type: "website",
		robots: "all",
		...metaData,
	};

	return (
		<>
			<Head>
				<title>{meta.title}</title>

				<meta charSet="utf-8" />
				<meta
					name="keywords"
					content="web developer, fullstack, backend, software engineer"
				/>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content={meta.themeColor} />
				<meta name="description" content={meta.description} />
				<meta name="robots" content={meta.robots} />

				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content={meta.siteName} />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta property="og:url" content={url} />
				<meta property="og:locale" content="en_US" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />

				<link rel="canonical" href={url} />
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			</Head>
			<main className="w-full selection:bg-blue-500/25 gradient-rainbow dark:bg-none">
				<NavOverlay
					links={links}
					navOverlayOpen={navOverlayOpen}
					setNavOverlayOpen={setNavOverlayOpen}
				/>
				{!navOverlayOpen && (
					<>
						<Navbar links={links} />
						{children}
						<Footer />
					</>
				)}
			</main>
		</>
	);
};

export default Container;
