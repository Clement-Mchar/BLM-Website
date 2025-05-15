import { WithTime } from '../mixins/with_time.js'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import User from './user.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithUuid } from '../mixins/with_uuid.js'
import Album from './album.js'
import Artist from './artist.js'
import Event from './event.js'
import { PostCategory } from '../enums.js'

export default class Post extends compose(BaseModel, Attachmentable, WithTime, WithUuid) {
  static selfAssignPrimaryKey = true
  @manyToMany(() => Album, {
    pivotTable: 'albums_posts',
  })
  declare albums: ManyToMany<typeof Album>

  @manyToMany(() => Event, {
    pivotTable: 'events_posts',
  })
  declare event: ManyToMany<typeof Event>

  @manyToMany(() => Artist, {
    pivotTable: 'artists_posts',
  })
  declare artists: ManyToMany<typeof Artist>

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @attachment({ preComputeUrl: true })
  declare header: Attachment | null

  @column()
  declare title: string

  @column()
  declare body: string

  @column()
  declare category: PostCategory
}
