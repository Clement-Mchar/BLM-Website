import type { UploadedFile } from "./UploadedFile"


export interface Post {
  id: string
  title: string
  header?: UploadedFile
  body: string
  user: Object
  category: string
  artistIds?: string[]
  albumIds?: string[]
  createdAt: string
}

export interface CreatePost {
  title: string
  header?: File
  body: string
  artistIds?: string[]
  albumIds?: string[]
}

