import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export type GoldenBookEntry = typeof goldenBookEntries.$inferSelect
export const goldenBookEntries = sqliteTable('golden_book_entries', {
  approved: integer('approved', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  email: text('email').unique(),
  id: integer('id').primaryKey({ autoIncrement: true }),
  message: text('message').notNull(),
  name: text('name').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})
