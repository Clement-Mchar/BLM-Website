import { inject } from '@adonisjs/core'
import { PostService } from '#services/post_service'
import { createPostValidator, updatePostValidator } from '#validators/post_validators'
import { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { RawPostData } from '../interfaces/post_interface.js'
@inject()
export default class PostController {
  constructor(private postService: PostService) {}

  async index() {
    return this.postService.all()
  }

  async store({ request, auth }: HttpContext) {
    const rawArtistIds = request.input('artistIds') as string | undefined
    const artistIds = rawArtistIds ? rawArtistIds.split(',').map((id) => id.trim()) : []
    const rawAlbumIds = request.input('albumIds') as string | undefined
    const albumIds = rawAlbumIds ? rawAlbumIds.split(',').map((id) => id.trim()) : []
    const allWithoutArtistIds = Object.fromEntries(
      Object.entries(request.all()).filter(([key]) => key !== 'artistIds')
    )
    const allWithoutAlbumIds = Object.fromEntries(
      Object.entries(allWithoutArtistIds).filter(([key]) => key !== 'albumIds')
    )
    console.log('[auth.user]', auth.user?.id)
    const dataToValidate: RawPostData = {
      ...allWithoutArtistIds,
      ...allWithoutAlbumIds,
      artistIds,
      albumIds
    }

    const data = await request.validateUsing(createPostValidator, {
      data: dataToValidate,
    })

    const headerFile = request.file('header')
    const attachment = headerFile ? await attachmentManager.createFromFile(headerFile) : undefined
    return this.postService.store({
      ...data,
      header: attachment,
      userId: auth.user!.id,
    })
  }

  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.postService.destroy(id)
  }
  async destroyMany({ request }: HttpContext) {
    const { ids } = request.body()
    return this.postService.destroyMany(ids)
  }

  async edit({ params }: HttpContext) {
    const id = params.id
    return this.postService.edit(id)
  }
  async show({ params }: HttpContext) {
    const id = params.id
    return this.postService.show(id)
  }
  async update({ request, params }: HttpContext) {
    const id = params.id
    const artistIds = request.input('artistIds') as string[] | undefined
    const albumIds = request.input('albumIds') as string[] | undefined

    const data = await request.validateUsing(updatePostValidator)
    const headerFile = request.file('header')
    const attachment = headerFile ? await attachmentManager.createFromFile(headerFile) : undefined
    return this.postService.update(id, { ...data, header: attachment, artistIds, albumIds })
  }
}
