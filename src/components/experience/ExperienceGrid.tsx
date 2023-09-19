import getExperiences from "@/lib/getExperiences";
import Experience from "@/components/experience/Experience";

export default function ExperienceGrid() {
	const experiences = getExperiences();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 rtl">
			{experiences
				.sort((experience) => (experience.endDate ? -1 : 1))
				.map((experience) => (
					<Experience key={experience.id} experience={experience} />
				))}
		</div>
	);
}
