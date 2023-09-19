import { ReactNode } from "react";

type SectionProps = {
	heading?: ReactNode;
	shortHeading?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
	center?: boolean;
};

export default function Section({
	heading,
	shortHeading,
	description,
	children,
	center,
}: SectionProps) {
	return (
		<section
			className={`flex ${center ? "" : "group/section lg:even:justify-end"}`}
		>
			<div
				className={`flex ${
					center ? "justify-center items-center" : ""
				} flex-col gap-y-4 w-full`}
			>
				<div
					className={`flex flex-col gap-y-4 ${
						center ? "" : "lg:group-even/section:text-right"
					}`}
				>
					{heading && (
						<>
							{shortHeading ? (
								<>
									<h1
										className={`${
											center ? "text-center" : ""
										} text-white text-6xl font-bold hidden md:block`}
										tabIndex={0}
									>
										{heading}
									</h1>
									<h1
										className={`${
											center ? "text-center" : ""
										} text-white text-6xl font-bold md:hidden`}
										tabIndex={0}
									>
										{shortHeading}
									</h1>
								</>
							) : (
								<h2
									className={`${
										center ? "text-center" : ""
									} text-white text-6xl font-bold`}
									tabIndex={0}
								>
									{heading}
								</h2>
							)}
						</>
					)}
					{description && (
						<p
							className={`text-justify text-gray-200 text-xl max-w-3xl ${
								center
									? ""
									: "lg:group-even/section:text-right lg:group-even/section:ml-auto"
							} font-semibold`}
							tabIndex={0}
						>
							{description}
						</p>
					)}
				</div>
				{children}
			</div>
		</section>
	);
}
