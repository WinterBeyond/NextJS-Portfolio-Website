import constants from "@/constants/index";
import Link from "next/link";

import TechStack from "@/components/about/TechStack";

const AboutCard = () => {
	return (
		<>
			<div className="max-w-6xl mx-auto">
				<h1 className="text-5xl md:text-9xl font-bold my-10 md:my-20 text-center md:text-left">
					About Me
				</h1>
			</div>
			<div className="-mt-10">
				<div className="text-container max-w-6xl mx-auto pt-20">
					<p
						className="leading-loose text-2xl md:text-4xl font-semibold mx-4"
						style={{ lineHeight: "3rem" }}
					>
						{constants.about.title}
					</p>
				</div>
			</div>
			<div className="px-4">
				<div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
					<div className="inline-flex flex-col">
						<div>
							<h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
								Contact
							</h2>
							<p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
								For any business enquiries{" "}
								<Link href="/contact">
									<a className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300">
										contact me
									</a>
								</Link>
							</p>
						</div>
						<div className="mt-8">
							<h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
								Job Opportunities
							</h2>
							<p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
								I am currently looking for a job, if you believe I am a good
								candidate for your company check my{" "}
								<a
									href={
										constants.links.find((link) => link.label === "CV")?.href
									}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
								>
									CV
								</a>
							</p>
						</div>

						<h2 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
							Socials
						</h2>
						<div className="mt-4 ml-4">
							{constants.links
								.filter((link) => link.label !== "CV")
								.map((link) => {
									return (
										<div
											className="flex flex-row justify-start items-center"
											key={`social-${link.label}`}
										>
											<a
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="flex flex-row items-center space-x-4"
											>
												<div className="my-4">&rarr;</div>
												<p className="text-lg text-gray-500 link-underline bg-gradient-black dark:bg-gradient-white font-mono relative overflow-hidden dark:text-gray-300">
													{link.label}
												</p>
											</a>
										</div>
									);
								})}
						</div>
					</div>

					<div className="col-span-1 md:col-span-2">
						<p className="text-xl text-gray-700 mb-4 dark:text-gray-300 ">
							{constants.about.description}
						</p>

						<TechStack />
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutCard;
