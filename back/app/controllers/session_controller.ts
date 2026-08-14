import User from '#models/user'
import { createSessionValidator } from '#validators/session'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(createSessionValidator)
      const user = await User.verifyCredentials(email, password)
      const login = await User.accessTokens.create(user)
      user.$setAttribute('token', login.value?.release())
      await user.save()

      return user
    } catch (error) {
      console.error('Erro no login:', error)
      return response.unauthorized({ error: 'Credenciais inválidas' })
    }
  }

  async destroy({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.status(203)
  }
}