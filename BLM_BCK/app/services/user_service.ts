import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums.js'
import { inject } from '@adonisjs/core'

@inject()
export class UserService {
  constructor(private ctx: HttpContext) {}
  async all() {
    const users = await User.all()
    return users
  }

  async create() {
    const user = new User()
    const role = this.ctx.request.input('role')
    if (!Object.values(UserRole).includes(role)) throw new Error('Invalid role')
    user.username = this.ctx.request.input('username')
    user.password = this.ctx.request.input('password')
    user.userRole = role
    user.isAdmin = role === UserRole.Admin
    await user.save()
    return user
  }
}
