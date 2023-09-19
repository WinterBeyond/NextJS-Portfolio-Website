export const revalidate = 3000;

import Link from "next/link";
import { Suspense } from "react";

import Section from "@/components/Section";
import Socials from "@/components/socials/Socials";
import ExperienceGrid from "@/components/experience/ExperienceGrid";
import ProjectGrid from "@/components/code/ProjectGrid";
import SpotifySongGrid from "@/components/spotify/SpotifySongGrid";
import TypeAnimation from "@/components/TypeAnimation";
import TechStack from "@/components/code/TechStack";
import PokedexDataTable from "@/components/PokedexDataTable";

export default function LandingPage() {
	const getAge = () => {
		const ageDate = new Date(Date.now() - new Date(2003, 1, 15).getTime());
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	return (
		<>
			<Section
				center
				heading={
					<>
						Hello, my name is{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
							Max
						</span>
					</>
				}
				shortHeading={
					<>
						Hey, I&apos;m{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
							Max
						</span>
					</>
				}
				description={
					<>
						I am a {getAge()} year old{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-600">
							Software Engineer
						</span>{" "}
						from Sweden, I have a passion for gaming and continuously improving
						my programming skills. I can build both backend and frontend
						applications, and manage the whole process on my own. I have a
						strong technical ability and I also have experience in cloud
						environments.
					</>
				}
			>
				<Socials />
			</Section>
			<Section
				center
				heading={
					<TypeAnimation
						textList={[
							"Software Engineer",
							"Innovator",
							"Tech Enthusiast",
							"Gamer",
						]}
						typeSpeed={150}
						eraseSpeed={100}
					/>
				}
			/>
			<Section
				heading="Tech Stack"
				description="These are the programming languages and technologies that I work with frequently."
			>
				<div className="flex flex-wrap gap-3">
					<TechStack tech="typescript" />
					<TechStack tech="javascript" />
					<TechStack tech="csharp" />
					<TechStack tech="java" />
					<TechStack tech="react" />
					<TechStack tech="mongodb" />
					<TechStack tech="mysql" />
					<TechStack tech="redis" />
				</div>
			</Section>
			<Section
				heading="Experience"
				description="Positions that I have held during my career."
			>
				<ExperienceGrid />
			</Section>
			<Section
				heading="Projects"
				description="I love working on projects within various communities, as well as working on my own personal projects."
			>
				<ProjectGrid />
			</Section>
			<Section
				heading="Responsive DataTable"
				description={
					<>
						<span>
							A React component I built that supports pagination and fetching
							data from an API. The example below is simply displaying sample
							data of pokemons.
						</span>
						<br />
						<br />
						<Link
							href="https://github.com/WinterBeyond/NextJS-Portfolio-Website/blob/main/src/components/DataTable.tsx"
							target="_blank"
							className="bg-neutral-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-neutral-700 py-2 px-2 rounded-lg text-blue-500 hover:text-blue-600"
						>
							View DataTable Code
						</Link>
					</>
				}
			>
				<PokedexDataTable />
			</Section>
			<Section
				center
				heading="Music"
				description={
					<>
						Below are my top 12 most listened to tracks on{" "}
						<Link
							href="https://open.spotify.com/user/4lcnka5zo2n9bbwqcmzao4ppi/"
							className="text-green-500 hover:text-opacity-75 font-bold"
						>
							Spotify
						</Link>{" "}
						the past month.
					</>
				}
			>
				<Suspense fallback={<>Loading songs...</>}>
					<SpotifySongGrid />
				</Suspense>
			</Section>
		</>
	);
}
