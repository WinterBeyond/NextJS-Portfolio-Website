import ExperienceInterface from "@/lib/models/experience";
import ClientDate from "../ClientDate";

type ExperienceProps = {
	experience: ExperienceInterface;
};

export default function Experience({ experience }: ExperienceProps) {
	return (
		<div
			className={`group/experience ltr flex border bg-neutral-900 bg-opacity-30 bg-clip-padding backdrop-blur-lg backdrop-filter ${
				experience.endDate ? "border-neutral-700" : "border-blue-800"
			} gap-x-5 rounded-xl p-3`}
			tabIndex={0}
		>
			<div>
				<p className="text-sm font-semibold uppercase text-gray-400">
					<ClientDate
						date={experience.startDate}
						mode="date"
						options={{
							month: "long",
							year: "numeric",
						}}
					/>{" "}
					-{" "}
					{experience.endDate ? (
						<ClientDate
							date={experience.endDate}
							mode="date"
							options={{
								month: "long",
								year: "numeric",
							}}
						/>
					) : (
						"PRESENT"
					)}
				</p>
				<label className="text-2xl font-bold text-white">
					{experience.position}
				</label>
				<h4 className="text-lg font-bold text-indigo-500">
					{experience.company}
				</h4>

				<span className="text-justify text-sm font-semibold text-gray-200">
					{experience.description}
				</span>
			</div>
		</div>
	);
}
