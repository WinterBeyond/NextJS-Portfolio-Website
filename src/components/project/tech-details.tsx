import { TechnologyDetails } from "@/entities/technology";
import { cn } from "@/lib/common";

type TechDetailsProps = {
  techDetails: TechnologyDetails;
};

export default async function TechDetails({ techDetails }: TechDetailsProps) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-xs font-extrabold uppercase text-white",
        techDetails.backgroundColor,
      )}
      tabIndex={0}
    >
      {techDetails.label}
    </span>
  );
}
