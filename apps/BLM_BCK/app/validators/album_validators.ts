import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

const baseAlbumSchema = {
  name: vine.string().minLength(1).maxLength(100),
  date: vine.string().transform((date) => DateTime.fromISO(date)),
  cover: vine
    .file({
      size: '20mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    })
    .optional(),
  link: vine.string().activeUrl().optional(),
  artistIds: vine.array(vine.string().uuid()).minLength(1),
}

export const createAlbumValidator = vine.compile(vine.object(baseAlbumSchema))

export const updateAlbumValidator = vine.compile(
  vine.object({
    name : baseAlbumSchema.name.optional(),
    date : baseAlbumSchema.date.optional(),
    cover: baseAlbumSchema.cover.optional(),
    link : baseAlbumSchema.link.optional(),
    artistIds: baseAlbumSchema.artistIds.optional(),
  })
  
)
