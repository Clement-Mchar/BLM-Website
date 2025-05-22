import Artist from '#models/artist'
import { inject } from '@adonisjs/core'
import { CreateArtistData, UpdateArtistData } from '../interfaces/artist_interface.js'
@inject()
export class ArtistService {
  async all() {
    const artists = await Artist.all()
    return artists
  }

  async store(data: CreateArtistData) {
    const artist = new Artist()
    await artist.merge(data).save()
    return artist
  }

  async destroy(id: string) {
    const artist = await Artist.findOrFail(id)
    await artist.delete()
    return
  }

  async destroyMany(ids: string[]) {
    const artists = await Artist.findMany(ids)

    for (const artist of artists) {
      await artist.delete()
    }

    return
  }

  async edit(id: number) {
    const artist = await Artist.findOrFail(id)
    return artist
  }
  async show(id: string) {
    const user = await Artist.findOrFail(id)
    return user
  }
  async update(id: number, data: UpdateArtistData) {
    const artist = await Artist.findOrFail(id)

    await artist.merge(data).save()
    return artist
  }
}
