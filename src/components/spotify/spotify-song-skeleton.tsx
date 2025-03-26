export default function SpotifySongSkeleton() {
  return (
    <div className="group/song flex flex-col justify-center rounded-xl border border-neutral-700 bg-neutral-900/30 bg-clip-padding p-3 backdrop-blur-lg">
      <div className="flex items-center justify-center gap-x-5">
        {/* Image placeholder */}
        <div
          className="size-[60px] animate-pulse rounded-xl bg-neutral-700"
          aria-hidden="true"
        />

        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-2">
            {/* Title placeholder */}
            <div
              className="h-5 w-32 animate-pulse rounded bg-neutral-700"
              aria-hidden="true"
            />
            {/* Artist placeholder */}
            <div
              className="h-4 w-24 animate-pulse rounded bg-neutral-700"
              aria-hidden="true"
            />
          </div>

          {/* Play button placeholder */}
          <div
            className="size-6 animate-pulse rounded-full bg-neutral-700"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
