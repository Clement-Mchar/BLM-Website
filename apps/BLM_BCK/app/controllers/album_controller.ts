import { inject } from '@adonisjs/core'
import { AlbumService } from '#services/album_service'
import { createAlbumValidator, updateAlbumValidator } from '#validators/album_validators'
import { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { RawAlbumData } from '../interfaces/album_interface.js'
@inject()
export default class AlbumController {
  constructor(private albumService: AlbumService) {}

  async index() {
    return this.albumService.all()
  }

  async store({ request }: HttpContext) {
    const rawArtistIds = request.input('artistIds') as string | undefined
    const artistIds = rawArtistIds ? rawArtistIds.split(',').map((id) => id.trim()) : []

    const allWithoutArtistIds = Object.fromEntries(
      Object.entries(request.all()).filter(([key]) => key !== 'artistIds')
    )

    const dataToValidate: RawAlbumData = {
      ...allWithoutArtistIds,
      artistIds,
    }

    const data = await request.validateUsing(createAlbumValidator, {
      data: dataToValidate,
    })

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
    const artistIds = request.input('artistIds') as  string[] | undefined
  

    const data = await request.validateUsing(updateAlbumValidator)
    const coverFile = request.file('cover')
    const attachment = coverFile ? await attachmentManager.createFromFile(coverFile) : undefined
    return this.albumService.update(id, { ...data, cover: attachment, artistIds })
  }
}
