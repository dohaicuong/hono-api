import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { user_role_schema, user_schema } from '../dto/models.js'
import { get_db } from '../services/db/index.js'
import { user } from '../services/db/schema.js'

const route = createRoute({
  method: 'post',
  path: '/user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email().openapi({ example: 'user@email.com' }),
            password: z.string().min(12),
            name: z.string(),
            role: user_role_schema.optional().default('customer'),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: user_schema,
        },
      },
      description: 'Created user',
    },
  },
})

const app = new OpenAPIHono().openapi(route, async (c) => {
  const data = c.req.valid('json')

  const result = await get_db()
    .insert(user)
    .values({
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    })
    .returning()

  return c.json(user_schema.parse(result[0]), 200)
})

export default app
