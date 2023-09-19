import Link from "next/link";
import ResumeIcon from "@/components/icons/ResumeIcon";
import Tooltip from "@/components/Tooltip";

export default function ResumeSocial() {
	return (
		<Link
			className="relative group/social"
			href="/cv.pdf"
			target="_blank"
			aria-label="Resume"
		>
			<ResumeIcon />
			<Tooltip visibleClass="group-hover/social:block" text="CV" />
		</Link>
	);
}
