import type { GoldenBookEntry } from '@/database'
import { faker } from '@faker-js/faker'
import { vi } from 'vitest'

export const seed = (n = 12345) => faker.seed(n)

export const makeCreateGoldenBookEntryPayload = () => ({
  name: faker.person.fullName(),
  message: faker.lorem.sentences(2),
  email: faker.internet.email(),
})

export const makeGoldenBookRow = (overrides: Partial<GoldenBookEntry> = {}) => ({
  id: faker.number.int({ min: 1, max: 10000 }),
  name: faker.person.fullName(),
  message: faker.lorem.paragraph(),
  email: faker.internet.email(),
  approved: false,
  createdAt: new Date().toISOString(),
  updatedAt: Date.now(),
  ...overrides,
})

export const makeGoldenBookRepoStub = () => {
  const rows: any[] = []
  return {
    insertEntry: vi.fn(async (payload: any) => {
      const id = rows.length + 1
      rows.push({ id, ...payload })
      return id
    }),
    listEntries: vi.fn(async (params: any) => ({
      data: rows,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 10,
    })),
    approveEntryById: vi.fn(async (id: number) => {
      const row = rows.find(r => r.id === id)
      if (!row) return null
      row.approved = true
      return row
    }),
  }
}
