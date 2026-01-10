"use client";

import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { StoryblokAsset, StoryblokRichtext } from "@/storyblok";

import { MotionImage } from "./motion-image";
import RichText from "./richtext";
import { Badge } from "./ui/badge";

type Slide = {
  image?: StoryblokAsset;
  title: string;
  description: string | StoryblokRichtext;
  tags?: Array<string>;
  footer?: ReactNode;
};

type ImageCarouselProps = {
  slides: Slide[];
  autoplay?: boolean;
  autoplayDelay?: number;
};

export function ImageCarousel({ slides, autoplay = false, autoplayDelay = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const headingId = useId();
  const descriptionId = useId();
  const tablistId = useId();

  const slideCount = slides.length;

  const createValidId = (title: string, prefix: string) => {
    return `${prefix}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")}`;
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoplay = useCallback(() => {
    if (!autoplay || shouldReduceMotion || slideCount <= 1) return;

    clearTimer();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= slideCount ? 0 : nextIndex;
      });
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, shouldReduceMotion, slideCount]);

  useEffect(() => {
    if (autoplay && !isAutoplayPaused) startAutoplay();
    else clearTimer();

    return clearTimer;
  }, [autoplay, isAutoplayPaused, autoplayDelay, slideCount, shouldReduceMotion, startAutoplay]);

  useEffect(() => {
    return clearTimer;
  }, []);

  const imageVariants = useMemo((): Variants => {
    if (shouldReduceMotion) {
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    return {
      enter: { opacity: 0, scale: 1.02 },
      center: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    };
  }, [shouldReduceMotion]);

  const paginate = (newDirection: number) => {
    clearTimer();
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return slideCount - 1;
      if (nextIndex >= slideCount) return 0;
      return nextIndex;
    });

    if (autoplay && !isAutoplayPaused) setTimeout(startAutoplay, autoplayDelay);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    clearTimer();
    setCurrentIndex(index);

    if (autoplay && !isAutoplayPaused) setTimeout(startAutoplay, autoplayDelay);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft": {
        event.preventDefault();
        paginate(-1);
        break;
      }
      case "ArrowRight": {
        event.preventDefault();
        paginate(1);
        break;
      }
      case "Home": {
        event.preventDefault();
        goToSlide(0);
        break;
      }
      case "End": {
        event.preventDefault();
        goToSlide(slideCount - 1);
        break;
      }
      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      className="rounded-2xl w-full max-w-3xl bg-card border border-border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      role="group"
      aria-roledescription="carousel"
      aria-label="Design inspiration image carousel"
      aria-live="polite"
      aria-atomic="true"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => autoplay && setIsAutoplayPaused(true)}
      onMouseLeave={() => autoplay && setIsAutoplayPaused(false)}
    >
      <div className="relative h-96 bg-muted overflow-hidden">
        {slides[currentIndex]?.image?.filename && (
          <AnimatePresence initial={false} mode="wait">
            <MotionImage
              key={currentIndex}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: shouldReduceMotion ? 0 : 0.35,
                ease: "easeInOut",
              }}
              src={slides[currentIndex]?.image?.filename || ""}
              alt={slides[currentIndex]?.image?.alt || slides[currentIndex]?.title || ""}
              width={800}
              height={400}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
              priority={currentIndex === 0}
              className="absolute inset-0 w-full h-full object-cover focus-visible:outline-none"
              role="img"
              aria-describedby={descriptionId}
              aria-labelledby={headingId}
            />
          </AnimatePresence>
        )}

        <button
          type="button"
          onClick={() => paginate(-1)}
          className=" absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className=" absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-foreground" aria-hidden="true" />
        </button>

        <span className="sr-only" role="status">
          Slide {currentIndex + 1} of {slideCount}
        </span>
      </div>

      <div className="p-8 border-t border-border">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            role="tabpanel"
            aria-labelledby={createValidId(slides[currentIndex]?.title ?? "unknown", "slide-tab")}
            id={createValidId(slides[currentIndex]?.title ?? "unknown", "slide-panel")}
            tabIndex={0}
          >
            <h2 id={headingId} className="text-2xl font-semibold text-foreground mb-2">
              {slides[currentIndex]?.title}
            </h2>

            {typeof slides[currentIndex]?.description === "string" ? (
              <p id={descriptionId} className="text-muted-foreground leading-relaxed" aria-live="polite">
                {slides[currentIndex]?.description}
              </p>
            ) : (
              <RichText
                id={descriptionId}
                richText={slides[currentIndex]?.description}
                className="text-muted-foreground leading-relaxed"
                aria-live="polite"
              />
            )}

            <div className="flex flex-wrap items-center gap-2 mt-4">
              {slides[currentIndex]?.tags?.map((tag) => (
                <Badge
                  key={`tag-${tag}`}
                  variant="secondary"
                  className="text-[10px] bg-primary/5 text-primary border-primary/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {slides[currentIndex]?.footer}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2 mt-6" role="tablist" aria-label="Slide navigation" id={tablistId}>
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(index)}
                className={`rounded-full h-1.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive ? "w-8 bg-primary" : "w-1.5 bg-muted hover:bg-muted/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={createValidId(slide.title, "slide-panel")}
                tabIndex={isActive ? 0 : -1}
                id={createValidId(slide.title, "slide-tab")}
              >
                <span className="sr-only">
                  {slide.title} ({index + 1} of {slideCount})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
