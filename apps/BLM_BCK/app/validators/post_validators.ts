import vine from "@vinejs/vine";
import { PostCategory } from "../enums.js";

const basePostSchema = {
  title: vine.string().minLength(1).maxLength(200),
  header: vine
    .file({
      size: '20mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    })
    .optional(),
  body: vine.string().minLength(1).maxLength(10000),
  category: vine.enum(PostCategory),
  artistIds: vine.array(vine.string().uuid()).minLength(1).optional(),
  albumIds: vine.array(vine.string().uuid()).minLength(1).optional(),
};

export const createPostValidator = vine.compile(vine.object(basePostSchema))
export const updatePostValidator = vine.compile(vine.object({
  title: basePostSchema.title.optional(),
  header: basePostSchema.header.optional(),
  body: basePostSchema.body.optional(),
  category: basePostSchema.category.optional(),
  artistIds: basePostSchema.artistIds.optional(),
  albumIds: basePostSchema.albumIds.optional(),
}))