import type { UploadedFile } from "./UploadedFile"

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