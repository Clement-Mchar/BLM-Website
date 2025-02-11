import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async getCurrentUser({ auth }: HttpContext) {
    return auth.getUserOrFail()
  }
}
