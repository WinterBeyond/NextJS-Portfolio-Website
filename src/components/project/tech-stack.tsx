import { getTechnologyDetails } from "@/data-layer/technology";
import TechDetails from "./tech-details";
import { Technology } from "@/entities/technology";

type TechStackProps = {
  techs?: Array<Technology>;
};

export default async function TechStack({ techs }: TechStackProps) {
  const techDetails = await getTechnologyDetails(techs);

  return (
    <div className="flex flex-wrap gap-3">
      {techDetails.map((techDetail) => (
        <TechDetails
          key={`tech-stack-${techDetail.tech}`}
          techDetails={techDetail}
        />
      ))}
    </div>
  );
}
