import { inject } from '@adonisjs/core'
import { VideoService } from '#services/video_service'
import { createVideoValidator, updateVideoValidator } from '#validators/video_validators'
import { HttpContext } from '@adonisjs/core/http'
import { RawVideoData } from '../interfaces/video_interface.js'
@inject()
export default class VideoController {
  constructor(private videoService: VideoService) {}

  async index() {
    return this.videoService.all()
  }

  async store({ request }: HttpContext) {
    const rawArtistIds = request.input('artistIds') as string | undefined
    const artistIds = rawArtistIds ? rawArtistIds.split(',').map((id) => id.trim()) : []

    const allWithoutArtistIds = Object.fromEntries(
      Object.entries(request.all()).filter(([key]) => key !== 'artistIds')
    )

    const dataToValidate: RawVideoData = {
      ...allWithoutArtistIds,
      artistIds,
    }

    const data = await request.validateUsing(createVideoValidator, {
      data: dataToValidate,
    })

    return this.videoService.store(data)
  }

  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.videoService.destroy(id)
  }
  async destroyMany({ request }: HttpContext) {
    const { ids } = request.body()
    return this.videoService.destroyMany(ids)
  }

  async edit({ params }: HttpContext) {
    const id = params.id
    return this.videoService.edit(id)
  }
  async show({ params }: HttpContext) {
    const id = params.id
    return this.videoService.show(id)
  }
  async update({ request, params }: HttpContext) {
    const id = params.id
    const artistIds = request.input('artistIds') as  string[] | undefined
  

    const data = await request.validateUsing(updateVideoValidator)
    return this.videoService.update(id, { ...data, artistIds })
  }
}
