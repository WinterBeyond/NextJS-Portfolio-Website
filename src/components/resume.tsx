"use client";

import { motion, Variants } from "framer-motion";
import { Briefcase, Building2, Code2, Download, Globe, Languages, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSiteConfig } from "@/contexts/site-config-provider";
import { cn } from "@/lib/common";
import { StoryblokExperience, StoryblokProject, StoryblokResume, StoryblokSkills } from "@/storyblok-components";
import { ISbStoryData } from "@storyblok/react/rsc";

import ClientDate from "./client-date";
import GithubIcon from "./icons/github-icon";
import LinkedinIcon from "./icons/linkedin-icon";
import { ImageCarousel } from "./image-carousel";
import RichText from "./richtext";

type ResumeProps = {
  blok: StoryblokResume;
};

export default function Resume({ blok }: ResumeProps) {
  const siteConfig = useSiteConfig();
  const experience = blok.experience as unknown as Array<ISbStoryData<StoryblokExperience>>;
  const projects = blok.projects as unknown as Array<ISbStoryData<StoryblokProject>>;
  const skills = blok.skills?.[0] as unknown as ISbStoryData<StoryblokSkills>;
  const languages = blok.languages;

  // Generate initials from name
  const initials =
    siteConfig?.story.content.site_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "??";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-card text-card-foreground rounded-2xl shadow-xl border border-border/50 overflow-hidden"
    >
      <motion.div
        variants={itemVariants}
        className="relative bg-linear-to-br from-primary/5 via-muted/50 to-background p-8 md:p-12 border-b border-border/60"
      >
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transform scale-110" />
            <Avatar className="size-32 md:size-40 border-4 border-background shadow-2xl relative">
              {siteConfig?.story.content.logo?.filename && (
                <AvatarImage
                  src={siteConfig.story.content.logo.filename}
                  width={200}
                  height={200}
                  className="w-max h-auto object-cover"
                  loading="eager"
                  fetchPriority="high"
                  alt={siteConfig.story.content.logo.alt || "Profile picture"}
                />
              )}
              <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
          </motion.div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-2">
                {siteConfig?.story.content.site_name}
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium tracking-wide">
                {siteConfig?.story.content.title}
              </p>
            </div>

            <RichText
              richText={siteConfig?.story.content.summary}
              className="text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed text-base md:text-lg"
            />

            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              {siteConfig?.story.content.email && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-9 rounded-full bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  asChild
                >
                  <Link href={`mailto:${siteConfig.story.content.email}`}>
                    <Mail className="size-3.5" />
                    <span>{siteConfig.story.content.email}</span>
                  </Link>
                </Button>
              )}

              {siteConfig?.story.content.location && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-9 rounded-full bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <MapPin className="size-3.5" />
                  <span>{siteConfig?.story.content.location}</span>
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-40">
            {siteConfig?.story.content.cv_file?.filename && (
              <Button
                className="w-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 rounded-full"
                asChild
              >
                <Link
                  href={siteConfig.story.content.cv_file.filename}
                  download={`${siteConfig.story.content.site_name} - CV.pdf`}
                >
                  <Download className="size-4" />
                  {siteConfig.story.content.download_cv_text || "Download CV"}
                </Link>
              </Button>
            )}

            <div className="flex gap-2 items-center justify-center">
              {siteConfig?.story.content.github?.cached_url && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300 [&_svg]:size-6"
                  asChild
                >
                  <Link
                    href={siteConfig.story.content.github.cached_url}
                    target={siteConfig.story.content.github.target}
                    rel="noopener noreferrer"
                  >
                    <GithubIcon />
                    <span className="sr-only">Github</span>
                  </Link>
                </Button>
              )}

              {siteConfig?.story.content.linkedin?.cached_url && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300 [&_svg]:size-6"
                  asChild
                >
                  <Link
                    href={siteConfig.story.content.linkedin.cached_url}
                    target={siteConfig.story.content.linkedin.target}
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x divide-border/60">
        <div className="bg-muted/25 lg:col-span-2 p-8 md:p-10 space-y-10">
          {experience && (
            <motion.section variants={itemVariants} aria-labelledby="experience-heading">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary shadow-sm">
                  <Briefcase className="size-5" />
                </div>
                <h2 id="experience-heading" className="text-2xl font-bold text-foreground tracking-tight">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-8 relative pl-2">
                {experience.map((job, index) => (
                  <div key={index} className="relative pl-8 group">
                    <div
                      className={cn(
                        "absolute left-0 top-1.5 size-5 rounded-full border-4 border-background bg-primary shadow-md group-hover:scale-125 transition-transform duration-300",
                        !job.content.end_date && "bg-blue-500",
                      )}
                    />

                    {!job.content.end_date && (
                      <div className="absolute left-0 top-1.5 size-5 rounded-full border-4 border-background shadow-md group-hover:scale-125 transition-transform duration-300 bg-blue-500 animate-ping" />
                    )}

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-0">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {job.content.position}
                        </h3>

                        {job.content.tags?.map((tag) => (
                          <Badge key={`tag-${tag}`} variant="outline" className="font-medium w-fit">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Badge variant="secondary" className="font-medium w-fit">
                        <ClientDate locale="en-us" date={job.content.start_date} mode="month" /> -{" "}
                        {job.content.end_date ? (
                          <ClientDate locale="en-us" date={job.content.end_date} mode="month" />
                        ) : (
                          "Present"
                        )}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-3">
                      <Building2 className="size-3.5" />
                      <span>{job.content.company_name}</span>
                    </div>

                    <RichText
                      richText={job.content.description}
                      className="list-disc list-outside ml-4 space-y-2 text-sm text-muted-foreground/90 leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {experience && projects && <Separator className="bg-border/60" />}

          {projects && (
            <motion.section variants={itemVariants} aria-labelledby="projects-heading">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary shadow-sm">
                  <Code2 className="size-5" />
                </div>
                <h2 id="projects-heading" className="text-2xl font-bold text-foreground tracking-tight">
                  Featured Projects
                </h2>
              </div>

              <ImageCarousel
                autoplay
                slides={projects
                  .filter((project) => project.content.is_featured)
                  .map((project) => ({
                    image: project.content.image,
                    title: project.content.name,
                    description: project.content.description,
                    tags: project.content.tech_stack?.flatMap((tech) => {
                      const techStack: Array<string> = [];

                      if (tech.frontend) techStack.push(...tech.frontend);
                      if (tech.backend) techStack.push(...tech.backend);

                      return techStack;
                    }),
                    footer: (
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {project.content.github_url?.cached_url && (
                          <Button
                            variant="link"
                            size="default"
                            className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                            asChild
                          >
                            <Link
                              href={project.content.github_url.cached_url}
                              target={project.content.github_url.target}
                              rel="noopener noreferrer"
                            >
                              <GithubIcon />
                              <span>Github</span>
                            </Link>
                          </Button>
                        )}

                        {project.content.live_url?.cached_url && (
                          <Button
                            variant="link"
                            size="default"
                            className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                            asChild
                          >
                            <Link
                              href={project.content.live_url.cached_url}
                              target={project.content.live_url.target}
                              rel="noopener noreferrer"
                            >
                              <Globe />
                              <span>Website</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    ),
                  }))}
              />
            </motion.section>
          )}
        </div>

        <div className="bg-muted/25 p-8 md:p-10 space-y-10 h-full">
          {skills && (
            <motion.section variants={itemVariants} aria-labelledby="skills-heading">
              <div className="flex items-center gap-3 mb-5">
                <Code2 className="size-5 text-primary" />
                <h2 id="skills-heading" className="text-lg font-bold text-foreground tracking-tight uppercase">
                  Skills
                </h2>
              </div>

              <div className="space-y-6">
                {!!skills?.content.frontend?.length && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" /> Frontend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.content.frontend.map((skill) => (
                        <Badge
                          key={`skill-${skill}`}
                          className="bg-background hover:bg-primary hover:text-primary-foreground text-foreground border-border transition-colors duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {!!skills?.content.backend?.length && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" /> Backend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.content.backend.map((skill) => (
                        <Badge
                          key={`skill-${skill}`}
                          className="bg-background hover:bg-primary hover:text-primary-foreground text-foreground border-border transition-colors duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {!!skills?.content.tools?.length && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" /> Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.content.tools.map((skill) => (
                        <Badge
                          key={`skill-${skill}`}
                          className="bg-background hover:bg-primary hover:text-primary-foreground text-foreground border-border transition-colors duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {skills && languages && <Separator className="bg-border/60" />}

          {languages && (
            <motion.section variants={itemVariants} aria-labelledby="languages-heading">
              <div className="flex items-center gap-3 mb-5">
                <Languages className="size-5 text-primary" />
                <h2 id="languages-heading" className="text-lg font-bold text-foreground tracking-tight uppercase">
                  Languages
                </h2>
              </div>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 rounded-lg bg-background/50 border border-border/50"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </motion.div>
  );
}
