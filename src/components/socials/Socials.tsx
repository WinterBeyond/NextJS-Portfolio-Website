import LinkedinSocial from "@/components/socials/LinkedinSocial";
import GithubSocial from "@/components/socials/GithubSocial";
import ResumeSocial from "@/components/socials/ResumeSocial";
import EmailSocial from "@/components/socials/EmailSocial";
import DiscordSocial from "@/components/socials/DiscordSocial";
import SpotifySocial from "@/components/socials/SpotifySocial";

export default function Socials() {
	return (
		<div className="flex flex-wrap gap-4">
			<LinkedinSocial />
			<GithubSocial />
			<ResumeSocial />
			<EmailSocial />
			<DiscordSocial />
			<SpotifySocial />
		</div>
	);
}
