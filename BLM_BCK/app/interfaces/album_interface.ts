import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { DateTime } from 'luxon'

export interface CreateAlbumData {
  name: string
  date: DateTime
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

export interface RawAlbumData {
  name?: string
  date?: string | Date
  link?: string
  artistIds?: string[]
  [key: string]: any
}
