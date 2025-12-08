import { describe, it, expect, vi } from 'vitest'
import { seed, makeCreateGoldenBookEntryPayload } from '../../helpers/factories'

seed()

// Create a lightweight mock of the '@/database' module that the repository expects.
// This mock implements the minimal API used by `src/lib/repositories/golden-book.ts`.
vi.mock('@/database', () => {
  const rows: any[] = []

  return {
    // export a minimal goldenBookEntries placeholder (repository only needs the reference)
    goldenBookEntries: {},
    database: {
      insert: () => ({
        values: (vals: any) => ({
          returning: async () => {
            const id = rows.length + 1
            const row = { id, ...vals }
            rows.push(row)
            return [{ id }]
          },
        }),
      }),
      query: {
        goldenBookEntries: {
          findMany: async ({ limit = 10, offset = 0 } = {}) => rows.slice(offset, offset + limit),
        },
      },
      update: () => ({
        set: (obj: any) => ({
          where: (_cond: any) => ({
            returning: async () => {
              // Try to extract an id from the condition. The test code calls
              // `where(eq(goldenBookEntries.id, id))` so the condition may contain
              // the id value somewhere; attempt a best-effort extraction.
              let targetId: number | null = null
              try {
                if (typeof _cond === 'number') targetId = _cond
                else {
                  const s = JSON.stringify(_cond)
                  const m = s && s.match(/\d+/)
                  if (m) targetId = Number(m[0])
                }
              } catch (_error) {
                targetId = null
              }

              if (targetId != null) {
                const row = rows.find(r => r.id === targetId)
                if (!row) return []
                Object.assign(row, obj)
                return [row]
              }

              // fallback: update first row if no id could be extracted
              if (rows.length === 0) return []
              rows[0] = { ...rows[0], ...obj }
              return [rows[0]]
            },
          }),
        }),
      }),
    },
  }
})

describe('golden-book repository (integration-like)', () => {
  it('insertEntry and listEntries should work together', async () => {
    const repo = await import('@/lib/repositories/golden-book')

    const payload = makeCreateGoldenBookEntryPayload()

    const id = await repo.insertEntry(payload)
    expect(typeof id).toBe('number')

    const listed = await repo.listEntries({ page: 1, pageSize: 10 })
    expect(listed.data.length).toBeGreaterThanOrEqual(1)
    expect(listed.data[0].name).toBeTruthy()
  })

  it('approveEntryById should set approved true and return the entry', async () => {
    const repo = await import('@/lib/repositories/golden-book')

    const createdId = await repo.insertEntry(makeCreateGoldenBookEntryPayload())
    const updated = await repo.approveEntryById(createdId as any)
    expect(updated.approved).toBeTruthy()
  })

  it('approveEntryById returns undefined when id not found', async () => {
    const repo = await import('@/lib/repositories/golden-book')

    const result = await repo.approveEntryById(999999 as any)
    expect(result).toBeUndefined()
  })
})
