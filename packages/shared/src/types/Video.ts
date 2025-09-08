

export interface Video {
  id: string
  title: string
  url: string
  category: string
  artistIds: string[]
  createdAt: string
  thumbnailUrl?: string
}

export interface CreateVideo {
  title?: string
  url?: string
  category?: string
  artistIds?: string[]
}

