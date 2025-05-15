import Artist from '#models/artist'
import { WithTime } from '../mixins/with_time.js'
import { DateTime } from 'luxon'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { compose } from '@adonisjs/core/helpers'
import { WithUuid } from '../mixins/with_uuid.js'
import Post from './post.js'

export default class Event extends compose(BaseModel, Attachmentable, WithUuid, WithTime) {
  @manyToMany(() => Artist, {
    pivotTable: 'artists_events',
  })
  declare artists: ManyToMany<typeof Artist>

  @manyToMany(() => Post, {
    pivotTable: 'events_posts',
  })
  declare event: ManyToMany<typeof Post>

  @column()
  declare name: string

  @attachment({ preComputeUrl: true })
  declare eventPhotos: Attachment | null

  @column()
  declare description: string | null

  @column.date()
  declare date: DateTime | null

  @column()
  declare location: string

  @column()
  declare reservation: string | null
}
