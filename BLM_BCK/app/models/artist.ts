import { WithTime } from '../mixins/with_time.js'
import Event from '#models/event'
import Album from '#models/album'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import Track from './track.js'
import { compose } from '@adonisjs/core/helpers'
import { WithUuid } from '../mixins/with_uuid.js'
import Post from './post.js'
export default class Artist extends compose(BaseModel, Attachmentable, WithTime, WithUuid) {
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

  @manyToMany(() => Track, {
    pivotTable: 'artists_tracks',
  })
  declare tracks: ManyToMany<typeof Track>

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
