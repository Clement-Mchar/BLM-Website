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
import { middleware } from '#start/kernel'
import PostController from '#controllers/post_controller'
import EventController from '#controllers/event_controller'
import VideoController from '#controllers/video_controller'

const AlbumController = () => import('#controllers/album_controller')
const UserController = () => import('#controllers/user_controller')
const ArtistController = () => import('#controllers/artist_controller')
const AuthController = () => import('#controllers/auth_controller')

router.on('/').render('pages/home')
router.group(() => {
router.post('/login', [AuthController, 'login']).use(throttle);
router.get('/auth/csrf-token', async () => {});
router.get('/auth/me', [AuthController, 'getCurrentUser']);
router.post('logout', [AuthController, 'logout']);
router.post('users/delete-many', [UserController, 'destroyMany']);
router.resource('users', UserController).use('*', middleware.auth());
router.post('artists/delete-many', [ArtistController, 'destroyMany']);
router.resource('artists', ArtistController).use('*', middleware.auth());
router.resource('albums', AlbumController).use('*', middleware.auth());
router.post('albums/delete-many', [AlbumController, 'destroyMany'])
router.resource('posts', PostController).use('*', middleware.auth());
router.post('posts/delete-many', [PostController, 'destroyMany'])
router.resource('events', EventController).use('*', middleware.auth());
router.post('events/delete-many', [EventController, 'destroyMany'])
router.resource('videos', VideoController).use('*', middleware.auth());
router.post('videos/delete-many', [VideoController, 'destroyMany'])
})
.prefix('api')