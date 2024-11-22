import Track from '#models/track'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, hasMany } from '@adonisjs/lucid/orm'

export default class Album extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(album: Album) {
    album.id = randomUUID()
  }

  @column.date()
  declare date: DateTime

  @column()
  declare photo_url: string | null

  @column()
  declare name: string

  @hasMany(() => Track)
  declare tracks_ids: HasMany<typeof Track>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
