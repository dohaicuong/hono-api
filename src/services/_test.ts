import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { drizzle } from 'drizzle-orm/postgres-js/driver'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { beforeEach } from 'vitest'

export const mock_db = () => {
  beforeEach(async () => {
    const container = await new PostgreSqlContainer().start()
    const url = container.getConnectionUri()

    const client = postgres(url)
    await migrate(drizzle(client), { migrationsFolder: './drizzle' })

    process.env.DB_URL = url
  })
}
