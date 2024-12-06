export interface SuccessResponsePagination<Data> {
  message: string
  data: {
    data: Data
    pagination: PaginationResponse
  }
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export interface PaginationResponse {
  limit: number
  page: number
  totalPage: number
}

export interface PaginationSearch {
  limit: number
  page: number
}
