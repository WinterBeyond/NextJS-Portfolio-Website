import { technologies } from "@/constants/technologies";
import { getTechnologyDetails } from "@/data-layer/technology";
import { Technology } from "@/entities/technology";

describe("technologies constant", () => {
  it("should be a frozen array", () => {
    expect(Object.isFrozen(technologies)).toEqual(true);
  });
});

describe("getTechnologyDetails function", () => {
  it("should return all technologies if no argument is passed", async () => {
    const result = await getTechnologyDetails();
    expect(result).toEqual(technologies);
  });

  it("should return specific technologies if an array of techs is passed", async () => {
    const techs: Array<Technology> = ["typescript", "javascript"];
    const expected = technologies.filter((tech) => techs.includes(tech.tech));
    const result = await getTechnologyDetails(techs);
    expect(result).toEqual(expected);
  });
});
