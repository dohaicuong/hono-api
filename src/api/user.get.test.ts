import { testClient } from 'hono/testing'
import app from '../app.js'

import { mock_db } from '../services/_test.js'
import { get_db } from '../services/db/index.js'
import { user } from '../services/db/schema.js'

mock_db()

describe('user.get', () => {
  it('should return user with id', async () => {
    await get_db().insert(user).values({
      name: 'name',
      email: 'email@email.com',
      password: '123123',
      role: 'admin',
    })

    const res = await testClient(app).user[':id'].$get({ param: { id: '1' } })

    const newUser = await res.json()
    expect(newUser).toMatchObject({
      id: 1,
      name: 'name',
      email: 'email@email.com',
      role: 'admin',
    })
    expect(newUser).toHaveProperty('createdAt')
    expect(newUser).toHaveProperty('updatedAt')
  })

  it('should throw 404 if not found', async () => {
    const res = await testClient(app).user[':id'].$get({ param: { id: '1' } })

    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ message: 'User with id 1 not found!' })
  })
})
