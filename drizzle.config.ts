import { ENV } from '@/config'
import type { Config } from 'drizzle-kit'

const config: Config = {
  out: './drizzle',
  schema: './src/database/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: ENV.DATABASE_URL!,
    authToken: ENV.TURSO_AUTH_TOKEN!,
  },
}

export default config
