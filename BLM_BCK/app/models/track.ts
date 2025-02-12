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
  declare photoUrl: string | null

  @belongsTo(() => Album)
  declare albumid: BelongsTo<typeof Album>

  @belongsTo(() => Artist)
  declare artistId: BelongsTo<typeof Artist>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}