"use client";

import { useEffect, useRef, useState } from "react";

type VideoLazyProps = {
  src: string;
  type: string;
  controls: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  placeholder?: React.ReactNode;
};

export default function VideoLazy({
  src,
  type,
  controls,
  autoPlay,
  muted,
  loop,
  className,
  placeholder,
}: VideoLazyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "100px 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <video
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          className="w-full h-auto md:aspect-video"
        >
          <source src={src} type={type} />
          <p>Your browser does not support the video tag.</p>
        </video>
      ) : (
        placeholder || <div style={{ height: 0, paddingBottom: "56.25%" }} />
      )}
    </div>
  );
}
