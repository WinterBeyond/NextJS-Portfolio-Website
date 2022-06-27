import constants from "@/constants/index";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

const Footer = () => {
	return (
		<section className="bg-white dark:bg-transparent">
			<footer className="max-w-6xl mx-auto px-4 py-4 mt-10 lg:mt-20 rounded-lg bg-inherit border-t-gray-700 dark:border-t">
				<div className="flex flex-col justify-between space-y-4 sm:space-y-0 sm:flex-row sm:items-center">
					<p>
						&copy; {new Date().getFullYear()} {constants.realname}. All Rights
						Reserved.
					</p>
					<div className="flex flex-row space-x-3 items-center">
						<GithubIcon />
						<LinkedinIcon />
					</div>
				</div>
			</footer>
		</section>
	);
};

export default Footer;
