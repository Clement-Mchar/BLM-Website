/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { throttle } from '#start/limiter'
const AuthController = () => import ('#controllers/auth_controller')

router.on('/').render('pages/home')
router
    .post('/api/login', [AuthController, 'store'])
    .use(throttle)
router.get('/api/auth/csrf-token', async () => {});