import ExperienceCard from "@/components/experience/experience-card";
import { getExperiences } from "@/data-layer/experience";

export default async function ExperienceGrid() {
  const experiences = await getExperiences();

  return (
    <div className="rtl grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {experiences
        .sort((experience) => (experience.endDate ? -1 : 1))
        .map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
    </div>
  );
}
