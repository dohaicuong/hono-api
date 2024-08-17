import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { eq } from 'drizzle-orm'
import { not_found_schema, user_schema } from '../dto/models.js'
import { get_db } from '../services/db/index.js'
import { user } from '../services/db/schema.js'

const route = createRoute({
  method: 'get',
  path: '/user/{id}',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: 'id',
          in: 'path',
        },
        example: '1',
      }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: user_schema,
        },
      },
      description: 'Retrieve the user',
    },
    404: {
      content: {
        'application/json': {
          schema: not_found_schema,
        },
      },
      description: 'User not found',
    },
  },
})

const app = new OpenAPIHono().openapi(route, async (c) => {
  const id = Number.parseInt(c.req.param('id'))

  const result = await get_db().select().from(user).where(eq(user.id, id))

  if (!result.length) {
    return c.json(
      {
        message: `User with id ${id} not found!`,
      },
      404,
    )
  }

  return c.json(user_schema.parse(result[0]), 200)
})

export default app
