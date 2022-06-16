import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Transition } from "react-transition-group";

import NavOverlayButton from "@/components/navigation/NavOverlayButton";
import Position from "@/components/Position";
import DarkModeToggle from "@/components/icons/DarkModeToggle";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

const NavOverlay = ({ links, navOverlayOpen, setNavOverlayOpen }) => {
	const router = useRouter();

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
	}, [setNavOverlayOpen]);

	const transitionDuration = 300;
	const defaultStyles = {
		transition: `opacity ${transitionDuration}ms ease-in-out`,
		opacity: 0,
	};

	const transitionStyles = {
		entering: { opacity: 0, display: "flex" },
		entered: { opacity: 1 },
		exiting: { opacity: 0.5 },
		exited: { opacity: 0, display: "none" },
	};

	return (
		<>
			<NavOverlayButton
				navOverlayOpen={navOverlayOpen}
				toggleNavOverlay={toggleNavOverlay}
			/>

			<Transition in={navOverlayOpen} timeout={transitionDuration}>
				{(state) => (
					<nav
						className={`flex justify-center items-center w-full h-screen`}
						style={{
							...defaultStyles,
							...transitionStyles[state],
						}}
					>
						<div
							className={`flex flex-col items-center p-5 rounded-lg bg-white dark:bg-transparent`}
						>
							<Position />
							<div className="flex flex-row space-x-3 mt-2 justify-center text-center items-center">
								<GithubIcon />
								<LinkedinIcon />
								<DarkModeToggle />
							</div>
							<div className="flex flex-col items-center mt-4">
								{links.map((link) => {
									return (
										<Link href={link.href} key={link.label}>
											<a
												className={`text-xl hover:!text-blue-400 link-underline !bg-gradient-to-r from-sky-400 to-blue-600 ${
													router.asPath.split("?")[0] === link.href
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
						</div>
					</nav>
				)}
			</Transition>
		</>
	);
};

export default NavOverlay;
