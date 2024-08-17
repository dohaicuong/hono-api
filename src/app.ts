import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'

import user_get from './api/user.get.js'
import user_post from './api/user.post.js'
import user_put from './api/user.put.js'
import users_get from './api/users.get.js'
import { service } from './services/service.js'

const app = new OpenAPIHono()
  .doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: service.name,
      version: service.version,
      description: service.description,
    },
  })
  .get('/ui', swaggerUI({ url: '/doc' }))
  .get('/healthz', (c) => c.text('ok'))
  .get('/', (c) =>
    c.json({
      service: service.name,
      version: service.version,
      time: new Date().toISOString(),
    }),
  )

  .use(logger())
  .route('', user_post)
  .route('', users_get)
  .route('', user_get)
  .route('', user_put)

export default app
