import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { user_schema } from '../dto/models.js'
import { get_db } from '../services/db/index.js'
import { user } from '../services/db/schema.js'

const route = createRoute({
  method: 'get',
  path: '/user',
  request: {
    query: z.object({
      limit: z.coerce.number().max(100).optional().default(10).openapi({
        example: 10,
      }),
      offset: z.coerce.number().optional().default(0).openapi({
        example: undefined,
      }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: user_schema.array(),
        },
      },
      description: 'List users',
    },
  },
})

const app = new OpenAPIHono().openapi(route, async (c) => {
  const { limit, offset } = c.req.valid('query')

  const result = await get_db()
    .select()
    .from(user)
    .limit(limit)
    .offset(offset)
    .orderBy(user.createdAt)

  return c.json(user_schema.array().parse(result))
})

export default app
