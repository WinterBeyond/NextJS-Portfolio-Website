export type CacheLifeProfiles =
  | "default"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "max"
  | "no-cache"
  | { stale?: number; revalidate?: number; expire?: number };
