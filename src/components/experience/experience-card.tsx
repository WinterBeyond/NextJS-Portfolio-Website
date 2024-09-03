import { type Experience } from "@/entities/experience";
import ClientDate from "../client-date";
import { cn } from "@/lib/common";

type ExperienceCardProps = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div
      className={cn(
        "group/experience backdrop-filtergap-x-5 ltr flex rounded-xl border bg-neutral-900 bg-opacity-30 bg-clip-padding p-3 backdrop-blur-lg",
        experience.endDate ? "border-neutral-700" : "border-blue-800",
      )}
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

        <p className="text-2xl font-bold text-white">{experience.position}</p>

        <h4 className="text-lg font-bold text-indigo-500">
          {experience.company}
        </h4>

        <p className="text-justify text-sm font-semibold text-gray-200">
          {experience.description}
        </p>
      </div>
    </div>
  );
}
