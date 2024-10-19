import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

const envVariables = {
  NODE_ENV: z
    .enum(["development", "production"])
    .optional()
    .default("production"),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const zodEnvVariables = z.object(envVariables);

export const sharedEnv = createEnv({
  shared: envVariables,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
}) as Readonly<z.infer<typeof zodEnvVariables>>;
