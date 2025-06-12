import Event from '#models/event'
import { inject } from '@adonisjs/core'
import { CreateEventData, UpdateEventData } from '../interfaces/event_interface.js'
@inject()
export class EventService {
  async all() {
    const events = await Event.query().preload('artists')
    return events
  }

  async store(data: CreateEventData) {
    const { artistIds, ...eventData } = data
    const event = new Event()
    await event.merge(eventData).save()
    if (artistIds && artistIds.length > 0) {
      await event.related('artists').attach(artistIds)
    }
    await event.load('artists')
    return event
  }

  async destroy(id: string) {
    const event = await Event.findOrFail(id)
    await event.delete()
    return
  }

  async destroyMany(ids: string[]) {
    const events = await Event.findMany(ids)

    for (const event of events) {
      await event.delete()
    }

    return
  }

  async edit(id: string) {
    const event = await Event.query().where('id', id).preload('artists').firstOrFail()

    return {
      ...event.serialize(),
      artistIds: event.artists.map((a) => a.id),
    }
  }
  async show(id: string) {
    const event = await Event.findOrFail(id)
    return event
  }
  async update(id: string, data: UpdateEventData) {
    const { artistIds, ...eventData } = data
    const event = await Event.findOrFail(id)
    
    await event.merge(eventData).save()
    if (artistIds && artistIds.length > 0) {
      await event.related('artists').sync(artistIds)
    }
    await event.load('artists')
    return event
  }
}
