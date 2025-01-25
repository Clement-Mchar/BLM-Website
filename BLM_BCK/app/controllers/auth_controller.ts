import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    
    async store({ request, auth, response }: HttpContext) {
        const { fullName, password } = request.only(['fullName', 'password'])
        try {
            const user = await User.verifyCredentials(fullName, password)
            await auth.use('web').login(user)
            // response.redirect('/dashboard')
            console.log(`Utilisateur connecté : ${user.fullName}`)
            return response.json({ message: 'Connexion réussie', user })
        } 
        catch (error: unknown) {
        console.error('Erreur de connexion', error)
        return response.unauthorized({ message: 'Identifiants invalides' })
        
        }
    }
        
}
  