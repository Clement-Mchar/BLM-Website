import { inject } from '@adonisjs/core'
import { UserService } from '#services/user_service'

@inject()
export default class UserController {
  constructor(
    private userService: UserService,
  ) {}

  async index() {
    return this.userService.all()
  }

}
