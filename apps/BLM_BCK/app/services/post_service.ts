import Post from '#models/post'
import { inject } from '@adonisjs/core'
import { CreatePostData, UpdatePostData } from '../interfaces/post_interface.js'
@inject()
export class PostService {
  async all() {
    const posts = await Post.query().preload('user').preload('artists').preload('albums')
    return posts
  }

  async store(data: CreatePostData) {
    const { artistIds, albumIds, ...postData } = data
    const post = new Post()

    await post.merge(postData).save()
    if (artistIds && artistIds.length > 0) {
      await post.related('artists').attach(artistIds)
    }
    if (albumIds && albumIds.length > 0) {
      await post.related('albums').attach(albumIds)
    }
    await post.load('artists')
    await post.load('albums')
    return post
  }

  async destroy(id: string) {
    const post = await Post.findOrFail(id)
    await post.delete()
    return
  }

  async destroyMany(ids: string[]) {
    const posts = await Post.findMany(ids)

    for (const post of posts) {
      await post.delete()
    }

    return
  }

  async edit(id: string) {
    const post = await Post.query()
      .where('id', id)
      .preload('artists')
      .preload('albums')
      .firstOrFail()
    return {
      ...post.serialize(),
      artistIds: post.artists.map((a) => a.id),
      albumIds: post.albums.map((a) => a.id),
    }
  }
  async show(id: string) {
    const post = await Post.findOrFail(id)
    return post
  }
  async update(id: string, data: UpdatePostData) {
    const { artistIds, albumIds, ...postData } = data
    const post = await Post.findOrFail(id)

    await post.merge(postData).save()
    if (artistIds && artistIds.length > 0) {
      await post.related('artists').sync(artistIds)
    }
    if (albumIds && albumIds.length > 0) {
      await post.related('albums').sync(albumIds)
    }
    await post.load('artists')
    await post.load('albums')
    return post
  }
}
