import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    try {
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)
    } catch (error: unknown) {
      console.error('Erreur de connexion', error)
      return response.unauthorized({ message: 'Identifiants invalides' })
    }
  }
  async getCurrentUser({ auth }: HttpContext) {
    return auth.getUserOrFail()
  }
  async logout({ auth, response }: HttpContext) {
    await auth.use("web").logout()
    return response.ok({ message : 'Déconnecté avec succès'})
  }
}
