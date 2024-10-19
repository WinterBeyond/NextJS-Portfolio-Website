import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

const envVariables = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const zodEnvVariables = z.object(envVariables);

export const clientEnv = createEnv({
  client: envVariables,
  experimental__runtimeEnv: {},
}) as Readonly<z.infer<typeof zodEnvVariables>>;
