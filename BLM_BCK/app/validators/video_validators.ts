import vine from '@vinejs/vine'
import { VideoCategory } from '../enums.js'

const baseVideoSchema = {
  title: vine.string().minLength(1).maxLength(100),
  url: vine.string().activeUrl(),
  category: vine.enum(VideoCategory),
  artistIds: vine.array(vine.string().uuid()).minLength(1),
}

export const createVideoValidator = vine.compile(vine.object(baseVideoSchema))
export const updateVideoValidator = vine.compile(
  vine.object({
    title: baseVideoSchema.title.optional(),
    url: baseVideoSchema.url.optional(),
    category: baseVideoSchema.category.optional(),
    artistIds: baseVideoSchema.artistIds.optional(),
  })
)
