import { Router } from 'express'
import {
  createUserController,
  deleteUserController,
  getListUsersController,
  getUserByIdController,
  updateUserController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  createUserValidator,
  deleteUserValidator,
  getUserByIdValidator,
  paginationValidator,
  updateUserValidator
} from '~/middlewares/users.middlewares'
import { UserType } from '~/models/schemas/User.schema'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post(
  '/create',
  createUserValidator,
  filterMiddleware<UserType>(['firstName', 'lastName', 'middleName', 'course', 'group', 'faculty']),

  wrapRequestHandler(createUserController)
)
usersRouter.put(
  '/update/:id',
  updateUserValidator,
  filterMiddleware<UserType>(['firstName', 'lastName', 'middleName', 'course', 'group', 'faculty']),
  wrapRequestHandler(updateUserController)
)

usersRouter.delete('/delete/:id', deleteUserValidator, wrapRequestHandler(deleteUserController))

usersRouter.get('/list', wrapRequestHandler(getListUsersController))

usersRouter.get('/:id', getUserByIdValidator, wrapRequestHandler(getUserByIdController))

export default usersRouter
