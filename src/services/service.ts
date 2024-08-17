import { z } from 'zod'
import pkg from '../../package.json'

const service_schema = z.object({
  version: z.string(),
  name: z.string(),
  description: z.string(),
  // tag: z.string().optional(),
  // env: z.string().optional()
})

export const service = service_schema.parse(pkg)
