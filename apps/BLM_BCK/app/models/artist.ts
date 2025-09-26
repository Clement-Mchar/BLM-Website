import { WithTime } from '../mixins/with_time.js'
import Event from '#models/event'
import Album from '#models/album'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { compose } from '@adonisjs/core/helpers'
import { WithUuid } from '../mixins/with_uuid.js'
import Post from './post.js'
import Video from './video.js'
export default class Artist extends compose(BaseModel, WithTime, WithUuid) {
  @manyToMany(() => Event, {
    pivotTable: 'artists_events',
  })
  declare events: ManyToMany<typeof Event>

  @manyToMany(() => Post, {
    pivotTable: 'artists_posts',
  })
  declare posts: ManyToMany<typeof Post>

  @manyToMany(() => Album, {
    pivotTable: 'artists_albums',
  })
  declare albums: ManyToMany<typeof Album>

  @manyToMany(() => Video, {
    pivotTable: 'artists_videos',
  })
  declare videos: ManyToMany<typeof Video>
  
  @column()
  declare name: string

  @column()
  declare bio: string | null

  @attachment({ preComputeUrl: true })
  declare avatar: Attachment | null

  @column()
  declare genre: string | null

  @column()
  declare twitter: string | null

  @column()
  declare insta: string | null

  @column()
  declare role: string | null

  @column()
  declare spotify: string | null
}
