import { createEnv } from "@t3-oss/env-nextjs"

import { z } from "zod"

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    AUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    DATABASE_URL: z.string(),
    // @ts-expect-error Mail requires vercel url
    NEXT_PUBLIC_VERCEL_URL : z.string().url(), 
  },
  experimental__runtimeEnv: process.env,
})