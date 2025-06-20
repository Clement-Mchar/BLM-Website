import { inject } from '@adonisjs/core'
import { ArtistService } from '#services/artist_service'
import { createArtistValidator, updateArtistValidator } from '#validators/artist_validators'
import { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'

@inject()
export default class ArtistController {
  constructor(private artistService: ArtistService) {}

  async index() {
    return this.artistService.all()
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createArtistValidator)
    const avatarFile = request.file('avatar')
    const attachment = avatarFile ? await attachmentManager.createFromFile(avatarFile) : undefined
    return this.artistService.store({
      ...data,
      avatar: attachment,
    })
  }

  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.artistService.destroy(id)
  }
  async destroyMany({ request }: HttpContext) {
    const { ids } = request.body()
    return this.artistService.destroyMany(ids)
  }

  async edit({ params }: HttpContext) {
    const id = params.id
    return this.artistService.edit(id)
  }
  async show({ params }: HttpContext) {
    const id = params.id
    return this.artistService.show(id)
  }
  async update({ request, params }: HttpContext) {
    const id = params.id
    const data = await request.validateUsing(updateArtistValidator)
    const avatarFile = request.file('avatar')
    const attachment = avatarFile ? await attachmentManager.createFromFile(avatarFile) : undefined
    return this.artistService.update(id, { ...data, avatar: attachment })
  }
}
