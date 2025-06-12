import { DateTime } from 'luxon'

export interface CreateEventData {
  name: string
  description?: string
  date?: DateTime
  location: string
  reservation?: string
  artistIds?: string[]
}

export interface UpdateEventData {
  name?: string
  description?: string
  date?: DateTime
  location?: string
  reservation?: string
  artistIds?: string[]
}

export interface RawEventData {
  name?: string
  description?: string
  date?: DateTime
  location?: string
  reservation?: string
  artistIds?: string[]
}
