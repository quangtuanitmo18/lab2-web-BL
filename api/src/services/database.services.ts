import { Collection, Db, MongoClient } from 'mongodb'
import User from '~/models/schemas/User.schema'

import { envConfig } from '~/constants/config'

const uri = `mongodb://${envConfig.dbUsername}:${envConfig.dbPassword}@${envConfig.dbHost}:${envConfig.dbPort}`

class DatabaseService {
  private client!: MongoClient
  private db!: Db

  async connect(uri: string, dbName: string) {
    try {
      if (uri && dbName) {
        this.client = new MongoClient(uri)
        this.db = this.client.db(dbName)

        await this.db.command({ ping: 1 })

        const listConllections = await this.db.listCollections().toArray()
        const ListCollectionsName = listConllections.map((collectionItem) => collectionItem.name)

        if (!ListCollectionsName.includes('users')) {
          await this.db.createCollection('users')
        }

        console.log('Pinged your deployment. You successfully connected to MongoDB!')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
  async disconnect() {
    await this.client.close()
  }
  async indexUsers() {
    const exists = await this.users.indexExists([
      'firstName_text',
      'lastName_text',
      'middleName_text',
      'group_text',
      'faculty_text',
      'course_text'
    ])
    if (!exists) {
      this.users.createIndex(
        { firstName: 'text', lastName: 'text', middleName: 'text', group: 'text', faculty: 'text', course: 'text' },
        { default_language: 'none' }
      )
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }
}

const databaseService = new DatabaseService()
databaseService.connect(uri, envConfig.dbName).then(() => {
  databaseService.indexUsers()
})
export default databaseService
