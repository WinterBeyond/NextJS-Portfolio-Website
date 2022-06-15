import constants from "@/constants/index";
import Link from "next/link";

const Position = () => {
	return (
		<div className="flex flex-col">
			<Link href="/">
				<a className="flex flex-col items-center justify-center md:items-start md:justify-start hover:!text-blue-400">
					<h1 className="font-semibold text-xl link-underline !bg-gradient-to-r from-sky-400 to-blue-600">
						{constants.realname}
					</h1>
					<p className="text-base font-light text-gray-500 dark:text-gray-300">
						{constants.position}
					</p>
				</a>
			</Link>
		</div>
	);
};

export default Position;
