import { getTechnologyDetails } from "@/data-layer/technology";
import { Technology } from "@/entities/technology";

import TechDetails from "./tech-details";

type TechStackProps = {
  techs?: Array<Technology>;
};

export default async function TechStack({ techs }: TechStackProps) {
  const techDetails = await getTechnologyDetails(techs);

  return (
    <div className="flex max-w-3xl flex-wrap gap-3">
      {techDetails.map((techDetail) => (
        <TechDetails
          key={`tech-stack-${techDetail.tech}`}
          techDetails={techDetail}
        />
      ))}
    </div>
  );
}
