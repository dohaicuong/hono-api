import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: serial('id'),
  email: text('email').notNull(),
  password: text('password').notNull(),

  name: text('name'),
  role: text('role').$type<'admin' | 'customer'>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
