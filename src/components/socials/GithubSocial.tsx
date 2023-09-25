import Link from "next/link";
import GithubIcon from "@/components/icons/GithubIcon";
import Tooltip from "@/components/Tooltip";

export default function GithubSocial() {
	return (
		<Link
			className="group/social relative"
			href="https://github.com/WinterBeyond/"
			target="_blank"
			aria-label="Github"
		>
			<GithubIcon />
			<Tooltip
				visibleClass="group-hover/social:block"
				text="WinterBeyond"
			/>
		</Link>
	);
}
