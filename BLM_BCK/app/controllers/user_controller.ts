import { inject } from '@adonisjs/core'
import { UserService } from '#services/user_service'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { HttpContext } from '@adonisjs/core/http'
@inject()
export default class UserController {
  constructor(private userService: UserService) {}

  async index() {
    return this.userService.all()
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)
    return this.userService.store(data)
  }
  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.userService.destroy(id)
  }
  async edit({ params }: HttpContext) {
    const id = params.id
    return this.userService.edit(id)
  }

  async update({ request, params }: HttpContext) {
    const id = params.id
    const data = await request.validateUsing(updateUserValidator)
    return this.userService.update(id, data)
  }
}
