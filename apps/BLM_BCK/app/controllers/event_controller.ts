import { inject } from '@adonisjs/core'
import { EventService } from '#services/event_service'
import { createEventValidator, updateEventValidator } from '#validators/event_validators'
import { HttpContext } from '@adonisjs/core/http'
import { RawEventData } from '../interfaces/event_interface.js'

@inject()
export default class EventController {
  constructor(private eventService: EventService) {}

  async index() {
    return this.eventService.all()
  }

  async store({ request }: HttpContext) {
    const rawArtistIds = request.input('artistIds') as string | undefined
    const artistIds = rawArtistIds ? rawArtistIds.split(',').map((id) => id.trim()) : []

    const allWithoutArtistIds = Object.fromEntries(
      Object.entries(request.all()).filter(([key]) => key !== 'artistIds')
    )

    const dataToValidate: RawEventData = {
      ...allWithoutArtistIds,
      artistIds,
    }

    const data = await request.validateUsing(createEventValidator, {
      data: dataToValidate,
    })

    return this.eventService.store(data)
  }

  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.eventService.destroy(id)
  }
  async destroyMany({ request }: HttpContext) {
    const { ids } = request.body()
    return this.eventService.destroyMany(ids)
  }

  async edit({ params }: HttpContext) {
    const id = params.id
    return this.eventService.edit(id)
  }
  async show({ params }: HttpContext) {
    const id = params.id
    return this.eventService.show(id)
  }
  async update({ request, params }: HttpContext) {
    const id = params.id
    const artistIds = request.input('artistIds') as string[] | undefined

    const data = await request.validateUsing(updateEventValidator)
    return this.eventService.update(id, { ...data, artistIds })
  }
}
