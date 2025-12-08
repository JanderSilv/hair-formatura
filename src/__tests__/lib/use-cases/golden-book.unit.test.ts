import { vi, describe, it, expect, beforeEach } from 'vitest'
import {
  seed,
  makeCreateGoldenBookEntryPayload,
  makeGoldenBookRepoStub,
} from '../../helpers/factories'

seed()

vi.mock('@/lib/repositories/golden-book', () => {
  return { goldenBookRepository: makeGoldenBookRepoStub() }
})

vi.mock('@/lib/email', () => ({ sendNewSubmissionEmail: vi.fn(async () => {}) }))

import { goldenBookUseCases } from '@/lib/use-cases/golden-book'
import { goldenBookRepository } from '@/lib/repositories/golden-book'
import { sendNewSubmissionEmail } from '@/lib/email'

describe('golden-book use-cases (unit)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('createEntry should call repository.insertEntry and send email', async () => {
    const payload = makeCreateGoldenBookEntryPayload()

    const id = await goldenBookUseCases.createEntry(payload)

    expect(typeof id).toBe('number')
    expect(id).toBeGreaterThan(0)
    expect(goldenBookRepository.insertEntry).toHaveBeenCalledOnce()
    expect(sendNewSubmissionEmail).toHaveBeenCalledOnce()
  })

  it('should not throw when email sending fails (fire-and-forget)', async () => {
    const payload = makeCreateGoldenBookEntryPayload()
    // make the email sender reject
    ;(sendNewSubmissionEmail as any).mockRejectedValueOnce(new Error('smtp failure'))

    // silence and assert the console.error call produced by the use-case
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const id = await goldenBookUseCases.createEntry(payload)

    // createEntry still returns the id even if email fails
    expect(typeof id).toBe('number')
    expect(goldenBookRepository.insertEntry).toHaveBeenCalled()
    expect(sendNewSubmissionEmail).toHaveBeenCalledWith(payload)
    expect(consoleSpy).toHaveBeenCalledWith('email send failed', expect.any(Error))

    consoleSpy.mockRestore()
  })

  it('should propagate repository insert errors', async () => {
    const payload = makeCreateGoldenBookEntryPayload()
    ;(goldenBookRepository.insertEntry as any).mockRejectedValueOnce(new Error('db fail'))

    await expect(goldenBookUseCases.createEntry(payload)).rejects.toThrow('db fail')
  })

  it('listEntries should delegate to repository.listEntries', async () => {
    await goldenBookUseCases.listEntries({ page: 1, pageSize: 10 })
    expect(goldenBookRepository.listEntries).toHaveBeenCalledOnce()
  })

  it('approveEntry should delegate to repository.approveEntryById', async () => {
    await goldenBookUseCases.approveEntry(1)
    expect(goldenBookRepository.approveEntryById).toHaveBeenCalledOnce()
  })
})
