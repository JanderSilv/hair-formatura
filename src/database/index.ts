import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

import { ENV } from '@/config'

import 'dotenv/config'

export const database = drizzle({
  connection: { url: ENV.DATABASE_URL!, authToken: ENV.TURSO_AUTH_TOKEN! },
  schema,
})

export * from './schema'
