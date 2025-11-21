import {
  goldenBookRepository,
  CreateGoldenBookEntryDTO,
  ApproveGoldenBookEntryByIdFn,
  ListGoldenBookEntriesParams as RepoListGoldenBookEntriesParams,
  DeleteGoldenBookEntryByIdFn,
} from '@/lib/repositories/golden-book'
import { sendNewSubmissionEmail } from '@/lib/email'

const approveEntry: ApproveGoldenBookEntryByIdFn = id => goldenBookRepository.approveEntryById(id)

const createEntry = async (payload: CreateGoldenBookEntryDTO) => {
  const id = await goldenBookRepository.insertEntry(payload)

  await sendNewSubmissionEmail(payload).catch(err => console.error('email send failed', err))

  return id
}

export type ListGoldenBookEntriesParams = RepoListGoldenBookEntriesParams

const listEntries = async (params: ListGoldenBookEntriesParams) =>
  goldenBookRepository.listEntries(params)

const deleteEntry: DeleteGoldenBookEntryByIdFn = id => goldenBookRepository.deleteEntryById(id)

export const goldenBookUseCases = {
  approveEntry,
  createEntry,
  deleteEntry,
  listEntries,
}
