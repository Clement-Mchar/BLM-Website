import User from '#models/user'
import { UserRole } from '../enums.js'
import { inject } from '@adonisjs/core'
import { CreateUserData } from '../interfaces/user_interface.js'
import { UpdateUserData } from '../interfaces/user_interface.js'

@inject()
export class UserService {
  async all() {
    const users = await User.all()
    return users
  }

  async store(data: CreateUserData) {
    const user = new User()
    await user
      .merge({
        username: data.username,
        password: data.password,
        userRole: data.userRole as UserRole,
        isAdmin: data.userRole === UserRole.Admin,
      })
      .save()

    return user
  }
  async destroy(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
    return
  }

  async destroyMany(ids: number[]) {
    return await User.query().whereIn('id', ids).delete()
  }

  async edit(id: number) {
    const user = await User.findOrFail(id)
    return user
  }

  async update(id: number, data: UpdateUserData ) {
    const user = await User.findOrFail(id)

    if (data.userRole) {
      user.userRole = data.userRole as UserRole
      user.isAdmin = data.userRole === UserRole.Admin
    }
    await user.merge(data).save()
    return user
  }
}
