import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

const baseEventSchema = {
  name: vine.string().minLength(1).maxLength(200),
  description: vine.string().minLength(1).maxLength(1000).optional(),
  date: vine.string().transform((date) => DateTime.fromISO(date)),
  location: vine.string().minLength(1).maxLength(255),
  reservation : vine.string().activeUrl().optional(),
  artistIds: vine.array(vine.string().uuid()).minLength(1).optional(),
}

export const createEventValidator = vine.compile(vine.object(baseEventSchema))

export const updateEventValidator = vine.compile(
  vine.object({
    name : baseEventSchema.name.optional(),
    description: baseEventSchema.description.optional(),
    date : baseEventSchema.date.optional(),
    location : baseEventSchema.location.optional(),
    reservation : baseEventSchema.reservation.optional(),
    artistIds: baseEventSchema.artistIds.optional(),
  })
  
)
