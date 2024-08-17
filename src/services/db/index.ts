import { drizzle } from 'drizzle-orm/postgres-js/driver'
import postgres from 'postgres'
import { get_env } from '../env.js'

export const get_db = () => drizzle(postgres(get_env().DB_URL))
