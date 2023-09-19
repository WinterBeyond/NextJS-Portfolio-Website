import ExperienceInterface from "@/lib/models/experience";

type ExperienceProps = {
	experience: ExperienceInterface;
};

export default function Experience({ experience }: ExperienceProps) {
	return (
		<div
			className={`flex group/experience bg-neutral-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border ${
				experience.endDate ? "border-neutral-700" : "border-blue-800"
			} rounded-xl p-3 gap-x-5`}
			tabIndex={0}
		>
			<div>
				<p className="text-gray-400 text-sm font-semibold uppercase">
					{experience.startDate.toLocaleString("default", {
						month: "long",
						year: "numeric",
					})}{" "}
					-{" "}
					{experience.endDate?.toLocaleString("default", {
						month: "long",
						year: "numeric",
					}) ?? "PRESENT"}
				</p>
				<label className="text-white text-2xl font-bold">
					{experience.position}
				</label>
				<h4 className="text-indigo-500 text-lg font-bold">
					{experience.company}
				</h4>

				<span className="text-gray-200 text-sm font-semibold">
					{experience.description}
				</span>
			</div>
		</div>
	);
}
