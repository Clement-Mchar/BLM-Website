import { DateTime } from 'luxon'
import { WithTime } from '../mixins/with_time.js'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import Artist from './artist.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithUuid } from '../mixins/with_uuid.js'
import Post from './post.js'

export default class Album extends compose(BaseModel, Attachmentable, WithUuid, WithTime) {
  @manyToMany(() => Artist, {
    pivotTable: 'artists_albums',
  })
  declare artists: ManyToMany<typeof Artist>

  @manyToMany(() => Post, {
    pivotTable: 'albums_posts',
  })
  declare posts: ManyToMany<typeof Post>

  @column()
  declare name: string

  @column.date()
  declare date: DateTime

  @attachment({ preComputeUrl: true })
  declare cover: Attachment | null

  @column()
  declare link: string | null

}
