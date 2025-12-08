import zod from 'zod'

const serverSchema = zod.object({
  ADMIN_EMAIL: zod.email(),
  DATABASE_URL: zod.string().min(1),
  DEBUG: zod.coerce.boolean().default(false),
  NODE_ENV: zod.enum(['development', 'test', 'production']),
  SMTP_HOST: zod.string().min(1),
  SMTP_PASS: zod.string().min(1),
  SMTP_PORT: zod.coerce.number(),
  SMTP_USER: zod.string().min(1),
  TURSO_AUTH_TOKEN: zod.string().min(1),
})
const clientSchema = zod.object({
  NEXT_PUBLIC_SITE_URL: zod.url(),
})

const processEnvSchema = serverSchema.merge(clientSchema)

const processEnv = {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  DATABASE_URL: process.env.DATABASE_URL,
  DEBUG: process.env.DEBUG === 'true',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: process.env.NODE_ENV,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
  SMTP_USER: process.env.SMTP_USER,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
}

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined'

  const parsed = isServer
    ? processEnvSchema.safeParse(processEnv)
    : clientSchema.safeParse(processEnv)

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }
}

export const ENV = processEnv
