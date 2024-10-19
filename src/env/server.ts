import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

const envVariables = {
  SPOTIFY_OAUTH_CLIENT_ID: z.string().min(1),
  SPOTIFY_OAUTH_SECRET: z.string().min(1),
  SPOTIFY_OAUTH_REDIRECT_URI: z.string().min(1),
  SPOTIFY_OAUTH_REFRESH_TOKEN: z.string().min(1),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const zodEnvVariables = z.object(envVariables);

export const serverEnv = createEnv({
  server: envVariables,
  experimental__runtimeEnv: {},
}) as Readonly<z.infer<typeof zodEnvVariables>>;
