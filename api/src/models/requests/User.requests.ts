import { ParamsDictionary } from 'express-serve-static-core'

export interface getUserByIdParams extends ParamsDictionary {
  id: string
}

export interface updateUserByIdParams extends ParamsDictionary {
  id: string
}

export interface deleteUserByIdParams extends ParamsDictionary {
  id: string
}

export interface filterGetListUserQuery extends ParamsDictionary {
  page: string
  limit: string
  search: string
}
