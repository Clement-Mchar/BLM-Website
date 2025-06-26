

export interface Video {
  id: string
  title: string
  url: string
  category: string
  artistIds: string[]
}

export interface CreateVideo {
  title?: string
  url?: string
  category?: string
  artistIds?: string[]
}

