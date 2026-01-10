import { StoryblokPage } from "@/storyblok-components";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

type PageProps = {
  blok: StoryblokPage;
  preview?: boolean;
};

export default function Page({ blok }: PageProps) {
  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)} id="page-content" className="md:overflow-auto">
      {blok.body?.map((nestedBlok, index) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} sectionLevel={index + 1} />
      ))}
    </div>
  );
}
