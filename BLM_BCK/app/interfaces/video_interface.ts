import { VideoCategory } from '../enums.js'

export interface CreateVideoData {
  title: string
  url: string
  category: VideoCategory
  artistIds: string[]
}

export interface UpdateVideoData {
  title?: string
  url?: string
  category?: VideoCategory
  artistIds?: string[]
}

export interface RawVideoData {
  title?: string
  url?: string
  category?: VideoCategory
  artistIds?: string[]
}
