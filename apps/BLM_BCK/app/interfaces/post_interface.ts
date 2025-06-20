import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { PostCategory } from '../enums.js'


export interface CreatePostData {
  title: string
  header?: Attachment
  body: string
  userId: number
  category: PostCategory
  artistIds?: string[]
  albumIds?: string[]
}

export interface UpdatePostData {
  title?: string
  header?: Attachment
  body?: string
  category?: PostCategory
  artistIds?: string[]
  albumIds?: string[]
}

export interface RawPostData {
  title?: string
  header?: Attachment
  body?: string
  category?: string
  artistIds?: string[]
  albumIds?: string[]
  [key: string]: any
}
