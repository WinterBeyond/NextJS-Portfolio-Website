import Link from "next/link";
import EmailIcon from "@/components/icons/EmailIcon";
import Tooltip from "@/components/Tooltip";

export default function EmailSocial() {
	return (
		<Link
			className="relative group/social"
			href="mailto:contact@maxwiggedal.dev"
			aria-label="Email"
		>
			<EmailIcon />
			<Tooltip
				visibleClass="group-hover/social:block"
				text="contact@maxwiggedal.dev"
			/>
		</Link>
	);
}
