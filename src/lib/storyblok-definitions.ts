import Age from "@/components/age";
import Media from "@/components/media";
import Page from "@/components/page";
import Resume from "@/components/resume";
import { SbReactComponentsMap } from "@storyblok/react";

const components: SbReactComponentsMap = {
  page: Page,
  resume: Resume,
  media: Media,
  age: Age,
};

export default components;
