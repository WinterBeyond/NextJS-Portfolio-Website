import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import NavOverlayButton from "@/components/navigation/NavOverlayButton";

const NavOverlay = ({ children, links }) => {
	const router = useRouter();
	const navOverlay = useRef(null);
	const [navOverlayOpen, setNavOverlayOpen] = useState(false);

	const toggleNavOverlay = () => {
		setNavOverlayOpen(!navOverlayOpen);
	};

	useEffect(() => {
		const handleResize = () => {
			const browserZoomLevel = Math.round(window.devicePixelRatio * 100);
			if (browserZoomLevel <= 250) setNavOverlayOpen(false);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<NavOverlayButton
				navOverlayOpen={navOverlayOpen}
				toggleNavOverlay={toggleNavOverlay}
			/>

			{navOverlayOpen ? (
				<nav
					ref={navOverlay}
					className="flex justify-center items-center w-full h-screen transform delay-100 transition-all duration-300 md:hidden"
				>
					<div className="flex flex-col items-center">
						{links.map((link) => {
							return (
								<Link href={link.href} key={link.href}>
									<a
										className={`text-xl hover:!text-blue-400 link-underline !bg-gradient-to-r from-sky-400 to-blue-600 ${
											router.asPath.startsWith(link.href)
												? "text-gray-800 dark:text-gray-200 underline font-bold"
												: "text-gray-800 dark:text-gray-200 font-normal"
										}`}
									>
										{link.label}
									</a>
								</Link>
							);
						})}
					</div>
				</nav>
			) : (
				children
			)}
		</>
	);
};

export default NavOverlay;
