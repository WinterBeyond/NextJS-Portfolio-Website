import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

const envVariables = {
  NODE_ENV: z.enum(["development", "production"]).optional().default("production"),
  PAGE_SUSPENSE_TESTING_DELAY: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .optional(),
};

const zodEnvVariables = z.object(envVariables);

export const sharedEnv = createEnv({
  shared: envVariables,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PAGE_SUSPENSE_TESTING_DELAY: process.env.PAGE_SUSPENSE_TESTING_DELAY,
  },
}) as Readonly<z.infer<typeof zodEnvVariables>>;
