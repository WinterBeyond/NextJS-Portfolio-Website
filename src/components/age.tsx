"use client";

import { useState } from "react";

import { StoryblokAge } from "@/storyblok-components";

type AgeProps = {
  blok: StoryblokAge;
};

export default function Age({ blok }: AgeProps) {
  const [age] = useState<number>(() => {
    const ageDate = new Date(Date.now() - new Date(2003, 1, 15).getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  });

  return <span>{age}</span>;
}
