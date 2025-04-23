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
    user.username = data.username
    user.password = data.password
    user.userRole = data.role as UserRole
    user.isAdmin = data.role === UserRole.Admin

    await user.save()
    return user
  }
  async destroy(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
    return
  }

  async edit(id: number) {
    const user = await User.findOrFail(id)
    return user
  }

  async update(id: number, data: { username?: string; password?: string; role?: string }) {
    const user = await User.findOrFail(id)
    if (data.username) user.username = data.username
    if (data.password) user.password = data.password
    if (data.role) {
      user.userRole = data.role as UserRole
      user.isAdmin = data.role === UserRole.Admin
    }
    await user.save()
    return user
  }
}
