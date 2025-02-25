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
const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')

router.on('/').render('pages/home')
router.group(() => {
router.post('/login', [AuthController, 'login']).use(throttle);
router.get('/auth/csrf-token', async () => {});
router.get('/auth/me', [AuthController, 'getCurrentUser']);
router.post('logout', [AuthController, 'logout']);
router.resource('users', UserController);})
.prefix('api')