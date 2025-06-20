import vine from '@vinejs/vine'

const baseArtistSchema = {
  name: vine.string().minLength(2).maxLength(50),
  bio: vine.string().maxLength(5000).optional(),
  spotify: vine.string().activeUrl().optional(),
  genre: vine.string().optional(),
  twitter: vine.string().activeUrl().optional(),
  avatar: vine
    .file({
      size: '20mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    })
    .optional(),
  insta: vine.string().activeUrl().optional(),
  role: vine.string().optional(),
}

export const createArtistValidator = vine.compile(vine.object(baseArtistSchema))

export const updateArtistValidator = vine.compile(
  vine.object({
    name: baseArtistSchema.name.optional(),
    bio: baseArtistSchema.bio,
    genre: baseArtistSchema.genre,
    twitter: baseArtistSchema.twitter,
    avatar: baseArtistSchema.avatar,
    insta: baseArtistSchema.insta,
    role: baseArtistSchema.role,
  })
)
