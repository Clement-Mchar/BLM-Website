import User from '#models/user'
import { UserRole } from '../enums.js'
import { inject } from '@adonisjs/core'

@inject()
export class UserService {
  async all() {
    const users = await User.all()
    return users
  }

  async store(data: { username: string; password: string; role: string }) {
    const user = new User()
    await user
      .merge({
        username: data.username,
        password: data.password,
        userRole: data.role as UserRole,
        isAdmin: data.role === UserRole.Admin,
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

  async update(id: number, data: { username?: string; password?: string; role?: string }) {
    const user = await User.findOrFail(id)

    if (data.role) {
      user.userRole = data.role as UserRole
      user.isAdmin = data.role === UserRole.Admin
    }
    await user.merge(data).save()
    return user
  }
}
