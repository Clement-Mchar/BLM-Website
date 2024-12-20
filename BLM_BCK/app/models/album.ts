import Track from '#models/track'
import Artist from '#models/artist'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, hasMany, belongsTo } from '@adonisjs/lucid/orm'

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

  @column()
  declare photo_url: string | null

  @hasMany(() => Track)
  declare tracks_ids: HasMany<typeof Track>

  @belongsTo (() => Artist)
  declare artist_id: BelongsTo<typeof Artist>

  @column()
  declare spotify_link: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
