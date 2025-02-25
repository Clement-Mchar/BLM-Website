import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Post extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(post: Post) {
    post.id = randomUUID()
  }

  @belongsTo(() => User)
  declare author : BelongsTo<typeof User>

  @attachment({ preComputeUrl: true })
  declare potsPhotos: Attachment | null

  @column()
  declare title: string

  @column()
  declare body: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}