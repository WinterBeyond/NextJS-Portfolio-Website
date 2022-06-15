import constants from "@/constants/index";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

const Footer = () => {
	return (
		<footer className="max-w-6xl mx-auto px-4 py-4 mt-10 lg:mt-20 rounded-lg bg-white border-t-gray-700 border-t dark:bg-transparent dark:!border-t-transparent">
			<div className="flex flex-col justify-between space-y-4 sm:space-y-0 sm:flex-row sm:items-center">
				<p>&copy; {constants.realname}. All Rights Reserved.</p>
				<div className="flex flex-row space-x-3 items-center">
					<GithubIcon />
					<LinkedinIcon />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
