import Link from "next/link";
import { Suspense } from "react";

import Section from "@/components/section";
import ExperienceGrid from "@/components/experience/experience-grid";
import ProjectGrid from "@/components/project/project-grid";
import SpotifySongGrid from "@/components/spotify/spotify-song-grid";
import TypeAnimation from "@/components/type-animation";
import TechStack from "@/components/project/tech-stack";
import ErrorBoundary from "@/components/error-boundary";
import Age from "@/components/age";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <>
      <Section
        center
        heading={
          <>
            Hello, my name is{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Max
            </span>
          </>
        }
        shortHeading={
          <>
            Hey, I&apos;m{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Max
            </span>
          </>
        }
        description={
          <>
            I am a <Age /> year old{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
              Software Engineer
            </span>{" "}
            from Sweden, I have a passion for gaming and continuously improving
            my programming skills. I can build both backend and frontend
            applications, and manage the whole process on my own. I have a
            strong technical ability and I also have experience in cloud
            environments.
          </>
        }
      ></Section>
      <Section
        center
        heading={
          <TypeAnimation
            textList={[
              "Software Engineer",
              "Innovator",
              "Tech Enthusiast",
              "Gamer",
            ]}
            typeSpeed={150}
            eraseSpeed={100}
          />
        }
      />
      <Section
        heading="Tech Stack"
        description="These are the programming languages and technologies that I work with frequently."
      >
        <TechStack />
      </Section>
      <Section
        heading="Experience"
        description="Positions that I have held during my career."
      >
        <ExperienceGrid />
      </Section>
      <Section
        heading="Projects"
        description="I love working on projects within various communities, as well as working on my own personal projects."
      >
        <ProjectGrid />
      </Section>
      <Section
        center
        heading="Music"
        description={
          <>
            Below are my top 12 most listened to tracks on{" "}
            <Link
              href="https://open.spotify.com/user/4lcnka5zo2n9bbwqcmzao4ppi/"
              className="font-bold text-green-500 hover:text-opacity-75"
              target="_blank"
              prefetch={false}
            >
              Spotify
            </Link>{" "}
            the past month.
          </>
        }
      >
        <ErrorBoundary
          fallback={
            <span className="text-lg font-bold text-red-500">
              Unable to fetch songs!
            </span>
          }
        >
          <Suspense fallback={<>Loading...</>}>
            <SpotifySongGrid />
          </Suspense>
        </ErrorBoundary>
      </Section>
    </>
  );
}
