import { DateTime } from 'luxon'
import Album from '#models/album'
import Artist from '#models/artist'
import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Track extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(track: Track) {
    track.id = randomUUID()
  }

  @column()
  declare name: string

  @column()
  declare length: string

  @column()
  declare photo_url: string | null

  @belongsTo(() => Album)
  declare album_id: BelongsTo<typeof Album>

  @belongsTo(() => Artist)
  declare artist_id: BelongsTo<typeof Artist>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}