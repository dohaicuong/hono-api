import { z } from '@hono/zod-openapi'

export const user_role_schema = z.enum(['admin', 'customer'])

export const user_schema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    email: z.string().openapi({
      example: 'user@gmail.com',
    }),
    name: z.string().nullable(),
    role: user_role_schema,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .openapi('user')

export const not_found_schema = z.object({
  message: z.string(),
})
