import Link from "next/link";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import Tooltip from "@/components/Tooltip";

export default function LinkedinSocial() {
	return (
		<Link
			className="relative group/social"
			href="https://linkedin.com/in/max-wiggedal/"
			target="_blank"
			aria-label="Linkedin"
		>
			<LinkedinIcon />
			<Tooltip visibleClass="group-hover/social:block" text="Max Wiggedal" />
		</Link>
	);
}
