import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'

export interface CreateArtistData {
      name: string
      spotify?: string
      bio?: string
      genre?: string
      twitter?: string
      avatar?: Attachment
      insta?: string
      role?: string
}

export interface UpdateArtistData {
      name?: string
      spotify?: string
      bio?: string
      genre?: string
      twitter?: string
      avatar?: Attachment
      insta?: string
      role?: string
}