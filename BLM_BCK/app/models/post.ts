import { WithTime } from '../mixins/with_time.js'
import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'

export default class Post extends compose(BaseModel, WithTime) {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(post: Post) {
    post.id = randomUUID()
  }

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @attachment({ preComputeUrl: true })
  declare potsPhotos: Attachment | null

  @column()
  declare title: string

  @column()
  declare body: string
}
