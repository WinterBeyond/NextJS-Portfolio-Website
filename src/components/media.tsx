"use client";

import Image from "next/image";

import { useCookieConsent } from "@/contexts/cookie-consent-provider";
import { useNonce } from "@/contexts/nonce-provider";
import { useSiteConfig } from "@/contexts/site-config-provider";
import useDevice from "@/hooks/use-device";
import { cn, getDimensionsFromUrl, getYoutubeVideoId } from "@/lib/common";
import { StoryblokMedia } from "@/storyblok-components";

import VideoLazy from "./video-lazy";

type MediaProps = {
  blok: StoryblokMedia;
  priority?: "high" | "low";
};

export default function Media({ blok, priority }: MediaProps) {
  const nonce = useNonce();
  const device = useDevice();
  const selectedAsset = device === "mobile" ? blok.mobile_asset : blok.desktop_asset;

  const siteConfig = useSiteConfig();
  const { consent, getPromptConsentComponent } = useCookieConsent();

  const videoId = getYoutubeVideoId(blok.youtube_link);
  let videoSrc = "";
  if (videoId) {
    const params = new URLSearchParams();

    if (blok.loop_video) {
      params.set("loop", "1");
      params.set("playlist", videoId);
    }

    if (blok.autoplay_video) {
      params.set("autoplay", "1");
      params.set("mute", "1");
    }

    if (blok.hide_video_controls) params.set("controls", "0");

    if (blok.seconds_passed && parseInt(blok.seconds_passed) > 0) params.set("start", blok.seconds_passed);

    params.set("modestbranding", "1");

    videoSrc = `https://youtube.com/embed/${videoId}?${params.toString()}`;
  }

  const renderAssetByExtension = (filename: string, alt?: string | null) => {
    const extension = filename.split(".").pop()?.toLowerCase();

    if (!extension) return null;

    const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
    const videoExtensions = ["mp4", "webm", "ogg"];

    if (imageExtensions.includes(extension)) {
      const imageDimensions = getDimensionsFromUrl(filename || "");

      const image = (
        <Image
          src={filename}
          alt={alt || ""}
          className={cn(
            "w-max h-auto object-cover",
            blok.ignore_width_restriction && "w-full",
            blok.position === "left" && "self-start",
            blok.position === "center" && "self-center",
            blok.position === "right" && "self-end",
          )}
          width={imageDimensions?.width}
          height={
            blok.desktop_max_height && device !== "mobile"
              ? parseInt(blok.desktop_max_height)
              : blok.mobile_max_height && device === "mobile"
                ? parseInt(blok.mobile_max_height)
                : imageDimensions?.height
          }
          loading={priority === "high" ? "eager" : "lazy"}
          fetchPriority={priority === "high" ? "high" : "auto"}
          priority={priority === "high"}
          style={{
            maxHeight:
              blok.desktop_max_height && device !== "mobile"
                ? `${blok.desktop_max_height}px`
                : blok.mobile_max_height && device === "mobile"
                  ? `${blok.mobile_max_height}px`
                  : undefined,
          }}
          nonce={nonce}
        />
      );

      return image;
    }

    if (videoExtensions.includes(extension))
      return (
        <VideoLazy
          src={filename}
          type={`video/${extension}`}
          controls={!blok.hide_video_controls}
          autoPlay={blok.autoplay_video}
          muted={blok.autoplay_video}
          loop={blok.loop_video}
          className="w-full"
        />
      );

    return <p className="pt-4 text-sm text-red-600">Unsupported file type: .{extension}</p>;
  };

  if (blok.youtube_link && consent !== "accepted" && siteConfig?.story.content.hide_blocks_that_require_cookie_consent)
    return null;

  const renderedAsset =
    selectedAsset?.filename &&
    renderAssetByExtension(
      selectedAsset.filename,
      device === "mobile" && blok.mobile_alt_text ? blok.mobile_alt_text : blok.alt_text,
    );

  return (
    <>
      {renderedAsset}

      {blok.youtube_link && (
        <>
          {consent === "accepted" ? (
            <iframe
              src={videoSrc}
              title="Youtube Video Player"
              allow="autoplay"
              className={cn("w-full aspect-video border-none")}
              loading={priority === "high" ? "eager" : "lazy"}
              nonce={nonce}
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            getPromptConsentComponent()
          )}
        </>
      )}
    </>
  );
}
