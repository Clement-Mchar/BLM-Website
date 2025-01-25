/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import ('#controllers/auth_controller')

router.on('/').render('pages/home')
router.post('/login', [AuthController, 'store'])
router.get('auth/csrf-token', async () => {});