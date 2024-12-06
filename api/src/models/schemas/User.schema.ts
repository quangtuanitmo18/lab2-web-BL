import { ObjectId } from 'mongodb'

export interface UserType {
  _id?: ObjectId
  firstName: string
  lastName: string
  middleName: string
  course: string
  group: string
  faculty: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  firstName: string
  lastName: string
  middleName: string
  course: string
  group: string
  faculty: string
  created_at?: Date
  updated_at?: Date

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.firstName = user.firstName || ''
    this.lastName = user.lastName || ''
    this.middleName = user.middleName || ''
    this.course = user.course || ''
    this.group = user.group || ''
    this.faculty = user.faculty || ''
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
