import User, { UserType } from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import _omit from 'lodash/omit'

class UsersService {
  public async createUser(user: UserType) {
    const _id = new ObjectId()
    await databaseService.users.insertOne(new User({ _id, ...user }))
    return databaseService.users.findOne({ _id })
  }

  public async updateUser(id: string, user: UserType) {
    const body = _omit(user, ['_id', 'created_at', 'updated_at'])
    await databaseService.users.updateOne({ _id: new ObjectId(id) }, { $set: body })
    return await databaseService.users.findOne({ _id: new ObjectId(id) })
  }

  public async deleteUser(id: string) {
    return await databaseService.users.deleteOne({ _id: new ObjectId(id) })
  }

  public async getAllUsers({ limit, page, search }: { limit: number; page: number; search: string }) {
    const pipeline = []
    const countPipeline = []

    if (search) {
      const $match = {
        $text: {
          $search: search
        }
      }
      pipeline.push({ $match })
      countPipeline.push({ $match })
    }

    pipeline.push({ $skip: limit * (page - 1) }, { $limit: limit })

    countPipeline.push({ $count: 'total' })

    const [users, total] = await Promise.all([
      databaseService.users.aggregate(pipeline).toArray(),
      databaseService.users.aggregate(countPipeline).toArray()
    ])

    return {
      users,
      total: total[0]?.total || 0
    }
  }

  public async getUserById(id: string) {
    return await databaseService.users.findOne({ _id: new ObjectId(id) })
  }
}

const usersService = new UsersService()

export default usersService
