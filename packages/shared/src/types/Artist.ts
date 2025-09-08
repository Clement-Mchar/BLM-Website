import type { Album } from "./Album"
import type { UploadedFile } from "./UploadedFile"
import type { Video } from "./Video"

export interface Artist  {
    id: string
    name: string
    spotify?: string
    bio?: string
    genre?: string
    twitter?: string
    avatar?: UploadedFile
    insta?: string
    role?: string
    albums?: Album[]
    videos?: Video[]
    createdAt: string
}

export interface CreateArtist {
    name: string
    spotify?: string
    bio?: string
    genre?: string
    twitter?: string
    avatar?: File
    insta?: string
    role?: string
}