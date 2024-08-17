import { testClient } from 'hono/testing'
import app from '../app.js'

import { mock_db } from '../services/_test.js'
import { get_db } from '../services/db/index.js'
import { user } from '../services/db/schema.js'

mock_db()

test('users.get', async () => {
  await get_db().insert(user).values({
    name: 'hehe',
    email: 'hehe@email.com',
    password: '123123',
    role: 'admin',
  })

  const res = await testClient(app).user.$get()

  const users = await res.json()

  expect(users[0]).toMatchObject({
    id: 1,
    name: 'hehe',
    email: 'hehe@email.com',
    role: 'admin',
  })
  expect(users[0]).toHaveProperty('createdAt')
  expect(users[0]).toHaveProperty('updatedAt')
})
