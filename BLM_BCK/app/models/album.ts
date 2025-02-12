import Track from '#models/track'
import Artist from '#models/artist'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
export default class Album extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(album: Album) {
    album.id = randomUUID()
  }
  
  @column()
  declare name: string

  @column.date()
  declare date: DateTime

  @attachment({ preComputeUrl: true })
  declare cover: Attachment | null

  @hasMany(() => Track)
  declare tracksIds: HasMany<typeof Track>

  @belongsTo (() => Artist)
  declare artistId: BelongsTo<typeof Artist>

  @column()
  declare spotifyLink: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
