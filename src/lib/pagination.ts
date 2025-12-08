export type Pagination = {
  page?: number
  pageSize?: number
}

type PaginationOptions = Pagination & {
  /**
   * Default page size if not provided in params.
   * @default 10
   */
  defaultPageSize?: number
  /**
   * Maximum allowed page size.
   * @default 100
   */
  maxPageSize?: number
}

export type NormalizedPagination = ReturnType<typeof normalizePagination>

export type PaginationResponse<Data> = { data: Data } & Pagination

/**
 * Normalize pagination inputs and return limit/offset and normalized page info.
 * page is 1-based.
 */
export function normalizePagination(params: PaginationOptions = {}) {
  const defaultPageSize = params.defaultPageSize ?? 10
  const maxPageSize = params.maxPageSize ?? 100

  const page = Math.max(1, Number(params.page) || 1)
  const pageSize = Math.min(maxPageSize, Math.max(1, Number(params.pageSize) || defaultPageSize))
  const offset = (page - 1) * pageSize

  return { page, pageSize, limit: pageSize, offset }
}
