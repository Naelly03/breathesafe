const UsersController = () => import('#controllers/users_controller')
const SensorsController = () => import('#controllers/sensors_controller')
const ReadingsController = () => import('#controllers/readings_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import SessionController from '#controllers/session_controller'

router.get('/', async ({ response }) => {
  return response.json({ message: 'Bem-vindo ao backend!' })
})

router.post('session', [SessionController, 'store'])
router.post('user', [UsersController, 'store'])

router.group(() => {
  router.resource('user', UsersController).apiOnly().except(['store'])
  router.resource('sensor', SensorsController).apiOnly()
  router.resource('readings', ReadingsController).apiOnly()
}).use(middleware.auth())