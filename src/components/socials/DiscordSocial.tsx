import Link from "next/link";
import DiscordIcon from "@/components/icons/DiscordIcon";
import Tooltip from "@/components/Tooltip";

export default function DiscordSocial() {
	return (
		<Link
			className="group/social relative"
			href="https://discord.com/channels/@me/385829975145578506/"
			target="_blank"
			aria-label="Discord"
		>
			<DiscordIcon />
			<Tooltip
				visibleClass="group-hover/social:block"
				text="winterbeyond"
			/>
		</Link>
	);
}
