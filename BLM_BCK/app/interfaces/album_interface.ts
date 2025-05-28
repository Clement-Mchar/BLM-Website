import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { DateTime } from 'luxon'


export interface CreateAlbumData {
      name: string
      date: string
      cover?: Attachment
      link?: string
      artistIds: string[]
}

export interface UpdateAlbumData {
      name?: string
      date?: DateTime
      cover?: Attachment
      link?: string
      artistIds?: string[]
}