import Video from '#models/video'
import { inject } from '@adonisjs/core'
import { CreateVideoData, UpdateVideoData } from '../interfaces/video_interface.js'
@inject()
export class VideoService {
  async all() {
    const videos = await Video.query().preload('artists')
    return videos
  }

  async store(data: CreateVideoData) {
    const { artistIds, ...videoData } = data
    const video = new Video()
    await video.merge(videoData).save()
    if (artistIds && artistIds.length > 0) {
      await video.related('artists').attach(artistIds)
    }
    await video.load('artists')
    return video
  }

  async destroy(id: string) {
    const video = await Video.findOrFail(id)
    await video.delete()
    return
  }

  async destroyMany(ids: string[]) {
    const videos = await Video.findMany(ids)

    for (const video of videos) {
      await video.delete()
    }

    return
  }

  async edit(id: string) {
    const video = await Video.query().where('id', id).preload('artists').firstOrFail()

    return {
      ...video.serialize(),
      artistIds: video.artists.map((a) => a.id),
    }
  }
  async show(id: string) {
    const video = await Video.findOrFail(id)
    return video
  }
  async update(id: string, data: UpdateVideoData) {
    const { artistIds, ...videoData } = data
    const video = await Video.findOrFail(id)

    await video.merge(videoData).save()
    if (artistIds && artistIds.length > 0) {
      await video.related('artists').sync(artistIds)
    }
    await video.load('artists')
    return video
  }
}
