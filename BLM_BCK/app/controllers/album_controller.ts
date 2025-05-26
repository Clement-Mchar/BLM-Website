import { inject } from '@adonisjs/core'
import { AlbumService } from '#services/album_service'
import { createAlbumValidator, updateAlbumValidator } from '#validators/album_validators'
import { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'

@inject()
export default class AlbumController {
  constructor(private albumService: AlbumService) {}

  async index() {
    return this.albumService.all()
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createAlbumValidator)
    const coverFile = request.file('cover')
    const attachment = coverFile ? await attachmentManager.createFromFile(coverFile) : undefined
    return this.albumService.store({
      ...data,
      cover: attachment,
    })
  }

  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.albumService.destroy(id)
  }
  async destroyMany({ request }: HttpContext) {
    const { ids } = request.body()
    return this.albumService.destroyMany(ids)
  }

  async edit({ params }: HttpContext) {
    const id = params.id
    return this.albumService.edit(id)
  }
  async show({ params }: HttpContext) {
    const id = params.id
    return this.albumService.show(id)
  }
  async update({ request, params }: HttpContext) {
    const id = params.id
    const data = await request.validateUsing(updateAlbumValidator)
    const coverFile = request.file('cover')
    const attachment = coverFile ? await attachmentManager.createFromFile(coverFile) : undefined
    return this.albumService.update(id, { ...data, cover: attachment })
  }
}
