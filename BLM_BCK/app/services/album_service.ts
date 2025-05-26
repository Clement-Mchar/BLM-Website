import Album from '#models/album'
import { inject } from '@adonisjs/core'
import { CreateAlbumData, UpdateAlbumData } from '../interfaces/album_interface.js'
@inject()
export class AlbumService {
  async all() {
    const albums = await Album.all()
    return albums
  }

  async store(data: CreateAlbumData) {
    const { artistIds, ...albumData } = data
    const album = new Album()
    await album.merge(albumData).save()
    if (artistIds && artistIds.length > 0) {
      await album.related('artists').attach(artistIds)
    }
    return album
  }

  async destroy(id: string) {
    const album = await Album.findOrFail(id)
    await album.delete()
    return
  }

  async destroyMany(ids: string[]) {
    const albums = await Album.findMany(ids)

    for (const album of albums) {
      await album.delete()
    }

    return
  }

  async edit(id: string) {
    const album = await Album.findOrFail(id)
    return album
  }
  async show(id: string) {
    const album = await Album.findOrFail(id)
    return album
  }
  async update(id: string, data: UpdateAlbumData) {
    const { artistIds, ...albumData } = data
    const album = await Album.findOrFail(id)

    await album.merge(albumData).save()
        if (artistIds && artistIds.length > 0) {
      await album.related('artists').sync(artistIds)
    }
    return album
  }
}
