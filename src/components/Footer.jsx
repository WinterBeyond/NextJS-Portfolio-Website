import constants from "@/constants/index";
import Github from "@/components/socials/Github";
import Linkedin from "@/components/socials/Linkedin";

const Footer = () => {
	return (
		<footer className="max-w-6xl mx-auto px-4 py-4 border-t-gray-700 border-t">
			<div className="flex flex-col justify-between space-y-4 md:space-y-0 md:flex-row md:items-center">
				<p>&copy; {constants.realname}. All Rights Reserved.</p>
				<div className="flex flex-row space-x-3 items-center">
					<Github />
					<Linkedin />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
