import { PaginationSearch } from '../utils.type'

export interface User {
  _id: string
  firstName: string
  lastName: string
  middleName: string
  course: string
  group: string
  faculty: string
  created_at: string
  updated_at: string
}

export interface UserSearch extends PaginationSearch {
  search?: string
}
