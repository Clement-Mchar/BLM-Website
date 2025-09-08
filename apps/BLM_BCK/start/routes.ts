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

const AlbumController = () => import('#controllers/album_controller')
const PostController = () => import('#controllers/post_controller')
const EventController = () => import('#controllers/event_controller')
const VideoController = () => import('#controllers/video_controller')
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
router.resource('artists', ArtistController).except(['index', 'show']).use('*', middleware.auth());
router.resource('artists', ArtistController).only(['index', 'show'])
router.resource('albums', AlbumController).except(['index', 'show']).use('*', middleware.auth());
router.resource('albums', AlbumController).only(['index', 'show']);
router.post('albums/delete-many', [AlbumController, 'destroyMany'])
router.resource('posts', PostController).except(['index', 'show']).use('*', middleware.auth());
router.resource('posts', PostController).only(['index', 'show']);
router.post('posts/delete-many', [PostController, 'destroyMany'])
router.resource('events', EventController).except(['index', 'show']).use('*', middleware.auth());
router.resource('events', EventController).only(['index', 'show']);
router.post('events/delete-many', [EventController, 'destroyMany'])
router.resource('videos', VideoController).except(['index', 'show']).use('*', middleware.auth());
router.resource('videos', VideoController).only(['index', 'show']);
router.post('videos/delete-many', [VideoController, 'destroyMany'])
})
.prefix('api')
