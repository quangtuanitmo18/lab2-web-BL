import { CreateUserBody } from 'src/types/user/user.api.type'
import { User, UserSearch } from 'src/types/user/user.type'
import { SuccessResponse, SuccessResponsePagination } from 'src/types/utils.type'
import http from 'src/utils/http'

const userService = {
  getUserById(id: string) {
    return http.get<SuccessResponse<User>>(`users/${id}`)
  },

  getListUsers(params?: UserSearch) {
    return http.get<SuccessResponsePagination<User[]>>('users/list', { params })
  },

  deleteUser(id: string) {
    return http.delete(`users/delete/${id}`)
  },

  createUser(data: CreateUserBody) {
    return http.post('users/create', data)
  },

  updateUser(id: string, data: CreateUserBody) {
    return http.put(`users/update/${id}`, data)
  }
}

export default userService
