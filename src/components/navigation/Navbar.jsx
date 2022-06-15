import Link from "next/link";
import { useRouter } from "next/router";

import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import DarkModeToggle from "@/components/icons/DarkModeToggle";
import Position from "@/components/Position";

const Navbar = ({ links }) => {
	const router = useRouter();

	return (
		<section className="2xl:sticky z-20 bg-white dark:bg-transparent">
			<nav className="2xl:sticky z-20 top-0 left-0 right-0 max-w-6xl mx-auto px-4 py-5 mb-10 md:mb-20 lg:rounded-lg bg-white dark:bg-transparent">
				<div className="flex md:justify-between justify-center items-center">
					<Position />

					{/* Large screens */}
					<div className="flex-row hidden space-x-8 mx-8 items-center md:flex">
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

					<div className="flex-row flex-wrap hidden space-x-2 sm:space-y-1 md:space-x-0 lg:space-y-0 lg:space-x-3 items-center md:flex">
						<GithubIcon />
						<LinkedinIcon />
						<DarkModeToggle />
					</div>
				</div>

				{/* Medium screens */}
				<div className="flex flex-row space-x-6 mx-auto mt-4 justify-center items-center md:hidden">
					<GithubIcon />
					<LinkedinIcon />
					<DarkModeToggle />
				</div>
			</nav>
		</section>
	);
};

export default Navbar;
