import { serve } from '@hono/node-server'
import app from './app.js'
import { get_env } from './services/env.js'

serve({
  port: get_env().PORT,
  fetch: app.fetch,
})

console.log(`http://localhost:${get_env().PORT}`)
