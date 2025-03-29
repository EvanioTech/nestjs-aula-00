import { z } from "zod";


export const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().default(""),
  JWT_SECRET: z.string().default(""),
  JWT_EXPIRATION: z.string().default(""),
  JWT_REFRESH_SECRET: z.string().default(""),
  JWT_REFRESH_EXPIRATION: z.string().default(""),
  JWT_PUBLIC_KEY: z.string().default(""),
  JWT_PRIVATE_KEY: z.string().default(""),
});


export type Env = z.infer<typeof envSchema>;