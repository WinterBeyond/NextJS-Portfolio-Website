import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

const envVariables = {
  STORYBLOK_WEBHOOK_SECRET: z.string().optional(),
  STORYBLOK_ACCESS_TOKEN: z.string().min(1),
  STORYBLOK_IPS: z
    .string()
    .optional()
    .transform((val) => val?.split(",")),
  ALLOWED_HOSTS: z
    .string()
    .optional()
    .transform((val) => val?.split(",")),
  SPOTIFY_OAUTH_CLIENT_ID: z.string().min(1),
  SPOTIFY_OAUTH_SECRET: z.string().min(1),
  SPOTIFY_OAUTH_REDIRECT_URI: z.string().min(1),
  SPOTIFY_OAUTH_REFRESH_TOKEN: z.string().min(1),
  DEPLOYMENT_MODE: z.enum(["standalone", "export"]).optional(),
};

const zodEnvVariables = z.object(envVariables);

export const serverEnv = createEnv({
  server: envVariables,
  experimental__runtimeEnv: {},
}) as Readonly<z.infer<typeof zodEnvVariables>>;
