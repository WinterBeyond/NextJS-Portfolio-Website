import Socials from "./socials/Socials";

export default function Footer() {
	return (
		<footer className="flex flex-col md:flex-row justify-between gap-y-2">
			<span className="text-gray-300">
				&copy; {new Date().getFullYear()} Max Wiggedal. All Rights Reserved.
			</span>
			<Socials />
		</footer>
	);
}
