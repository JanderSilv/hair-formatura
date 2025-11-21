import { eq, SQL } from 'drizzle-orm'

import { database, goldenBookEntries, GoldenBookEntry } from '@/database'
import { normalizePagination, Pagination } from '../pagination'

export type CreateGoldenBookEntryDTO = Pick<GoldenBookEntry, 'name' | 'message' | 'email'>

export const insertEntry = async (payload: CreateGoldenBookEntryDTO) => {
  const result = await database
    .insert(goldenBookEntries)
    .values({
      name: payload.name,
      message: payload.message,
      email: payload.email ?? null,
      approved: false,
    })
    .returning({ id: goldenBookEntries.id })

  return result[0].id as number
}

export type ListGoldenBookEntriesParams = { approved?: boolean | null } & Pagination

export const listEntries = async (params: ListGoldenBookEntriesParams = {}) => {
  const { approved, ...pagination } = params
  const { page, pageSize, limit, offset } = normalizePagination(pagination)

  const filters: SQL[] = []

  if (approved !== null && approved !== undefined)
    filters.push(eq(goldenBookEntries.approved, approved))

  const rows = await database.query.goldenBookEntries.findMany({
    where: filters.length ? (_entry, { and }) => and(...filters) : undefined,
    orderBy: (entry, { desc }) => desc(entry.createdAt),
    limit,
    offset,
  })

  return {
    data: rows,
    page,
    pageSize,
  }
}

export type ApproveGoldenBookEntryByIdFn = (id: GoldenBookEntry['id']) => Promise<GoldenBookEntry>

export const approveEntryById: ApproveGoldenBookEntryByIdFn = async (id: GoldenBookEntry['id']) =>
  (
    await database
      .update(goldenBookEntries)
      .set({ approved: true })
      .where(eq(goldenBookEntries.id, id))
      .returning()
  )[0]

export type DeleteGoldenBookEntryByIdFn = (
  id: GoldenBookEntry['id']
) => Promise<GoldenBookEntry | undefined>

export const deleteEntryById: DeleteGoldenBookEntryByIdFn = async (id: GoldenBookEntry['id']) =>
  (await database.delete(goldenBookEntries).where(eq(goldenBookEntries.id, id)).returning())[0]

export const goldenBookRepository = {
  insertEntry,
  listEntries,
  approveEntryById,
  deleteEntryById,
}
