

export interface Post {
  id: string
  title: string
  header?: File
  body: string
  user: Object
  category: string
  artistIds?: string[]
  albumIds?: string[]
}

export interface CreatePost {
  title: string
  header?: File
  body: string
  artistIds?: string[]
  albumIds?: string[]
}

