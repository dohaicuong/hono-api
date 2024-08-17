import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']),
  PORT: z.coerce.number().optional().default(4000),
  DB_URL: z.string(),
})

export const get_env = () => EnvSchema.parse(process.env)
