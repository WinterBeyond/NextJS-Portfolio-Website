import constants from "@/constants/index";
import Link from "next/link";
import { useRouter } from "next/router";

import Github from "@/components/socials/Github";
import Linkedin from "@/components/socials/Linkedin";
import DarkModeToggle from "@/components/DarkModeToggle";

const Navbar = ({ links }) => {
	const router = useRouter();

	return (
		<nav className="max-w-6xl mx-auto px-4 py-10 md:py-20">
			<div className="flex md:justify-between justify-center items-center">
				<div className="flex flex-col">
					<Link href="/">
						<a className="flex flex-col items-center justify-center md:items-start md:justify-start">
							<h1 className="font-semibold text-xl dark:text-gray-100">
								{constants.realname}
							</h1>
							<p className="text-base font-light text-gray-500 dark:text-gray-300">
								{constants.position}
							</p>
						</a>
					</Link>
				</div>

				{/* Large screens */}
				<div className="flex-row hidden space-x-8 mx-8 items-center md:flex">
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

				<div className="flex-row hidden space-x-3 items-center md:flex">
					<Github />
					<Linkedin />
					<DarkModeToggle />
				</div>
			</div>

			{/* Medium screens */}
			<div className="flex flex-row space-x-6 mx-auto mt-4 justify-center items-center md:hidden">
				<Github />
				<Linkedin />
				<DarkModeToggle />
			</div>
		</nav>
	);
};

export default Navbar;
