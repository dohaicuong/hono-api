import { defineConfig } from 'drizzle-kit'
// @ts-ignore
import { get_env } from './src/services/env'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/services/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: get_env().DB_URL,
  },
})
